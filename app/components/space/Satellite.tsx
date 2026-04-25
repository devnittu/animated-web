'use client';

interface SatelliteProps {
  orbitRadius: number;
  speed: number;
  initialAngle?: number;
  color?: string;
  type?: 'classic' | 'dish' | 'solar' | 'cube';
}

const SvgSats = {
  classic: (
    <svg width="38" height="18" viewBox="0 0 38 18" fill="none">
      <rect x="13" y="6" width="12" height="6" rx="1" fill="rgba(255,255,255,0.9)"/>
      <rect x="1" y="4" width="10" height="10" rx="1" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5"/>
      <line x1="3.5" y1="4" x2="3.5" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
      <line x1="6.5" y1="4" x2="6.5" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
      <line x1="9.5" y1="4" x2="9.5" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
      <rect x="27" y="4" width="10" height="10" rx="1" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5"/>
      <line x1="29.5" y1="4" x2="29.5" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
      <line x1="32.5" y1="4" x2="32.5" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
      <line x1="35.5" y1="4" x2="35.5" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
      <line x1="19" y1="6" x2="19" y2="1" stroke="rgba(255,255,255,0.8)" strokeWidth="1"/>
      <circle cx="19" cy="1" r="1" fill="white"/>
    </svg>
  ),
  dish: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="13" y="18" width="6" height="7" rx="1" fill="rgba(255,255,255,0.8)"/>
      <ellipse cx="16" cy="14" rx="9" ry="5.5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8"/>
      <ellipse cx="16" cy="14" rx="5" ry="2.5" fill="rgba(255,255,255,0.08)"/>
      <line x1="16" y1="8.5" x2="16" y2="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1"/>
      <circle cx="16" cy="2.5" r="1.5" fill="white"/>
    </svg>
  ),
  solar: (
    <svg width="48" height="14" viewBox="0 0 48 14" fill="none">
      <rect x="20" y="4" width="8" height="6" rx="1" fill="rgba(255,255,255,0.9)"/>
      <rect x="1" y="2" width="17" height="10" rx="1" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5"/>
      <rect x="30" y="2" width="17" height="10" rx="1" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5"/>
      {[3.5, 6.5, 9.5, 12.5, 15.5].map(x => <line key={x} x1={x} y1="2" x2={x} y2="12" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>)}
      {[32.5, 35.5, 38.5, 41.5, 44.5].map(x => <line key={x} x1={x} y1="2" x2={x} y2="12" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>)}
    </svg>
  ),
  cube: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="3" width="16" height="16" rx="2" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8"/>
      <rect x="6" y="6" width="10" height="10" rx="1" fill="rgba(255,255,255,0.06)"/>
      <circle cx="11" cy="11" r="3" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
      <circle cx="11" cy="11" r="1" fill="white"/>
    </svg>
  ),
};

export default function Satellite({ orbitRadius, speed, initialAngle = 0, type = 'classic' }: SatelliteProps) {
  const delayOffset = -((initialAngle / 360) * speed);

  return (
    <div
      className="absolute will-transform"
      style={{
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Orbit ring */}
      <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.04)' }} />

      {/* Wrapper that orbits */}
      <div
        className="absolute will-transform"
        style={{
          left: '50%',
          top: '50%',
          width: 0,
          height: 0,
          animation: `orbit-cw ${speed}s linear ${delayOffset}s infinite`,
        }}
      >
        {/* Satellite kept upright via counter-rotate */}
        <div
          className="absolute will-transform"
          style={{
            transform: `translateX(${orbitRadius}px) translateY(-50%)`,
            animation: `orbit-ccw ${speed}s linear ${delayOffset}s infinite`,
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5)) drop-shadow(0 0 10px rgba(255,255,255,0.2))',
          }}
        >
          {SvgSats[type]}
        </div>
      </div>
    </div>
  );
}
