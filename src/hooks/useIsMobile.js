import { useState, useEffect } from 'react';

/**
 * Robust mobile device detection hook.
 * Detects mobile phones (iPhone, Android, etc.) via UserAgent and viewport width.
 * Listens to resize and orientation changes so DevTools toggle also works seamlessly.
 */
export const useIsMobile = (breakpoint = 768) => {
  const checkIsMobile = () => {
    if (typeof window === 'undefined') return false;

    // 1. User-Agent check for mobile phone browsers (iPhone, Android phones, iPod, etc.)
    const ua = navigator.userAgent || navigator.vendor || window.opera || '';
    const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    // 2. Screen width check
    const isNarrowScreen = window.innerWidth <= breakpoint;

    // 3. Touch capability check
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // If it's a mobile User-Agent OR (narrow screen with touch), treat as mobile
    return isMobileUA || (isNarrowScreen && hasTouch) || isNarrowScreen;
  };

  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
