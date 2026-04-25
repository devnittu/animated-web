'use client';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

// ── Hero variant rings (3 rings, visible size) ─────────────────────────────
const HERO_RINGS = [
  { size: 180, tiltX: 72, rotZ: 0,   dur: 7,  dotColor: '#F0B429', dotSz: 9, opacity: 0.55, cw: true  },
  { size: 300, tiltX: 62, rotZ: 55,  dur: 13, dotColor: '#ffffff', dotSz: 6, opacity: 0.3,  cw: false },
  { size: 420, tiltX: 78, rotZ: -22, dur: 20, dotColor: '#F0B429', dotSz: 5, opacity: 0.35, cw: true  },
];

// ── Background variant rings (5 rings, large) ──────────────────────────────
const BG_RINGS = [
  { size: 300,  tiltX: 72, rotZ: 0,   dur: 8,  dotColor: '#F0B429', dotSz: 10, opacity: 0.4,  cw: true  },
  { size: 480,  tiltX: 62, rotZ: 50,  dur: 14, dotColor: '#ffffff', dotSz: 7,  opacity: 0.2,  cw: false },
  { size: 660,  tiltX: 80, rotZ: -20, dur: 22, dotColor: '#F0B429', dotSz: 6,  opacity: 0.28, cw: true  },
  { size: 840,  tiltX: 55, rotZ: 85,  dur: 32, dotColor: '#ffffff', dotSz: 4,  opacity: 0.13, cw: false },
  { size: 1020, tiltX: 75, rotZ: -40, dur: 48, dotColor: '#F0B429', dotSz: 3,  opacity: 0.1,  cw: true  },
];

// ── Shared ring renderer ───────────────────────────────────────────────────
function OrreryRings({ rings, containerSize, orbSz, photonSz, einsteinSz }: {
  rings: typeof HERO_RINGS;
  containerSize: number;
  orbSz: number;
  photonSz: number;
  einsteinSz: number;
}) {
  return (
    <motion.div
      style={{ position: 'relative', width: containerSize, height: containerSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 2.2, ease: [0.2, 0, 0, 1] }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'absolute', width: containerSize * 0.64, height: containerSize * 0.64, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,180,41,0.07) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      {rings.map((r, i) => (
        <div key={i} style={{ position: 'absolute', width: r.size, height: r.size, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `perspective(500px) rotateX(${r.tiltX}deg) rotateZ(${r.rotZ}deg)` }}>
          <motion.div
            style={{ position: 'relative', width: r.size, height: r.size, borderRadius: '50%', border: `1px solid rgba(${r.dotColor === '#F0B429' ? '240,180,41' : '255,255,255'},${r.opacity})` }}
            animate={{ rotate: r.cw ? 360 : -360 }}
            transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}
          >
            <div style={{ position: 'absolute', top: -r.dotSz / 2, left: '50%', transform: 'translateX(-50%)', width: r.dotSz, height: r.dotSz, borderRadius: '50%', background: r.dotColor, boxShadow: `0 0 ${r.dotSz * 3}px ${r.dotColor}, 0 0 ${r.dotSz * 6}px ${r.dotColor}55` }} />
            {i % 2 === 0 && (
              <div style={{ position: 'absolute', bottom: -Math.max(2, r.dotSz / 2 - 1), left: '50%', transform: 'translateX(-50%)', width: Math.max(2, r.dotSz - 2), height: Math.max(2, r.dotSz - 2), borderRadius: '50%', background: r.dotColor, opacity: 0.4 }} />
            )}
          </motion.div>
        </div>
      ))}

      {/* Center event horizon */}
      <motion.div
        style={{ position: 'absolute', width: orbSz, height: orbSz, borderRadius: '50%', background: 'radial-gradient(circle, #000 45%, rgba(240,180,41,0.2) 100%)', zIndex: 10 }}
        animate={{ boxShadow: [`0 0 ${orbSz * 0.3}px rgba(240,180,41,0.2)`, `0 0 ${orbSz * 0.55}px rgba(240,180,41,0.55)`, `0 0 ${orbSz * 0.3}px rgba(240,180,41,0.2)`] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ position: 'absolute', width: photonSz, height: photonSz, borderRadius: '50%', border: '1.5px solid rgba(240,180,41,0.7)', zIndex: 9 }}
        animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.05, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ position: 'absolute', width: einsteinSz, height: einsteinSz, borderRadius: '50%', border: '0.5px solid rgba(255,255,255,0.12)', zIndex: 8 }}
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </motion.div>
  );
}

// ── Mobile CSS-only (zero Framer Motion rotation) ──────────────────────────
function MobileOrrery() {
  return (
    <div style={{ position: 'relative', width: 260, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', width: '72%', height: '72%', borderRadius: '50%', border: '1px solid rgba(240,180,41,0.4)', transform: 'perspective(300px) rotateX(68deg)', animation: 'orbit-cw 10s linear infinite' }}>
        <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#F0B429', boxShadow: '0 0 14px #F0B429' }} />
      </div>
      <div style={{ position: 'absolute', width: '95%', height: '95%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', transform: 'perspective(300px) rotateX(58deg) rotateZ(55deg)', animation: 'orbit-ccw 18s linear infinite' }}>
        <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px #fff' }} />
      </div>
      <div style={{ position: 'absolute', width: 54, height: 54, borderRadius: '50%', background: 'radial-gradient(circle, #000 45%, rgba(240,180,41,0.2) 100%)', boxShadow: '0 0 24px rgba(240,180,41,0.5)', animation: 'bh-pulse 3s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 70, height: 70, borderRadius: '50%', border: '1.5px solid rgba(240,180,41,0.6)', animation: 'bh-pulse 2.5s ease-in-out infinite' }} />
    </div>
  );
}

// ── Public export ──────────────────────────────────────────────────────────
interface CosmicOrreryProps {
  /** 'hero' = 3 rings at 480px | 'background' = 5 rings at 1100px */
  variant?: 'hero' | 'background';
}

export default function CosmicOrrery({ variant = 'hero' }: CosmicOrreryProps) {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileOrrery />;

  if (variant === 'hero') {
    return <OrreryRings rings={HERO_RINGS} containerSize={480} orbSz={72} photonSz={94} einsteinSz={124} />;
  }
  return <OrreryRings rings={BG_RINGS} containerSize={1100} orbSz={130} photonSz={168} einsteinSz={220} />;
}
