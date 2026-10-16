import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Sun, Moon, X, Layers, Cpu, Briefcase, Mail,
  Code2, FileText, Copy, Check, BookOpen
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Analytics } from '@vercel/analytics/react';

import MobileHome from './MobileHome';
import MobileCaseStudy from './MobileCaseStudy';
import ChatWidget from '../components/ChatWidget';
import './Mobile.css';

/* ─────────────────────────────────────────
   LEFT SIDEBAR DRAWER
   ───────────────────────────────────────── */
function MobileSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [emailCopied, setEmailCopied] = useState(false);

  // Navigate to section — waits for sidebar close animation (280ms)
  const handleNav = (id) => {
    onClose();
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 280);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('adithyan18092005@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const navItems = [
    { id: 'projects',      icon: <Layers size={18} />,   label: 'Projects' },
    { id: 'skills',        icon: <Cpu size={18} />,      label: 'Skills' },
    { id: 'experience',    icon: <Briefcase size={18} />, label: 'Experience' },
    { id: 'more-projects', icon: <Code2 size={18} />,    label: 'More Projects' },
    { id: 'contact',       icon: <Mail size={18} />,     label: 'Contact' },
  ];

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`msb-backdrop${isOpen ? ' msb-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Panel ── */}
      <aside
        className={`msb-panel${isOpen ? ' msb-panel--open' : ''}`}
        aria-label="Navigation menu"
      >
        {/* Profile Header */}
        <div className="msb-profile">
          <div className="msb-avatar">AP</div>
          <div className="msb-identity">
            <span className="msb-name">Adithyan Prakash</span>
            <span className="msb-role">AI &amp; ML Engineer</span>
            <span className="msb-open-badge">
              <span className="mobile-status-dot" style={{ width: 6, height: 6 }} />
              Open to Work
            </span>
          </div>
          <button
            type="button"
            className="msb-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="msb-stats">
          <span className="msb-stat-chip msb-stat-indigo">3+ Yrs</span>
          <span className="msb-stat-chip msb-stat-emerald">10+ Systems</span>
          <span className="msb-stat-chip msb-stat-cyan">90+ RTSP</span>
          <span className="msb-stat-chip msb-stat-violet">50K+ LoC</span>
        </div>

        {/* Section Navigation */}
        <nav className="msb-nav">
          <span className="msb-nav-label">NAVIGATE</span>
          {navItems.map(({ id, icon, label }) => (
            <button
              key={id}
              type="button"
              className="msb-nav-item"
              onClick={() => handleNav(id)}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="msb-divider" />

        {/* Quick Actions */}
        <div className="msb-actions">
          <span className="msb-nav-label">QUICK ACTIONS</span>

          <a
            href="https://drive.google.com/file/d/1Ae3BQqbOK4oB60SYEHfBo5MVp6R4kEnX/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="msb-action msb-action--primary"
            onClick={onClose}
          >
            <FileText size={15} /> View Resume (PDF)
          </a>

          <a
            href="https://github.com/Adithyan1809"
            target="_blank"
            rel="noreferrer"
            className="msb-action"
            onClick={onClose}
          >
            <FaGithub size={15} /> GitHub Profile
          </a>

          <a
            href="https://in.linkedin.com/in/adithyan-prakash"
            target="_blank"
            rel="noreferrer"
            className="msb-action"
            onClick={onClose}
          >
            <FaLinkedin size={15} /> LinkedIn
          </a>

          <button type="button" className="msb-action" onClick={copyEmail}>
            {emailCopied ? <Check size={15} style={{ color: '#10b981' }} /> : <Copy size={15} />}
            {emailCopied ? 'Copied to clipboard!' : 'Copy Email'}
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="msb-footer">
          <span>Built with React · Deployed on Vercel</span>
          <span>© {new Date().getFullYear()} Adithyan Prakash</span>
        </div>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────
   TOP HEADER
   ───────────────────────────────────────── */
function MobileHeader({ onOpenSidebar }) {
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
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
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="mobile-header">
        {/* AP avatar — tapping opens the sidebar */}
        <button
          type="button"
          className="mobile-brand"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        >
          <div className="mobile-avatar-initials">AP</div>
          <span className="mobile-brand-name">Adithyan P</span>
        </button>

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

      {/* Quick Jump Bar (homepage only) */}
      {isHome && (
        <nav className="mobile-nav-pills" aria-label="Quick jump">
          <button type="button" onClick={() => scrollTo('projects')} className="mobile-nav-pill-item">Projects</button>
          <button type="button" onClick={() => scrollTo('skills')} className="mobile-nav-pill-item">Skills</button>
          <button type="button" onClick={() => scrollTo('experience')} className="mobile-nav-pill-item">Experience</button>
          <button type="button" onClick={() => scrollTo('contact')} className="mobile-nav-pill-item">Contact</button>
        </nav>
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   ROOT APP
   ───────────────────────────────────────── */
export default function MobileApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <Router>
      <div className="mobile-app-root">
        <MobileHeader onOpenSidebar={() => setSidebarOpen(true)} />
        <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main>
          <Routes>
            <Route path="/" element={<MobileHome />} />
            <Route path="/projects/:id" element={<MobileCaseStudy />} />
            <Route path="*" element={<MobileHome />} />
          </Routes>
        </main>

        <ChatWidget />
        <Analytics />
      </div>
    </Router>
  );
}
