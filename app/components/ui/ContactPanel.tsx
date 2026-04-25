'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import AstronautSVG from './AstronautSVG';
import GlassPillButton from './GlassPillButton';

interface Props { isOpen: boolean; onClose: () => void; }

const FIELDS = [
  { key: 'name',    label: 'Commander Name',         type: 'text',  ph: 'Col. John Shepard'  },
  { key: 'email',   label: 'Transmission Channel',   type: 'email', ph: 'pilot@deepspace.io' },
  { key: 'mission', label: 'Mission Objective',       type: 'text',  ph: 'Interstellar Survey'},
];

export default function ContactPanel({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', mission: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const inputStyle = (k: string) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.04)',
    border: focused === k ? '1px solid rgba(255,255,255,0.32)' : '1px solid rgba(255,255,255,0.09)',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border 0.25s, box-shadow 0.25s',
    boxShadow: focused === k ? '0 0 16px rgba(255,255,255,0.05)' : 'none',
  } as React.CSSProperties);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide panel */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-[70] flex flex-col"
            style={{
              width: 'min(480px, 100vw)',
              background: 'rgba(5,10,18,0.96)',
              borderLeft: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(24px)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-8 py-6"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div>
                <p className="label-text mb-1">Open Channel</p>
                <h2
                  className="font-display font-medium"
                  style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.15rem', color: '#fff' }}
                >
                  CONTACT
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-full cursor-pointer"
                style={{
                  width: 38, height: 38,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '1.1rem',
                }}
              >
                ×
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              {/* Floating astronaut */}
              <div
                className="flex justify-center mb-8"
                style={{ animation: 'float-y 4s ease-in-out infinite' }}
              >
                <div style={{ width: 140 }}>
                  <AstronautSVG />
                </div>
              </div>

              <div
                className="flex items-center gap-2 justify-center mb-8"
                style={{
                  padding: '10px 18px',
                  background: 'rgba(74,222,128,0.08)',
                  border: '1px solid rgba(74,222,128,0.2)',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  margin: '0 auto 2rem',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block', animation: 'twinkle 1.5s ease-in-out infinite' }}
                />
                <span className="label-text" style={{ color: 'rgba(74,222,128,0.8)', fontSize: '0.58rem' }}>
                  Systems Online · Ready to Receive
                </span>
              </div>

              {sent ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-5xl mb-4">🛸</div>
                  <h3
                    style={{ fontFamily: "'Orbitron', monospace", color: '#fff', fontSize: '1rem', marginBottom: '8px' }}
                  >
                    Transmission Sent
                  </h3>
                  <p className="caption-text">
                    Your signal is traveling at the speed of light toward mission control.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={e => { e.preventDefault(); setSent(true); }}
                  className="flex flex-col gap-5"
                >
                  {FIELDS.map(f => (
                    <div key={f.key}>
                      <label
                        className="label-text block mb-2"
                        style={{
                          color: focused === f.key ? 'rgba(255,255,255,0.65)' : undefined,
                          transition: 'color 0.25s',
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.ph}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        onFocus={() => setFocused(f.key)}
                        onBlur={() => setFocused(null)}
                        style={inputStyle(f.key)}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="label-text block mb-2"
                      style={{ color: focused === 'message' ? 'rgba(255,255,255,0.65)' : undefined, transition: 'color 0.25s' }}
                    >
                      Transmission Data
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your mission parameters..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('message'), resize: 'none' }}
                    />
                  </div>

                  <GlassPillButton variant="primary" id="contact-send-btn">
                    🚀 Send Transmission
                  </GlassPillButton>
                </form>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
