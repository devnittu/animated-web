'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const rX = useSpring(useTransform(mY, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 28 });
  const rY = useSpring(useTransform(mX, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 28 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mX.set((e.clientX - rect.left) / rect.width - 0.5);
    mY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { mX.set(0); mY.set(0); };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl card-neon ${className}`}
      style={{
        rotateX: rX, rotateY: rY,
        transformStyle: 'preserve-3d',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
      transition={{ duration: 0.25 }}
    >
      <div style={{ transform: 'translateZ(16px)' }}>{children}</div>
    </motion.div>
  );
}
