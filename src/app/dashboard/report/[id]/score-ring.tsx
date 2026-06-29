'use client';

import { useEffect, useRef, useState } from 'react';

interface ScoreRingProps {
  targetScore: number;
}

export default function ScoreRing({ targetScore }: ScoreRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const radius = 40;
    const circumference = radius * 2 * Math.PI;

    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;

      // Animate after a short delay
      setTimeout(() => {
        if (circleRef.current) {
          const offset = circumference - (targetScore / 100) * circumference;
          circleRef.current.style.strokeDashoffset = `${offset}`;
        }

        // Animate the text counter
        let currentScore = 0;
        const duration = 1000;
        const interval = 20;
        const step = targetScore / (duration / interval);

        const counter = setInterval(() => {
          currentScore += step;
          if (currentScore >= targetScore) {
            setDisplayScore(targetScore);
            clearInterval(counter);
          } else {
            setDisplayScore(Math.floor(currentScore));
          }
        }, interval);

        return () => clearInterval(counter);
      }, 300);
    }
  }, [targetScore]);

  return (
    <div className="relative w-48 h-48 mb-4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-surface-container-high stroke-current"
          cx="50"
          cy="50"
          fill="transparent"
          r="40"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          className="text-primary stroke-current progress-ring__circle"
          cx="50"
          cy="50"
          fill="transparent"
          r="40"
          strokeDasharray="251.2"
          strokeDashoffset="251.2"
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display-lg text-[40px] leading-none text-on-surface font-bold">{displayScore}</span>
        <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">/ 100</span>
      </div>
    </div>
  );
}
