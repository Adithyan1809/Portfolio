import React from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Marquee.css';

const Marquee = () => {
  const { playGlitchPop } = useSoundEffects();
  const items = [
    "AI SYSTEMS",
    "BACKEND ARCHITECTURE",
    "COMPUTER VISION",
    "MLOPS",
    "SCALABLE DEPLOYMENTS",
    "FASTAPI",
    "REAL-TIME ANALYTICS"
  ];

  return (
    <div className="marquee-container" onMouseEnter={playGlitchPop}>
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, i) => (
            <React.Fragment key={`a-${i}`}>
              <span className="marquee-item" onMouseEnter={playGlitchPop}>{item}</span>
              <span className="marquee-separator">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, i) => (
            <React.Fragment key={`b-${i}`}>
              <span className="marquee-item" onMouseEnter={playGlitchPop}>{item}</span>
              <span className="marquee-separator">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, i) => (
            <React.Fragment key={`c-${i}`}>
              <span className="marquee-item" onMouseEnter={playGlitchPop}>{item}</span>
              <span className="marquee-separator">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
