'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden card-neon ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      whileHover={hover ? { scale: 1.02, borderColor: 'rgba(255,255,255,0.18)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' } : {}}
      transition={{ duration: 0.25 }}
    >
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)' }} />
      {children}
    </motion.div>
  );
}
