'use client';

import { useState } from 'react';
import NavBar from './components/ui/NavBar';
import ContactPanel from './components/ui/ContactPanel';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import TimelineSection from './components/sections/TimelineSection';
import FooterSection from './components/sections/FooterSection';
import CosmicOrrery from './components/space/CosmicOrrery';

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main style={{ position: 'relative' }}>
      {/* ── Global orrery background — fixed, centered, behind everything ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.55,
      }}>
        <CosmicOrrery />
      </div>

      <NavBar onContactOpen={() => setContactOpen(true)} />
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <TimelineSection />
      <FooterSection />
    </main>
  );
}
