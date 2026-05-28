import React from 'react';

const WireframeGlobe = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '-20%',
      right: '-10%',
      opacity: 0.1,
      zIndex: -1,
      pointerEvents: 'none',
      animation: 'spin-globe 60s linear infinite'
    }}>
      <svg width="800" height="800" viewBox="0 0 100 100" fill="none" stroke="var(--color-text)" strokeWidth="0.2">
        <circle cx="50" cy="50" r="48" />
        <ellipse cx="50" cy="50" rx="48" ry="24" />
        <ellipse cx="50" cy="50" rx="24" ry="48" />
        <line x1="2" y1="50" x2="98" y2="50" />
        <line x1="50" y1="2" x2="50" y2="98" />
        <ellipse cx="50" cy="50" rx="48" ry="12" />
        <ellipse cx="50" cy="50" rx="12" ry="48" />
        <ellipse cx="50" cy="50" rx="48" ry="36" />
        <ellipse cx="50" cy="50" rx="36" ry="48" />
      </svg>
      <style>{`
        @keyframes spin-globe {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WireframeGlobe;
