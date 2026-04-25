'use client';

import { useEffect, useRef } from 'react';

/**
 * Pure canvas starfield — no Framer Motion, no React state per star.
 * ~200 stars, twinkling via sine wave, runs entirely in rAF loop.
 * GPU-composited via canvas 2D.
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setup();

    const onResize = () => setup();
    window.addEventListener('resize', onResize);

    // Precompute stars
    const N = 220;
    const stars = Float32Array.from({ length: N * 5 }, (_, i) => {
      const col = i % 5;
      const row = Math.floor(i / 5);
      if (col === 0) return Math.random(); // x (0..1)
      if (col === 1) return Math.random(); // y (0..1)
      if (col === 2) return Math.random() * 1.4 + 0.3; // radius
      if (col === 3) return Math.random() * Math.PI * 2; // phase
      return Math.random() * 0.015 + 0.004; // speed
    });

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      const W = canvas.width;
      const H = canvas.height;

      for (let i = 0; i < N; i++) {
        const base = i * 5;
        const x = stars[base] * W;
        const y = stars[base + 1] * H;
        const radius = stars[base + 2];
        const phase = stars[base + 3];
        const speed = stars[base + 4];

        const alpha = 0.15 + 0.75 * (0.5 + 0.5 * Math.sin(t * speed + phase));

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        // Brighter stars get a subtle blue-white, dimmer ones are warm white
        ctx.fillStyle = radius > 1.2
          ? `rgba(220, 235, 255, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;

        if (radius > 1.3) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.5})`;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.9 }}
    />
  );
}
