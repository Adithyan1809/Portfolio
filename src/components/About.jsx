import React from 'react';
import NeuralCore3D from './NeuralCore3D';
import './About.css';

const LinkedInBadge = () => (
  <a
    href="https://in.linkedin.com/in/adithyan-prakash"
    target="_blank"
    rel="noopener noreferrer"
    className="li-badge"
    aria-label="View Adithyan P on LinkedIn"
  >
    <div className="li-badge__logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#ffffff">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </div>
    <div className="li-badge__info">
      <span className="li-badge__name">Adithyan P</span>
      <span className="li-badge__title">AI &amp; ML Engineer · Technical Lead Intern</span>
      <span className="li-badge__cta">View Profile →</span>
    </div>
  </a>
);

const About = () => {
  return (
    <section id="about" className="section-padding border-bottom">
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>About</h2>
        <div className="about-grid">
          <div className="about-content">
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              I am an AI &amp; ML undergraduate at DSATM and a Technical Lead Intern at SMAP Technologies. I love exploring the intersection of modern AI models and backend environments, building systems capable of processing large data streams efficiently.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              I'm highly interested in MLOps, asynchronous microservices, and robust software architecture. Rather than simply training isolated models, my goal is to learn and apply the engineering principles required to seamlessly deploy and scale AI infrastructure for the real world.
            </p>
            <LinkedInBadge />
          </div>
          <div className="about-visual">
            <NeuralCore3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
