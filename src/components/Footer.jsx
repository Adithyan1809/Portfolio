import React from 'react';
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

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { playHover, playClick } = useSoundEffects();

  return (
    <footer className="site-footer">
      {/* Big CTA banner */}
      <div className="footer-cta-band">
        <div className="container">
          <div className="footer-cta-inner">
            <div>
              <p className="footer-cta-label mono-text">Available for hire</p>
              <h2 className="footer-cta-heading">Let's build something<br />extraordinary.</h2>
            </div>
            <a
              href="mailto:adithyan18092005@gmail.com"
              className="btn btn-primary footer-cta-btn"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              Get In Touch <ArrowUpRight size={18} />
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
                AI & ML Engineer. Building scalable systems that bridge research and production.
              </p>
              <div className="footer-location mono-text">
                <MapPin size={14} />
                <span>Bangalore, India</span>
              </div>
              <div className="footer-status">
                <span className="status-dot-footer" />
                <span className="mono-text">Open to opportunities</span>
              </div>
            </div>

            {/* Nav col */}
            <div className="footer-col">
              <h4 className="footer-col-heading mono-text">Navigate</h4>
              <ul className="footer-nav-list">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-nav-link" onMouseEnter={playHover} onClick={playClick}>
                      <span className="footer-nav-arrow">→</span> {link.label}
                    </a>
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
            <p className="mono-text footer-love">Crafted with precision in Bangalore 🇮🇳</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
