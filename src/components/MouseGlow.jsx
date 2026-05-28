import React, { useEffect, useRef } from 'react';
import './MouseGlow.css';

const MouseGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        glowRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div className="mouse-glow" ref={glowRef} />;
};

export default MouseGlow;
