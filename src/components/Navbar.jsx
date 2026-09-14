import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const [isAudioRippling, setIsAudioRippling] = useState(false);
  
  const { playHover, playClick, playTheme, playAlien } = useSoundEffects();

  useEffect(() => {
    const handleAudioEvent = () => {
      setIsAudioRippling(true);
      setTimeout(() => setIsAudioRippling(false), 220);
    };
    window.addEventListener('portfolio-audio-event', handleAudioEvent);
    return () => window.removeEventListener('portfolio-audio-event', handleAudioEvent);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    const savedMute = localStorage.getItem('portfolio-muted');
    if (savedMute !== null) {
      setIsMuted(savedMute === 'true');
    } else {
      setIsMuted(true);
    }
  }, []);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('portfolio-muted', String(newMuted));
    if (!newMuted) {
      // Small timeout to allow state to update before playing sound
      setTimeout(() => playClick(), 50);
    }
  };

  const toggleTheme = (e) => {
    playTheme();
    const newTheme = theme === 'light' ? 'dark' : 'light';

    const applyTheme = () => {
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    };

    if (!document.startViewTransition) {
      applyTheme();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(applyTheme);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

  const handleLinkClick = (e, targetId, isMobile = false) => {
    playClick();
    if (isMobile) setIsMenuOpen(false);
    if (window.location.pathname === '/' && targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -70, duration: 1.5 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-content">
        <div className="logo mono-text">
          <Link to="/" onMouseEnter={playHover} onClick={playAlien}>Adithyan P.</Link>
        </div>
        <div className="nav-links mono-text">
          <MagneticButton><a href="/#about" onMouseEnter={playHover} onClick={(e) => handleLinkClick(e, 'about')}>About</a></MagneticButton>
          <MagneticButton><a href="/#projects" onMouseEnter={playHover} onClick={(e) => handleLinkClick(e, 'projects')}>Projects</a></MagneticButton>
          <MagneticButton><a href="/#skills" onMouseEnter={playHover} onClick={(e) => handleLinkClick(e, 'skills')}>Skills</a></MagneticButton>
          <MagneticButton><a href="/#experience" onMouseEnter={playHover} onClick={(e) => handleLinkClick(e, 'experience')}>Experience</a></MagneticButton>
          <MagneticButton><a href="/#contact" onMouseEnter={playHover} onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a></MagneticButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={toggleMute} 
            onMouseEnter={playHover}
            className="theme-toggle audio-toggle" 
            aria-label={isMuted ? "Unmute Sounds" : "Mute Sounds"}
            title={isMuted ? "Unmute Sounds" : "Mute Sounds"}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            <span className={`nav-waveform ${!isMuted ? 'active' : ''} ${isAudioRippling ? 'rippling' : ''}`} aria-hidden="true">
              <span className="wave-bar bar-1" />
              <span className="wave-bar bar-2" />
              <span className="wave-bar bar-3" />
            </span>
          </button>
          <button 
            onClick={(e) => toggleTheme(e)} 
            onMouseEnter={playHover}
            className="theme-toggle" 
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button 
            className="mobile-menu-btn mono-text" 
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-dropdown mono-text">
          <a href="/#about" onClick={(e) => handleLinkClick(e, 'about', true)}>About</a>
          <a href="/#projects" onClick={(e) => handleLinkClick(e, 'projects', true)}>Projects</a>
          <a href="/#skills" onClick={(e) => handleLinkClick(e, 'skills', true)}>Skills</a>
          <a href="/#experience" onClick={(e) => handleLinkClick(e, 'experience', true)}>Experience</a>
          <a href="/#contact" onClick={(e) => handleLinkClick(e, 'contact', true)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
