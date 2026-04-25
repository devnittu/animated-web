'use client';

import { motion } from 'framer-motion';

// ── Squid Game geometric shapes ──────────────────────────────

function Shape({ type, delay }: { type: 'circle' | 'triangle' | 'square'; delay: number }) {
  const initRotate = { circle: -60, triangle: 25, square: 45 }[type];
  return (
    <motion.div
      aria-hidden
      style={{ position: 'absolute', inset: '-24%', zIndex: 0, pointerEvents: 'none' }}
      initial={{ scale: 0, opacity: 0, rotate: initRotate }}
      animate={{ scale: 1, opacity: 0.45, rotate: 0 }}
      transition={{ delay, duration: 0.72, ease: [0.2, 0, 0, 1] }}
    >
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        {type === 'circle'   && <circle  cx="50" cy="50" r="44"        stroke="#F0B429" strokeWidth="2.5" fill="none" />}
        {type === 'triangle' && <polygon points="50,8 94,88 6,88"       stroke="#F0B429" strokeWidth="2.5" fill="none" strokeLinejoin="round" />}
        {type === 'square'   && <rect    x="7"  y="7"  width="86" height="86" stroke="#F0B429" strokeWidth="2.5" fill="none" rx="2" />}
      </svg>
    </motion.div>
  );
}

// ── Config ───────────────────────────────────────────────────

interface CharCfg { accent: boolean; shape?: 'circle' | 'triangle' | 'square' }

// "EVENT" indices
const L1: Record<number, CharCfg> = {
  0: { accent: true,  shape: 'circle'   }, // E
  3: { accent: true                     }, // N
};
// "HORIZON" indices
const L2: Record<number, CharCfg> = {
  0: { accent: true,  shape: 'triangle' }, // H
  4: { accent: true,  shape: 'square'   }, // Z
  6: { accent: true                     }, // N
};

const STAGGER   = 0.068;
const L1_BASE   = 0.25;   // first line starts at 0.25s
const L2_BASE   = 0.85;   // second line starts after first finishes

function charDelay(base: number, i: number) { return base + i * STAGGER; }

// Total duration = L2_BASE + 7 chars × STAGGER = ~1.33s → scan-line at 1.5s
const SCAN_DELAY = 1.52;

// ── Per-character reveal ─────────────────────────────────────

function AnimChar({
  char, accent, shape, delay,
}: { char: string; accent: boolean; shape?: CharCfg['shape']; delay: number }) {
  const GOLD = '#F0B429';
  return (
    <motion.span
      style={{ display: 'inline-block', position: 'relative', willChange: 'transform, opacity' }}
      initial={{ opacity: 0, y: 26, scale: 0.84, filter: 'blur(7px)' }}
      animate={{ opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)' }}
      transition={{
        opacity : { duration: 0.28, delay, ease: [0.2, 0, 0, 1] },
        y       : { type: 'spring', stiffness: 220, damping: 18, delay },
        scale   : { duration: 0.38, delay, ease: [0.2, 0, 0, 1] },
        filter  : { duration: 0.22, delay },
      }}
    >
      {/* Geometric shape behind char */}
      {shape && <Shape type={shape} delay={delay + 0.14} />}

      {/* Glow pulse layer (accent only) — absolute overlay */}
      {accent && (
        <motion.span
          aria-hidden
          style={{ position: 'absolute', inset: 0, color: GOLD, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          animate={{
            textShadow: [
              '0 0 0px rgba(240,180,41,0)',
              '0 0 32px rgba(240,180,41,1), 0 0 64px rgba(240,180,41,0.5)',
              '0 0 14px rgba(240,180,41,0.55)',
              '0 0 8px rgba(240,180,41,0.3)',
            ],
          }}
          transition={{ delay: delay + 0.32, duration: 1.1, ease: 'easeOut' }}
        >
          {char}
        </motion.span>
      )}

      {/* Actual character */}
      <span
        style={{
          position: 'relative', zIndex: 1,
          color: accent ? GOLD : '#FFFFFF',
        }}
      >
        {char}
      </span>
    </motion.span>
  );
}

// ── Scan-line ────────────────────────────────────────────────

function ScanLine() {
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute', top: 0, bottom: 0,
        width: 3, zIndex: 30, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.04) 80%, transparent 100%)',
        boxShadow: '0 0 18px 4px rgba(255,255,255,0.35)',
      }}
      initial={{ left: '-2%', opacity: 0 }}
      animate={{ left: '102%', opacity: [0, 1, 1, 0] }}
      transition={{
        delay: SCAN_DELAY,
        duration: 0.58,
        ease: [0.4, 0, 0.6, 1],
        opacity: { times: [0, 0.05, 0.92, 1] },
      }}
    />
  );
}

// ── Main Component ───────────────────────────────────────────

interface HeroTitleProps {
  label?: string;
}

export default function HeroTitle({ label = 'Deep Space Program · Mission Active' }: HeroTitleProps) {
  const L1_CHARS = 'EVENT'.split('');
  const L2_CHARS = 'HORIZON'.split('');

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>

      {/* Label */}
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
      >
        <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.22)' }} />
        <span style={{
          fontFamily: "var(--font-orbitron), 'Orbitron', monospace",
          fontSize: '0.56rem', letterSpacing: '0.46em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
        }}>
          {label}
        </span>
        <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.22)' }} />
      </motion.div>

      {/* Headline container (scan-line lives here) */}
      <h1 style={{ margin: 0, padding: 0, position: 'relative' }}>
        <ScanLine />

        {/* LINE 1 — EVENT */}
        <div style={{
          display: 'block',
          textAlign: 'center',
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
          fontSize: 'clamp(4.2rem, 13vw, 10.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          marginBottom: '0.15rem',
        }}>
          {L1_CHARS.map((ch, i) => (
            <AnimChar
              key={i}
              char={ch}
              accent={!!L1[i]?.accent}
              shape={L1[i]?.shape}
              delay={charDelay(L1_BASE, i)}
            />
          ))}
        </div>

        {/* LINE 2 — HORIZON (outline ghost) */}
        <div style={{
          display: 'block',
          textAlign: 'center',
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
          fontSize: 'clamp(2.5rem, 7.5vw, 6.2rem)',
          fontWeight: 300,
          letterSpacing: '0.2em',
          lineHeight: 1,
          WebkitTextStroke: '1px rgba(255,255,255,0.3)',
          color: 'transparent',
        }}>
          {L2_CHARS.map((ch, i) => (
            <AnimChar
              key={i}
              char={ch}
              accent={!!L2[i]?.accent}
              shape={L2[i]?.shape}
              delay={charDelay(L2_BASE, i)}
            />
          ))}
        </div>
      </h1>

      {/* Divider — fades in after scan-line */}
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: SCAN_DELAY + 0.4, duration: 0.8 }}
      >
        <div style={{ width: 52, height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2))' }} />
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(240,180,41,0.7)' }} />
        <div style={{ width: 52, height: 1, background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.2))' }} />
      </motion.div>
    </div>
  );
}
