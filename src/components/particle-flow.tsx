'use client';

import { useEffect, useRef } from 'react';

export default function ParticleFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // High DPI canvas setup for sharper rendering
        const dpr = window.devicePixelRatio || 1;
        width = parent.clientWidth;
        height = parent.clientHeight;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    const numCurves = 6;
    const particlesPerCurve = 3;
    let time = 0;

    const render = () => {
      time += 0.0015; // Very slow and subtle motion
      
      // Clear with pure black/near-black as requested
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < numCurves; i++) {
        // Distribute curves horizontally
        const xOffsetBase = (width / numCurves) * i + (width / numCurves) / 2;
        
        // Slowly shift left/right based on time
        const xDrift = Math.sin(time * 3 + i * 2) * (width * 0.15); 
        
        const startX = xOffsetBase + xDrift;
        const startY = height + 50;

        const cp1x = xOffsetBase - xDrift * 1.5;
        const cp1y = height * 0.7;
        
        const cp2x = xOffsetBase + xDrift * 2;
        const cp2y = height * 0.3;

        const endX = xOffsetBase - xDrift;
        const endY = -50;

        // Draw the thin hairline curve
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.strokeStyle = 'rgba(204, 85, 0, 0.15)'; // Subtle amber line
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw particles moving up the curve
        for (let j = 0; j < particlesPerCurve; j++) {
          const speed = 0.4 + (i % 3) * 0.1; // Subtle speed variation per curve
          
          // t goes from 0 to 1, wrapping around
          const t = (time * speed + j * (1 / particlesPerCurve)) % 1;
          
          const u = 1 - t;
          const tt = t * t;
          const uu = u * u;
          const uuu = uu * u;
          const ttt = tt * t;

          let px = uuu * startX;
          px += 3 * uu * t * cp1x;
          px += 3 * u * tt * cp2x;
          px += ttt * endX;

          let py = uuu * startY;
          py += 3 * uu * t * cp1y;
          py += 3 * u * tt * cp2y;
          py += ttt * endY;

          // Fade particles in at bottom and out at top
          let opacity = 0.8;
          if (t < 0.1) opacity = (t / 0.1) * 0.8;
          if (t > 0.9) opacity = ((1 - t) / 0.1) * 0.8;

          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(204, 85, 0, ${opacity})`; // Amber dot
          ctx.fill();
          
          // Optional: slight glow for the dot
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(204, 85, 0, ${opacity * 0.5})`;
          ctx.fill();
          ctx.shadowBlur = 0; // reset for next drawing
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden rounded-[calc(2rem-0.375rem)]">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full absolute inset-0" 
      />
      {/* Subtle overlay gradient to blend with the container */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none" />
    </div>
  );
}
