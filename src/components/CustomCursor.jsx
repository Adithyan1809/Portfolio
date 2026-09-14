import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default'); // default, hover, text, hidden
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor position
  const springConfig = { damping: 28, stiffness: 450, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Contextual hover listener using event delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // 1. Check for data-cursor attribute
      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'explore') {
          setCursorText('EXPLORE ↗');
          setCursorVariant('badge');
          return;
        }
        if (type === 'copy') {
          setCursorText('COPY');
          setCursorVariant('badge');
          return;
        }
        if (type === 'inspect') {
          setCursorText('INSPECT');
          setCursorVariant('badge');
          return;
        }
        if (type === 'play') {
          setCursorText('PLAY');
          setCursorVariant('badge');
          return;
        }
      }

      // 2. Check for general interactive elements
      const interactive = target.closest('a, button, input, textarea, .btn, .interactive-hover');
      if (interactive) {
        setCursorText('');
        setCursorVariant('hover');
        return;
      }

      // 3. Default state
      setCursorText('');
      setCursorVariant('default');
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className={`morphing-cursor-container ${cursorVariant} ${!isVisible ? 'hidden' : ''}`}
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <div className="morphing-cursor-inner">
        {cursorText && <span className="cursor-label mono-text">{cursorText}</span>}
      </div>
    </motion.div>
  );
};

export default CustomCursor;
