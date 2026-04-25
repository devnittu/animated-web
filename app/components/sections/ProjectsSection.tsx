'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import FadeIn from '../motion/FadeIn';
import StaggerChildren, { StaggerItem } from '../motion/StaggerChildren';
import SectionHeading from '../ui/SectionHeading';

const WRAP: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', padding: '0 3rem' };
const SECTION: React.CSSProperties = { position: 'relative', paddingTop: '120px', paddingBottom: '120px', background: '#020408', borderTop: '1px solid rgba(255,255,255,0.07)' };

function HoloCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const rX = useSpring(useTransform(mY, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 24 });
  const rY = useSpring(useTransform(mX, [-0.5, 0.5], [-7, 7]), { stiffness: 160, damping: 24 });
  const gX = useTransform(mX, [-0.5, 0.5], [0, 100]);
  const gY = useTransform(mY, [-0.5, 0.5], [0, 100]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mX.set((e.clientX - r.left) / r.width - 0.5);
    mY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mX.set(0); mY.set(0); }}
      style={{
        rotateX: rX, rotateY: rY,
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(135deg, rgba(10,17,32,0.9), rgba(5,10,18,0.95))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1rem',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        height: '100%',
        animation: 'holo-flicker 9s ease-in-out infinite',
      }}
      whileHover={{ scale: 1.025, borderColor: 'rgba(120,160,255,0.3)', boxShadow: '0 0 32px rgba(100,140,255,0.1), 0 24px 50px rgba(0,0,0,0.6)' }}
      transition={{ duration: 0.22 }}
    >
      {/* Scan line */}
      <div style={{ position: 'absolute', left: 0, right: 0, height: '35%', background: 'linear-gradient(transparent, rgba(120,160,255,0.035), transparent)', animation: 'scan-line 7s linear infinite', pointerEvents: 'none', zIndex: 1 }} />
      {/* Spotlight */}
      <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at ${gX}% ${gY}%, rgba(120,160,255,0.07), transparent 55%)`, opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }} />
      {/* Top border glow */}
      <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(120,160,255,0.55), transparent)', opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
      <div style={{ transform: 'translateZ(18px)', height: '100%' }}>{children}</div>
    </motion.div>
  );
}

const STATUS_COLOR: Record<string, string> = {
  Active: 'rgba(74,222,128,0.85)', 'In Dev': 'rgba(120,160,255,0.85)',
  Complete: 'rgba(255,255,255,0.7)', Planning: 'rgba(255,200,80,0.8)',
};

const PROJECTS = [
  { title: 'Nebula Mapper',     sub: 'Deep Space Imaging',    year: '2024', status: 'Active',   tech: ['Python', 'TensorFlow', 'NASA API'], desc: 'AI-powered telescope system mapping stellar nurseries and identifying protostars within interstellar gas clouds at sub-arcsecond resolution.' },
  { title: 'Event Horizon AI',  sub: 'BH Simulation',         year: '2024', status: 'In Dev',   tech: ['CUDA', 'WebGL', 'Rust'],           desc: 'Real-time gravitational physics engine based on the Kerr metric, rendering relativistic ray-tracing near rotating black holes.' },
  { title: 'Exo-Scout',         sub: 'Exoplanet Detection',   year: '2023', status: 'Complete', tech: ['R', 'Jupyter', 'AWS'],             desc: 'Transit photometry pipeline detecting exoplanet candidates from TESS and Kepler mission data with automated candidate ranking.' },
  { title: 'Dark Matter Grid',  sub: 'Cosmic Web Mapping',    year: '2023', status: 'Active',   tech: ['MPI', 'C++', 'HPC'],               desc: 'Distributed computing grid simulating large-scale structure formation and dark matter halo distributions across 500 Mpc volumes.' },
  { title: 'Pulsar Navigator',  sub: 'Deep Space GPS',        year: '2025', status: 'Planning', tech: ['FPGA', 'Ada', 'RTOS'],             desc: 'Spacecraft navigation using millisecond pulsar timing as natural cosmic beacons — no ground tracking stations required.' },
  { title: 'Cosmic Ray Array',  sub: 'Particle Physics',      year: '2024', status: 'Active',   tech: ['LabVIEW', 'ROOT', 'Python'],       desc: 'Ultra-high-energy cosmic ray detection tracing particle trajectories back to galactic and extragalactic source origins.' },
];

export default function ProjectsSection() {
  return (
    <section id="projects" style={SECTION}>
      <div style={WRAP}>
        <FadeIn direction="up">
          <SectionHeading
            label="Mission Files"
            title="SPACE PROJECTS"
            accentWord="PROJECTS"
            num="02"
            subtitle="Cutting-edge research and engineering pushing the limits of space science."
            style={{ marginBottom: '4rem' }}
          />
        </FadeIn>
        <div style={{ height: '4rem' }} />

        <StaggerChildren style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {PROJECTS.map((p, i) => (
            <StaggerItem key={i}>
              <HoloCard>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '0.75rem' }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.4rem' }}>{p.sub}</p>
                      <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.9rem', fontWeight: 500, color: '#fff', letterSpacing: '0.04em' }}>{p.title}</h3>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ display: 'block', fontFamily: "'Orbitron', monospace", fontSize: '0.52rem', letterSpacing: '0.12em', padding: '3px 10px', borderRadius: '9999px', background: `${STATUS_COLOR[p.status]}12`, border: `1px solid ${STATUS_COLOR[p.status]}35`, color: STATUS_COLOR[p.status], marginBottom: '0.3rem' }}>{p.status}</span>
                      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.56rem', color: 'rgba(255,255,255,0.22)' }}>{p.year}</span>
                    </div>
                  </div>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.84rem', fontWeight: 300, lineHeight: 1.72, color: 'rgba(255,255,255,0.42)', flexGrow: 1, marginBottom: '1.25rem' }}>{p.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {p.tech.map((t, j) => (
                      <span key={j} style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.56rem', letterSpacing: '0.08em', padding: '4px 10px', borderRadius: '6px', background: 'rgba(120,160,255,0.06)', border: '1px solid rgba(120,160,255,0.15)', color: 'rgba(180,210,255,0.7)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </HoloCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
