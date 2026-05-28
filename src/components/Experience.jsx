import React from 'react';
import './Experience.css';

const experiences = [
  {
    id: 1,
    role: 'Technical Lead Intern',
    company: 'SMAP Technologies',
    date: 'Sep 2025 – Jan 2026',
    description: 'Architected scalable backend using FastAPI, PostgreSQL, and Redis; built async RTSP/ONVIF pipelines with ArcFace/FaceNet + FAISS for real-time face recognition across 90+ camera feeds. Led and mentored a cross-functional AI, backend, and DevOps team.',
  },
  {
    id: 2,
    role: 'Leadership Position',
    company: 'ALMAtron',
    date: '2024 – Present',
    description: 'Led technical initiatives and mentored junior members in AI and machine learning concepts.',
  },
  {
    id: 3,
    role: 'Leadership Position',
    company: 'Gaming Club',
    date: '2024 – Present',
    description: 'Organized and managed large-scale gaming events, coordinating logistics and technical setups.',
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding border-bottom" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="bg-ruled"></div>
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>Experience</h2>
        <div className="timeline">
          {experiences.map(exp => (
            <div className="timeline-item" key={exp.id}>
              <div className="timeline-dot"></div>
              <div className="timeline-content card">
                <div className="timeline-header">
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>{exp.role}</h3>
                    <p className="mono-text" style={{ color: 'var(--color-text)', marginTop: '0.25rem' }}>{exp.company}</p>
                  </div>
                  <div className="timeline-date mono-text text-muted">{exp.date}</div>
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '1rem' }}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;
