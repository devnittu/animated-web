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

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main>
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
