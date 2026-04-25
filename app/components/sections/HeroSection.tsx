'use client';

import { motion, useMotionValue, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import BlackHole from '../space/BlackHole';
import Satellite from '../space/Satellite';
import ShootingStar from '../space/ShootingStar';
import CosmicDust from '../space/CosmicDust';
import GlassPillButton from '../ui/GlassPillButton';

export default function HeroSection() {
  const { scrollY } = useScroll();
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

  const sats = [
    { orbitRadius: 195, speed: 22, initialAngle: 0, type: 'classic' as const },
    { orbitRadius: 278, speed: 35, initialAngle: 110, type: 'dish' as const },
    { orbitRadius: 358, speed: 54, initialAngle: 215, type: 'solar' as const },
    { orbitRadius: 428, speed: 78, initialAngle: 320, type: 'cube' as const },
  ];

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
        {/* Black hole — cursor parallax */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: '46%',
            x: bhX,
            y: bhY,
            transform: 'translate(-50%, -50%)',
            zIndex: 11,
          }}
        >
          <div style={{ position: 'relative', width: 860, height: 860 }}>
            {sats.map((s, i) => (
              <div key={i} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Satellite {...s} />
              </div>
            ))}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BlackHole size={175} />
            </div>
          </div>
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
          {/* ── Dossier stamp label ── */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 1.2 }}
          >
            <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.22)' }} />
            <span style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.42)',
            }}>
              Deep Space Program · Mission Active
            </span>
            <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.22)' }} />
          </motion.div>

          {/* ── Glow behind headline ── */}
          <div style={{
            position: 'absolute',
            width: 700, height: 260,
            background: 'radial-gradient(ellipse, rgba(100,140,255,0.07) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            top: '38%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />

          {/* ── Headline ── */}
          <h1 style={{ margin: 0, padding: 0, marginBottom: '0.5rem' }}>
            {/* Lead line — light, smaller */}
            <span style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.95rem, 2.2vw, 1.5rem)', fontWeight: 300, letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: '0.6rem' }}>
              Beyond the
            </span>

            {/* Hero word — massive gradient */}
            <span style={{
              display: 'block',
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(3.8rem, 11vw, 9.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 0.9,
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 40%, rgba(180,210,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.3rem',
            }}>
              EVENT
            </span>

            {/* Ghost word — outline treatment */}
            <span style={{
              display: 'block',
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(2.6rem, 7.5vw, 6.5rem)',
              fontWeight: 400,
              letterSpacing: '0.18em',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.28)',
            }}>
              HORIZON
            </span>
          </h1>

          {/* ── Divider ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
            <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2))' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ width: 60, height: 1, background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.2))' }} />
          </div>

          {/* ── Subtitle ── */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.4)',
            maxWidth: '460px',
            marginBottom: '3rem',
            fontStyle: 'italic',
            letterSpacing: '0.01em',
          }}>
            Where gravity bends light, time dilates, and the impossible becomes reality.
          </p>

          {/* ── Buttons ── */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
            <GlassPillButton variant="primary" id="hero-explore-btn">Explore Universe</GlassPillButton>
            <GlassPillButton variant="ghost" id="hero-missions-btn">View Missions</GlassPillButton>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
            zIndex: 20,
            opacity: useTransform(scrollY, [0, 120], [1, 0]),
          }}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 42, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
