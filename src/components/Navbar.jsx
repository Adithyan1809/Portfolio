import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('light');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-content">
        <div className="logo mono-text">
          <Link to="/">Adithyan P.</Link>
        </div>
        <div className="nav-links mono-text">
          <a href="/#about">About</a>
          <a href="/#experience">Experience</a>
          <a href="/#projects">Projects</a>
          <a href="/#skills">Skills</a>
          <a href="/#contact">Contact</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button 
            className="mobile-menu-btn mono-text" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-dropdown mono-text">
          <a href="/#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="/#experience" onClick={() => setIsMenuOpen(false)}>Experience</a>
          <a href="/#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="/#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
          <a href="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
