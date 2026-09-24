'use client';

import { useEffect, useRef } from 'react';

interface WaveformProps {
  className?: string;
}

export default function Waveform({ className = '' }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
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

    let time = 0;
    const render = () => {
      // Extremely calm, composed time progression
      time += 0.015;

      ctx.clearRect(0, 0, width, height);
      
      const centerY = height * 0.45; // slightly above center to leave room for reflection
      const numLines = 3; // One main highlight, two ambient/accent lines

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        
        const speed = 1 + i * 0.3;
        const maxAmplitude = height * 0.2 * (1 - i * 0.2); 
        
        for (let x = 0; x < width; x++) {
          const nx = x / width; 
          
          // Gaussian envelope to taper edges smoothly
          const envelope = Math.exp(-Math.pow(nx - 0.5, 2) / 0.04);
          
          // Organic breathing modulation for calm feel
          const modulation = Math.sin(time * 0.5 + i) * 0.3 + 0.7; 
          
          // Combine multiple frequencies for a realistic, yet calm, voice pattern
          let yOffset = 0;
          yOffset += Math.sin(x * 0.01 + time * speed) * maxAmplitude;
          yOffset += Math.sin(x * 0.03 - time * speed * 1.5) * (maxAmplitude * 0.5);
          yOffset += Math.sin(x * 0.05 + time * speed * 0.8) * (maxAmplitude * 0.25);
          
          yOffset *= envelope * modulation;
          
          if (x === 0) ctx.moveTo(x, centerY + yOffset);
          else ctx.lineTo(x, centerY + yOffset);
        }

        // Styling: Core is white, outer waves are accent (#EAB308)
        ctx.lineWidth = i === 0 ? 2.5 : 1.5;
        ctx.strokeStyle = i === 0 ? 'rgba(250, 250, 250, 0.9)' : 'rgba(234, 179, 8, 0.6)';
        
        // Ambient glow
        ctx.shadowBlur = i === 0 ? 15 : 25;
        ctx.shadowColor = 'rgba(234, 179, 8, 0.8)';
        
        ctx.stroke();

        // --- Reflection ---
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const nx = x / width;
          const envelope = Math.exp(-Math.pow(nx - 0.5, 2) / 0.04);
          const modulation = Math.sin(time * 0.5 + i) * 0.3 + 0.7;
          
          let yOffset = 0;
          yOffset += Math.sin(x * 0.01 + time * speed) * maxAmplitude;
          yOffset += Math.sin(x * 0.03 - time * speed * 1.5) * (maxAmplitude * 0.5);
          yOffset += Math.sin(x * 0.05 + time * speed * 0.8) * (maxAmplitude * 0.25);
          
          yOffset *= envelope * modulation;
          
          // Reflection is mirrored and shifted down
          const reflectionY = centerY + (height * 0.25) - (yOffset * 0.5);
          
          if (x === 0) ctx.moveTo(x, reflectionY);
          else ctx.lineTo(x, reflectionY);
        }
        
        // Faded, non-glowing reflection styling
        ctx.lineWidth = i === 0 ? 1.5 : 1;
        ctx.strokeStyle = i === 0 ? 'rgba(250, 250, 250, 0.1)' : 'rgba(234, 179, 8, 0.05)';
        ctx.shadowBlur = 0;
        ctx.stroke();
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
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full absolute inset-0" />
    </div>
  );
}
