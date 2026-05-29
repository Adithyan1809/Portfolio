import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springCfg = { damping: 22, stiffness: 500, mass: 0.3 };
  const ringCfg  = { damping: 18, stiffness: 160, mass: 0.6 };

  const sdX = useSpring(dotX, springCfg);
  const sdY = useSpring(dotY, springCfg);
  const srX = useSpring(dotX, ringCfg);
  const srY = useSpring(dotY, ringCfg);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => { dotX.set(e.clientX); dotY.set(e.clientY); };
    window.addEventListener('mousemove', onMove);

    const setClass = (add, cls) => (e) => {
      document.querySelector('.c-dot')?.classList[add](cls);
      document.querySelector('.c-ring')?.classList[add](cls);
    };

    const attach = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', setClass('add', 'cursor-hover'));
        el.addEventListener('mouseleave', setClass('remove', 'cursor-hover'));
      });
      document.querySelectorAll('.btn').forEach(el => {
        el.addEventListener('mouseenter', setClass('add', 'cursor-btn'));
        el.addEventListener('mouseleave', setClass('remove', 'cursor-btn'));
      });
    };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    const hide = () => setClass('add', 'cursor-hidden')();
    const show = () => setClass('remove', 'cursor-hidden')();
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      obs.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <motion.div className="c-dot" style={{ x: sdX, y: sdY }} />
      <motion.div className="c-ring" style={{ x: srX, y: srY }} />
    </>
  );
};

export default CustomCursor;
