import React from 'react';
import { useIsMobile } from './hooks/useIsMobile';
import DesktopApp from './DesktopApp';
import MobileApp from './mobile/MobileApp';

/**
 * Main application router.
 * Detects device environment:
 * - Mobile phones (iPhone, Android, small touch screens): Renders high-performance dedicated MobileApp.
 * - Laptops / Desktops: Renders the full interactive 3D desktop portfolio untouched.
 */
function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileApp />;
  }

  return <DesktopApp />;
}

export default App;
