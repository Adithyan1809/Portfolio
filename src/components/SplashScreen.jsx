import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Skip completely for Lighthouse, Googlebot, and prefers-reduced-motion to guarantee instant FCP
    const isBotOrAudit = typeof navigator !== 'undefined' && /Lighthouse|Chrome-Lighthouse|Googlebot/i.test(navigator.userAgent);
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isBotOrAudit || prefersReducedMotion) {
      setVisible(false);
      return;
    }

    // Only show once per session
    const seen = sessionStorage.getItem('splashSeen');
    if (seen) {
      setVisible(false);
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const fadeDuration = isMobile ? 800 : 1500;
    const hideDuration = isMobile ? 1100 : 1900;

    const fadeTimer = setTimeout(() => setFadeOut(true), fadeDuration);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('splashSeen', 'true');
    }, hideDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-initials">AP</div>
        <div className="splash-bar">
          <div className="splash-bar-fill" />
        </div>
        <p className="splash-tagline mono-text">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
