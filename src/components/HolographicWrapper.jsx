import React, { useState, useEffect, useRef } from 'react';
import './HolographicWrapper.css';

const HolographicWrapper = ({ children }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Don't apply effect on mobile devices (touch screens)
      if (window.innerWidth <= 768) return;

      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      // Very subtle rotation: max 2 degrees
      const rotateX = y * -2;
      const rotateY = x * 2;

      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      // Reset when mouse leaves window
      setRotation({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className="holographic-wrapper"
      style={{
        transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <div className="holographic-glow" style={{
        transform: `translate(${rotation.y * -10}px, ${rotation.x * 10}px)`
      }} />
      {children}
    </div>
  );
};

export default HolographicWrapper;
