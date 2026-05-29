import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show once per session
    const seen = sessionStorage.getItem('splashSeen');
    if (seen) {
      setVisible(false);
      return;
    }

    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('splashSeen', 'true');
    }, 2300);

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
