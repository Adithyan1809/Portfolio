import React from 'react';

const WireframeCube = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '-10%',
      left: '-10%',
      opacity: 0.1,
      zIndex: -1,
      pointerEvents: 'none',
      animation: 'spin-cube 50s linear infinite reverse'
    }}>
      <svg width="800" height="800" viewBox="0 0 100 100" fill="none" stroke="var(--color-text)" strokeWidth="0.3">
        <polygon points="30,30 70,30 70,70 30,70" />
        <polygon points="45,15 85,15 85,55 45,55" />
        <line x1="30" y1="30" x2="45" y2="15" />
        <line x1="70" y1="30" x2="85" y2="15" />
        <line x1="70" y1="70" x2="85" y2="55" />
        <line x1="30" y1="70" x2="45" y2="55" />
        <line x1="50" y1="22.5" x2="50" y2="62.5" />
        <line x1="37.5" y1="42.5" x2="77.5" y2="42.5" />
      </svg>
      <style>{`
        @keyframes spin-cube {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WireframeCube;
