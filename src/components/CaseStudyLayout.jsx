import React, { useEffect } from 'react';
import { ArrowLeft, Clock, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import MouseGlow from './MouseGlow';
import ChromaText from './shared/ChromaText';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './CaseStudy.css';

const CaseStudyLayout = ({ title, role, overview, problem, architecture, pipeline, stack, challenges, metrics, links, visualElement }) => {
  const { playHover, playClick, playReverse } = useSoundEffects();

  useEffect(() => {
    playReverse();
  }, [playReverse]);

  return (
    <div className="case-study-page section-rule-lines" style={{ position: 'relative', zIndex: 1 }}>
      <MouseGlow />

      {/* Atmospheric Watermark */}
      <span className="section-watermark-text" aria-hidden="true">BLUEPRINT</span>

      {/* Breadcrumb Top Bar */}
      <div className="container cs-top-bar" style={{ paddingTop: 'calc(var(--nav-height) + 3.5rem)', paddingBottom: '1rem', position: 'relative', zIndex: 2 }}>
        <Link to="/" className="back-link mono-text" onMouseEnter={playHover} onClick={playClick}>
          <ArrowLeft size={16}/> Back to Portfolio
        </Link>
        <div className="cs-meta-badges">
          <span className="status-tag status-tag-emerald mono-text">
            <span className="ping-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
            PRODUCTION SPEC
          </span>
          <span className="cs-read-time mono-text">
            <Clock size={12} /> 4 MIN READ · DEEP DIVE
          </span>
        </div>
      </div>

      {/* Case Study Hero */}
      <header className="case-study-hero section-padding border-bottom">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="status-tag status-tag-indigo mono-text" style={{ marginBottom: '1.25rem' }}>
            <Cpu size={12} /> {role}
          </div>
          <ChromaText as="h1" className="cs-main-title">
            {title}
          </ChromaText>
          <p className="hero-tagline">{overview}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {links?.github && (
              <a
                href={links.github}
                className="btn btn-secondary"
                target="_blank"
                rel="noreferrer"
                data-cursor="explore"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                GitHub Repo
              </a>
            )}
            {links?.demo && (
              <a
                href={links.demo}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
                data-cursor="explore"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Visual Interactive Showcase */}
      {visualElement && (
        <div className="cs-visual-wrapper" data-cursor="inspect" style={{ position: 'relative', zIndex: 1, marginTop: '-3rem' }}>
          {visualElement}
        </div>
      )}

      {/* Main Grid Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="case-study-grid section-padding">
          <div className="main-content">
            <ScrollReveal>
              <section className="cs-section">
                <span className="section-eyebrow mono-text">01 // THE CHALLENGE</span>
                <ChromaText as="h2">Problem &amp; System Constraints</ChromaText>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.75', color: 'var(--color-text-muted)' }}>{problem}</p>
              </section>
            </ScrollReveal>

            {architecture && (
              <section className="cs-section">
                <span className="section-eyebrow mono-text">02 // ARCHITECTURE OVERVIEW</span>
                <ChromaText as="h2">System Topology &amp; Ingestion</ChromaText>
                <div className="architecture-mockup liquid-glass" data-cursor="inspect">
                  {architecture}
                </div>
              </section>
            )}

            {pipeline && (
              <ScrollReveal>
                <section className="cs-section">
                  <span className="section-eyebrow mono-text">03 // EXECUTION FLOW</span>
                  <ChromaText as="h2">AI Pipeline &amp; Inspector</ChromaText>
                  <div data-cursor="inspect">{pipeline}</div>
                </section>
              </ScrollReveal>
            )}

            {challenges && challenges.length > 0 && (
              <ScrollReveal>
                <section className="cs-section">
                  <span className="section-eyebrow mono-text">04 // TECHNICAL HURDLES</span>
                  <ChromaText as="h2">Engineering Challenges Solved</ChromaText>
                  <div className="challenges-list">
                    {challenges.map((c, i) => (
                      <div
                        className="challenge-item liquid-glass stripe-indigo"
                        key={i}
                        data-cursor="inspect"
                        onMouseEnter={playHover}
                      >
                        <div className="challenge-header">
                          <span className="challenge-index mono-text">0{i + 1}</span>
                          <h4 className="challenge-title">{c.title}</h4>
                        </div>
                        <p className="challenge-desc">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="sidebar">
            <ScrollReveal>
              <div className="card sticky-sidebar liquid-glass">
                <span className="section-eyebrow mono-text">ARSENAL</span>
                <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem' }}>Tech Stack</h3>
                <div className="tech-stack-list">
                  {stack?.map(tech => (
                    <span key={tech} className="tech-pill mono-text">{tech}</span>
                  ))}
                </div>

                <hr style={{ borderColor: 'var(--color-border)', margin: '2rem 0', opacity: 0.5 }} />

                <span className="section-eyebrow mono-text">VERIFIED RESULTS</span>
                <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem' }}>Production Metrics</h3>
                <ul className="metrics-list mono-text">
                  {metrics?.map(m => (
                    <li key={m} className="metric-row">
                      <span className="metric-glow-dot ping-dot" style={{ color: '#10b981', background: '#10b981' }} />
                      <span>{m}</span>
                    </li>
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
