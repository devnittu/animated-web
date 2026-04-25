'use client';

import { motion } from 'framer-motion';
import FadeIn from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';

const WRAP: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', padding: '0 3rem' };
const SECTION: React.CSSProperties = { position: 'relative', paddingTop: '120px', paddingBottom: '120px', background: 'linear-gradient(180deg, #050a12 0%, #020408 100%)', borderTop: '1px solid rgba(255,255,255,0.07)' };

const SKILLS = [
  { name: 'Astrophysics',     level: 95, r: 108, speed: 13, angle: 0   },
  { name: 'Orbital Mech.',    level: 88, r: 108, speed: 13, angle: 120 },
  { name: 'Cosmology',        level: 82, r: 108, speed: 13, angle: 240 },
  { name: 'Data Science',     level: 92, r: 178, speed: 22, angle: 30  },
  { name: 'Machine Learning', level: 85, r: 178, speed: 22, angle: 150 },
  { name: 'Python / ML',      level: 97, r: 178, speed: 22, angle: 270 },
  { name: 'Signal Proc.',     level: 80, r: 248, speed: 36, angle: 60  },
  { name: 'CUDA / GPU',       level: 76, r: 248, speed: 36, angle: 180 },
  { name: 'Telescope Sys.',   level: 90, r: 248, speed: 36, angle: 300 },
];

export default function SkillsSection() {
  return (
    <section id="skills" style={SECTION}>
      <div style={WRAP}>
        <FadeIn direction="up">
          <SectionHeading
            label="Skill Constellation"
            title="ORBITAL SKILLS"
            accentWord="SKILLS"
            num="03"
            subtitle="Nine disciplines in active orbit around the mission core."
          />
        </FadeIn>
        <div style={{ height: '4rem' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Orbital diagram */}
          <FadeIn direction="left">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 540 }}>
              {/* Orbit rings */}
              {[108, 178, 248].map(r => (
                <div key={r} style={{ position: 'absolute', left: '50%', top: '50%', width: r * 2, height: r * 2, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
              ))}
              {/* Central sun */}
              <div style={{ position: 'absolute', zIndex: 10, width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 35% 35%, #fff 0%, rgba(200,220,255,0.9) 60%)', boxShadow: '0 0 0 6px rgba(255,255,255,0.05), 0 0 24px rgba(255,255,255,0.5), 0 0 60px rgba(120,160,255,0.22)', animation: 'bh-pulse 5s ease-in-out infinite' }}>
                <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.42rem', color: '#000a20', fontWeight: 700, letterSpacing: '0.1em' }}>CORE</span>
              </div>
              {/* Planets */}
              {SKILLS.map((sk, i) => {
                const delay = -((sk.angle / 360) * sk.speed);
                const size  = 30 + (sk.level - 75) * 0.4;
                return (
                  <div key={i} style={{ position: 'absolute', width: sk.r * 2, height: sk.r * 2, left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
                    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, animation: `orbit-cw ${sk.speed}s linear ${delay}s infinite` }}>
                      <div style={{ position: 'absolute', transform: `translateX(${sk.r}px) translateY(-50%)`, animation: `orbit-ccw ${sk.speed}s linear ${delay}s infinite` }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: size, height: size, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 35% 35%, #fff, rgba(160,200,255,0.75))', boxShadow: '0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(120,160,255,0.15)' }}>
                            <span style={{ fontSize: '0.46rem', color: '#000a20', fontFamily: "'Orbitron', monospace", fontWeight: 700 }}>{sk.level}%</span>
                          </div>
                          <span style={{ fontSize: '0.48rem', fontFamily: "'Orbitron', monospace", color: 'rgba(255,255,255,0.48)', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>{sk.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* Legend */}
          <FadeIn direction="right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SKILLS.map((sk, i) => (
                <motion.div
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.1rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                >
                  <div style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: `rgba(255,255,255,${0.28 + sk.level / 300})` }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.6rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.65)' }}>{sk.name}</span>
                      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}>{sk.level}%</span>
                    </div>
                    <div style={{ height: 2, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }}>
                      <motion.div
                        style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(to right, rgba(120,160,255,0.85), rgba(255,255,255,0.65))' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${sk.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.06 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
