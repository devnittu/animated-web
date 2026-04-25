'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  dur: number;
  del: number;
  dx: number;
  dy: number;
}

/**
 * Reduced to 20 particles using CSS animations — zero Framer Motion overhead.
 * Each particle is a plain div driven by a keyframe animation defined inline.
 */
export default function CosmicDust() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        dur: Math.random() * 18 + 12,
        del: -(Math.random() * 20),
        dx: (Math.random() - 0.5) * 60,
        dy: (Math.random() - 0.5) * 50,
      }))
    );
  }, []);

  return (
    <>
      <style>{`
        @keyframes dust-float {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0.15; }
          33%  { transform: translate(var(--dx), calc(var(--dy) * 0.5)) scale(1.3); opacity: 0.45; }
          66%  { transform: translate(calc(var(--dx) * 0.3), var(--dy)) scale(0.8); opacity: 0.2; }
          100% { transform: translate(0, 0) scale(1);   opacity: 0.15; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full will-transform"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: 'rgba(255, 255, 255, 0.5)',
              boxShadow: '0 0 4px rgba(255,255,255,0.4)',
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              animation: `dust-float ${p.dur}s ease-in-out ${p.del}s infinite`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
