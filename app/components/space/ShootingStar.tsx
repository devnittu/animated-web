'use client';

import { useEffect, useState } from 'react';

interface Star { id: number; top: number; left: number; dur: number; angle: number; delay: number; }

export default function ShootingStar() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    let nextId = 0;
    const spawn = () => {
      const s: Star = { id: nextId++, top: Math.random() * 55, left: Math.random() * 75 + 10, dur: Math.random() * 1.2 + 0.7, angle: Math.random() * 20 + 12, delay: 0 };
      setStars(p => [...p, s]);
      setTimeout(() => setStars(p => p.filter(x => x.id !== s.id)), (s.dur + 0.5) * 1000);
      setTimeout(spawn, Math.random() * 4500 + 2500);
    };
    const t = setTimeout(spawn, Math.random() * 3000 + 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            transform: `rotate(${s.angle}deg)`,
            animation: `shooting ${s.dur}s ease-in forwards`,
          }}
        >
          <div style={{
            width: 160,
            height: 1.5,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.7), rgba(255,255,255,0.95))',
            boxShadow: '0 0 4px rgba(255,255,255,0.5)',
          }} />
        </div>
      ))}
    </div>
  );
}
