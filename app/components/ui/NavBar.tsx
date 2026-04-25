'use client';

import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { id: 'hero',     label: 'Home'     },
  { id: 'about',    label: 'About'    },
  { id: 'projects', label: 'Projects' },
  { id: 'skills',   label: 'Skills'   },
  { id: 'timeline', label: 'Mission'  },
];

interface NavBarProps {
  onContactOpen: () => void;
}

export default function NavBar({ onContactOpen }: NavBarProps) {
  const [active, setActive]     = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', v => setScrolled(v > 50));
  }, [scrollY]);

  useEffect(() => {
    const onScroll = () => {
      let cur = 'hero';
      for (const l of NAV_LINKS) {
        const el = document.getElementById(l.id);
        if (el && window.scrollY >= el.offsetTop - 180) cur = l.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          padding: '0 3rem',
          height: 68,
          background: scrolled ? 'rgba(2,4,8,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px) saturate(1.6)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-display font-bold tracking-[0.22em] text-base cursor-pointer"
          style={{
            fontFamily: "'Orbitron', monospace",
            color: '#fff',
            background: 'none', border: 'none',
            letterSpacing: '0.22em',
          }}
        >
          DEEP<span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>SPACE</span>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map(l => (
            <button
              key={l.id}
              id={`nav-${l.id}`}
              onClick={() => scrollTo(l.id)}
              className="relative cursor-pointer label-text"
              style={{
                color: active === l.id ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.32)',
                background: 'none', border: 'none',
                transition: 'color 0.2s',
                fontSize: '0.62rem',
                letterSpacing: '0.32em',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = active === l.id ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.32)'; }}
            >
              {l.label}
              {active === l.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: 'rgba(255,255,255,0.55)', boxShadow: '0 0 6px rgba(255,255,255,0.3)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Contact pill button */}
        <motion.button
          onClick={onContactOpen}
          className="hidden md:inline-flex items-center gap-2 cursor-pointer"
          style={{
            borderRadius: '9999px',
            padding: '9px 22px',
            fontFamily: "'Orbitron', monospace",
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.16)',
            backdropFilter: 'blur(12px)',
          }}
          whileHover={{
            background: 'rgba(255,255,255,0.12)',
            boxShadow: '0 0 18px rgba(255,255,255,0.1)',
            color: '#fff',
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: '#4ade80', boxShadow: '0 0 5px #4ade80', animation: 'twinkle 2s ease-in-out infinite' }}
          />
          Contact
        </motion.button>
      </div>
    </motion.nav>
  );
}
