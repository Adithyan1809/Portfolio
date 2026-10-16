import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

import MobileHome from './MobileHome';
import MobileCaseStudy from './MobileCaseStudy';
import './Mobile.css';

function MobileHeader() {
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    // Read saved theme from localStorage first (fixes dark mode not persisting on mobile)
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  };

  const scrollTo = (id) => {
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="mobile-header">
        <Link to="/" className="mobile-brand">
          <div className="mobile-avatar-initials">AP</div>
          <span className="mobile-brand-name">Adithyan P</span>
        </Link>

        <div className="mobile-header-actions">
          <span className="mobile-status-pill">
            <span className="mobile-status-dot" />
            OPEN
          </span>

          <button 
            type="button" 
            onClick={toggleTheme} 
            className="mobile-header-btn" 
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </header>

      {/* Quick Jump Bar (when on homepage) */}
      {isHome && (
        <nav className="mobile-nav-pills" aria-label="Quick jump">
          <button type="button" onClick={() => scrollTo('projects')} className="mobile-nav-pill-item">
            Projects
          </button>
          <button type="button" onClick={() => scrollTo('skills')} className="mobile-nav-pill-item">
            Skills
          </button>
          <button type="button" onClick={() => scrollTo('experience')} className="mobile-nav-pill-item">
            Experience
          </button>
          <button type="button" onClick={() => scrollTo('contact')} className="mobile-nav-pill-item">
            Contact
          </button>
        </nav>
      )}
    </>
  );
}

export default function MobileApp() {
  return (
    <Router>
      <div className="mobile-app-root">
        <MobileHeader />
        <main>
          <Routes>
            <Route path="/" element={<MobileHome />} />
            <Route path="/projects/:id" element={<MobileCaseStudy />} />
            <Route path="*" element={<MobileHome />} />
          </Routes>
        </main>
        <Analytics />
      </div>
    </Router>
  );
}
