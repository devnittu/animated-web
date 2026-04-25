'use client';

import { useEffect, useRef } from 'react';

interface Constellation {
  stars: { x: number; y: number; r: number }[];
  connections: [number, number][];
}

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Define constellations
    const constellations: Constellation[] = [
      {
        stars: [
          { x: 0.1, y: 0.2, r: 1.5 }, { x: 0.15, y: 0.5, r: 2 },
          { x: 0.22, y: 0.35, r: 1 }, { x: 0.3, y: 0.15, r: 1.8 },
          { x: 0.25, y: 0.65, r: 1.2 },
        ],
        connections: [[0,2],[2,1],[1,4],[2,3]],
      },
      {
        stars: [
          { x: 0.5, y: 0.1, r: 2 }, { x: 0.58, y: 0.3, r: 1.5 },
          { x: 0.65, y: 0.15, r: 1 }, { x: 0.72, y: 0.35, r: 2 },
          { x: 0.63, y: 0.5, r: 1.2 }, { x: 0.55, y: 0.65, r: 1.5 },
        ],
        connections: [[0,1],[1,2],[2,3],[3,4],[4,5],[1,4]],
      },
      {
        stars: [
          { x: 0.8, y: 0.2, r: 1.8 }, { x: 0.88, y: 0.1, r: 1 },
          { x: 0.92, y: 0.35, r: 2 }, { x: 0.85, y: 0.55, r: 1.5 },
          { x: 0.75, y: 0.45, r: 1 },
        ],
        connections: [[0,1],[1,2],[2,3],[3,4],[4,0]],
      },
    ];

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      const w = canvas.width;
      const h = canvas.height;

      constellations.forEach((c, ci) => {
        // Draw connections
        c.connections.forEach(([a, b]) => {
          const sa = c.stars[a];
          const sb = c.stars[b];
          const alpha = 0.15 + 0.08 * Math.sin(t + ci);
          ctx.beginPath();
          ctx.moveTo(sa.x * w, sa.y * h);
          ctx.lineTo(sb.x * w, sb.y * h);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });

        // Draw stars
        c.stars.forEach((star, si) => {
          const alpha = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 1.5 + si + ci * 2));
          ctx.beginPath();
          ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(0, 212, 255, 0.6)';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
