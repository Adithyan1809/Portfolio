import React from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const WireframeGlobe = () => {
  const { playSonar } = useSoundEffects();
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'auto', // changed from none to auto to allow clicks
      zIndex: 0, // brought up slightly
      overflow: 'hidden',
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
    }} onMouseDown={playSonar}>
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        opacity: 'var(--shape-opacity-strong)',
        animation: 'spin-globe 60s linear infinite',
        cursor: 'crosshair'
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
      </div>
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
