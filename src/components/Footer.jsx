import React, { useState, useEffect } from 'react';
import { Mail, Terminal, ArrowUpRight, MapPin, Zap } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Footer.css';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

/* Letter-stagger nav link */
const StaggerLink = ({ label, href, onMouseEnter, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="footer-nav-link"
      onMouseEnter={() => { setHovered(true); onMouseEnter(); }}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <span className="footer-nav-arrow">→</span>{' '}
      {label.split('').map((char, i) => (
        <span
          key={i}
          className="footer-letter"
          style={{
            transitionDelay: hovered ? `${i * 28}ms` : `${(label.length - i) * 18}ms`,
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          {char}
        </span>
      ))}
    </a>
  );
};

/* Heartbeat status pill */
const HeartbeatPill = () => (
  <div className="footer-heartbeat-pill">
    <span className="heartbeat-dot ping-dot" style={{ color: '#22c55e', backgroundColor: '#22c55e' }} />
    <span className="mono-text heartbeat-label">SYSTEM STATUS · ONLINE</span>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { playHover, playClick } = useSoundEffects();
  const buildDate = import.meta.env.VITE_BUILD_DATE || new Date().toISOString().split('T')[0];

  return (
    <footer className="site-footer">
      {/* Big CTA banner */}
      <div className="footer-cta-band">
        <div className="container">
          <div className="footer-cta-inner">
            <div>
              <p className="footer-cta-label mono-text">Available for opportunities</p>
              <h2 className="footer-cta-heading">Let's build something<br />real together.</h2>
            </div>
            <a
              href="#contact"
              className="btn btn-primary footer-cta-btn"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              Initiate Contact <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">

            {/* Brand col */}
            <div className="footer-col footer-brand-col">
              <h3 className="footer-logo mono-text">ADITHYAN P.</h3>
              <p className="footer-tagline">
                AI & Backend Engineer. Passionate about bringing research concepts into scalable, real-world applications.
              </p>
              <div className="footer-location mono-text">
                <MapPin size={14} />
                <span>Bangalore, India</span>
              </div>
              {/* Heartbeat pill replaces static dot */}
              <HeartbeatPill />
            </div>

            {/* Nav col — letter-stagger links */}
            <div className="footer-col">
              <h4 className="footer-col-heading mono-text">Navigate</h4>
              <ul className="footer-nav-list">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <StaggerLink
                      label={link.label}
                      href={link.href}
                      onMouseEnter={playHover}
                      onClick={playClick}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect col */}
            <div className="footer-col">
              <h4 className="footer-col-heading mono-text">Connect</h4>
              <div className="footer-socials">
                <a href="mailto:adithyan18092005@gmail.com" className="footer-social-link" onMouseEnter={playHover} onClick={playClick}>
                  <Mail size={16} /> <span>Email</span>
                </a>
                <a href="https://github.com/Adithyan1809" target="_blank" rel="noreferrer" className="footer-social-link" onMouseEnter={playHover} onClick={playClick}>
                  <FaGithub size={16} /> <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/adithyan-prakash" target="_blank" rel="noreferrer" className="footer-social-link" onMouseEnter={playHover} onClick={playClick}>
                  <FaLinkedin size={16} /> <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Command palette col */}
            <div className="footer-col">
              <h4 className="footer-col-heading mono-text">Quick Access</h4>
              <div className="footer-cmd-hint mono-text">
                <Terminal size={14} className="cmd-icon" />
                <span>Press <kbd>Ctrl</kbd> + <kbd>K</kbd></span>
              </div>
              <p className="footer-cmd-desc">Open the command palette to navigate instantly.</p>
              <div className="footer-built-badge mono-text">
                <Zap size={12} />
                <span>Built with React + Vite</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom border-top">
        <div className="container">
          <div className="footer-bottom-inner">
            <p className="mono-text">© {currentYear} Adithyan Prakash. All rights reserved.</p>
            <p className="mono-text footer-love">
              Crafted with precision in Bangalore 🇮🇳
              <span className="footer-deploy-stamp"> · LAST DEPLOYED: {buildDate} · Vercel Edge</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
