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
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const notifyActivity = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('portfolio-audio-event'));
    }
  };

  const playSound = useCallback((type) => {
    const muted = localStorage.getItem('portfolio-muted');
    if (muted === null || muted === 'true') return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    notifyActivity();

    // 1. TACTILE HAPTIC CLICK (Dual-layer mechanical switch click)
    if (type === 'click') {
      // Layer 1: High frequency snap transient
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(1200, ctx.currentTime);
      snapOsc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.015);
      snapGain.gain.setValueAtTime(0.12, ctx.currentTime);
      snapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.018);
      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start(ctx.currentTime);
      snapOsc.stop(ctx.currentTime + 0.02);

      // Layer 2: Warm body thud (satisfying bottom-out)
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(140, ctx.currentTime);
      thudOsc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.04);
      thudGain.gain.setValueAtTime(0.2, ctx.currentTime);
      thudGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);
      thudOsc.start(ctx.currentTime);
      thudOsc.stop(ctx.currentTime + 0.05);
      return;
    }

    // 2. TACTILE MICRO-TICK HOVER (Ultra-subtle, natural glass tap)
    if (type === 'hover') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.012);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.016);
      return;
    }

    // 3. MECHANICAL KEYBOARD TYPING
    if (type === 'type') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const pitch = Math.random() * 200 + 900;
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.026);
      return;
    }

    // 4. PLEASANT SUCCESS HARMONIC CHIME (528Hz & 792Hz)
    if (type === 'success') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(528, ctx.currentTime);
      osc2.frequency.setValueAtTime(792, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime + 0.06);
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
      return;
    }

    // 5. SWOOSH / REVERSE
    if (type === 'swoosh' || type === 'reverse') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const startFreq = type === 'reverse' ? 200 : 800;
      const endFreq = type === 'reverse' ? 800 : 200;
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.17);
      return;
    }

    // Default fallback
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  return {
    playHover: () => playSound('hover'),
    playClick: () => playSound('click'),
    playType: () => playSound('type'),
    playSuccess: () => playSound('success'),
    playError: () => playSound('swoosh'),
    playTheme: () => playSound('swoosh'),
    playTwinkle: () => playSound('hover'),
    playDigital: () => playSound('hover'),
    playLaser: () => playSound('click'),
    playPowerUp: () => playSound('success'),
    playBassDrop: () => playSound('swoosh'),
    playAlien: () => playSound('click'),
    playGlitchPop: () => playSound('hover'),
    playReverse: () => playSound('reverse'),
  };
};
