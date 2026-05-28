import React from 'react';

const PyramidSvg = ({ width, height, strokeWidth }) => (
  <svg width={width} height={height} viewBox="0 0 100 100" fill="none" stroke="var(--color-text)" strokeWidth={strokeWidth}>
    <polygon points="50,20 20,75 80,75" />
    <polygon points="50,20 35,65 80,75" />
    <line x1="20" y1="75" x2="35" y2="65" />
    <line x1="50" y1="45" x2="30" y2="70" />
    <line x1="50" y1="45" x2="70" y2="70" />
    <line x1="50" y1="45" x2="42" y2="67" />
    <polygon points="40,35 25,65 70,65" />
  </svg>
);

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
      {/* Pyramid 1 (Original, Large, Bottom Left) */}
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-5%',
        opacity: 0.1,
        animation: 'spin-pyramid 45s linear infinite reverse'
      }}>
        <PyramidSvg width="700" height="700" strokeWidth="0.3" />
      </div>

      {/* Pyramid 2 (Medium, Top Right) */}
      <div style={{
        position: 'absolute',
        top: '-5%',
        right: '2%',
        opacity: 0.07,
        animation: 'spin-pyramid 65s linear infinite'
      }}>
        <PyramidSvg width="450" height="450" strokeWidth="0.4" />
      </div>

      {/* Pyramid 3 (Small, Center Right) */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '30%',
        opacity: 0.05,
        animation: 'spin-pyramid 35s linear infinite reverse'
      }}>
        <PyramidSvg width="250" height="250" strokeWidth="0.5" />
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
