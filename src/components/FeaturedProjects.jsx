import React, { useRef, useState } from 'react';
import WireframeCube from './WireframeCube';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Cpu, Layers, Eye, Database, BarChart2, TrendingUp } from 'lucide-react';
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

// ── Additional / Side Projects ──────────────────────────────────────────────
const moreProjects = [
  {
    id: 'visageai',
    title: 'VisageAI',
    category: 'Computer Vision · Biometrics',
    status: 'ENTERPRISE-GRADE',
    badgeClass: 'status-tag-emerald',
    icon: Eye,
    description: 'Enterprise face recognition & attendance system running entirely on CPU. YuNet detection → DeepSORT tracking → ArcFace R100 512D embeddings → pgvector similarity search. Sub-second end-to-end with JWT auth dashboard.',
    impact: 'Zero false positives via cosine threshold (0.55+). BestFrameSelector picks sharpest crop per track — no GPU required.',
    tech: ['Python', 'FastAPI', 'InsightFace', 'pgvector', 'Next.js', 'PostgreSQL'],
    github: 'https://github.com/Adithyan1809/VisageAI',
  },
  {
    id: 'zomato-data',
    title: 'Zomato AI Data Engineering',
    category: 'Data Engineering · LLM Analytics',
    status: 'FULL MODERN DATA STACK',
    badgeClass: 'status-tag-indigo',
    icon: Database,
    description: 'End-to-end batch pipeline transforming 2.3 GB of food-delivery data (10M+ orders, 300K reviews) through S3 → Snowflake (Bronze/Silver/Gold) → dbt → Airflow. LLM review enrichment via OpenAI + RAG + Text-to-SQL analytics dashboard.',
    impact: 'Three AI capabilities in one pipeline: LLM sentiment enrichment, RAG chat-with-reviews, and natural language SQL over Snowflake marts.',
    tech: ['Python', 'Snowflake', 'dbt', 'Airflow', 'OpenAI', 'Streamlit', 'Amazon S3'],
    github: 'https://github.com/Adithyan1809/zomato-ai-data-engineering-project',
  },
  {
    id: 'clv-churn',
    title: 'CLV & Churn Segmentation',
    category: 'ML · Customer Analytics',
    status: 'PRODUCTION-GRADE ANALYTICS',
    badgeClass: 'status-tag-violet',
    icon: BarChart2,
    description: 'Full customer analytics system on 300K+ e-commerce transactions. RFM feature engineering → K-Means (6 segments) → BG/NBD CLV prediction → XGBoost churn classifier with SHAP explainability → A/B test simulation with power analysis.',
    impact: 'Five statistical tests (t-test, ANOVA, chi-square, Mann-Whitney U, Cohen\'s d). Self-contained Chart.js executive dashboard, no server needed.',
    tech: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'SQLite', 'Chart.js'],
    github: 'https://github.com/Adithyan1809/customer-lifetime-value-churn-segmentation',
  },
  {
    id: 'demand-forecast',
    title: 'Enterprise Demand Forecasting',
    category: 'ML · Supply Chain · S&OP',
    status: 'R² 0.889 CHAMPION MODEL',
    badgeClass: 'status-tag-amber',
    icon: TrendingUp,
    description: 'Multi-model ML benchmark for demand forecasting with zero data leakage via strict out-of-time validation (Sep–Jan test horizon, 15K+ orders). XGBoost champion beats Random Forest and Ridge baseline on MAPE, MAE, RMSE.',
    impact: '$3.98M net financial benefit — 178K stockout units prevented vs naive reorder policy. Dynamic promotion ROI optimizer built in.',
    tech: ['Python', 'XGBoost', 'Scikit-learn', 'Streamlit', 'Pandas'],
    github: 'https://github.com/Adithyan1809/Demand-Forecasting',
  },
];

const MoreProjectCard = ({ p, playHover, playClick }) => {
  const IconComponent = p.icon;
  return (
    <div
      className="more-project-card liquid-glass"
      onMouseEnter={playHover}
      data-cursor="explore"
    >
      <div className="more-card-top">
        <span className={`status-tag ${p.badgeClass}`}>
          <IconComponent size={11} className="status-icon" />
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
          <FaGithub size={16} />
        </a>
      </div>
      <span className="card-category-label mono-text" style={{ fontSize: '0.68rem', marginBottom: '0.3rem', display: 'block' }}>{p.category}</span>
      <h3 className="more-card-title">{p.title}</h3>
      <p className="more-card-desc">{p.description}</p>
      <div className="more-card-impact mono-text">⚡ {p.impact}</div>
      <div className="card-tech-stack" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        {p.tech.map(t => <span key={t} className="tech-pill mono-text">{t}</span>)}
      </div>
    </div>
  );
};

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
      data-cursor="explore"
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

        {/* ── More Projects ── */}
        <div className="more-projects-wrapper">
          <div className="more-projects-header">
            <span className="section-eyebrow mono-text">MORE WORK</span>
            <h3 className="more-projects-title">Other Projects &amp; Experiments</h3>
          </div>
          <div className="more-projects-grid">
            {moreProjects.map(p => (
              <MoreProjectCard
                key={p.id}
                p={p}
                playHover={playHover}
                playClick={playClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
