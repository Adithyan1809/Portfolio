import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { playHover, playClick, playTheme } = useSoundEffects();

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    playTheme();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const handleLinkClick = (isMobile = false) => {
    playClick();
    if (isMobile) setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-content">
        <div className="logo mono-text">
          <Link to="/" onMouseEnter={playHover} onClick={playClick}>Adithyan P.</Link>
        </div>
        <div className="nav-links mono-text">
          <a href="/#about" onMouseEnter={playHover} onClick={() => handleLinkClick()}>About</a>
          <a href="/#experience" onMouseEnter={playHover} onClick={() => handleLinkClick()}>Experience</a>
          <a href="/#projects" onMouseEnter={playHover} onClick={() => handleLinkClick()}>Projects</a>
          <a href="/#skills" onMouseEnter={playHover} onClick={() => handleLinkClick()}>Skills</a>
          <a href="/#contact" onMouseEnter={playHover} onClick={() => handleLinkClick()}>Contact</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={toggleTheme} 
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
          <a href="/#about" onClick={() => handleLinkClick(true)}>About</a>
          <a href="/#experience" onClick={() => handleLinkClick(true)}>Experience</a>
          <a href="/#projects" onClick={() => handleLinkClick(true)}>Projects</a>
          <a href="/#skills" onClick={() => handleLinkClick(true)}>Skills</a>
          <a href="/#contact" onClick={() => handleLinkClick(true)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
