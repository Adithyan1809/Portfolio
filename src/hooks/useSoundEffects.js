import { useCallback, useRef } from 'react';

export const useSoundEffects = () => {
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
    // Resume context if suspended (browser autoplay policy)
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSound = useCallback((type) => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === 'hover') {
      // Very subtle, high-tech glass 'tick' sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'click') {
      // Solid, deeper mechanical 'thock' sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    }
  }, []);

  return {
    playHover: () => playSound('hover'),
    playClick: () => playSound('click'),
  };
};
