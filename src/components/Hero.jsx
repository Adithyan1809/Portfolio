import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileText, Copy, Check, MapPin, Zap } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
const profileImage = '/profile.webp';
import Constellation from './Constellation';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Hero.css';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { playHover, playClick, playSuccess } = useSoundEffects();

  // Profile photo parallax — moves at 40% of scroll speed (slower = behind)
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
      <Constellation />
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge-row">
            <div className="hero-badge liquid-glass stripe-emerald" onMouseEnter={playHover}>
              <span className="status-dot"></span> STATUS: OPEN TO WORK
            </div>
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
            Bridging the gap between AI concepts and real-world implementation — designing, building, and scaling resilient architectures that power complex models.
          </p>
          <div className="hero-ctas">
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
              View Projects <ArrowRight size={16} />
            </a>
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
