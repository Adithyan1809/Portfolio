import React, { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*&%';

const GlitchText = ({ children, as: Component = 'span', className = '', ...props }) => {
  const [text, setText] = useState(children);
  const originalText = children?.toString() || '';
  const intervalRef = useRef(null);

  const startGlitch = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText((prev) => {
        return originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            // Preserve spaces
            if (letter === ' ') return ' ';
            // Generate random char
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; // Speed of resolving (lower = slower)
    }, 30);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <Component 
      className={className} 
      onMouseEnter={startGlitch}
      {...props}
      style={{ display: 'inline-block', ...props.style }}
    >
      {text}
    </Component>
  );
};

export default GlitchText;
