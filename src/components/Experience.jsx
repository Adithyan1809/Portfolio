import React from 'react';
import { motion } from 'framer-motion';
import WireframeGlobe from './WireframeGlobe';
import ChromaText from './shared/ChromaText';
import { Briefcase, GraduationCap, Users, Award, ChevronRight } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Experience.css';

const timelineData = [
  {
    id: 1,
    type: 'industry',
    category: 'INDUSTRY',
    role: 'Technical Lead Intern',
    company: 'SMAP Technologies',
    date: 'Sep 2025 – Nov 2025',
    stripeClass: 'stripe-emerald',
    badgeClass: 'status-tag-emerald',
    icon: Briefcase,
    bullets: [
      'Architected high-throughput async RTSP/ONVIF ingestion pipeline processing 90+ concurrent camera feeds.',
      'Integrated ArcFace & FaceNet512 embeddings into in-memory FAISS IndexFlatIP, dropping recognition latency by 20%.',
      'Engineered resilient FastAPI backend with Redis task queues and PostgreSQL connection pooling.',
      'Led and mentored a cross-functional squad of 6 engineers across AI inference, backend, and Docker deployment.'
    ],
    tech: ['FastAPI', 'Redis', 'FAISS', 'ArcFace', 'PostgreSQL', 'Docker', 'RTSP/ONVIF']
  },
  {
    id: 2,
    type: 'education',
    category: 'ACADEMIC',
    role: 'B.E. in Artificial Intelligence & Machine Learning',
    company: 'Dayananda Sagar Academy of Technology and Management (DSATM)',
    date: '2023 – 2027',
    stripeClass: 'stripe-indigo',
    badgeClass: 'status-tag-indigo',
    icon: GraduationCap,
    bullets: [
      'Core focus: Deep Learning, Computer Vision, Distributed Systems, Data Structures & Algorithm Design.',
      'Authoring undergraduate research on multi-camera re-identification and edge-cloud accountability systems.',
      'Active leadership in campus technical organizations and hackathons.'
    ],
    tech: ['PyTorch', 'TensorFlow', 'Computer Vision', 'Data Structures', 'Linux']
  },
  {
    id: 3,
    type: 'leadership',
    category: 'LEADERSHIP',
    role: 'Technical Lead & Core Member',
    company: 'ALMAtron',
    date: '2024 – Present',
    stripeClass: 'stripe-violet',
    badgeClass: 'status-tag-violet',
    icon: Users,
    bullets: [
      'Spearheaded hands-on machine learning and software engineering workshops for junior undergraduates.',
      'Mentored students through model development, API design, and deployment best practices.'
    ],
    tech: ['Mentorship', 'Python', 'Machine Learning', 'Workshop Leadership']
  },
  {
    id: 4,
    type: 'leadership',
    category: 'MANAGEMENT',
    role: 'Event & Technical Coordinator',
    company: 'Gaming Club',
    date: '2024 – Present',
    stripeClass: 'stripe-cyan',
    badgeClass: 'status-tag-cyan',
    icon: Award,
    bullets: [
      'Managed end-to-end LAN networks, server setups, and logistics for 200+ participant gaming tournaments.',
      'Handled real-time stream coordination and technical incident resolution.'
    ],
    tech: ['Networking', 'Server Operations', 'Event Logistics']
  }
];

const Experience = () => {
  const { playHover } = useSoundEffects();

  return (
    <section id="experience" className="section-padding border-bottom section-rule-lines" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <span className="section-watermark-text" aria-hidden="true">JOURNEY</span>

      <WireframeGlobe />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="section-header-row" style={{ marginBottom: '3rem' }}>
          <div>
            <span className="section-eyebrow mono-text">CAREER &amp; LEADERSHIP</span>
            <ChromaText as="h2" className="section-title">Where I've Worked &amp; Led</ChromaText>
          </div>
          <p className="section-subtitle">
            Industry leadership, academic progression, and community initiatives — in the order they happened.
          </p>
        </div>

        <div className="timeline">
          {timelineData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                className="timeline-item" 
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                {/* Glowing Node Dot */}
                <div className={`timeline-node ${item.stripeClass}`}>
                  <span className="timeline-node-inner"></span>
                </div>

                <div 
                  className={`timeline-content liquid-glass ${item.stripeClass}`} 
                  onMouseEnter={playHover}
                >
                  <div className="timeline-card-header">
                    <div>
                      <div className="timeline-badge-row">
                        <span className={`status-tag ${item.badgeClass}`}>
                          <IconComponent size={12} className="status-icon" />
                          {item.category}
                        </span>
                        <span className="timeline-date mono-text">{item.date}</span>
                      </div>
                      <h3 className="timeline-role-title">{item.role}</h3>
                      <p className="timeline-company-name mono-text">
                        {item.company}
                      </p>
                    </div>
                  </div>

                  <ul className="timeline-bullet-list">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="timeline-bullet-item">
                        <ChevronRight size={14} className="bullet-chevron" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="timeline-tech-stack">
                    {item.tech.map((t) => (
                      <span key={t} className="tech-pill mono-text">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
