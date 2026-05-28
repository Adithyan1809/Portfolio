import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    setIsLaunching(true);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Reset launch animation state after it completes
    setTimeout(() => {
      setIsLaunching(false);
    }, 1000);
  };

  // The strokeDasharray is circumference of circle (2 * Math.PI * r)
  // r = 22, circumference ≈ 138.2
  const circleRadius = 22;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div 
      className={`scroll-to-top-container ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      title="Back to top"
    >
      <svg width="60" height="60" viewBox="0 0 60 60" className="progress-ring">
        <circle
          className="progress-ring__circle-bg"
          stroke="var(--color-border)"
          strokeWidth="2"
          fill="transparent"
          r={circleRadius}
          cx="30"
          cy="30"
        />
        <circle
          className="progress-ring__circle"
          stroke="var(--color-text)"
          strokeWidth="2"
          fill="transparent"
          r={circleRadius}
          cx="30"
          cy="30"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className={`aeroplane-container ${isLaunching ? 'launching' : ''}`}>
        <Plane size={20} strokeWidth={2.5} />
      </div>
      <div className="tooltip mono-text">TOP</div>
    </div>
  );
};

export default ScrollToTop;
