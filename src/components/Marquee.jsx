import React from 'react';
import './Marquee.css';

const Marquee = () => {
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
    <div className="marquee-container">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, i) => (
            <React.Fragment key={`a-${i}`}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-separator">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, i) => (
            <React.Fragment key={`b-${i}`}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-separator">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, i) => (
            <React.Fragment key={`c-${i}`}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-separator">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
