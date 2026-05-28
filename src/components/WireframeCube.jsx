import React from 'react';

const CubeSvg = ({ width, height, strokeWidth }) => (
  <svg width={width} height={height} viewBox="0 0 100 100" fill="none" stroke="var(--color-text)" strokeWidth={strokeWidth}>
    <polygon points="30,30 70,30 70,70 30,70" />
    <polygon points="45,15 85,15 85,55 45,55" />
    <line x1="30" y1="30" x2="45" y2="15" />
    <line x1="70" y1="30" x2="85" y2="15" />
    <line x1="70" y1="70" x2="85" y2="55" />
    <line x1="30" y1="70" x2="45" y2="55" />
    <line x1="50" y1="22.5" x2="50" y2="62.5" />
    <line x1="37.5" y1="42.5" x2="77.5" y2="42.5" />
  </svg>
);

const WireframeCube = () => {
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
      {/* Cube 1 (Original, Large, Top Left) */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        opacity: 'var(--shape-opacity-strong)',
        animation: 'spin-cube 50s linear infinite reverse'
      }}>
        <CubeSvg width="800" height="800" strokeWidth="0.3" />
      </div>

      {/* Cube 2 (Medium, Middle Right) */}
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '-5%',
        opacity: 'var(--shape-opacity-light)',
        animation: 'spin-cube 70s linear infinite'
      }}>
        <CubeSvg width="500" height="500" strokeWidth="0.4" />
      </div>

      {/* Cube 3 (Small, Bottom Left/Center) */}
      <div style={{
        position: 'absolute',
        bottom: '-5%',
        left: '25%',
        opacity: 'var(--shape-opacity-med)',
        animation: 'spin-cube 35s linear infinite reverse'
      }}>
        <CubeSvg width="300" height="300" strokeWidth="0.5" />
      </div>

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
