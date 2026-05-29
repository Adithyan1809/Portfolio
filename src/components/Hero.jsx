import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../assets/profile.png';
import Constellation from './Constellation';
import AsciiCamera from './AsciiCamera';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Hero.css';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { playHover, playClick, playSuccess } = useSoundEffects();
  
  const phrases = [
    "AI & ML Engineer.",
    "Backend Architect.",
    "Problem Solver."
  ];

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && typedText === currentPhrase) {
      typingSpeed = 2000; // pause before deleting
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
          <div className="hero-badge" onMouseEnter={playHover}>
            <span className="status-dot"></span> STATUS: OPEN TO WORK</div>
          <h1 className="hero-title">
            <span style={{ paddingBottom: '0.2em' }}>
              {typedText}<span className="blinking-cursor">_</span>
            </span>
          </h1>
          <p className="hero-tagline">
            Building scalable AI systems, intelligent backend architectures, and production-grade real-time applications.
          </p>
          
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary" onMouseEnter={playHover} onClick={playClick}>
              View Projects <ArrowRight size={16} />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" download="Adithyan_P_AI_ML_Resume.pdf" className="btn btn-secondary" onMouseEnter={playHover} onClick={playSuccess}>
              <FileText size={16} /> Resume
            </a>
            <a href="https://github.com/Adithyan1809" target="_blank" rel="noreferrer" className="btn btn-secondary icon-btn" aria-label="GitHub" onMouseEnter={playHover} onClick={playClick}>
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/adithyan-prakash" target="_blank" rel="noreferrer" className="btn btn-secondary icon-btn" aria-label="LinkedIn" onMouseEnter={playHover} onClick={playClick}>
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="brutalist-image-container" onMouseEnter={playHover}>
            <img src={profileImage} alt="Adithyan Prakash" className="profile-img" fetchpriority="high" />
            <div className="image-overlay"></div>
          </div>
          <AsciiCamera />
        </div>

      </div>
    </section>
  );
};

export default Hero;
