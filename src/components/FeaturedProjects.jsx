import React, { useRef, useState } from 'react';
import WireframeCube from './WireframeCube';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Cpu, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';
import MagneticButton from './MagneticButton';
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
    description: 'AI-powered career intelligence platform utilizing a multi-stage pipeline for ATS optimization and hallucination-safe content generation.',
    impact: '75-Engine Pipeline — Zero Hallucinations — Production Scale',
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
    description: 'Real-time surveillance and biometric attendance system processing 90+ live camera feeds with async RTSP/ONVIF ingestion.',
    impact: '90+ Camera Streams — Async RTSP/ONVIF — 20% Latency Drop',
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
    description: 'Real-time personnel accountability system using an edge-cloud architecture with multi-camera re-identification.',
    impact: 'Edge-Cloud Architecture — IEEE Submitted — Real-Time DeepSORT',
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
          background: `radial-gradient(circle at ${mousePos.x} ${mousePos.y}, var(--spotlight-color) 0%, transparent 70%)`,
          opacity: mousePos.opacity,
        }}
      />

      <div className="project-card-inner">
        {/* Top bar: Status tag + GitHub */}
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

        {/* Title and Category */}
        <div className="card-title-group">
          <span className="card-category-label mono-text">{p.category}</span>
          <h3 className="card-project-title">{p.title}</h3>
        </div>

        {/* Description in Inter */}
        <p className="card-project-desc">{p.description}</p>

        {/* Recruiter Impact Line with Em Dashes */}
        <div className="card-impact-box">
          <span className="impact-label mono-text">SYSTEM IMPACT</span>
          <p className="impact-text mono-text">{p.impact}</p>
        </div>

        {/* Tech Stack Pills */}
        <div className="card-tech-stack">
          {p.tech.map((t) => (
            <span key={t} className="tech-pill mono-text">{t}</span>
          ))}
        </div>

        {/* Case Study CTA Button */}
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
    <section id="projects" className="section-padding border-bottom" style={{ position: 'relative', overflow: 'hidden' }}>
      <WireframeCube />
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow mono-text">CORE SYSTEMS &amp; RESEARCH</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <p className="section-subtitle">
            Production ML systems, edge vision pipelines, and scalable distributed architectures built for real-world reliability.
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
