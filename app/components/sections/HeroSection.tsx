'use client';

import { motion, useMotionValue, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import ShootingStar from '../space/ShootingStar';
import CosmicDust from '../space/CosmicDust';
import CosmicOrrery from '../space/CosmicOrrery';
import HeroTitle from '../ui/HeroTitle';

export default function HeroSection() {
  const { scrollY, scrollYProgress } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const yShift = useTransform(scrollY, [0, 600], [0, -70]);

  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const spX = useSpring(mX, { stiffness: 28, damping: 14 });
  const spY = useSpring(mY, { stiffness: 28, damping: 14 });
  const bhX = useTransform(spX, v => v * -20);
  const bhY = useTransform(spY, v => v * -20);
  const txX = useTransform(spX, v => v * 6);
  const txY = useTransform(spY, v => v * 6);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mX.set(e.clientX / window.innerWidth - 0.5);
      mY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, [mX, mY]);



  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#020408',
      }}
    >
      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.55,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <source src="/space-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Gradient overlays ── */}
      {/* Bottom fade for text readability */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(2,4,8,0.15) 0%, rgba(2,4,8,0.25) 35%, rgba(2,4,8,0.65) 70%, rgba(2,4,8,1) 100%)' }} />
      {/* Radial vignette */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'radial-gradient(ellipse 75% 65% at 50% 45%, transparent 0%, rgba(2,4,8,0.5) 100%)' }} />

      {/* ── Shooting stars & dust on top of video ── */}
      <ShootingStar />
      <CosmicDust />

      {/* ── Slow zoom entry ── */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity,
          y: yShift,
        }}
        initial={{ scale: 1.07 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.8, ease: [0.0, 0.0, 0.18, 1] }}
      >
        {/* Orrery — cursor parallax */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%', top: '50%',
            x: bhX, y: bhY,
            transform: 'translate(-50%, -50%)',
            zIndex: 11,
          }}
        >
          <CosmicOrrery />
        </motion.div>

        {/* Hero text */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 2rem',
            x: txX,
            y: txY,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ── Cinematic HeroTitle (Squid Game style reveal) ── */}
          <HeroTitle />

          {/* ── Subtitle ── */}
          <motion.p
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: 'clamp(0.88rem, 1.8vw, 1.05rem)',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'rgba(255,255,255,0.38)',
              maxWidth: '460px',
              marginTop: '2rem',
              marginBottom: '2.5rem',
              fontStyle: 'italic',
              letterSpacing: '0.01em',
              textAlign: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 1 }}
          >
            Where gravity bends light, time dilates, and the impossible becomes reality.
          </motion.p>

        </motion.div>

        {/* ── Rocket scroll indicator ── */}
        <motion.div
          style={{
            position: 'fixed',           // fixed so it stays visible while scrolling
            bottom: '2.2rem',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            pointerEvents: 'none',
            opacity: useTransform(scrollYProgress, [0, 0.06, 0.88, 1], [0, 1, 1, 0]),
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          {/* SCROLL label — above rocket */}
          <motion.span
            style={{
              fontFamily: "var(--font-orbitron), 'Orbitron', monospace",
              fontSize: '0.46rem',
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: 'rgba(240,180,41,0.5)',
              marginBottom: '0.5rem',
              display: 'block',
              textAlign: 'center',
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Scroll
          </motion.span>

          {/* Rocket wrapper — floats DOWN to hint scroll direction */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Orbit pulse ring */}
            <motion.div
              style={{
                width: 52, height: 52,
                borderRadius: '50%',
                border: '1px solid rgba(240,180,41,0.2)',
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -56%)',
                pointerEvents: 'none',
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Rocket SVG — pointing down */}
            <svg width="22" height="40" viewBox="0 0 26 46" fill="none" style={{ transform: 'rotate(180deg)' }}>
              <path d="M13 2 C8 2 4 8 4 16 L4 30 L13 34 L22 30 L22 16 C22 8 18 2 13 2Z" fill="rgba(255,255,255,0.88)" />
              <path d="M13 0 L8 10 L18 10Z" fill="rgba(240,180,41,0.92)" />
              <circle cx="13" cy="18" r="3.2" fill="rgba(2,4,8,0.75)" stroke="rgba(240,180,41,0.72)" strokeWidth="1" />
              <path d="M4 26 L0 34 L4 32Z" fill="rgba(255,255,255,0.55)" />
              <path d="M22 26 L26 34 L22 32Z" fill="rgba(255,255,255,0.55)" />
              <rect x="10" y="30" width="6" height="4" rx="1" fill="rgba(180,180,180,0.6)" />
            </svg>

            {/* Exhaust flames — now at TOP since rocket is flipped */}
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'flex-end', gap: 1 }}>
              <motion.div
                style={{ width: 5, borderRadius: '4px 4px 0 0', background: 'linear-gradient(to top, rgba(255,255,255,0.95), rgba(240,180,41,0.9), rgba(255,100,20,0.5), transparent)', transformOrigin: 'bottom' }}
                animate={{ height: [13, 20, 11, 17, 13], scaleX: [1, 0.8, 1.1, 0.9, 1] }}
                transition={{ duration: 0.22, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                style={{ position: 'absolute', bottom: 0, left: -3, width: 3, borderRadius: '4px 4px 0 0', background: 'linear-gradient(to top, rgba(240,180,41,0.7), rgba(255,80,0,0.4), transparent)', transformOrigin: 'bottom' }}
                animate={{ height: [7, 13, 6, 10, 7], opacity: [0.7, 1, 0.5, 0.8, 0.7] }}
                transition={{ duration: 0.28, repeat: Infinity, ease: 'linear', delay: 0.05 }}
              />
              <motion.div
                style={{ position: 'absolute', bottom: 0, right: -3, width: 3, borderRadius: '4px 4px 0 0', background: 'linear-gradient(to top, rgba(240,180,41,0.7), rgba(255,80,0,0.4), transparent)', transformOrigin: 'bottom' }}
                animate={{ height: [8, 12, 7, 14, 8], opacity: [0.6, 0.9, 0.7, 1, 0.6] }}
                transition={{ duration: 0.25, repeat: Infinity, ease: 'linear', delay: 0.09 }}
              />
            </div>

            {/* Trail below rocket (direction of travel) */}
            <motion.div
              style={{ width: 1, background: 'linear-gradient(to bottom, rgba(240,180,41,0.45), rgba(255,255,255,0.1), transparent)' }}
              animate={{ height: [24, 36, 24], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
