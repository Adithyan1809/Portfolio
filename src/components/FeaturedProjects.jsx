import React, { useRef, useState } from 'react';
import WireframeCube from './WireframeCube';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Cpu, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';
import MagneticButton from './MagneticButton';
import ChromaText from './shared/ChromaText';
import HandwrittenAnnotation from './shared/HandwrittenAnnotation';
import TechTooltip from './shared/TechTooltip';
import './FeaturedProjects.css';

const projects = [
  {
    id: 'resumepilot',
    title: 'ResumePilot',
    category: 'Production AI System',
    status: 'ACTIVE PIPELINE',
    stripeClass: 'stripe-indigo',
    badgeClass: 'status-tag-indigo',
    icon: Activity,
    description: 'AI-powered career intelligence platform with a multi-stage LLM pipeline for ATS optimization. Context-aware follow-ups, not scripted loops.',
    impact: 'Not just resume scoring — 75 specialized analysis engines with hallucination-safe guardrails on every output.',
    impactNote: 'zero hallucinations. verified.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/Adithyan1809/resumepilot',
  },
  {
    id: 'project-iris',
    title: 'Project IRIS',
    category: 'Computer Vision & Edge',
    status: '90+ RTSP STREAMS LIVE',
    stripeClass: 'stripe-emerald',
    badgeClass: 'status-tag-emerald',
    icon: Cpu,
    description: 'Real-time surveillance and biometric attendance system. 90+ live cameras — not test streams. ArcFace embeddings at 24fps, no dropped frames.',
    impact: 'Not just 90+ feeds — continuous ArcFace embeddings with sub-4ms cosine retrieval across every registered identity.',
    impactNote: 'wild, right?',
    tech: ['FastAPI', 'Redis', 'ArcFace', 'FAISS'],
    github: 'https://github.com/Adithyan1809',
  },
  {
    id: 'mustering-system',
    title: 'Mustering Event System',
    category: 'Distributed Edge-Cloud',
    status: 'IEEE SUBMITTED RESEARCH',
    stripeClass: 'stripe-violet',
    badgeClass: 'status-tag-violet',
    icon: Layers,
    description: 'Real-time personnel accountability using edge-cloud architecture with multi-camera re-identification. Submitted to IEEE.',
    impact: 'Edge-cloud coordination with DeepSORT re-id across camera zones — built for environments where missing a person costs lives.',
    impactNote: 'IEEE-level work.',
    tech: ['YOLOv8', 'FaceNet512', 'Deep SORT'],
    github: 'https://github.com/Adithyan1809',
  }
];

const ProjectCard = ({ p, playHover, playClick, playPowerUp }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%', opacity: 0 });
  const IconComponent = p.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: `${x}%`, y: `${y}%`, opacity: 1 });
  };

  const handleMouseLeave = () => setMousePos(prev => ({ ...prev, opacity: 0 }));

  return (
    <div
      ref={cardRef}
      className={`project-glass-card liquid-glass ${p.stripeClass}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
    >
      <div
        className="card-sheen"
        style={{
          background: `radial-gradient(400px at ${mousePos.x} ${mousePos.y}, var(--spotlight-color) 0%, transparent 70%)`,
          opacity: mousePos.opacity,
        }}
      />

      <div className="project-card-inner">
        {/* Top bar */}
        <div className="card-top-bar">
          <span className={`status-tag ${p.badgeClass}`}>
            <IconComponent size={12} className="status-icon" />
            {p.status}
          </span>
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${p.title} on GitHub`}
            className="icon-btn"
            onClick={playClick}
          >
            <FaGithub size={18} />
          </a>
        </div>

        {/* Title */}
        <div className="card-title-group">
          <span className="card-category-label mono-text">{p.category}</span>
          <h3 className="card-project-title">{p.title}</h3>
        </div>

        {/* Description */}
        <p className="card-project-desc">{p.description}</p>

        {/* Proof-framed Impact Box */}
        <div className="card-impact-box" style={{ position: 'relative' }}>
          <span className="impact-label mono-text">SYSTEM IMPACT</span>
          <p className="impact-text mono-text">{p.impact}</p>
          <span className="impact-verified mono-text">// verified in production</span>
          <HandwrittenAnnotation
            note={p.impactNote}
            direction="right"
            rotation={-8}
            color="#a78bfa"
          />
        </div>

        {/* Tech Stack */}
        <div className="card-tech-stack">
          {p.tech.map((t) => (
            <span key={t} className="tech-pill mono-text">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="card-cta-row">
          <MagneticButton style={{ width: '100%' }}>
            <Link
              to={`/projects/${p.id}`}
              className="btn btn-secondary card-view-btn"
              onClick={playPowerUp}
            >
              Explore Architecture <ArrowRight size={15} />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const { playHover, playClick, playPowerUp } = useSoundEffects();

  return (
    <section id="projects" className="section-padding border-bottom section-rule-lines" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <span className="section-watermark-text" aria-hidden="true">CRAFT</span>

      <WireframeCube />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow mono-text">CORE SYSTEMS &amp; RESEARCH</span>
            <ChromaText as="h2" className="section-title">What I've Actually Shipped</ChromaText>
          </div>
          <p className="section-subtitle">
            Production ML systems, edge vision pipelines, and distributed architectures built for real-world reliability — not portfolios.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map(p => (
            <ProjectCard
              key={p.id}
              p={p}
              playHover={playHover}
              playClick={playClick}
              playPowerUp={playPowerUp}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
