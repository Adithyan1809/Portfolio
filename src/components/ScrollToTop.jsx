import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Plane } from 'lucide-react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  // Use Framer Motion for ultra-smooth scroll tracking
  const { scrollYProgress } = useScroll();
  
  // Spring physics for fluid, snappy movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  // Calculate the SVG circle properties
  const circleRadius = 22;
  const circumference = 2 * Math.PI * circleRadius;
  
  // Transform the 0-1 spring progress into the exact stroke dash offset
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
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
        <motion.circle
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
        <div className="wind-lines">
          <span className="wind-line line-1"></span>
          <span className="wind-line line-2"></span>
          <span className="wind-line line-3"></span>
        </div>
        <Plane size={20} strokeWidth={2.5} />
      </div>
    
    </div>
  );
};

export default ScrollToTop;
