import React from 'react';
import SplitText from '../motion/SplitText';

interface SectionHeadingProps {
  label: string;
  title: string;
  accentWord?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  num?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Delay before first char assembles (seconds) */
  delay?: number;
}

export default function SectionHeading({
  label, title, accentWord, subtitle,
  align = 'left', num, className = '', style, delay = 0,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  // Split title: part before accent / accent / part after
  let before = '', accent = '', after = '';
  if (accentWord) {
    const idx = title.indexOf(accentWord);
    if (idx !== -1) {
      before = title.slice(0, idx);
      accent  = accentWord;
      after   = title.slice(idx + accentWord.length);
    } else {
      before = title;
    }
  } else {
    before = title;
  }

  const h2Base: React.CSSProperties = {
    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
    fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1.0,
    margin: 0,
    display: 'block',
  };

  return (
    <div className={className} style={{ textAlign: isCenter ? 'center' : 'left', ...style }}>

      {/* ── Ghost number ── */}
      {num && (
        <div style={{
          fontFamily: "var(--font-orbitron), 'Orbitron', monospace",
          fontSize: '0.62rem',
          letterSpacing: '0.28em',
          color: 'rgba(255,255,255,0.1)',
          marginBottom: '0.6rem',
          fontWeight: 600,
        }}>
          {num}
        </div>
      )}

      {/* ── Label with flanking lines ── */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
        <span style={{
          fontFamily: "var(--font-orbitron), 'Orbitron', monospace",
          fontSize: '0.56rem',
          letterSpacing: '0.44em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.36)',
        }}>
          {label}
        </span>
        <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
      </div>

      {/* ── Main title — Space Grotesk + SplitText scatter ── */}
      <div style={{ marginBottom: subtitle ? '1.25rem' : 0 }}>
        {/* Non-accent part */}
        {before && (
          <SplitText
            text={before}
            delay={delay}
            charDelay={0.048}
            style={{
              ...h2Base,
              color: 'rgba(255,255,255,0.88)',
              display: before.trim() ? 'block' : 'none',
            }}
          />
        )}

        {/* Accent word — glows as the snake passes through it */}
        {accent && (
          <SplitText
            text={accent}
            delay={delay + before.length * 0.048}
            charDelay={0.055}
            style={{
              ...h2Base,
              color: '#ffffff',
              textShadow: '0 0 30px rgba(160,200,255,0.28)',
              display: 'block',
            }}
          />
        )}

        {/* Trailing part */}
        {after && (
          <SplitText
            text={after}
            delay={delay + (before.length + accent.length) * 0.048}
            charDelay={0.048}
            style={{
              ...h2Base,
              color: 'rgba(255,255,255,0.88)',
              display: 'block',
            }}
          />
        )}
      </div>

      {/* ── Subtitle ── */}
      {subtitle && (
        <p style={{
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          fontSize: '0.95rem',
          fontWeight: 300,
          lineHeight: 1.85,
          color: 'rgba(255,255,255,0.35)',
          maxWidth: isCenter ? '520px' : '440px',
          margin: isCenter ? '0 auto' : '0',
          fontStyle: 'italic',
          letterSpacing: '0.01em',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
