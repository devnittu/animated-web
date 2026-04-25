'use client';

import { motion } from 'framer-motion';

interface AccretionDiskProps {
  size?: number;
}

export default function AccretionDisk({ size = 300 }: AccretionDiskProps) {
  return (
    <div
      className="absolute"
      style={{
        width: size * 2.4,
        height: size * 2.4,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'transparent',
          border: '2px solid transparent',
          boxShadow: `0 0 40px 15px rgba(155, 89, 255, 0.3),
                      0 0 80px 30px rgba(0, 212, 255, 0.15),
                      inset 0 0 40px rgba(155, 89, 255, 0.2)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Hot inner accretion band */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '12%',
          background:
            'conic-gradient(from 0deg, transparent 0%, rgba(255,215,0,0.6) 15%, rgba(255,100,0,0.8) 30%, rgba(255,215,0,0.4) 45%, transparent 60%, rgba(0,212,255,0.5) 75%, rgba(155,89,255,0.6) 90%, transparent 100%)',
          filter: 'blur(6px)',
          mixBlendMode: 'screen',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Hot plasma band 2 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '18%',
          background:
            'conic-gradient(from 180deg, transparent 0%, rgba(0,212,255,0.7) 20%, transparent 40%, rgba(255,51,102,0.6) 70%, transparent 100%)',
          filter: 'blur(4px)',
          mixBlendMode: 'screen',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Lensing distortion ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '5%',
          border: '1px solid rgba(0,212,255,0.2)',
          boxShadow: '0 0 20px rgba(0,212,255,0.3)',
          filter: 'blur(1px)',
        }}
        animate={{ scale: [1, 1.02, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
