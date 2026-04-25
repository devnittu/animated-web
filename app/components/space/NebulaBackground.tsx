'use client';

import { motion } from 'framer-motion';

interface NebulaBackgroundProps {
  variant?: 'hero' | 'about' | 'projects' | 'skills';
}

const configs = {
  hero: [
    { color: 'rgba(155,89,255,0.15)', size: 900, x: -20, y: -20, blur: 120 },
    { color: 'rgba(0,212,255,0.1)', size: 700, x: 60, y: 40, blur: 100 },
    { color: 'rgba(255,51,102,0.06)', size: 500, x: 30, y: 70, blur: 80 },
  ],
  about: [
    { color: 'rgba(0,212,255,0.08)', size: 600, x: -10, y: 20, blur: 100 },
    { color: 'rgba(155,89,255,0.1)', size: 500, x: 70, y: 60, blur: 90 },
  ],
  projects: [
    { color: 'rgba(155,89,255,0.12)', size: 700, x: 80, y: 10, blur: 110 },
    { color: 'rgba(0,212,255,0.07)', size: 500, x: 10, y: 60, blur: 90 },
  ],
  skills: [
    { color: 'rgba(255,215,0,0.06)', size: 600, x: 40, y: 30, blur: 100 },
    { color: 'rgba(155,89,255,0.1)', size: 700, x: -10, y: 50, blur: 110 },
    { color: 'rgba(0,212,255,0.08)', size: 500, x: 70, y: 20, blur: 90 },
  ],
};

export default function NebulaBackground({ variant = 'hero' }: NebulaBackgroundProps) {
  const blobs = configs[variant];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: `blur(${blob.blur}px)`,
          }}
          animate={{
            scale: [1, 1.15, 0.95, 1],
            opacity: [0.7, 1, 0.8, 0.7],
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 3,
          }}
        />
      ))}
    </div>
  );
}
