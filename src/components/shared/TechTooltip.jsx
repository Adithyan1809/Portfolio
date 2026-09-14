import React, { useState, useRef } from 'react';
import './TechTooltip.css';

/**
 * TechTooltip — wraps a technical term with a dotted underline.
 * Hovering reveals a frosted glass tooltip with a plain-English explanation.
 *
 * @param {string} term        - The technical term to display
 * @param {string} explanation - Plain-English explanation
 */
const TechTooltip = ({ term, explanation }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseEnter = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setPosition({ x: rect.left + rect.width / 2, y: rect.top });
    }
    setVisible(true);
  };

  return (
    <span
      ref={ref}
      className="tech-tooltip-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {term}
      <span className={`tech-tooltip-card ${visible ? 'tooltip-visible' : ''}`}>
        <span className="tooltip-term">{term}</span>
        <span className="tooltip-explanation">{explanation}</span>
      </span>
    </span>
  );
};

export default TechTooltip;
