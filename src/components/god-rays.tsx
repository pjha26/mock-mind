'use client';

import { useEffect, useRef } from 'react';

interface GodRaysProps {
  colors?: { base: string; accent: string; highlight: string };
  timeScale?: number;
  cursorEnabled?: boolean;
  cursorStrength?: number;
  intensity?: number;
  className?: string;
}

// Helper to convert hex to rgb array [r, g, b] 0-1
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0, 0, 0];
};

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_cursorStrength;
  uniform float u_intensity;
  
  uniform vec3 u_colorBase;
  uniform vec3 u_colorAccent;
  uniform vec3 u_colorHighlight;

  // Classic 2D noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 pos = uv - 0.5;
      pos.x *= u_resolution.x / u_resolution.y;
      
      // Cursor influence
      vec2 mouse = u_mouse / u_resolution.xy - 0.5;
      mouse.x *= u_resolution.x / u_resolution.y;
      
      // Shift center slightly towards mouse, if enabled
      pos -= mouse * u_cursorStrength;

      // Convert to polar coordinates
      float radius = length(pos);
      float angle = atan(pos.y, pos.x);
      
      // Distort angle to create wavy tendrils
      float fbmAngle = angle;
      // We use a slower time multiplier for a calm, slow-burning feel
      fbmAngle += snoise(vec2(radius * 3.0 - u_time * 0.1, angle * 2.0)) * 0.6;
      fbmAngle += snoise(vec2(radius * 5.0 - u_time * 0.2, angle * 4.0)) * 0.3;
      
      // Create the rays based on noise
      float noiseVal = snoise(vec2(fbmAngle * 6.0, u_time * 0.15));
      
      // Threshold to get sharp, distinct rays instead of a blob
      float rays = smoothstep(0.2, 0.8, abs(noiseVal));
      rays = pow(rays, 3.0) * 1.5; 
      
      // Bright core and fading tails
      float core = 1.0 - smoothstep(0.0, 0.25, radius);
      float rayFade = 1.0 - smoothstep(0.1, 1.2, radius);
      
      float finalIntensity = (rays * rayFade + core * 1.5) * u_intensity;
      
      // Base color mapping
      vec3 color = u_colorBase;
      
      // Add accent color based on mid-intensity
      float accentMix = smoothstep(0.1, 0.7, finalIntensity);
      color = mix(color, u_colorAccent, accentMix);
      
      // Add highlight for the very core and brightest ray tips
      float highlightMix = smoothstep(0.7, 1.5, finalIntensity);
      color = mix(color, u_colorHighlight, highlightMix);
      
      gl_FragColor = vec4(color, 1.0);
  }
`;

export default function GodRays({
  colors = { base: '#050505', accent: '#CC5500', highlight: '#FAFAFA' },
  timeScale = 0.2, // Slowed down from default
  cursorEnabled = false, // Disabled by default to avoid generic demo feel
  cursorStrength = 0.05, // Very subtle if ever enabled
  intensity = 0.5, // Lower intensity for a restrained, ambient burn
  className = '',
}: GodRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Compile shaders
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Fullscreen quad
    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uCursorStrength = gl.getUniformLocation(program, 'u_cursorStrength');
    const uIntensity = gl.getUniformLocation(program, 'u_intensity');
    const uColorBase = gl.getUniformLocation(program, 'u_colorBase');
    const uColorAccent = gl.getUniformLocation(program, 'u_colorAccent');
    const uColorHighlight = gl.getUniformLocation(program, 'u_colorHighlight');

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorEnabled) return;
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      // Invert Y for WebGL coordinates
      targetMouseY = rect.height - (e.clientY - rect.top);
    };

    if (cursorEnabled) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;
        gl.viewport(0, 0, canvas.width, canvas.height);
        
        // Init mouse to center
        if (!cursorEnabled) {
          mouseX = canvas.width / 2;
          mouseY = canvas.height / 2;
          targetMouseX = mouseX;
          targetMouseY = mouseY;
        }
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    const baseRgb = hexToRgb(colors.base);
    const accentRgb = hexToRgb(colors.accent);
    const highlightRgb = hexToRgb(colors.highlight);

    const render = () => {
      const time = (performance.now() - startTime) * 0.001 * timeScale;
      
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform1f(uCursorStrength, cursorEnabled ? cursorStrength : 0.0);
      gl.uniform1f(uIntensity, intensity);
      
      gl.uniform3f(uColorBase, baseRgb[0], baseRgb[1], baseRgb[2]);
      gl.uniform3f(uColorAccent, accentRgb[0], accentRgb[1], accentRgb[2]);
      gl.uniform3f(uColorHighlight, highlightRgb[0], highlightRgb[1], highlightRgb[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (cursorEnabled) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, timeScale, cursorEnabled, cursorStrength, intensity]);

  return (
    <div className={`w-full h-full bg-[#050505] relative overflow-hidden ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full absolute inset-0" 
      />
    </div>
  );
}
