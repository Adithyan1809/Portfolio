import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PageTransitionWrapper = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        className="page-transition-overlay"
        initial={false}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--color-accent)',
          transformOrigin: 'top',
          zIndex: 999998, // Below cursor, above everything else
          pointerEvents: 'none'
        }}
      />
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransitionWrapper;
