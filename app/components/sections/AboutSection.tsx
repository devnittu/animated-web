'use client';

import { motion } from 'framer-motion';
import FadeIn from '../motion/FadeIn';
import SectionHeading from '../ui/SectionHeading';
import SplitText from '../motion/SplitText';
import StaggerChildren, { StaggerItem } from '../motion/StaggerChildren';

const WRAP: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 3rem',
};

const SECTION: React.CSSProperties = {
  position: 'relative',
  paddingTop: '120px',
  paddingBottom: '120px',
  background: 'linear-gradient(180deg, #020408 0%, #050a12 100%)',
  borderTop: '1px solid rgba(255,255,255,0.07)',
};

// Mini orbit visualization
function OrbitViz() {
  const planets = [
    { r: 52,  speed: 9,  angle: 0,   size: 11 },
    { r: 86,  speed: 17, angle: 120, size: 7  },
    { r: 120, speed: 27, angle: 240, size: 9  },
    { r: 152, speed: 42, angle: 60,  size: 5  },
  ];
  return (
    <div style={{ position: 'relative', width: 340, height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {planets.map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: p.r * 2, height: p.r * 2, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
      ))}
      {/* Sun */}
      <div style={{ position: 'absolute', zIndex: 10, width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #fff, rgba(180,200,255,0.85))', boxShadow: '0 0 0 5px rgba(255,255,255,0.07), 0 0 22px rgba(255,255,255,0.45), 0 0 44px rgba(120,160,255,0.2)', animation: 'bh-pulse 4s ease-in-out infinite' }} />
      {planets.map((p, i) => {
        const delay = -((p.angle / 360) * p.speed);
        return (
          <div key={i} style={{ position: 'absolute', width: p.r * 2, height: p.r * 2, left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, animation: `orbit-cw ${p.speed}s linear ${delay}s infinite` }}>
              <div style={{ position: 'absolute', transform: `translateX(${p.r}px) translateY(-50%)`, animation: `orbit-ccw ${p.speed}s linear ${delay}s infinite`, width: p.size, height: p.size, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #fff, rgba(140,180,255,0.75))', boxShadow: '0 0 8px rgba(255,255,255,0.4)' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const PILLARS = [
  { num: '01', title: 'Deep Space Exploration', desc: 'Venturing beyond the heliopause, mapping the cosmic web and discovering phenomena at the edge of the observable universe.' },
  { num: '02', title: 'Black Hole Research',    desc: 'Studying gravitational singularities and the Kerr metric — spacetime curvature near Gargantua-class objects warps reality itself.' },
  { num: '03', title: 'Exoplanet Discovery',    desc: 'Scanning distant star systems for habitable worlds and biosignatures, searching for signs of extraterrestrial life.' },
];

export default function AboutSection() {
  return (
    <section id="about" style={SECTION}>
      <div style={WRAP}>
        {/* Split layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '6rem', alignItems: 'center', marginBottom: '6rem' }}>
          {/* Left */}
          <FadeIn direction="left">
            <SectionHeading
              label="Mission Brief"
              title="EXPLORING THE FRONTIER"
              accentWord="THE FRONTIER"
              num="01"
            />
            <div style={{ height: '1.75rem' }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.45)', maxWidth: 420, marginBottom: '1rem' }}>
              For decades, humanity has gazed at the stars and dreamed of what lies beyond. We&apos;re not dreamers — we&apos;re explorers charting the unknown territories of our cosmos.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.7, color: 'rgba(255,255,255,0.25)', maxWidth: 420, fontStyle: 'italic' }}>
              Every mission begins with a question that has no answer — yet.
            </p>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem' }}>
              {[{ v: '93M', l: 'Miles / AU' }, { v: '8 min', l: 'Light Lag' }, { v: '5500°', l: 'Kelvin Core' }].map((s, i) => (
                <div key={i}>
                  <SplitText
                    text={s.v}
                    delay={i * 0.12}
                    charDelay={0.08}
                    style={{
                      fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: '#fff',
                      letterSpacing: '-0.02em',
                      marginBottom: '0.3rem',
                    }}
                  />
                  <div style={{ fontFamily: "var(--font-orbitron), 'Orbitron', monospace", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          {/* Right — orbit viz */}
          <FadeIn direction="right" className="flex justify-center">
            <OrbitViz />
          </FadeIn>
        </div>

        {/* Mission pillars */}
        <StaggerChildren style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {PILLARS.map((p, i) => (
            <StaggerItem key={i}>
              <motion.div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1rem',
                  padding: '2.5rem',
                  height: '100%',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{ y: -4, boxShadow: '0 24px 48px rgba(0,0,0,0.55)', borderColor: 'rgba(255,255,255,0.15)' }}
                transition={{ duration: 0.22 }}
              >
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '3.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.05)', lineHeight: 1, marginBottom: '1.5rem' }}>{p.num}</div>
                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.82rem', fontWeight: 500, color: '#fff', letterSpacing: '0.06em', marginBottom: '1rem' }}>{p.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.42)' }}>{p.desc}</p>
                <motion.div style={{ height: 1, background: 'rgba(255,255,255,0.12)', width: 0, marginTop: '2rem' }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 * i }} />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
