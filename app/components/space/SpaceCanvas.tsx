'use client';

import { useEffect, useRef } from 'react';

/**
 * Cinematic deep-space canvas — replaces a looping video.
 *
 * Three star layers drift at different speeds (parallax depth).
 * Slow-moving nebula glow blobs shift opacity and position.
 * Occasional bright lens flares / star spikes.
 * Colors: near-black background, cold-blue and warm-white stars.
 */
export default function SpaceCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Star layers ──────────────────────────────────────────────────
    type StarLayer = {
      x: Float32Array; y: Float32Array;
      r: Float32Array; a: Float32Array;   // radius, alpha
      ph: Float32Array; sp: Float32Array; // twinkle phase, speed
      vx: number;                          // drift velocity
      color: string;
    };

    const makeLayer = (n: number, vx: number, maxR: number, color: string): StarLayer => ({
      x:  Float32Array.from({ length: n }, () => Math.random()),
      y:  Float32Array.from({ length: n }, () => Math.random()),
      r:  Float32Array.from({ length: n }, () => Math.random() * maxR + 0.2),
      a:  Float32Array.from({ length: n }, () => Math.random()),
      ph: Float32Array.from({ length: n }, () => Math.random() * Math.PI * 2),
      sp: Float32Array.from({ length: n }, () => Math.random() * 0.008 + 0.003),
      vx, color,
    });

    const layers: StarLayer[] = [
      makeLayer(380, 0.00006, 0.8,  'rgba(200,215,255,'),   // far — cold blue-white
      makeLayer(180, 0.00015, 1.4,  'rgba(255,250,240,'),   // mid — warm white
      makeLayer(60,  0.00035, 2.0,  'rgba(255,255,255,'),   // near — pure white
    ];

    // ── Nebula blobs ────────────────────────────────────────────────
    type Blob = { cx: number; cy: number; r: number; a: number; da: number; color: string };
    const blobs: Blob[] = [
      { cx: 0.20, cy: 0.30, r: 0.45, a: 0.0, da: 0.0003, color: '30,50,100' },
      { cx: 0.70, cy: 0.60, r: 0.40, a: 0.0, da: 0.0004, color: '15,30,80'  },
      { cx: 0.50, cy: 0.15, r: 0.35, a: 0.0, da: 0.0002, color: '40,40,90'  },
      { cx: 0.85, cy: 0.80, r: 0.30, a: 0.0, da: 0.0005, color: '20,20,60'  },
    ];
    blobs.forEach((b, i) => { b.a = (i % 2 === 0 ? 0 : 0.04); });

    let t = 0;
    let animId: number;

    const draw = () => {
      t += 1;
      const W = canvas.width;
      const H = canvas.height;

      // Background
      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, W, H);

      // Nebula blobs
      blobs.forEach(b => {
        b.a = 0.03 + 0.025 * (0.5 + 0.5 * Math.sin(t * b.da * 60));
        const grd = ctx.createRadialGradient(b.cx*W, b.cy*H, 0, b.cx*W, b.cy*H, b.r*W);
        grd.addColorStop(0,   `rgba(${b.color},${b.a})`);
        grd.addColorStop(0.5, `rgba(${b.color},${b.a * 0.4})`);
        grd.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      });

      // Star layers
      layers.forEach(layer => {
        for (let i = 0; i < layer.x.length; i++) {
          // Drift
          layer.x[i] -= layer.vx;
          if (layer.x[i] < 0) layer.x[i] = 1;

          const alpha = 0.15 + 0.8 * (0.5 + 0.5 * Math.sin(t * layer.sp[i] + layer.ph[i]));
          const x = layer.x[i] * W;
          const y = layer.y[i] * H;
          const r = layer.r[i];

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `${layer.color}${(alpha * 0.95).toFixed(2)})`;
          ctx.shadowBlur = r > 1.4 ? 8 : 0;
          ctx.shadowColor = layer.color + '0.5)';
          ctx.fill();
        }
      });
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none will-transform"
      style={{ zIndex: 0, opacity: 0.95 }}
    />
  );
}
