'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

const WRAP: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', padding: '0 3rem' };
const SECTION: React.CSSProperties = { position: 'relative', paddingTop: '120px', paddingBottom: '120px', background: '#020408', borderTop: '1px solid rgba(255,255,255,0.07)' };

const MISSIONS = [
  { year: '2019', title: 'First Light',     sub: 'Telescope Array Online',   desc: 'Deployed 12 synchronized radio telescopes achieving first-light observations of the galactic center with unprecedented angular resolution.' },
  { year: '2020', title: 'Nebula Survey',   sub: 'Deep Field Mapping',       desc: 'Completed a 6-month deep-field survey of the Orion molecular cloud, cataloguing 2,400+ infrared sources and 18 protoplanetary disk candidates.' },
  { year: '2021', title: 'BH Imaging',      sub: 'Event Horizon Data',       desc: 'Contributed compute to the Event Horizon Telescope collaboration, processing petabytes of VLBI data across 8 globally synchronized observatories.' },
  { year: '2022', title: 'Exoplanet +3',    sub: 'Transit Photometry',       desc: 'Confirmed 3 new exoplanets in habitable zones, including a super-Earth with potential biosignature atmospheric indicators.' },
  { year: '2023', title: 'GW Network',      sub: 'LIGO Partnership',         desc: 'Joined the LIGO-Virgo-KAGRA data-sharing network enabling multi-messenger astronomy and joint gravitational-wave EM follow-up campaigns.' },
  { year: '2024', title: 'SETI Deep Scan',  sub: 'AI Signal Classification', desc: 'Deployed deep-learning classifier on Breakthrough Listen dataset — 99.2% accuracy separating terrestrial RFI from genuine SETI candidates.' },
];

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rocketY = useTransform(scrollYProgress, [0, 1], ['2%', '90%']);

  return (
    <section id="timeline" ref={ref} style={SECTION}>
      {/* Background grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.022, backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div style={{ ...WRAP, position: 'relative', zIndex: 10 }}>
        <FadeIn direction="up">
          <SectionHeading
            label="Mission Log"
            title="SPACE MISSIONS"
            accentWord="MISSIONS"
            num="04"
            subtitle="Six years of deep space research and interstellar collaboration."
          />
        </FadeIn>
        <div style={{ height: '4rem' }} />

        <div style={{ position: 'relative' }}>
          {/* Base line */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.07)' }} />
          {/* Progress fill */}
          <motion.div style={{ position: 'absolute', left: '50%', top: 0, width: 1, transform: 'translateX(-50%)', transformOrigin: 'top', background: 'linear-gradient(to bottom, rgba(120,160,255,0.6), rgba(255,255,255,0.4))', scaleY: scrollYProgress, boxShadow: '0 0 8px rgba(120,160,255,0.3)' }} />
          {/* Rocket */}
          <motion.div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 20, fontSize: '1.2rem', top: 0, y: rocketY, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}>🚀</motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {MISSIONS.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  style={{ position: 'relative', display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end' }}
                  initial={{ opacity: 0, x: isLeft ? -36 : 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Card */}
                  <div style={{ width: 'calc(50% - 48px)', padding: '1.75rem 2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', backdropFilter: 'blur(10px)', position: 'relative' }}>
                    <span style={{ display: 'inline-block', fontFamily: "'Orbitron', monospace", fontSize: '0.58rem', letterSpacing: '0.2em', padding: '3px 10px', borderRadius: '4px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)', marginBottom: '0.75rem' }}>{m.year}</span>
                    <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.85rem', fontWeight: 500, color: '#fff', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>{m.title}</h3>
                    <p style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.9rem' }}>{m.sub}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.84rem', fontWeight: 300, lineHeight: 1.72, color: 'rgba(255,255,255,0.42)' }}>{m.desc}</p>
                    {/* Connector */}
                    <div style={{ position: 'absolute', top: '2rem', [isLeft ? 'right' : 'left']: '-48px', width: 48, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                  </div>
                  {/* Dot */}
                  <div style={{ position: 'absolute', left: '50%', top: '2rem', transform: 'translateX(-50%)', zIndex: 10, width: 10, height: 10, borderRadius: '50%', background: '#fff', boxShadow: '0 0 12px rgba(255,255,255,0.7), 0 0 24px rgba(120,160,255,0.4)' }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
