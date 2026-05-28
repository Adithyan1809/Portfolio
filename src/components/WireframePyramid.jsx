import React from 'react';

const WireframePyramid = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden',
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
    }}>
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-5%',
        opacity: 0.1,
        animation: 'spin-pyramid 45s linear infinite reverse'
      }}>
        <svg width="700" height="700" viewBox="0 0 100 100" fill="none" stroke="var(--color-text)" strokeWidth="0.3">
          <polygon points="50,20 20,75 80,75" />
          <polygon points="50,20 35,65 80,75" />
          <line x1="20" y1="75" x2="35" y2="65" />
          <line x1="50" y1="45" x2="30" y2="70" />
          <line x1="50" y1="45" x2="70" y2="70" />
          <line x1="50" y1="45" x2="42" y2="67" />
          <polygon points="40,35 25,65 70,65" />
        </svg>
      </div>
      <style>{`
        @keyframes spin-pyramid {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WireframePyramid;
