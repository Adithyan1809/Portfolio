import React from 'react';
import { motion } from 'framer-motion';
import WireframeTorus from './WireframeTorus';
import { Code2, Cpu, Eye, Server, Settings, Layout, Zap, Database, ShieldCheck, Video } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Skills.css';

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const tagContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } }
};

const tagVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } }
};

const productionBenchmarks = [
  {
    title: 'Distributed Computer Vision',
    icon: Video,
    metric: '90+ Concurrent Feeds',
    highlight: 'Sub-50ms Latency',
    badge: 'EDGE INGESTION',
    stripeClass: 'stripe-emerald',
    badgeClass: 'status-tag-emerald',
    description: 'Real-time asynchronous RTSP/ONVIF camera stream ingestion with YOLOv8 face/object detection and DeepSORT tracking.',
    stack: ['YOLOv8', 'DeepSORT', 'OpenCV', 'RTSP/ONVIF']
  },
  {
    title: 'Vector Search & Biometrics',
    icon: Database,
    metric: '512D Embeddings',
    highlight: '< 4ms Match Latency',
    badge: 'VECTOR RETRIEVAL',
    stripeClass: 'stripe-indigo',
    badgeClass: 'status-tag-indigo',
    description: 'High-throughput facial recognition using ArcFace and FaceNet512 mapped into in-memory FAISS IndexFlatIP cosine clusters.',
    stack: ['ArcFace', 'FaceNet512', 'FAISS', 'NumPy']
  },
  {
    title: 'Async Microservices & Scale',
    icon: Zap,
    metric: 'Sub-25ms P95 API',
    highlight: 'Zero Blocking I/O',
    badge: 'BACKEND ARCHITECTURE',
    stripeClass: 'stripe-cyan',
    badgeClass: 'status-tag-cyan',
    description: 'Asynchronous FastAPI application architecture backed by Redis ring buffers and connection-pooled PostgreSQL.',
    stack: ['FastAPI', 'Redis', 'PostgreSQL', 'WebSockets']
  },
  {
    title: 'Production MLOps & Guardrails',
    icon: ShieldCheck,
    metric: '100% Deterministic',
    highlight: 'Zero-Hallucination Safe',
    badge: 'SAFETY & MLOPS',
    stripeClass: 'stripe-violet',
    badgeClass: 'status-tag-violet',
    description: 'Containerized microservices orchestrated with automated GitHub Actions CI/CD and multi-stage LLM evaluation pipelines.',
    stack: ['Docker', 'CI/CD', 'Linux', 'Prompt Security']
  }
];

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code2 size={22} />,
    skills: ['Python', 'JavaScript / TypeScript', 'C++', 'SQL']
  },
  {
    title: 'AI & Machine Learning',
    icon: <Cpu size={22} />,
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Transformers', 'LLMs']
  },
  {
    title: 'Computer Vision',
    icon: <Eye size={22} />,
    skills: ['OpenCV', 'YOLOv8', 'FaceNet512', 'Deep SORT', 'MediaPipe']
  },
  {
    title: 'Backend & APIs',
    icon: <Server size={22} />,
    skills: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'REST & GraphQL']
  },
  {
    title: 'DevOps & MLOps',
    icon: <Settings size={22} />,
    skills: ['Docker', 'Git & GitHub Actions', 'CI/CD', 'Linux', 'AWS']
  },
  {
    title: 'Frontend & UI',
    icon: <Layout size={22} />,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Three.js']
  }
];

const Skills = () => {
  const { playHover, playDigital } = useSoundEffects();

  return (
    <section className="skills section-padding border-bottom" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      <WireframeTorus />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="section-header-row" style={{ marginBottom: '2.5rem' }}>
          <div>
            <span className="section-eyebrow mono-text">SYSTEM CAPABILITIES</span>
            <h2 className="section-title">Production Benchmarks</h2>
          </div>
          <p className="section-subtitle">
            Measurable engineering throughput and latency tolerances across live deployments.
          </p>
        </div>

        {/* Production Benchmarks Deck */}
        <div className="benchmarks-grid">
          {productionBenchmarks.map((b) => {
            const IconComp = b.icon;
            return (
              <div 
                className={`benchmark-card liquid-glass ${b.stripeClass}`} 
                key={b.title}
                onMouseEnter={playHover}
              >
                <div className="benchmark-header">
                  <span className={`status-tag ${b.badgeClass}`}>
                    <IconComp size={12} className="status-icon" />
                    {b.badge}
                  </span>
                  <span className="benchmark-metric-badge mono-text">{b.metric}</span>
                </div>

                <h3 className="benchmark-title">{b.title}</h3>
                
                <div className="benchmark-highlight-row mono-text">
                  <span className="benchmark-highlight-dot"></span>
                  <span>{b.highlight}</span>
                </div>

                <p className="benchmark-desc">{b.description}</p>

                <div className="benchmark-stack">
                  {b.stack.map(s => (
                    <span key={s} className="tech-pill mono-text">{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Arsenal Bento */}
        <div className="section-header-row" style={{ marginTop: '5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="section-eyebrow mono-text">FULL TOOLKIT</span>
            <h2 className="section-title">Technical Arsenal</h2>
          </div>
          <p className="section-subtitle">
            Core technologies, libraries, and frameworks used in daily production environments.
          </p>
        </div>

        <motion.div
          className="bento-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {skillCategories.map((cat, index) => (
            <motion.div
              variants={cardVariants}
              className={`skill-glass-card liquid-glass bento-item-${index}`} 
              key={cat.title}
              onMouseEnter={playDigital}
            >
              <div className="skill-card-top">
                <div className="skill-icon-wrap">{cat.icon}</div>
                <h3 className="skill-cat-title">{cat.title}</h3>
              </div>
              <motion.div
                className="skill-tags"
                variants={tagContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                {cat.skills.map(skill => (
                  <motion.span variants={tagVariants} key={skill} className="skill-tag mono-text">{skill}</motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
