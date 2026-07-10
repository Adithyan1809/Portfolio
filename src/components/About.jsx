import React from 'react';
import NeuralCore3D from './NeuralCore3D';
import './About.css';

const LinkedInBadge = () => (
  <div className="li-badge">
    {/* Header bar */}
    <div className="li-badge__header">
      <svg className="li-badge__wordmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 21" aria-label="LinkedIn">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1 4.98 2.12 4.98 3.5zM.25 7.5H4.73V21H.25V7.5zM7.75 7.5h4.28v1.84h.06c.6-1.13 2.06-2.32 4.23-2.32 4.52 0 5.36 2.97 5.36 6.83V21h-4.48v-6.32c0-1.51-.03-3.45-2.1-3.45-2.11 0-2.43 1.65-2.43 3.34V21H7.75V7.5zM30.18 0h-4.5v21h4.5V0zM36.5 14.77c.13 2.04 1.94 3 4.08 3 1.55 0 3.12-.41 4.43-1.08l.61 3.09C44.1 20.58 42.2 21 40.28 21c-4.83 0-7.63-2.9-7.63-7.38 0-4.16 2.5-7.12 6.84-7.12 4.28 0 6.33 2.97 6.33 6.7 0 .55-.06 1.09-.09 1.57H36.5zm6.86-2.66c0-1.61-.68-3.04-2.47-3.04-1.81 0-2.32 1.43-2.39 3.04h4.86zM57.64 21l-4.26-6.13L51.14 17v4h-4.5V0h4.5v11.7l5.5-4.2h5.2l-5.5 4.87L57.96 21h-4.5l4.18.01zM66.97 3.5c0 1.38-1.11 2.5-2.49 2.5S62 4.88 62 3.5 63.11 1 64.49 1s2.48 1.12 2.48 2.5zM62.25 7.5h4.48V21h-4.48V7.5zM84 14.12c0 4.35-3.02 7.12-7.5 7.12s-7.5-2.77-7.5-7.12 3.02-7.12 7.5-7.12S84 9.77 84 14.12zm-4.6 0c0-2.29-.92-3.9-2.9-3.9s-2.9 1.61-2.9 3.9.92 3.9 2.9 3.9 2.9-1.61 2.9-3.9z" fill="currentColor"/>
      </svg>
    </div>

    {/* Body */}
    <div className="li-badge__body">
      {/* Avatar */}
      <div className="li-badge__avatar" aria-hidden="true">
        <span>AP</span>
      </div>

      {/* Text */}
      <div className="li-badge__info">
        <span className="li-badge__name">Adithyan P</span>
        <span className="li-badge__headline">AI &amp; ML Engineer · Technical Lead Intern at SMAP Technologies</span>
        <span className="li-badge__sub">DSATM · Bengaluru, India</span>
      </div>
    </div>

    {/* CTA */}
    <a
      href="https://in.linkedin.com/in/adithyan-prakash"
      target="_blank"
      rel="noopener noreferrer"
      className="li-badge__btn"
    >
      View Profile
    </a>
  </div>
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
