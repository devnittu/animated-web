import React from 'react';

/**
 * Shared cinematic section heading component.
 *
 * Renders:
 *   — number badge (optional)
 *   — small label with flanking lines
 *   — large display headline with gradient accent word
 *   — optional subtitle paragraph
 */
interface SectionHeadingProps {
  label: string;
  title: string;
  accentWord?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  num?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionHeading({
  label, title, accentWord, subtitle,
  align = 'left', num, className = '', style,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  // Split title around accentWord
  let before = title;
  let accent  = '';
  let after   = '';
  if (accentWord) {
    const idx = title.indexOf(accentWord);
    if (idx !== -1) {
      before = title.slice(0, idx);
      accent = accentWord;
      after  = title.slice(idx + accentWord.length);
    }
  }

  return (
    <div className={className} style={{ textAlign: isCenter ? 'center' : 'left', ...style }}>
      {/* ── Number badge ── */}
      {num && (
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '0.62rem',
          letterSpacing: '0.28em',
          color: 'rgba(255,255,255,0.12)',
          marginBottom: '0.75rem',
          fontWeight: 600,
        }}>
          {num}
        </div>
      )}

      {/* ── Label row ── */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
        <span style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '0.58rem',
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.38)',
        }}>
          {label}
        </span>
        <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
      </div>

      {/* ── Title ── */}
      <h2 style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        margin: 0,
        marginBottom: subtitle ? '1.25rem' : 0,
      }}>
        {/* Regular part */}
        {before && (
          <span style={{ color: 'rgba(255,255,255,0.88)' }}>{before}</span>
        )}
        {/* Accent word — gradient */}
        {accent && (
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(180,210,255,0.75) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {accent}
          </span>
        )}
        {/* Trailing part */}
        {after && (
          <span style={{ color: 'rgba(255,255,255,0.88)' }}>{after}</span>
        )}
        {/* No accent — plain white */}
        {!accentWord && (
          <span style={{ color: '#fff' }}>{title}</span>
        )}
      </h2>

      {/* ── Subtitle ── */}
      {subtitle && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.95rem',
          fontWeight: 300,
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.38)',
          maxWidth: isCenter ? '520px' : '440px',
          margin: isCenter ? '0 auto' : '0',
          fontStyle: 'italic',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
