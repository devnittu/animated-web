'use client';

import { motion } from 'framer-motion';

/**
 * Interstellar "Gargantua" black hole.
 *
 * Key visual features from the film:
 * 1. Pure black event horizon
 * 2. Bright white/warm accretion disk that wraps OVER the top
 *    (gravitational lensing bends disk light over the pole)
 * 3. Thin photon ring at the Schwarzschild radius
 * 4. Doppler brightening — left side hotter/brighter than right
 * 5. Outer gravitational shadow / lensing halo
 */

interface BlackHoleProps {
  size?: number; // diameter of event horizon in px
}

export default function BlackHole({ size = 200 }: BlackHoleProps) {
  const r = size / 2;
  const diskW = size * 3.2;
  const diskH = size * 0.52;

  return (
    <div
      className="relative will-transform"
      style={{
        width: size * 3.6,
        height: size * 3.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Outer lensing halo ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 2.8,
          height: size * 2.8,
          background:
            'radial-gradient(circle, transparent 38%, rgba(255,255,255,0.03) 55%, rgba(255,255,255,0.06) 62%, rgba(255,255,255,0.02) 72%, transparent 85%)',
        }}
      />

      {/* ── Photon ring (sharp bright ring) ── */}
      <motion.div
        className="absolute rounded-full will-transform"
        style={{
          width: size * 1.42,
          height: size * 1.42,
          border: '1.5px solid rgba(255,255,255,0.55)',
          boxShadow: '0 0 12px rgba(255,255,255,0.4), 0 0 28px rgba(255,255,255,0.15)',
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Bottom accretion disk (behind the black hole) ── */}
      <div
        className="absolute will-transform"
        style={{
          width: diskW,
          height: diskH,
          bottom: '28%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          animation: 'disk-spin 28s linear infinite',
          borderRadius: '50%',
          background: `
            radial-gradient(
              ellipse 90% 55% at 50% 50%,
              rgba(255,255,255,0.0) 28%,
              rgba(255,240,200,0.7) 38%,
              rgba(255,255,255,0.95) 44%,
              rgba(255,240,180,0.85) 50%,
              rgba(180,200,255,0.4) 62%,
              rgba(255,255,255,0.08) 76%,
              transparent 90%
            )
          `,
          filter: 'blur(2px)',
          opacity: 0.9,
        }}
      />

      {/* ── Bottom disk inner bright band (doppler left) ── */}
      <div
        className="absolute will-transform"
        style={{
          width: diskW * 0.75,
          height: diskH * 0.6,
          bottom: '30%',
          left: '50%',
          transform: 'translateX(-60%)',  /* shift left — Doppler bright side */
          zIndex: 2,
          borderRadius: '50%',
          background: `
            radial-gradient(
              ellipse 80% 60% at 40% 50%,
              rgba(255,255,255,0.0) 20%,
              rgba(255,255,255,0.9) 35%,
              rgba(255,248,220,0.7) 55%,
              transparent 80%
            )
          `,
          filter: 'blur(1.5px)',
        }}
      />

      {/* ── Event horizon (pure black) ── */}
      <div
        className="absolute rounded-full will-transform"
        style={{
          width: size,
          height: size,
          background: '#000000',
          boxShadow:
            '0 0 0 2px rgba(255,255,255,0.08), 0 0 30px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.8)',
          zIndex: 5,
          animation: 'bh-pulse 6s ease-in-out infinite',
        }}
      />

      {/* ── Top accretion disk (lensed over the pole — in FRONT of hole) ── */}
      {/*    This is the key Interstellar visual: light bends over the top  */}
      <div
        className="absolute will-transform"
        style={{
          width: diskW,
          height: diskH,
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%) scaleY(-0.45)',
          zIndex: 6,
          animation: 'disk-spin-reverse 28s linear infinite',
          borderRadius: '50%',
          background: `
            radial-gradient(
              ellipse 90% 55% at 50% 50%,
              rgba(255,255,255,0.0) 28%,
              rgba(255,240,200,0.6) 38%,
              rgba(255,255,255,0.88) 44%,
              rgba(255,240,180,0.7) 52%,
              rgba(180,200,255,0.35) 64%,
              rgba(255,255,255,0.06) 76%,
              transparent 90%
            )
          `,
          filter: 'blur(2.5px)',
        }}
      />

      {/* ── Top disk doppler hot spot ── */}
      <div
        className="absolute will-transform"
        style={{
          width: diskW * 0.65,
          height: diskH * 0.5,
          top: '22%',
          left: '50%',
          transform: 'translateX(-58%) scaleY(-0.5)',
          zIndex: 7,
          borderRadius: '50%',
          background: `
            radial-gradient(
              ellipse 80% 60% at 40% 50%,
              rgba(255,255,255,0.0) 15%,
              rgba(255,255,255,0.85) 32%,
              rgba(255,248,220,0.5) 55%,
              transparent 80%
            )
          `,
          filter: 'blur(1.5px)',
        }}
      />

      {/* ── Gravitational shadow ring (Einstein ring simulation) ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 1.15,
          height: size * 1.15,
          background:
            'radial-gradient(circle, transparent 82%, rgba(255,255,255,0.12) 90%, transparent 100%)',
          zIndex: 8,
        }}
      />
    </div>
  );
}
