import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../assets/profile.png';
import './Hero.css';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "AI & ML Undergraduate";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="bg-grid"></div>
      <div className="container hero-container">
        
        <div className="hero-content">
          <div className="hero-badge">
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
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={16} />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" download="Adithyan_P_AI_ML_Resume.pdf" className="btn btn-secondary">
              <FileText size={16} /> Resume
            </a>
            <a href="https://github.com/Adithyan1809" target="_blank" rel="noreferrer" className="btn btn-secondary icon-btn" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/adithyan-prakash" target="_blank" rel="noreferrer" className="btn btn-secondary icon-btn" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="brutalist-image-container">
            <img src={profileImage} alt="Adithyan Prakash" className="profile-img" fetchpriority="high" />
            <div className="image-overlay"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
