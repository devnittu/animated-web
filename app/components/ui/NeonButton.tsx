'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

const sizes = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-2.5 text-xs', lg: 'px-9 py-3.5 text-xs' };

export default function NeonButton({ children, onClick, href, variant = 'primary', size = 'md', id }: NeonButtonProps) {
  const isPrimary = variant === 'primary';

  const btn = (
    <motion.button
      id={id}
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      whileHover={{
        scale: 1.04,
        boxShadow: isPrimary
          ? '0 0 24px rgba(255,255,255,0.25), 0 0 48px rgba(255,255,255,0.08)'
          : '0 0 16px rgba(255,255,255,0.12)',
      }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center tracking-[0.18em] uppercase rounded-xl overflow-hidden cursor-pointer ${sizes[size]}`}
      style={{
        fontFamily: "'Orbitron', monospace",
        color: isPrimary ? '#000000' : 'rgba(255,255,255,0.75)',
        background: isPrimary ? '#ffffff' : 'transparent',
        border: isPrimary ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.22)',
        fontWeight: 700,
      }}
    >
      {/* Corner accents for outline only */}
      {!isPrimary && (
        <>
          <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white opacity-30" />
          <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white opacity-30" />
          <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white opacity-30" />
          <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white opacity-30" />
        </>
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );

  return href ? <a href={href}>{btn}</a> : btn;
}
