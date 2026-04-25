'use client';

export default function AstronautSVG() {
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '280px' }}
    >
      {/* Visor reflection */}
      <defs>
        <radialGradient id="helmetGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#1a1a3e"/>
          <stop offset="100%" stopColor="#000010"/>
        </radialGradient>
        <radialGradient id="visorGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.4)"/>
          <stop offset="50%" stopColor="rgba(155,89,255,0.2)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.8)"/>
        </radialGradient>
        <radialGradient id="bodyGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e8f4fd"/>
          <stop offset="100%" stopColor="#8ba3be"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Backpack / oxygen tank */}
      <rect x="60" y="130" width="80" height="90" rx="10" fill="#c5d8e8" stroke="#8ba3be" strokeWidth="1.5"/>
      <rect x="72" y="140" width="56" height="70" rx="6" fill="#b0c8dc"/>
      <circle cx="100" cy="175" r="15" fill="#8ba3be"/>
      <circle cx="100" cy="175" r="8" fill="#00d4ff" opacity="0.7"/>

      {/* Suit body */}
      <ellipse cx="100" cy="180" rx="55" ry="65" fill="url(#bodyGrad)" stroke="#c5d8e8" strokeWidth="1"/>

      {/* Suit details */}
      <rect x="85" y="155" width="30" height="20" rx="4" fill="#8ba3be" opacity="0.5"/>
      <circle cx="95" cy="165" r="3" fill="#00d4ff" filter="url(#glow)"/>
      <circle cx="105" cy="165" r="3" fill="#ff3366" filter="url(#glow)"/>
      <rect x="88" y="183" width="10" height="4" rx="2" fill="#00d4ff" opacity="0.6"/>
      <rect x="102" y="183" width="10" height="4" rx="2" fill="#00d4ff" opacity="0.6"/>

      {/* Left arm */}
      <ellipse cx="50" cy="180" rx="22" ry="45" fill="url(#bodyGrad)" stroke="#c5d8e8" strokeWidth="1"
        transform="rotate(-10 50 180)"/>
      {/* Left glove */}
      <ellipse cx="38" cy="220" rx="16" ry="12" fill="#8ba3be" stroke="#c5d8e8" strokeWidth="1"/>

      {/* Right arm */}
      <ellipse cx="150" cy="180" rx="22" ry="45" fill="url(#bodyGrad)" stroke="#c5d8e8" strokeWidth="1"
        transform="rotate(10 150 180)"/>
      {/* Right glove */}
      <ellipse cx="162" cy="220" rx="16" ry="12" fill="#8ba3be" stroke="#c5d8e8" strokeWidth="1"/>

      {/* Legs */}
      <rect x="75" y="230" width="22" height="60" rx="10" fill="url(#bodyGrad)" stroke="#c5d8e8" strokeWidth="1"/>
      <rect x="103" y="230" width="22" height="60" rx="10" fill="url(#bodyGrad)" stroke="#c5d8e8" strokeWidth="1"/>
      {/* Boots */}
      <rect x="70" y="280" width="30" height="16" rx="7" fill="#8ba3be"/>
      <rect x="100" y="280" width="30" height="16" rx="7" fill="#8ba3be"/>

      {/* Helmet */}
      <circle cx="100" cy="95" r="55" fill="url(#helmetGrad)" stroke="#c5d8e8" strokeWidth="2"/>

      {/* Visor */}
      <ellipse cx="100" cy="95" rx="38" ry="35" fill="url(#visorGrad)"/>
      {/* Visor reflection */}
      <ellipse cx="86" cy="80" rx="12" ry="9" fill="rgba(255,255,255,0.08)" transform="rotate(-15 86 80)"/>

      {/* Helmet rim */}
      <circle cx="100" cy="95" r="55" fill="none" stroke="rgba(0,212,255,0.4)" strokeWidth="1.5"
        filter="url(#glow)"/>

      {/* Antenna */}
      <line x1="140" y1="55" x2="155" y2="30" stroke="#c5d8e8" strokeWidth="2"/>
      <circle cx="155" cy="28" r="4" fill="#00d4ff" filter="url(#glow)"/>

      {/* Stars through visor */}
      <circle cx="95" cy="88" r="1" fill="rgba(255,255,255,0.6)"/>
      <circle cx="110" cy="96" r="1.5" fill="rgba(0,212,255,0.7)"/>
      <circle cx="88" cy="103" r="1" fill="rgba(155,89,255,0.7)"/>
      <circle cx="115" cy="82" r="1" fill="rgba(255,255,255,0.5)"/>
    </svg>
  );
}
