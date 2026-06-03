import React, { useRef, useState } from 'react';
import WireframeCube from './WireframeCube';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';
import MagneticButton from './MagneticButton';
import './FeaturedProjects.css';

const projects = [
  {
    id: 'resumepilot',
    title: 'ResumePilot',
    description: 'AI-powered career intelligence platform utilizing a multi-stage AI pipeline for ATS optimization and hallucination-safe content generation.',
    metrics: ['75-Engine Pipeline', 'Zero Hallucinations', 'Scalable Architecture'],
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    github: '#',
  },
  {
    id: 'project-iris',
    title: 'Project IRIS',
    description: 'Real-time surveillance and attendance system processing 90+ live camera feeds using async RTSP/ONVIF pipelines.',
    metrics: ['90+ Camera Feeds', '20% Latency Reduction', 'Real-time Analytics'],
    tech: ['FastAPI', 'Redis', 'ArcFace', 'FAISS'],
    github: '#',
  },
  {
    id: 'mustering-system',
    title: 'Mustering Event System',
    description: 'Real-time personnel accountability system using an edge-cloud architecture. IEEE-submitted research project.',
    metrics: ['IEEE Submitted', 'Edge-Cloud Architecture', 'High Accuracy'],
    tech: ['YOLOv8', 'FaceNet512', 'Deep SORT'],
    github: '#',
  }
];

// Spotlight card with radial gradient following cursor and 3D flip effect
const SpotlightCard = ({ p, playHover, playClick, playPowerUp }) => {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: '50%', y: '50%', opacity: 0 });

  const handleMouseMove = (e) => {
    // Spotlight applies to the front face (or both, depending on setup)
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x: `${x}%`, y: `${y}%`, opacity: 1 });
  };

  const handleMouseLeave = () => setSpotlight(s => ({ ...s, opacity: 0 }));

  return (
    <div
      ref={cardRef}
      className="flip-container spotlight-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
    >
      {/* Spotlight radial gradient - spans the container */}
      <div
        className="card-spotlight"
        style={{
          background: `radial-gradient(circle at ${spotlight.x} ${spotlight.y}, var(--spotlight-color) 0%, transparent 60%)`,
          opacity: spotlight.opacity,
        }}
      />
      
      <div className="flip-inner">
        {/* FRONT FACE */}
        <div className="card project-card flip-front">
          <div className="project-header">
            <h3>{p.title}</h3>
            <div className="project-links">
              <a
                href={p.github}
                aria-label={`View ${p.title} on GitHub`}
                className="icon-btn"
                style={{ color: 'var(--color-text-muted)' }}
                onClick={playClick}
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          <p className="project-desc">{p.description}</p>
        </div>

        {/* BACK FACE */}
        <div className="card project-card flip-back">
          <h3>Key Metrics</h3>
          <div className="project-metrics" style={{ justifyContent: 'center', marginTop: '1rem' }}>
            {p.metrics.map(m => (
              <span key={m} className="metric-badge mono-text">{m}</span>
            ))}
          </div>

          <h3 style={{ marginTop: '1rem' }}>Tech Stack</h3>
          <div className="project-tech" style={{ margin: '1rem 0 2rem 0' }}>{p.tech.join(' • ')}</div>

          <MagneticButton style={{ width: '100%' }}>
            <Link
              to={`/projects/${p.id}`}
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={playPowerUp}
            >
              View Case Study <ArrowRight size={16} />
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
        <h2 style={{ marginBottom: '3rem' }}>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map(p => (
            <SpotlightCard
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
