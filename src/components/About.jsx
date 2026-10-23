import React from 'react';
import ChromaText from './shared/ChromaText';
import { Link } from 'react-router-dom';
import { Video, Zap, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import Neural3DCore from './Neural3DCore';
import './About.css';

const recruiterPillars = [
  {
    icon: Video,
    colorClass: 'pillar-emerald',
    title: 'Edge Computer Vision at Scale',
    metric: '90+ live camera feeds',
    desc: 'Engineered async RTSP/ONVIF ingestion pipelines at 24fps with zero dropped frames. Production deployed, not test streams.'
  },
  {
    icon: Zap,
    colorClass: 'pillar-indigo',
    title: 'Sub-4ms Vector Retrieval',
    metric: '< 3.8ms latency',
    desc: 'Mapped ArcFace 512D facial embeddings into FAISS IndexFlatIP for instant cosine similarity verification under peak load.'
  },
  {
    icon: ShieldCheck,
    colorClass: 'pillar-violet',
    title: 'Zero-Hallucination LLM Pipelines',
    metric: '75 analysis stages',
    desc: 'Designed deterministic multi-engine guardrails and validation layers for ResumePilot to prevent unreliable AI outputs.'
  },
  {
    icon: Users,
    colorClass: 'pillar-cyan',
    title: 'Squad Technical Leadership',
    metric: '11 engineers led',
    desc: 'Unblocked and coordinated a cross-functional engineering team at SMAP Technologies across inference, backends, and Docker.'
  }
];

export default function About() {
  const { playHover } = useSoundEffects();

  return (
    <section id="about" className="section-padding border-bottom section-rule-lines">
      {/* Background Watermark */}
      <span className="section-watermark-text" aria-hidden="true">ENGINEER</span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Status Pill */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="status-tag status-tag-emerald" style={{ fontSize: '0.68rem' }}>
            <span className="status-dot" style={{ width: 6, height: 6, marginRight: 6 }} />
            AVAILABLE FOR HIRE: AI/ML &amp; SWE ROLES (FULL-TIME &amp; INTERNSHIPS)
          </span>
        </div>

        <div className="section-header-row" style={{ marginBottom: '3rem' }}>
          <span className="section-eyebrow mono-text">CANDIDATE DOSSIER</span>
          <ChromaText as="h2" className="section-title">
            The Engineer Behind the Systems
          </ChromaText>
          <p className="section-subtitle">
            Most machine learning projects stall in a Jupyter notebook. I engineer the distributed backends, async ingestion, and containerized runtimes that keep them alive in production.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Recruiter-Catchy Story & Pillars */}
          <div className="about-content">
            <div className="about-bio-statement">
              <p className="about-lead">
                I'm <strong>21</strong>, based in <strong>Bengaluru</strong>. I specialize in the high-stakes gap between a trained model's weights and a 99.9% uptime production deployment.
              </p>
              <p className="about-subtext">
                As a Technical Lead Intern at SMAP Technologies, I didn't just write scripts — I architected multi-camera computer vision infrastructure, established low-latency vector indexing, and unblocked an engineering squad.
              </p>
            </div>

            {/* 4 Outcome-Driven Pillars */}
            <div className="about-pillars-grid">
              {recruiterPillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className={`about-pillar-card ${pillar.colorClass} liquid-glass`} onMouseEnter={playHover}>
                    <div className="pillar-header">
                      <div className="pillar-icon-box">
                        <Icon size={17} />
                      </div>
                      <span className="pillar-metric mono-text">{pillar.metric}</span>
                    </div>
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-desc">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Core Philosophy Quote Callout */}
            <div className="about-quote-box liquid-glass">
              <span className="quote-accent-bar" />
              <p className="quote-text">
                "The measure of an AI engineer isn't how well a model runs on curated test splits, but how gracefully it recovers under real-world network drops, noisy feeds, and concurrent traffic."
              </p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/about" className="btn btn-secondary mono-text" onMouseEnter={playHover} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Read Full Story &amp; Journey (/about) <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive 3D Neural Core Hologram */}
          <div className="about-visual">
            <Neural3DCore />
          </div>
        </div>
      </div>
    </section>
  );
}
