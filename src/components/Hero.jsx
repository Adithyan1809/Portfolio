import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Copy, Check, MapPin, Zap } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
const profileImage = '/profile.webp';
import Constellation from './Constellation';
import TextRotate from './shared/TextRotate';
import HandwrittenAnnotation from './shared/HandwrittenAnnotation';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Hero.css';

/* Spring-morphing status capsule states */
const STATUS_STATES = [
  { label: 'Building', dot: '#10b981', glow: 'rgba(16,185,129,0.2)' },
  { label: 'Deploying', dot: '#f59e0b', glow: 'rgba(245,158,11,0.2)' },
  { label: 'Thinking', dot: '#8b5cf6', glow: 'rgba(139,92,246,0.2)' },
];

const StatusCapsule = ({ playHover }) => {
  const [stateIdx, setStateIdx] = useState(0);
  const current = STATUS_STATES[stateIdx];

  useEffect(() => {
    const t = setInterval(() => setStateIdx(i => (i + 1) % STATUS_STATES.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="hero-status-capsule liquid-glass"
      layout
      style={{ '--capsule-glow': current.glow }}
      onMouseEnter={playHover}
    >
      <span className="capsule-dot ping-dot" style={{ color: current.dot, backgroundColor: current.dot }} />
      <AnimatePresence mode="wait">
        <motion.span
          key={stateIdx}
          initial={{ opacity: 0, width: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="capsule-label mono-text"
          style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          {current.label}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { playHover, playClick, playSuccess } = useSoundEffects();

  /* Profile photo parallax */
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, -50]);
  
  const phrases = [
    "Software Engineer.",
    "Machine Learning Intern.",
    "Building Scalable Tech."
  ];

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('adithyan18092005@gmail.com');
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && typedText === currentPhrase) {
      typingSpeed = 2000;
      const timer = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timer);
    }
    
    if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      const timer = setTimeout(() => {}, 500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setTypedText(prev => 
        isDeleting 
          ? currentPhrase.substring(0, prev.length - 1) 
          : currentPhrase.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <section className="hero" id="home">
      {/* Volumetric sunbeam SVG rays */}
      <svg className="hero-sunbeams" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <filter id="sunbeam-blur">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        <polygon points="900,0 1200,200 1100,0" fill="rgba(99,102,241,0.18)" filter="url(#sunbeam-blur)" />
        <polygon points="950,0 1200,400 1200,100" fill="rgba(139,92,246,0.12)" filter="url(#sunbeam-blur)" />
        <polygon points="800,0 1200,600 1200,200" fill="rgba(6,182,212,0.07)" filter="url(#sunbeam-blur)" />
        <polygon points="1050,0 1200,300 1200,0" fill="rgba(16,185,129,0.06)" filter="url(#sunbeam-blur)" />
        <polygon points="700,0 1200,500 1200,350" fill="rgba(99,102,241,0.05)" filter="url(#sunbeam-blur)" />
      </svg>

      <Constellation />
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge-row">
            <StatusCapsule playHover={playHover} />
            <div className="hero-sub-pill mono-text">
              <span>AI Systems — Distributed Pipelines — Edge Vision</span>
            </div>
          </div>
          <h1 className="hero-title">
            <span style={{ paddingBottom: '0.2em' }}>
              {typedText}<span className="blinking-cursor">_</span>
            </span>
          </h1>
          <p className="hero-tagline">
            <TextRotate
              phrases={[
                'Building Systems That Think.',
                'Deploying Models That Scale.',
                'Shipping Intelligence to Production.',
              ]}
              interval={3200}
            />
          </p>
          <div className="hero-ctas">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <a 
                href="#projects" 
                className="btn btn-primary" 
                onMouseEnter={playHover} 
                onClick={(e) => {
                  playClick();
                  const el = document.getElementById('projects');
                  if (el) {
                    e.preventDefault();
                    if (window.lenis) {
                      window.lenis.scrollTo(el, { offset: -70, duration: 1.5 });
                    } else {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                View My Work <ArrowRight size={16} />
              </a>
              <HandwrittenAnnotation
                note="start here ↓"
                direction="down"
                rotation={-5}
                color="#38bdf8"
                style={{ top: '-46px', left: '16px', right: 'auto' }}
              />
            </div>
            <a href="https://drive.google.com/file/d/1Ae3BQqbOK4oB60SYEHfBo5MVp6R4kEnX/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" onMouseEnter={playHover} onClick={playSuccess}>
              <FileText size={16} /> Resume
            </a>
            <button 
              type="button"
              className="btn btn-secondary copy-email-btn"
              onClick={handleCopyEmail}
              onMouseEnter={playHover}
              title="Copy Email to Clipboard"
            >
              {copied ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              {copied && <span className="copied-tooltip mono-text">adithyan18092005@gmail.com</span>}
            </button>
            <a href="https://github.com/Adithyan1809" target="_blank" rel="noreferrer" className="btn btn-secondary icon-btn" aria-label="GitHub" onMouseEnter={playHover} onClick={playClick}>
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/adithyan-prakash" target="_blank" rel="noreferrer" className="btn btn-secondary icon-btn" aria-label="LinkedIn" onMouseEnter={playHover} onClick={playClick}>
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        <motion.div className="hero-image-wrapper" style={{ y: imageY }}>
          <div className="hero-photo-wrapper" onMouseEnter={playHover}>
            <div className="hero-glass-photo-card liquid-glass">
              <img src={profileImage} alt="Adithyan Prakash" className="profile-img" width="380" height="475" fetchpriority="high" decoding="async" />
              <div className="image-overlay"></div>
            </div>
            
            {/* Floating high-tech micro-badges */}
            <div className="hero-floating-badge badge-top-left liquid-glass">
              <MapPin size={12} className="badge-icon text-cyan" />
              <span className="mono-text">Bengaluru, IN</span>
            </div>

            <div className="hero-floating-badge badge-bottom-right liquid-glass stripe-emerald">
              <Zap size={12} className="badge-icon text-emerald" />
              <span className="mono-text">Sub-50ms Inference</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
