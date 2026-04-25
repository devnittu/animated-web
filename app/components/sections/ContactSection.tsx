'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import FadeIn from '../motion/FadeIn';
import AstronautSVG from '../ui/AstronautSVG';
import NeonButton from '../ui/NeonButton';

const fields = [
  { key: 'name',    label: 'Commander Name',          type: 'text',  ph: 'Col. John Shepard'   },
  { key: 'email',   label: 'Transmission Frequency',  type: 'email', ph: 'pilot@deepspace.io'  },
  { key: 'mission', label: 'Mission Objective',        type: 'text',  ph: 'Interstellar Survey' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', mission: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36"
      style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="section-wrap">
        <FadeIn direction="up" className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Orbitron', monospace" }}>
            Open Channel
          </p>
          <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Orbitron', monospace", color: '#ffffff' }}>
            ESTABLISH CONTACT
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Astronaut */}
          <FadeIn direction="left" className="flex flex-col items-center">
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <AstronautSVG />
            </motion.div>
            <div className="mt-8 text-center">
              <p className="text-sm font-bold mb-1" style={{ fontFamily: "'Orbitron', monospace", color: 'rgba(255,255,255,0.8)' }}>Mission Control</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter', sans-serif" }}>Ready to receive your transmission</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-white" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Orbitron', monospace", fontSize: '0.6rem', letterSpacing: '0.15em' }}>SYSTEMS ONLINE</span>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right">
            {sent ? (
              <motion.div className="text-center p-16 rounded-2xl glass" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-5xl mb-4">🛸</div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Orbitron', monospace", color: '#ffffff' }}>Transmission Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem' }}>Traveling at the speed of light toward mission control.</p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
                {fields.map((f) => (
                  <div key={f.key}>
                    <label
                      className="block text-xs tracking-widest uppercase mb-2"
                      style={{
                        color: focused === f.key ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
                        fontFamily: "'Orbitron', monospace",
                        transition: 'color 0.25s',
                        fontSize: '0.6rem',
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.ph}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      onFocus={() => setFocused(f.key)}
                      onBlur={() => setFocused(null)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: focused === f.key ? '1px solid rgba(255,255,255,0.35)' : '1px solid rgba(255,255,255,0.09)',
                        color: '#ffffff',
                        fontFamily: "'Inter', sans-serif",
                        transition: 'border 0.25s, box-shadow 0.25s',
                        boxShadow: focused === f.key ? '0 0 20px rgba(255,255,255,0.06)' : 'none',
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{
                      color: focused === 'message' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
                      fontFamily: "'Orbitron', monospace",
                      transition: 'color 0.25s',
                      fontSize: '0.6rem',
                    }}
                  >
                    Transmission Data
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your mission parameters..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: focused === 'message' ? '1px solid rgba(255,255,255,0.35)' : '1px solid rgba(255,255,255,0.09)',
                      color: '#ffffff',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'border 0.25s',
                    }}
                  />
                </div>

                <NeonButton size="lg" id="contact-send-btn">🚀 Send Transmission</NeonButton>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
