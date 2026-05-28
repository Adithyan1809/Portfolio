import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('light');

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
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo mono-text">
          <Link to="/">Adithyan P.</Link>
        </div>
        <div className="nav-links mono-text" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="/#about">About</a>
          <a href="/#experience">Experience</a>
          <a href="/#projects">Projects</a>
          <a href="/#skills">Skills</a>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
