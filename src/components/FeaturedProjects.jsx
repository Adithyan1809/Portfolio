import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './FeaturedProjects.css';

const projects = [
  {
    id: 'resumepilot',
    title: 'ResumePilot',
    description: 'AI-powered career intelligence platform utilizing a multi-stage AI pipeline for ATS optimization and hallucination-safe content generation.',
    metrics: ['75-Engine Pipeline', 'Zero Hallucinations', 'Scalable Architecture'],
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker']
  },
  {
    id: 'project-iris',
    title: 'Project IRIS',
    description: 'Real-time surveillance and attendance system processing 90+ live camera feeds using async RTSP/ONVIF pipelines.',
    metrics: ['90+ Camera Feeds', '20% Latency Reduction', 'Real-time Analytics'],
    tech: ['FastAPI', 'Redis', 'ArcFace', 'FAISS']
  },
  {
    id: 'mustering-system',
    title: 'Mustering Event System',
    description: 'Real-time personnel accountability system using an edge-cloud architecture. IEEE-submitted research project.',
    metrics: ['IEEE Submitted', 'Edge-Cloud Architecture', 'High Accuracy'],
    tech: ['YOLOv8', 'FaceNet512', 'Deep SORT']
  }
];

const FeaturedProjects = () => {
  return (
    <section id="projects" className="section-padding border-bottom" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundMarquee text="PROJECTS" reverse={true} />
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map(p => (
            <div className="card project-card" key={p.id}>
              <div className="project-header">
                <h3>{p.title}</h3>
                <div className="project-links">
                  <a href="#" aria-label={`View ${p.title} on GitHub`} className="icon-btn" style={{color: 'var(--color-text-muted)'}}><FaGithub size={20}/></a>
                </div>
              </div>
              <p className="project-desc">{p.description}</p>
              
              <div className="project-metrics">
                {p.metrics.map(m => (
                  <span key={m} className="metric-badge mono-text">{m}</span>
                ))}
              </div>
              
              <div className="project-tech">
                {p.tech.join(' • ')}
              </div>
              
              <div style={{marginTop: '2rem'}}>
                <Link to={`/projects/${p.id}`} className="btn btn-secondary" style={{width: '100%'}}>
                  View Case Study <ArrowRight size={16}/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
