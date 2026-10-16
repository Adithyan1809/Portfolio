import React, { useEffect, useRef, useState } from 'react';
import './ScrollReveal.css';

const ScrollReveal = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check immediately if already in view on mount / reload
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
        setIsVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
        rootMargin: '120px 0px 120px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal-container ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
