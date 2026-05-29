import React from 'react';
import { motion } from 'framer-motion';
import WireframeGlobe from './WireframeGlobe';
import './Experience.css';

const timelineData = [
  {
    id: 1,
    type: 'experience',
    role: 'Technical Lead Intern',
    company: 'SMAP Technologies',
    date: 'Sep 2025 – Jan 2026',
    description: 'Architected scalable backend using FastAPI, PostgreSQL, and Redis; built async RTSP/ONVIF pipelines with ArcFace/FaceNet + FAISS for real-time face recognition across 90+ camera feeds. Led and mentored a cross-functional AI, backend, and DevOps team.',
  },
  {
    id: 4,
    type: 'education',
    role: 'B.E. in AI & Machine Learning',
    company: 'DSATM, Bangalore',
    date: '2022 – 2026',
    description: 'Strong foundation in AI/ML algorithms, data structures, and software engineering. Active participant in technical clubs and leadership roles.',
  },
  {
    id: 2,
    type: 'leadership',
    role: 'Leadership Position',
    company: 'ALMAtron',
    date: '2024 – Present',
    description: 'Led technical initiatives and mentored junior members in AI and machine learning concepts.',
  },
  {
    id: 3,
    type: 'leadership',
    role: 'Leadership Position',
    company: 'Gaming Club',
    date: '2024 – Present',
    description: 'Organized and managed large-scale gaming events, coordinating logistics and technical setups.',
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding border-bottom" style={{ position: 'relative', overflow: 'hidden' }}>
      <WireframeGlobe />
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>Visual Resume</h2>
        <div className="timeline">
          {timelineData.map((item, index) => (
            <motion.div 
              className="timeline-item" 
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={`timeline-dot ${item.type === 'education' ? 'dot-education' : ''}`}></div>
              <div className="timeline-content card">
                <div className="timeline-header">
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>{item.role}</h3>
                    <p className="mono-text" style={{ color: 'var(--color-text)', marginTop: '0.25rem' }}>
                      {item.type === 'education' ? '🎓 ' : (item.type === 'leadership' ? '🤝 ' : '💼 ')} 
                      {item.company}
                    </p>
                  </div>
                  <div className="timeline-date mono-text text-muted">{item.date}</div>
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '1rem' }}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;
