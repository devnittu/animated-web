'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  id?: string;
}

export default function GlassPillButton({ children, onClick, variant = 'primary', id }: Props) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const ref = useRef<HTMLButtonElement>(null);
  let nextId = 0;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = nextId++;
      setRipples(r => [...r, { id, x, y }]);
      setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700);
    }
    onClick?.();
  };

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      ref={ref}
      id={id}
      onClick={handleClick}
      className="relative overflow-hidden inline-flex items-center justify-center"
      style={{
        borderRadius: '9999px',
        padding: '14px 36px',
        fontFamily: "'Orbitron', monospace",
        fontSize: '0.68rem',
        fontWeight: 500,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        color: isPrimary ? '#000' : 'rgba(255,255,255,0.8)',
        background: isPrimary
          ? '#ffffff'
          : 'rgba(255,255,255,0.06)',
        border: isPrimary
          ? '1px solid rgba(255,255,255,0.9)'
          : '1px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(20px)',
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: isPrimary
          ? '0 0 30px rgba(255,255,255,0.35), 0 0 60px rgba(255,255,255,0.12)'
          : '0 0 20px rgba(255,255,255,0.1)',
        background: isPrimary ? '#ffffff' : 'rgba(255,255,255,0.1)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22 }}
    >
      {/* Ripple effects */}
      {ripples.map(rp => (
        <span
          key={rp.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: rp.x, top: rp.y,
            width: 10, height: 10,
            marginLeft: -5, marginTop: -5,
            background: isPrimary ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.3)',
            animation: 'ripple 0.65s ease-out forwards',
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
