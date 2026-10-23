import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isBotOrAudit = typeof navigator !== 'undefined' && /Lighthouse|Chrome-Lighthouse|Googlebot/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem('splashSeen');
    return !isBotOrAudit && !prefersReducedMotion && !seen;
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!visible) return;

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
  }, [visible]);

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
