'use client';
import { motion } from 'framer-motion';

// Cinematic armillary sphere / orrery — replaces broken BlackHole + AccretionDisk

const RINGS = [
  { size: 300,  tiltX: 72, rotZ: 0,   dur: 8,  dotColor: '#F0B429', dotSz: 10, opacity: 0.4,  cw: true  },
  { size: 480,  tiltX: 62, rotZ: 50,  dur: 14, dotColor: '#ffffff', dotSz: 7,  opacity: 0.2,  cw: false },
  { size: 660,  tiltX: 80, rotZ: -20, dur: 22, dotColor: '#F0B429', dotSz: 6,  opacity: 0.28, cw: true  },
  { size: 840,  tiltX: 55, rotZ: 85,  dur: 32, dotColor: '#ffffff', dotSz: 4,  opacity: 0.13, cw: false },
  { size: 1020, tiltX: 75, rotZ: -40, dur: 48, dotColor: '#F0B429', dotSz: 3,  opacity: 0.1,  cw: true  },
];

export default function CosmicOrrery() {
  return (
    <motion.div
      style={{ position: 'relative', width: 1100, height: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 2.4, ease: [0.2, 0, 0, 1] }}
    >
      {/* Ambient outer glow */}
      <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,180,41,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Rings — each wrapper applies static 3D tilt, inner div spins */}
      {RINGS.map((r, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: r.size, height: r.size,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            // Static 3D tilt via perspective
            transform: `perspective(500px) rotateX(${r.tiltX}deg) rotateZ(${r.rotZ}deg)`,
          }}
        >
          {/* Spinning ring + dot */}
          <motion.div
            style={{ position: 'relative', width: r.size, height: r.size, borderRadius: '50%', border: `1px solid rgba(${r.dotColor === '#F0B429' ? '240,180,41' : '255,255,255'},${r.opacity})` }}
            animate={{ rotate: r.cw ? 360 : -360 }}
            transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}
          >
            {/* Orbital body at top of ring */}
            <div style={{
              position: 'absolute',
              top: -r.dotSz / 2,
              left: '50%',
              transform: 'translateX(-50%)',
              width: r.dotSz, height: r.dotSz,
              borderRadius: '50%',
              background: r.dotColor,
              boxShadow: `0 0 ${r.dotSz * 3}px ${r.dotColor}, 0 0 ${r.dotSz * 6}px ${r.dotColor}55`,
            }} />
            {/* Second body 180° opposite on some rings */}
            {i % 2 === 0 && (
              <div style={{
                position: 'absolute',
                bottom: -Math.max(2, r.dotSz / 2 - 1),
                left: '50%',
                transform: 'translateX(-50%)',
                width: Math.max(2, r.dotSz - 2),
                height: Math.max(2, r.dotSz - 2),
                borderRadius: '50%',
                background: r.dotColor,
                opacity: 0.45,
              }} />
            )}
          </motion.div>
        </div>
      ))}

      {/* Center — event horizon orb */}
      <motion.div
        style={{
          position: 'absolute',
          width: 130, height: 130, borderRadius: '50%',
          background: 'radial-gradient(circle, #000 45%, rgba(240,180,41,0.18) 100%)',
          zIndex: 10,
        }}
        animate={{ boxShadow: ['0 0 40px rgba(240,180,41,0.2), 0 0 90px rgba(240,180,41,0.07)', '0 0 70px rgba(240,180,41,0.5), 0 0 140px rgba(240,180,41,0.15)', '0 0 40px rgba(240,180,41,0.2), 0 0 90px rgba(240,180,41,0.07)'] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Photon ring */}
      <motion.div
        style={{ position: 'absolute', width: 168, height: 168, borderRadius: '50%', border: '1.5px solid rgba(240,180,41,0.65)', zIndex: 9 }}
        animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Outer Einstein ring shimmer */}
      <motion.div
        style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', border: '0.5px solid rgba(255,255,255,0.1)', zIndex: 8 }}
        animate={{ opacity: [0.1, 0.35, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </motion.div>
  );
}
