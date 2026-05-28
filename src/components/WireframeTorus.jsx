import React from 'react';

const WireframeTorus = () => {
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
        top: '-20%',
        right: '-10%',
        opacity: 0.1,
        animation: 'spin-torus 55s linear infinite'
      }}>
        <svg width="900" height="900" viewBox="0 0 100 100" fill="none" stroke="var(--color-text)" strokeWidth="0.2">
          <ellipse cx="50" cy="50" rx="45" ry="25" />
          <ellipse cx="50" cy="50" rx="35" ry="18" />
          <ellipse cx="50" cy="50" rx="25" ry="12" />
          <ellipse cx="50" cy="50" rx="15" ry="6" />
          
          <ellipse cx="50" cy="50" rx="5" ry="25" />
          <ellipse cx="50" cy="50" rx="15" ry="25" />
          <ellipse cx="50" cy="50" rx="25" ry="25" />
          <ellipse cx="50" cy="50" rx="35" ry="25" />
          <ellipse cx="50" cy="50" rx="45" ry="25" />
        </svg>
      </div>
      <style>{`
        @keyframes spin-torus {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WireframeTorus;
