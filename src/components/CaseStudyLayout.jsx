import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import MouseGlow from './MouseGlow';
import './CaseStudy.css';

const CaseStudyLayout = ({ title, role, overview, problem, architecture, pipeline, stack, challenges, metrics, links, visualElement }) => {
  return (
    <div className="case-study-page" style={{ position: 'relative', zIndex: 1 }}>
      <MouseGlow />
      <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', paddingBottom: '1rem', position: 'relative', zIndex: 2 }}>
        <Link to="/" className="back-link mono-text"><ArrowLeft size={16}/> Back to Portfolio</Link>
      </div>

      <header className="case-study-hero section-padding border-bottom">
        <div className="container">
          <div className="hero-badge mono-text" style={{marginBottom: '1.5rem'}}>{role}</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>{title}</h1>
          <p className="hero-tagline">{overview}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            {links?.github && <a href={links.github} className="btn btn-secondary" target="_blank" rel="noreferrer">GitHub Repo</a>}
            {links?.demo && <a href={links.demo} className="btn btn-primary" target="_blank" rel="noreferrer">Live Demo</a>}
          </div>
        </div>
      </header>

      {visualElement && (
        <div style={{ position: 'relative', zIndex: 1, marginTop: '-4rem' }}>
          {visualElement}
        </div>
      )}

      <div className="container">
        <div className="case-study-grid section-padding">
          <div className="main-content">
            <ScrollReveal>
              <section className="cs-section">
                <h2>Problem Statement</h2>
                <p>{problem}</p>
              </section>
            </ScrollReveal>

            {architecture && (
              <section className="cs-section">
                <h2>System Architecture</h2>
                <div className="architecture-mockup">
                  {architecture}
                </div>
              </section>
            )}

            {pipeline && (
              <ScrollReveal>
                <section className="cs-section">
                  <h2>AI Pipeline & Workflow</h2>
                  <div>{pipeline}</div>
                </section>
              </ScrollReveal>
            )}

            <ScrollReveal>
              <section className="cs-section">
                <h2>Engineering Challenges Solved</h2>
                <div className="challenges-list">
                  {challenges.map((c, i) => (
                    <div className="challenge-item card" key={i}>
                      <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{c.title}</h4>
                      <p style={{ fontSize: '0.95rem' }}>{c.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>

          <aside className="sidebar">
            <ScrollReveal>
              <div className="card sticky-sidebar">
                <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Tech Stack</h3>
                <div className="tech-stack-list">
                  {stack.map(tech => (
                    <span key={tech} className="skill-tag mono-text">{tech}</span>
                  ))}
                </div>

                <hr style={{ borderColor: 'var(--color-border)', margin: '2rem 0' }} />

                <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Key Metrics</h3>
                <ul className="metrics-list mono-text">
                  {metrics.map(m => (
                    <li key={m} style={{ marginBottom: '1rem' }}>- {m}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyLayout;
