import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * TextRotate — cycles through an array of phrases with a blur-in/out animation.
 * @param {string[]} phrases   - Array of strings to cycle through
 * @param {number}   interval  - MS between transitions (default 3200)
 * @param {string}   className - Extra class names
 */
const TextRotate = ({ phrases = [], interval = 3200, className = '' }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <span className={`text-rotate-wrapper ${className}`} style={{ display: 'inline-block', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(6px)', y: -8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default TextRotate;
