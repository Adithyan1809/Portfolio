import React from 'react';
import { Mail, Terminal } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer border-top">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo mono-text">Adithyan P.</h3>
            <p className="footer-tagline text-muted">
              Building scalable AI systems and production-grade architectures.
            </p>
            <div className="footer-cmd-hint mono-text">
              <Terminal size={14} className="cmd-icon" />
              <span>Press <kbd>Ctrl</kbd> + <kbd>K</kbd> for Command Palette</span>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading mono-text">Connect</h4>
            <div className="social-links">
              <a href="mailto:adithyan18092005@gmail.com" className="social-link" aria-label="Email">
                <Mail size={18} />
                <span>Email</span>
              </a>
              <a href="https://github.com/Adithyan1809" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/adithyan-prakash" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom border-top">
          <p className="mono-text text-muted">
            &copy; {currentYear} Adithyan Prakash. All rights reserved.
          </p>
          <p className="mono-text text-muted" style={{ fontSize: '0.75rem' }}>
            Designed & Built with React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
