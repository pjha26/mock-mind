'use client';

import { useEffect, useRef } from 'react';

interface NeuralNoiseProps {
  className?: string;
  isSessionActive?: boolean;
  isSpeaking?: boolean;
  isUserSpeaking?: boolean;
  variant?: 'orb' | 'background';
}

export default function NeuralNoise({ 
  className = '',
  isSessionActive = false,
  isSpeaking = false,
  isUserSpeaking = false,
  variant = 'orb'
}: NeuralNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mutable targets for smooth interpolation in the render loop
  const stateRef = useRef({
    speed: 0.2,
    targetSpeed: 0.2,
    intensity: 0.0,
    targetIntensity: 0.0,
    userGlow: 0.0,
    targetUserGlow: 0.0,
  });

  // Update targets when props change
  useEffect(() => {
    const s = stateRef.current;
    if (!isSessionActive) {
      s.targetSpeed = 0.2;
      s.targetIntensity = 0.0;
      s.targetUserGlow = 0.0;
    } else if (isSpeaking) {
      s.targetSpeed = 1.2;
      s.targetIntensity = 1.0;
      s.targetUserGlow = 0.0;
    } else if (isUserSpeaking) {
      s.targetSpeed = 0.6;
      s.targetIntensity = 0.4;
      s.targetUserGlow = 1.0;
    } else {
      // Idle / listening
      s.targetSpeed = 0.4;
      s.targetIntensity = 0.3;
      s.targetUserGlow = 0.0;
    }
  }, [isSessionActive, isSpeaking, isUserSpeaking]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex Shader
    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

      // Fragment Shader - Organic Voronoi Neural Web
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uIntensity;
      uniform float uUserGlow;
      
      // Hash function for random points
      vec2 hash22(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.xx + p3.yz) * p3.zy);
      }

      // Smooth noise for domain warping
      float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = fract(sin(dot(i, vec2(12.9898,78.233))) * 43758.5453123);
          float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(12.9898,78.233))) * 43758.5453123);
          float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898,78.233))) * 43758.5453123);
          float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(12.9898,78.233))) * 43758.5453123);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      // Voronoi edge detection
      float neuralWeb(vec2 uv, float time) {
          vec2 id = floor(uv);
          vec2 fd = fract(uv);
          
          float minDist = 10.0;
          float minDist2 = 10.0;
          
          for(int y = -1; y <= 1; y++) {
              for(int x = -1; x <= 1; x++) {
                  vec2 offset = vec2(float(x), float(y));
                  vec2 h = hash22(id + offset);
                  
                  // Animate the points organically
                  vec2 p = offset + 0.5 + 0.5 * vec2(
                      sin(time * 0.7 + 6.2831 * h.x),
                      cos(time * 0.8 + 6.2831 * h.y)
                  );
                  
                  vec2 diff = p - fd;
                  float d = dot(diff, diff);
                  
                  if(d < minDist) {
                      minDist2 = minDist;
                      minDist = d;
                  } else if(d < minDist2) {
                      minDist2 = d;
                  }
              }
          }
          
          // Distance to the Voronoi cell border
          float edge = sqrt(minDist2) - sqrt(minDist);
          
          // Thickness of the web strands
          // Background variant needs ultra-thin hairline strands
          float thicknessBase = ${variant === 'orb' ? '0.08' : '0.015'};
          float thicknessActive = ${variant === 'orb' ? '0.15' : '0.03'};
          float thickness = mix(thicknessBase, thicknessActive, uIntensity);
          
          return smoothstep(thickness, 0.0, edge);
      }

      void main() {
        // Center UV and correct aspect ratio
        vec2 uv = vUv * 2.0 - 1.0;
        ${variant === 'background' ? 'uv.x *= uResolution.x / uResolution.y;' : ''}
        
        // Circular mask with soft edge (only for orb)
        float dist = length(uv);
        float mask = ${variant === 'orb' ? 'smoothstep(1.0, 0.85, dist)' : '1.0'};
        
        // Base coordinate scale (drastically larger scale for background so only 2-3 lines appear)
        vec2 p = uv * ${variant === 'orb' ? '3.5' : '0.35'};
        
        // Domain warping to make straight Voronoi lines look like organic plasma/nerves
        vec2 warp = vec2(
            noise(p + uTime * 0.2),
            noise(p + 10.0 - uTime * 0.15)
        ) * 1.5;
        
        // Layer 1
        float pattern = neuralWeb(p + warp, uTime * ${variant === 'orb' ? '1.0' : '0.5'});
        
        ${variant === 'orb' ? `
        // Layer 2 (smaller, faster - only for orb to save performance on full screen)
        float w2 = neuralWeb(p * 1.5 - warp * 0.8, uTime * 1.2);
        pattern = max(pattern, w2 * 0.6);
        ` : ''}
        
        // Colors
        vec3 bgCol = vec3(0.02, 0.02, 0.02); // #050505
        
        // Standard Amber (#CC5500)
        vec3 amberCol = vec3(0.8, 0.333, 0.0);
        
        // Distinct state for user speaking (slightly lighter/more golden)
        vec3 userSpeakingCol = vec3(0.92, 0.7, 0.03); // #EAB308
        
        // AI speaking adds brightness to the base amber
        vec3 activeAmber = mix(amberCol, vec3(1.0, 0.5, 0.1), uIntensity * 0.5);
        
        // Blend final accent color based on user glow
        vec3 accentCol = mix(activeAmber, userSpeakingCol, uUserGlow);
        
        // Highlight (Off-white #FAFAFA)
        vec3 highlightCol = vec3(0.98, 0.98, 0.98);

        // Build final color
        vec3 col = bgCol;
        
        // Add glowing web
        ${variant === 'orb' 
          ? 'col = mix(col, accentCol, pattern * mix(0.5, 1.0, uIntensity + uUserGlow));' 
          : 'col = mix(col, accentCol, pattern * mix(0.2, 0.4, uIntensity + uUserGlow));'
        }
        
        // Core intersections get hot white highlights (only for orb, background stays dim)
        ${variant === 'orb' ? `
        float hotNodes = pow(pattern, 3.0);
        col = mix(col, highlightCol, hotNodes * mix(0.3, 0.8, uIntensity + uUserGlow));
        ` : ''}

        // Fade out to black at the edges (for orb)
        col *= mask;
        
        // Base opacity is subtle, gets stronger with activity
        // Background variant is drastically reduced to be barely perceptible (5-10% intensity)
        ${variant === 'orb' 
          ? 'float alpha = mask * mix(0.6, 0.95, max(uIntensity, uUserGlow));' 
          : 'float alpha = mix(0.04, 0.1, max(uIntensity, uUserGlow));'
        }

        gl_FragColor = vec4(col, alpha);
      }
    `;

    // Compile Shader
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

    const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    if (!program || !vertexShader || !fragmentShader) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'uTime');
    const intensityLocation = gl.getUniformLocation(program, 'uIntensity');
    const userGlowLocation = gl.getUniformLocation(program, 'uUserGlow');
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Optimize background canvas resolution to keep it lightweight
      // (scale down resolution for full screen since it's just a blurry/ambient background)
      const resolutionScale = variant === 'background' ? 0.5 : 1.0; 
      
      canvas.width = rect.width * dpr * resolutionScale;
      canvas.height = rect.height * dpr * resolutionScale;
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let animationFrame: number;
    let accumulatedTime = 0;
    let lastTimestamp = performance.now();

    const render = (timestamp: number) => {
      const dt = (timestamp - lastTimestamp) * 0.001;
      lastTimestamp = timestamp;
      
      const s = stateRef.current;
      
      // Smooth interpolation
      s.speed += (s.targetSpeed - s.speed) * 0.05;
      s.intensity += (s.targetIntensity - s.intensity) * 0.05;
      s.userGlow += (s.targetUserGlow - s.userGlow) * 0.05;

      // Advance time based on current dynamic speed
      // Background variant moves at a nearly imperceptible speed
      const speedMultiplier = variant === 'background' ? 0.05 : 1.0;
      accumulatedTime += dt * s.speed * speedMultiplier;
      
      gl.useProgram(program);
      gl.uniform1f(timeLocation, accumulatedTime);
      gl.uniform1f(intensityLocation, s.intensity);
      gl.uniform1f(userGlowLocation, s.userGlow);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ touchAction: 'none', pointerEvents: 'none' }} // Strictly visual, no interactions
    />
  );
}
