import React, { useRef, useEffect, useState } from 'react';
import './HandwrittenAnnotation.css';

/**
 * HandwrittenAnnotation — renders a cursive note + squiggly SVG arrow.
 * Appears when the parent element enters the viewport.
 *
 * @param {string} note        - The cursive note text
 * @param {string} direction   - 'left' | 'right' | 'down' (arrow direction)
 * @param {number} rotation    - CSS rotation in degrees (default 0)
 * @param {string} color       - CSS color string (default '#a78bfa')
 * @param {string} className   - Extra class names
 * @param {object} style       - Extra styles
 */
const HandwrittenAnnotation = ({ note, direction = 'right', rotation = 0, color = '#a78bfa', className = '', style = {} }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const arrowPaths = {
    right: 'M2,12 C10,2 20,20 30,10 C38,2 42,18 50,12',
    left:  'M50,12 C42,2 32,20 22,10 C14,2 8,18 2,12',
    down:  'M12,2 C2,10 20,20 10,30 C2,38 18,42 12,50',
  };

  const arrowHead = {
    right: 'M44,6 L52,12 L44,18',
    left:  'M8,6 L2,12 L8,18',
    down:  'M6,44 L12,52 L18,44',
  };

  return (
    <span
      ref={ref}
      className={`handwritten-annotation ${visible ? 'annotation-visible' : ''} ${className}`}
      style={{ '--annotation-color': color, transform: `rotate(${rotation}deg)`, ...style }}
    >
      <span className="annotation-note">{note}</span>
      <svg
        className="annotation-arrow"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={arrowPaths[direction]}
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arrow-path"
        />
        <path
          d={arrowHead[direction]}
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="arrow-head"
        />
      </svg>
    </span>
  );
};

export default HandwrittenAnnotation;
