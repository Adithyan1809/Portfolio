import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile or touch-enabled
    const isTouch = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;
    const isSmall = typeof window !== 'undefined' && window.innerWidth <= 768;
    
    if (isTouch || isSmall) {
      setIsMobile(true);
      return; // Completely disable Lenis on mobile to prevent scroll locking
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical', 
      gestureDirection: 'vertical', 
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
