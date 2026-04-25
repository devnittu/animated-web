'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const WRAP: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', padding: '0 3rem' };

function ConstellationCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const consts = [
      { stars: [[0.08,0.25],[0.14,0.55],[0.21,0.38],[0.29,0.18],[0.26,0.70]], lines: [[0,2],[2,1],[1,4],[2,3]], r: [1.8,2.2,1.2,2.0,1.4] },
      { stars: [[0.46,0.12],[0.54,0.32],[0.62,0.16],[0.70,0.40],[0.62,0.56],[0.52,0.68]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[1,4]], r: [2.0,1.6,1.2,2.2,1.4,1.8] },
      { stars: [[0.82,0.22],[0.90,0.10],[0.94,0.40],[0.87,0.60],[0.76,0.48]], lines: [[0,1],[1,2],[2,3],[3,4],[4,0]], r: [1.8,1.2,2.0,1.6,1.0] },
    ];
    const bgStars = Array.from({ length: 100 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random()*0.9+0.2, ph: Math.random()*Math.PI*2, sp: Math.random()*0.012+0.004 }));

    let t = 0, animId: number;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;
      bgStars.forEach(s => {
        const a = 0.08 + 0.2 * (0.5 + 0.5*Math.sin(t*s.sp + s.ph));
        ctx.beginPath(); ctx.arc(s.x*W, s.y*H, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
      });
      consts.forEach((c, ci) => {
        c.lines.forEach(([a,b]) => {
          const sa = c.stars[a], sb = c.stars[b];
          ctx.beginPath(); ctx.moveTo(sa[0]*W, sa[1]*H); ctx.lineTo(sb[0]*W, sb[1]*H);
          ctx.strokeStyle = `rgba(120,160,255,${0.08 + 0.05*Math.sin(t*0.01+ci)})`; ctx.lineWidth = 0.6; ctx.stroke();
        });
        c.stars.forEach((s, si) => {
          const alpha = 0.4 + 0.55*(0.5+0.5*Math.sin(t*0.02 + si*1.3 + ci*2));
          const r = c.r[si];
          const grd = ctx.createRadialGradient(s[0]*W, s[1]*H, 0, s[0]*W, s[1]*H, r*5);
          grd.addColorStop(0, `rgba(200,220,255,${alpha*0.3})`); grd.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath(); ctx.arc(s[0]*W, s[1]*H, r*5, 0, Math.PI*2); ctx.fillStyle = grd; ctx.fill();
          ctx.beginPath(); ctx.arc(s[0]*W, s[1]*H, r, 0, Math.PI*2);
          ctx.fillStyle = `rgba(220,235,255,${alpha})`; ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(150,180,255,0.6)'; ctx.fill(); ctx.shadowBlur = 0;
        });
      });
      const cx = 0.5*W, cy = 0.5*H, ar = Math.min(W,H)*0.4;
      ctx.beginPath(); ctx.arc(cx, cy, ar, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(100,140,220,${0.05+0.03*Math.sin(t*0.008)})`; ctx.lineWidth = 0.5; ctx.stroke();
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.8 }} />;
}

export default function FooterSection() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden', background: '#000', borderTop: '1px solid rgba(255,255,255,0.07)', minHeight: 380 }}>
      <ConstellationCanvas />
      <div style={{ ...WRAP, position: 'relative', zIndex: 10, paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.2em', color: '#fff', marginBottom: '1.2rem' }}>
              DEEP<span style={{ color: 'rgba(255,255,255,0.28)', fontWeight: 400 }}>SPACE</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.32)', maxWidth: 220 }}>
              Exploring the cosmos one discovery at a time — beyond the event horizon.
            </p>
          </div>
          {/* Nav */}
          <div>
            <p style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.6rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem' }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {['Home','About','Projects','Skills','Missions'].map(l => (
                <motion.a key={l} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.3)' }} whileHover={{ color: 'rgba(255,255,255,0.85)', x: 4 }} transition={{ duration: 0.15 }}>{l}</motion.a>
              ))}
            </div>
          </div>
          {/* Socials */}
          <div>
            <p style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.6rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem' }}>Communications</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {['GitHub','Twitter','LinkedIn','Email'].map(s => (
                <motion.a key={s} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.3)' }} whileHover={{ color: 'rgba(255,255,255,0.85)', x: 4 }} transition={{ duration: 0.15 }}>{s}</motion.a>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)', marginBottom: '1.75rem' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <p style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.58rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.2)' }}>© 2024 DEEPSPACE. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} animate={{ opacity: [1, 0.15, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(74,222,128,0.65)' }}>ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
