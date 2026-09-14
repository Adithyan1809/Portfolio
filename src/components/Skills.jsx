import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WireframeTorus from './WireframeTorus';
import ChromaText from './shared/ChromaText';
import TechTooltip from './shared/TechTooltip';
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
    description: 'Real-time async RTSP/ONVIF ingestion. Not 90 test streams — 90 live production cameras with YOLOv8 + DeepSORT tracking running simultaneously.',
    stack: ['YOLOv8', 'DeepSORT', 'OpenCV', 'RTSP/ONVIF'],
    note: '// verified in production'
  },
  {
    title: 'Vector Search & Biometrics',
    icon: Database,
    metric: '512D Embeddings',
    highlight: '< 4ms Match Latency',
    badge: 'VECTOR RETRIEVAL',
    stripeClass: 'stripe-indigo',
    badgeClass: 'status-tag-indigo',
    description: 'ArcFace + FaceNet512 embeddings in an in-memory FAISS IndexFlatIP. Sub-4ms cosine similarity lookups across thousands of registered identities.',
    stack: ['ArcFace', 'FaceNet512', 'FAISS', 'NumPy'],
    note: '// zero false-accept in testing'
  },
  {
    title: 'Async Microservices & Scale',
    icon: Zap,
    metric: 'Sub-25ms P95 API',
    highlight: 'Zero Blocking I/O',
    badge: 'BACKEND ARCHITECTURE',
    stripeClass: 'stripe-cyan',
    badgeClass: 'status-tag-cyan',
    description: 'FastAPI on async Python — Redis ring buffers for camera task queues, PostgreSQL connection pooling. No blocking calls anywhere in the hot path.',
    stack: ['FastAPI', 'Redis', 'PostgreSQL', 'WebSockets'],
    note: '// P95 measured under full load'
  },
  {
    title: 'Production MLOps & Guardrails',
    icon: ShieldCheck,
    metric: '100% Deterministic',
    highlight: 'Zero-Hallucination Safe',
    badge: 'SAFETY & MLOPS',
    stripeClass: 'stripe-violet',
    badgeClass: 'status-tag-violet',
    description: 'Multi-stage LLM evaluation pipelines with prompt security and output validation. Determinism enforced — not hoped for.',
    stack: ['Docker', 'CI/CD', 'Linux', 'Prompt Security'],
    note: '// eval pipeline runs on every push'
  }
];

const skillCategories = [
  { title: 'Languages', icon: <Code2 size={22} />, skills: ['Python', 'JavaScript / TypeScript', 'C++', 'SQL'] },
  { title: 'AI & Machine Learning', icon: <Cpu size={22} />, skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Transformers', 'LLMs'] },
  { title: 'Computer Vision', icon: <Eye size={22} />, skills: ['OpenCV', 'YOLOv8', 'FaceNet512', 'Deep SORT', 'MediaPipe'] },
  { title: 'Backend & APIs', icon: <Server size={22} />, skills: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'REST & GraphQL'] },
  { title: 'DevOps & MLOps', icon: <Settings size={22} />, skills: ['Docker', 'Git & GitHub Actions', 'CI/CD', 'Linux', 'AWS'] },
  { title: 'Frontend & UI', icon: <Layout size={22} />, skills: ['React', 'Next.js', 'Vite', 'Three.js'] }
];

/* Stacking scroll card wrapper */
const StackCard = ({ children, index, total }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.93 - index * 0.01]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.75]);

  return (
    <div
      ref={ref}
      className="benchmark-sticky-wrapper"
      style={{ top: `calc(var(--nav-height, 64px) + ${24 + index * 32}px)` }}
    >
      <motion.div style={{ scale, opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const { playHover, playDigital } = useSoundEffects();

  return (
    <section className="skills section-padding border-bottom section-rule-lines" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <span className="section-watermark-text" aria-hidden="true">SYSTEMS</span>

      <WireframeTorus />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="section-header-row" style={{ marginBottom: '2.5rem' }}>
          <div>
            <span className="section-eyebrow mono-text">SYSTEM CAPABILITIES</span>
            <ChromaText as="h2" className="section-title">Systems That Live in Production</ChromaText>
          </div>
          <p className="section-subtitle">
            Measurable engineering throughput and latency tolerances — not benchmark estimates.
          </p>
        </div>

        {/* Stacking Production Benchmarks Deck */}
        <div className="benchmarks-stacking">
          {productionBenchmarks.map((b, index) => {
            const IconComp = b.icon;
            return (
              <StackCard key={b.title} index={index} total={productionBenchmarks.length}>
                <div 
                  className={`benchmark-card liquid-glass ${b.stripeClass}`}
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
                    <span className="benchmark-verified mono-text">{b.note}</span>
                  </div>
                </div>
              </StackCard>
            );
          })}
        </div>

        {/* Spacer after stacking cards */}
        <div style={{ height: '3rem' }} />

        {/* Technical Arsenal Bento */}
        <div className="section-header-row" style={{ marginTop: '5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="section-eyebrow mono-text">FULL TOOLKIT</span>
            <ChromaText as="h2" className="section-title">The Full Stack</ChromaText>
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
