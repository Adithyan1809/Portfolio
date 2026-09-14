import React, { Suspense, lazy } from 'react';
import TechTooltip from './shared/TechTooltip';
import ChromaText from './shared/ChromaText';
import TextRotate from './shared/TextRotate';
import './About.css';

const NeuralCore3D = lazy(() => import('./NeuralCore3D'));

const LinkedInBadge = () => (
  <div className="li-badge">
    <div className="li-badge__header">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#ffffff" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      <span className="li-badge__wordmark-text">LinkedIn</span>
    </div>
    <div className="li-badge__body">
      <div className="li-badge__avatar" aria-hidden="true">
        <span>AP</span>
      </div>
      <div className="li-badge__info">
        <span className="li-badge__name">Adithyan P</span>
        <span className="li-badge__headline">AI &amp; ML Engineer · Technical Lead Intern at SMAP Technologies</span>
        <span className="li-badge__sub">DSATM · Bengaluru, India</span>
      </div>
    </div>
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
    <section id="about" className="section-padding border-bottom section-rule-lines" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <span className="section-watermark-text" aria-hidden="true">HUMAN</span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Currently badge */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="status-tag status-tag-emerald" style={{ fontSize: '0.68rem' }}>
            <span className="status-dot" style={{ width: 6, height: 6, marginRight: 6 }} />
            CURRENTLY: OPEN TO FULL-TIME ROLES · 2027
          </span>
        </div>

        <ChromaText as="h2" style={{ marginBottom: '3rem' }}>
          The Builder Behind the Systems
        </ChromaText>

        <div className="about-grid">
          <div className="about-content">
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text)', lineHeight: '1.75', marginBottom: '1.5rem' }}>
              I'm 20, from Bengaluru, and I build AI systems that run in the real world — not just in notebooks.
              I led a team of 6 engineers, deployed{' '}
              <strong>90+ camera feeds in production</strong>, and shipped inference pipelines that never hallucinate.
              I believe the gap between a trained model and a production system is where the real engineering happens — and that gap is where I live.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.75', marginBottom: '2rem' }}>
              I'm deep into{' '}
              <TechTooltip
                term="MLOps"
                explanation="The engineering discipline of deploying, monitoring, and maintaining ML models in production — the bridge between data science and software engineering."
              />{', '}
              asynchronous microservices, and the kind of robust architecture that doesn't fall apart under real load.
              I use{' '}
              <TechTooltip
                term="FAISS"
                explanation="Facebook AI Similarity Search — a library for fast nearest-neighbor vector lookups at scale. Used here for sub-4ms facial recognition."
              />{' '}
              and{' '}
              <TechTooltip
                term="ArcFace"
                explanation="State-of-the-art facial recognition embedding model that uses angular margin loss for tight, discriminative face clusters."
              />{' '}
              in production.
              Not as demo projects. As systems that handle real throughput.
            </p>
            <LinkedInBadge />
          </div>
          <div className="about-visual">
            <Suspense fallback={<div style={{ minHeight: '320px', width: '100%' }} />}>
              <NeuralCore3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
