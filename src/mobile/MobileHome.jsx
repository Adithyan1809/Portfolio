import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, FileText, Copy, Check, MapPin, ExternalLink, 
  Briefcase, GraduationCap, Users, Award, BookOpen, Send,
  Cpu, Activity, Layers, Code2, Eye, Server, Settings, Zap, 
  Database, ShieldCheck, Video, GitCommit, Plane, ArrowUp
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const profileImage = '/profile.webp';

export default function MobileHome() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [lastPush, setLastPush] = useState(null);
  const [showFab, setShowFab] = useState(false);

  // ─── Scroll-to-top FAB visibility ───
  useEffect(() => {
    const onScroll = () => {
      setShowFab(window.scrollY > 320);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Scroll to top — works on all mobile browsers ───
  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Copy email helper
  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('adithyan18092005@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // GitHub last push cached fetch
  useEffect(() => {
    const cached = sessionStorage.getItem('gh_last_push');
    if (cached) {
      setLastPush(cached);
      return;
    }
    fetch('https://api.github.com/users/Adithyan1809/events?per_page=5')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const pushEvent = data.find(e => e.type === 'PushEvent') || data[0];
          if (pushEvent?.created_at) {
            const date = new Date(pushEvent.created_at);
            const now = new Date();
            const diffHours = Math.round((now - date) / (1000 * 60 * 60));
            const diffDays = Math.round(diffHours / 24);
            let timeStr = 'recently';
            if (diffHours < 1) timeStr = 'just now';
            else if (diffHours < 24) timeStr = `${diffHours}h ago`;
            else if (diffDays === 1) timeStr = 'yesterday';
            else timeStr = `${diffDays}d ago`;

            const repoName = pushEvent.repo?.name ? pushEvent.repo.name.replace('Adithyan1809/', '') : 'portfolio';
            const label = `Pushed to ${repoName} (${timeStr})`;
            setLastPush(label);
            sessionStorage.setItem('gh_last_push', label);
          }
        }
      })
      .catch(() => setLastPush('Active on GitHub'));
  }, []);

  // Web3Forms submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    const formData = new FormData(e.target);
    formData.append("access_key", "c6c692ba-c335-4807-ba3f-8253a09400fa");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        e.target.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mobile-home">
      {/* ─── Hero Section ─── */}
      <section className="mobile-hero mobile-container">
        <div className="mobile-hero-photo-row">
          <div className="mobile-hero-photo-wrap">
            <img src={profileImage} alt="Adithyan Prakash" className="mobile-hero-img" width="82" height="82" />
          </div>
          <div className="mobile-hero-title-group">
            <h1 className="mobile-hero-name">Adithyan Prakash</h1>
            <span className="mobile-hero-role">AI &amp; ML Engineer</span>
            <div className="mobile-recruiter-pill">
              <span className="mobile-status-dot" style={{ width: 6, height: 6 }} />
              <span>Seeking AI/ML &amp; SWE Roles · Full-Time / Internships</span>
            </div>
            <span className="mobile-hero-loc">
              <MapPin size={13} /> Bengaluru, India
            </span>
          </div>
        </div>

        <p className="mobile-hero-bio">
          Building AI systems that run in the real world — <strong>90+ camera streams</strong> in production, sub-50ms inference, zero hallucinations.
        </p>

        <div className="mobile-hero-ctas">
          <a 
            href="https://drive.google.com/file/d/1Ae3BQqbOK4oB60SYEHfBo5MVp6R4kEnX/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-btn mobile-btn-primary"
          >
            <FileText size={16} /> View Resume (PDF)
          </a>

          <button 
            type="button" 
            onClick={() => scrollToSection('contact')} 
            className="mobile-btn mobile-btn-secondary"
          >
            Get in Touch <ArrowRight size={16} />
          </button>

          <div className="mobile-btn-row">
            <button 
              type="button" 
              onClick={handleCopyEmail} 
              className="mobile-btn mobile-btn-secondary mobile-btn-compact"
            >
              {copied ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Email'}</span>
            </button>
            <a 
              href="https://github.com/Adithyan1809" 
              target="_blank" 
              rel="noreferrer" 
              className="mobile-btn mobile-btn-secondary mobile-btn-compact"
            >
              <FaGithub size={15} /> GitHub
            </a>
            <a 
              href="https://in.linkedin.com/in/adithyan-prakash" 
              target="_blank" 
              rel="noreferrer" 
              className="mobile-btn mobile-btn-secondary mobile-btn-compact"
            >
              <FaLinkedin size={15} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ─── Impact Numbers (2x2 Grid) ─── */}
      <section className="mobile-section mobile-container">
        <div className="mobile-stats-grid">
          <div className="mobile-stat-card mobile-stat-indigo">
            <span className="mobile-stat-num mobile-stat-num-indigo">3+</span>
            <span className="mobile-stat-label">Years Building</span>
            <span className="mobile-stat-sub">Engineering &amp; Research</span>
          </div>
          <div className="mobile-stat-card mobile-stat-emerald">
            <span className="mobile-stat-num mobile-stat-num-emerald">10+</span>
            <span className="mobile-stat-label">Systems Shipped</span>
            <span className="mobile-stat-sub">Production &amp; Scaled</span>
          </div>
          <div className="mobile-stat-card mobile-stat-cyan">
            <span className="mobile-stat-num mobile-stat-num-cyan">90+</span>
            <span className="mobile-stat-label">Live RTSP Feeds</span>
            <span className="mobile-stat-sub">Async Edge Ingestion</span>
          </div>
          <div className="mobile-stat-card mobile-stat-violet">
            <span className="mobile-stat-num mobile-stat-num-violet">50K+</span>
            <span className="mobile-stat-label">Lines of Code</span>
            <span className="mobile-stat-sub">Python · C++ · TS</span>
          </div>
        </div>
      </section>

      {/* ─── Recruiter At-A-Glance (Quick-Scan) ─── */}
      <section className="mobile-section mobile-container" style={{ paddingTop: '1.25rem', paddingBottom: '1.5rem' }}>
        <div className="mobile-recruiter-card">
          <div className="mobile-recruiter-header">
            <span className="mobile-eyebrow" style={{ margin: 0, paddingLeft: 0, borderLeft: 'none' }}>WHY HIRE ADITHYAN</span>
            <span className="status-tag status-tag-emerald" style={{ fontSize: '0.62rem' }}>RECRUITER TL;DR</span>
          </div>
          <ul className="mobile-recruiter-points">
            <li>
              <strong>Production Proven:</strong> 90+ concurrent RTSP camera feeds processing ArcFace embeddings at 24fps with zero frame drop.
            </li>
            <li>
              <strong>Sub-50ms Optimization:</strong> Accelerated FAISS vector retrieval to &lt;4ms &amp; tuned CPU inference pipelines.
            </li>
            <li>
              <strong>Full-Stack AI Ownership:</strong> From low-level C++/PyTorch &amp; CV pipelines to FastAPI, Docker containers, &amp; Next.js UIs.
            </li>
            <li>
              <strong>Undergrad Squad Leadership:</strong> Directed and unblocked a 6-engineer squad as Technical Lead at SMAP Technologies.
            </li>
            <li>
              <strong>Peer-Reviewed Research:</strong> Co-authored IEEE-submitted paper on multi-camera biometric re-identification.
            </li>
          </ul>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section id="projects" className="mobile-section mobile-container">
        <div className="mobile-section-header">
          <span className="mobile-eyebrow">PRODUCTION WORK</span>
          <h2 className="mobile-title">Featured Projects</h2>
          <p className="mobile-desc">Real-world AI systems built for scale, speed, and reliability.</p>
        </div>

        <div className="mobile-projects-list">
          {/* Project 1 — ResumePilot (indigo) */}
          <div className="mobile-project-card mobile-project-indigo">
            <div className="mobile-project-header">
              <span className="mobile-project-cat">Production AI System</span>
              <span className="status-tag status-tag-indigo" style={{ fontSize: '0.62rem' }}>ACTIVE</span>
            </div>
            <h3 className="mobile-project-title">ResumePilot</h3>
            <p className="mobile-project-desc">
              AI-powered career intelligence platform with a multi-stage LLM pipeline for ATS optimization. Context-aware follow-ups with strict validation guardrails.
            </p>
            <div className="mobile-impact-pill">
              ⚡ 75 specialized analysis engines with zero-hallucination safe validation.
            </div>
            <div className="mobile-tech-tags">
              <span className="mobile-tech-tag">Next.js</span>
              <span className="mobile-tech-tag">FastAPI</span>
              <span className="mobile-tech-tag">PostgreSQL</span>
              <span className="mobile-tech-tag">Docker</span>
            </div>
            <div className="mobile-card-actions">
              <Link to="/projects/resumepilot" className="mobile-btn mobile-btn-primary" style={{ flex: 1, padding: '0.65rem' }}>
                Case Study <ArrowRight size={14} />
              </Link>
              <a href="https://github.com/Adithyan1809/resumepilot" target="_blank" rel="noreferrer" className="mobile-btn mobile-btn-secondary" style={{ width: '44px', padding: 0 }}>
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          {/* Project 2 — IRIS (emerald) */}
          <div className="mobile-project-card mobile-project-emerald">
            <div className="mobile-project-header">
              <span className="mobile-project-cat">Computer Vision &amp; Edge</span>
              <span className="status-tag status-tag-emerald" style={{ fontSize: '0.62rem' }}>90+ RTSP LIVE</span>
            </div>
            <h3 className="mobile-project-title">Project IRIS</h3>
            <p className="mobile-project-desc">
              Real-time surveillance &amp; biometric attendance. 90+ concurrent RTSP camera feeds processing ArcFace embeddings at 24fps with zero dropped frames.
            </p>
            <div className="mobile-impact-pill" style={{ background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
              ⚡ Sub-4ms cosine retrieval across registered identities via FAISS IndexFlatIP.
            </div>
            <div className="mobile-tech-tags">
              <span className="mobile-tech-tag">FastAPI</span>
              <span className="mobile-tech-tag">Redis</span>
              <span className="mobile-tech-tag">ArcFace</span>
              <span className="mobile-tech-tag">FAISS</span>
            </div>
            <div className="mobile-card-actions">
              <Link to="/projects/project-iris" className="mobile-btn mobile-btn-primary" style={{ flex: 1, padding: '0.65rem' }}>
                Case Study <ArrowRight size={14} />
              </Link>
              <a href="https://github.com/Adithyan1809" target="_blank" rel="noreferrer" className="mobile-btn mobile-btn-secondary" style={{ width: '44px', padding: 0 }}>
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          {/* Project 3 — Mustering (violet) */}
          <div className="mobile-project-card mobile-project-violet">
            <div className="mobile-project-header">
              <span className="mobile-project-cat">Distributed Edge-Cloud</span>
              <span className="status-tag status-tag-violet" style={{ fontSize: '0.62rem' }}>IEEE SUBMITTED</span>
            </div>
            <h3 className="mobile-project-title">Mustering Event System</h3>
            <p className="mobile-project-desc">
              Real-time personnel accountability using edge-cloud architecture with multi-camera re-identification for emergency evacuation monitoring.
            </p>
            <div className="mobile-impact-pill" style={{ background: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.25)' }}>
              ⚡ Edge-cloud coordination with DeepSORT re-identification across camera zones.
            </div>
            <div className="mobile-tech-tags">
              <span className="mobile-tech-tag">YOLOv8</span>
              <span className="mobile-tech-tag">FaceNet512</span>
              <span className="mobile-tech-tag">Deep SORT</span>
            </div>
            <div className="mobile-card-actions">
              <Link to="/projects/mustering-system" className="mobile-btn mobile-btn-primary" style={{ flex: 1, padding: '0.65rem' }}>
                Case Study <ArrowRight size={14} />
              </Link>
              <a href="https://github.com/Adithyan1809" target="_blank" rel="noreferrer" className="mobile-btn mobile-btn-secondary" style={{ width: '44px', padding: 0 }}>
                <FaGithub size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Technical Skills ─── */}
      <section id="skills" className="mobile-section mobile-container">
        <div className="mobile-section-header">
          <span className="mobile-eyebrow">ARSENAL</span>
          <h2 className="mobile-title">Skills &amp; Technologies</h2>
          <p className="mobile-desc">Tools I use to build scalable machine learning and distributed systems.</p>
        </div>

        <div className="mobile-skills-stack">
          <div className="mobile-skill-group mobile-skill-group-indigo">
            <div className="mobile-skill-title">
              <Cpu size={16} style={{ color: '#6366f1' }} /> AI &amp; Machine Learning
            </div>
            <div className="mobile-skill-chips">
              <span className="mobile-chip">PyTorch</span>
              <span className="mobile-chip">TensorFlow</span>
              <span className="mobile-chip">Scikit-Learn</span>
              <span className="mobile-chip">Transformers</span>
              <span className="mobile-chip">LLM Pipelines</span>
              <span className="mobile-chip">FAISS</span>
            </div>
          </div>

          <div className="mobile-skill-group mobile-skill-group-emerald">
            <div className="mobile-skill-title">
              <Eye size={16} style={{ color: '#10b981' }} /> Computer Vision
            </div>
            <div className="mobile-skill-chips">
              <span className="mobile-chip">OpenCV</span>
              <span className="mobile-chip">YOLOv8</span>
              <span className="mobile-chip">ArcFace</span>
              <span className="mobile-chip">FaceNet512</span>
              <span className="mobile-chip">Deep SORT</span>
              <span className="mobile-chip">MediaPipe</span>
            </div>
          </div>

          <div className="mobile-skill-group mobile-skill-group-cyan">
            <div className="mobile-skill-title">
              <Server size={16} style={{ color: '#06b6d4' }} /> Backend &amp; Distributed Systems
            </div>
            <div className="mobile-skill-chips">
              <span className="mobile-chip">FastAPI</span>
              <span className="mobile-chip">Node.js</span>
              <span className="mobile-chip">PostgreSQL</span>
              <span className="mobile-chip">Redis</span>
              <span className="mobile-chip">Docker</span>
              <span className="mobile-chip">Linux</span>
              <span className="mobile-chip">RTSP / ONVIF</span>
            </div>
          </div>

          <div className="mobile-skill-group mobile-skill-group-violet">
            <div className="mobile-skill-title">
              <Code2 size={16} style={{ color: '#8b5cf6' }} /> Languages
            </div>
            <div className="mobile-skill-chips">
              <span className="mobile-chip">Python</span>
              <span className="mobile-chip">C++</span>
              <span className="mobile-chip">JavaScript / TypeScript</span>
              <span className="mobile-chip">SQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Experience Timeline ─── */}
      <section id="experience" className="mobile-section mobile-container">
        <div className="mobile-section-header">
          <span className="mobile-eyebrow">CAREER &amp; LEADERSHIP</span>
          <h2 className="mobile-title">Experience &amp; Education</h2>
        </div>

        <div className="mobile-timeline">
          {/* Item 1 — Work (indigo dot) */}
          <div className="mobile-timeline-item">
            <div className="mobile-timeline-dot mobile-dot-indigo"></div>
            <span className="mobile-date-tag">Sep 2025 – Nov 2025</span>
            <h3 className="mobile-role-title">Technical Lead Intern</h3>
            <span className="mobile-company-line">SMAP Technologies</span>
            <ul className="mobile-bullet-list">
              <li>Engineered async RTSP ingestion pipeline processing 90+ concurrent camera feeds at 24fps with zero dropped frames.</li>
              <li>Slashed face recognition latency by 20% (&lt;4ms retrieval) by mapping ArcFace embeddings into in-memory FAISS IndexFlatIP.</li>
              <li>Hardened backend throughput via FastAPI asynchronous endpoints, Redis pub/sub queues, and PostgreSQL connection pooling.</li>
              <li>Led and mentored a cross-functional squad of 6 engineers across AI model inference, backend APIs, and Docker edge deployment.</li>
            </ul>
          </div>

          {/* Item 2 — Education (cyan dot) */}
          <div className="mobile-timeline-item">
            <div className="mobile-timeline-dot mobile-dot-cyan"></div>
            <span className="mobile-date-tag">2023 – 2027</span>
            <h3 className="mobile-role-title">B.E. in AI &amp; Machine Learning</h3>
            <span className="mobile-company-line">Dayananda Sagar Academy (DSATM) · CGPA 8.44</span>
            <ul className="mobile-bullet-list">
              <li>Core coursework: Deep Learning, Computer Vision, Distributed Systems, Data Structures &amp; High-Performance Algorithms.</li>
              <li>Co-authoring research on multi-camera biometric re-identification for emergency muster systems (IEEE Submitted).</li>
            </ul>
          </div>

          {/* Item 3 — Club (violet dot) */}
          <div className="mobile-timeline-item">
            <div className="mobile-timeline-dot mobile-dot-violet"></div>
            <span className="mobile-date-tag">2024 – Present</span>
            <h3 className="mobile-role-title">Technical Lead &amp; Core Member</h3>
            <span className="mobile-company-line">ALMAtron Technical Club</span>
            <ul className="mobile-bullet-list">
              <li>Conducted hands-on machine learning and software engineering workshops for junior undergraduates.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Research ─── */}
      <section className="mobile-section mobile-container">
        <div className="mobile-section-header">
          <span className="mobile-eyebrow">RESEARCH</span>
          <h2 className="mobile-title">Published Papers</h2>
        </div>

        <div className="mobile-project-card mobile-project-violet">
          <div className="mobile-project-header">
            <span className="status-tag status-tag-violet" style={{ fontSize: '0.62rem' }}>
              <BookOpen size={12} /> IEEE SUBMITTED · 2025
            </span>
          </div>
          <h3 className="mobile-project-title" style={{ fontSize: '1.15rem' }}>
            AI-Based Mustering Event System Using Real-Time Face Recognition
          </h3>
          <p className="mobile-project-desc">
            Co-authored research establishing real-time personnel accountability across multi-camera edge nodes using YOLOv8 for face detection, FaceNet512 for biometrics, and Deep SORT for occlusion tracking.
          </p>
        </div>
      </section>

      {/* ─── More Projects ─── */}
      <section id="more-projects" className="mobile-section mobile-container">
        <div className="mobile-section-header">
          <span className="mobile-eyebrow">MORE WORK</span>
          <h2 className="mobile-title">Other Projects</h2>
          <p className="mobile-desc">Side projects, ML experiments, and data engineering pipelines.</p>
        </div>

        <div className="mobile-projects-list">
          {/* VisageAI */}
          <div className="mobile-project-card mobile-project-emerald">
            <div className="mobile-project-header">
              <span className="mobile-project-cat">Computer Vision · Biometrics</span>
              <span className="status-tag status-tag-emerald" style={{ fontSize: '0.62rem' }}>ENTERPRISE-GRADE</span>
            </div>
            <h3 className="mobile-project-title">VisageAI</h3>
            <p className="mobile-project-desc">
              Enterprise face recognition &amp; attendance system running on CPU. YuNet → DeepSORT → ArcFace R100 512D → pgvector. Sub-second recognition with JWT auth dashboard in Next.js.
            </p>
            <div className="mobile-impact-pill" style={{ background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
              ⚡ Zero false positives via cosine threshold (0.55+) — no GPU required.
            </div>
            <div className="mobile-tech-tags">
              <span className="mobile-tech-tag">FastAPI</span>
              <span className="mobile-tech-tag">InsightFace</span>
              <span className="mobile-tech-tag">pgvector</span>
              <span className="mobile-tech-tag">Next.js</span>
            </div>
            <div className="mobile-card-actions">
              <a href="https://github.com/Adithyan1809/VisageAI" target="_blank" rel="noreferrer" className="mobile-btn mobile-btn-secondary" style={{ flex: 1, padding: '0.65rem' }}>
                <FaGithub size={15} /> View on GitHub
              </a>
            </div>
          </div>

          {/* Zomato Data Engineering */}
          <div className="mobile-project-card mobile-project-indigo">
            <div className="mobile-project-header">
              <span className="mobile-project-cat">Data Engineering · LLM</span>
              <span className="status-tag status-tag-indigo" style={{ fontSize: '0.62rem' }}>MODERN DATA STACK</span>
            </div>
            <h3 className="mobile-project-title">Zomato AI Data Engineering</h3>
            <p className="mobile-project-desc">
              End-to-end batch pipeline: 2.3 GB food-delivery data (10M+ orders, 300K reviews) through S3 → Snowflake → dbt → Airflow. LLM enrichment + RAG + Text-to-SQL dashboard.
            </p>
            <div className="mobile-impact-pill">
              ⚡ Three AI capabilities: LLM sentiment, RAG chat-with-reviews, NL-to-SQL over Snowflake marts.
            </div>
            <div className="mobile-tech-tags">
              <span className="mobile-tech-tag">Snowflake</span>
              <span className="mobile-tech-tag">dbt</span>
              <span className="mobile-tech-tag">Airflow</span>
              <span className="mobile-tech-tag">OpenAI</span>
              <span className="mobile-tech-tag">Streamlit</span>
            </div>
            <div className="mobile-card-actions">
              <a href="https://github.com/Adithyan1809/zomato-ai-data-engineering-project" target="_blank" rel="noreferrer" className="mobile-btn mobile-btn-secondary" style={{ flex: 1, padding: '0.65rem' }}>
                <FaGithub size={15} /> View on GitHub
              </a>
            </div>
          </div>

          {/* CLV & Churn */}
          <div className="mobile-project-card mobile-project-violet">
            <div className="mobile-project-header">
              <span className="mobile-project-cat">ML · Customer Analytics</span>
              <span className="status-tag status-tag-violet" style={{ fontSize: '0.62rem' }}>PROD-GRADE ANALYTICS</span>
            </div>
            <h3 className="mobile-project-title">CLV &amp; Churn Segmentation</h3>
            <p className="mobile-project-desc">
              Customer analytics on 300K+ transactions. RFM → K-Means (6 segments) → BG/NBD CLV → XGBoost churn classifier with SHAP → A/B test simulation with power analysis.
            </p>
            <div className="mobile-impact-pill" style={{ background: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.25)' }}>
              ⚡ 5 statistical tests + Chart.js executive dashboard — no server needed.
            </div>
            <div className="mobile-tech-tags">
              <span className="mobile-tech-tag">XGBoost</span>
              <span className="mobile-tech-tag">SHAP</span>
              <span className="mobile-tech-tag">Scikit-learn</span>
              <span className="mobile-tech-tag">SQLite</span>
            </div>
            <div className="mobile-card-actions">
              <a href="https://github.com/Adithyan1809/customer-lifetime-value-churn-segmentation" target="_blank" rel="noreferrer" className="mobile-btn mobile-btn-secondary" style={{ flex: 1, padding: '0.65rem' }}>
                <FaGithub size={15} /> View on GitHub
              </a>
            </div>
          </div>

          {/* Demand Forecasting */}
          <div className="mobile-project-card" style={{ borderLeft: '4px solid #f59e0b' }}>
            <div className="mobile-project-header">
              <span className="mobile-project-cat">ML · Supply Chain · S&amp;OP</span>
              <span className="status-tag" style={{ fontSize: '0.62rem', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>R² 0.889 CHAMPION</span>
            </div>
            <h3 className="mobile-project-title">Enterprise Demand Forecasting</h3>
            <p className="mobile-project-desc">
              Multi-model ML benchmark for retail demand forecasting. XGBoost champion (R² 0.889) vs Random Forest vs Ridge — strict out-of-time validation on 15K+ orders with zero data leakage.
            </p>
            <div className="mobile-impact-pill" style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)' }}>
              ⚡ $3.98M net benefit — 178K stockout units prevented vs naive reorder.
            </div>
            <div className="mobile-tech-tags">
              <span className="mobile-tech-tag">XGBoost</span>
              <span className="mobile-tech-tag">Scikit-learn</span>
              <span className="mobile-tech-tag">Streamlit</span>
              <span className="mobile-tech-tag">Pandas</span>
            </div>
            <div className="mobile-card-actions">
              <a href="https://github.com/Adithyan1809/Demand-Forecasting" target="_blank" rel="noreferrer" className="mobile-btn mobile-btn-secondary" style={{ flex: 1, padding: '0.65rem' }}>
                <FaGithub size={15} /> View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>


      <section className="mobile-section mobile-container">
        <div className="mobile-project-card mobile-github-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="mobile-gh-dot" />
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>GITHUB ACTIVITY</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)' }}>{lastPush || 'Active Contributor'}</span>
            </div>
          </div>
          <a href="https://github.com/Adithyan1809" target="_blank" rel="noreferrer" className="mobile-btn mobile-btn-secondary" style={{ width: 'auto', padding: '0.45rem 0.75rem', fontSize: '0.75rem' }}>
            View GitHub <ExternalLink size={12} />
          </a>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section id="contact" className="mobile-section mobile-container">
        <div className="mobile-section-header">
          <span className="mobile-eyebrow">GET IN TOUCH</span>
          <h2 className="mobile-title">Let's Connect</h2>
          <p className="mobile-desc">Open to full-time roles, research collaborations, or technical discussions.</p>
        </div>

        <div className="mobile-contact-methods">
          <a href="mailto:adithyan18092005@gmail.com" className="mobile-contact-item">
            <span className="mobile-contact-val">adithyan18092005@gmail.com</span>
            <span className="status-tag status-tag-emerald" style={{ fontSize: '0.68rem' }}>Email Me ↗</span>
          </a>

          <a href="https://in.linkedin.com/in/adithyan-prakash" target="_blank" rel="noreferrer" className="mobile-contact-item">
            <span className="mobile-contact-val">linkedin.com/in/adithyan-prakash</span>
            <span className="status-tag status-tag-indigo" style={{ fontSize: '0.68rem' }}>Connect ↗</span>
          </a>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="mobile-form">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            required 
            className="mobile-input" 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            required 
            className="mobile-input" 
          />
          <textarea 
            name="message" 
            placeholder="Your Message..." 
            required 
            className="mobile-textarea" 
          />
          <button 
            type="submit" 
            disabled={formStatus === 'loading'}
            className="mobile-btn mobile-btn-primary"
          >
            {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? 'Message Sent! ✓' : 'Send Message'}
            <Send size={15} />
          </button>
          {formStatus === 'success' && (
            <p style={{ fontSize: '0.78rem', color: '#10b981', textAlign: 'center', margin: 0 }}>
              Thank you! I'll reply promptly.
            </p>
          )}
        </form>
      </section>

      {/* ─── Footer ─── */}
      <footer className="mobile-footer">
        <button type="button" onClick={scrollToTop} className="mobile-back-to-top">
          <ArrowUp size={14} /> Back to Top
        </button>
        <p style={{ margin: 0, fontSize: '0.78rem' }}>
          © {new Date().getFullYear()} Adithyan Prakash · Bengaluru, India
        </p>
      </footer>

      {/* ─── Floating Plane FAB (scroll to top) — appears after 320px scroll ─── */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`mobile-scroll-fab${showFab ? ' mobile-scroll-fab--visible' : ''}`}
        aria-label="Back to top"
      >
        <Plane size={18} style={{ transform: 'rotate(-45deg)' }} />
      </button>
    </div>
  );
}
