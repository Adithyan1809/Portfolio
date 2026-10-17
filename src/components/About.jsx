import React, { useState } from 'react';
import ChromaText from './shared/ChromaText';
import { 
  FileText, Copy, Check, ArrowRight, Video, Zap, 
  ShieldCheck, Users, GraduationCap, MapPin, Briefcase, 
  Sparkles, ExternalLink
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './About.css';

const profileImage = '/profile.webp';

const recruiterPillars = [
  {
    icon: Video,
    colorClass: 'pillar-emerald',
    title: 'Edge Computer Vision at Scale',
    metric: '90+ live camera feeds',
    desc: 'Engineered async RTSP/ONVIF ingestion pipelines at 24fps with zero dropped frames. Production deployed, not test streams.'
  },
  {
    icon: Zap,
    colorClass: 'pillar-indigo',
    title: 'Sub-4ms Vector Retrieval',
    metric: '< 3.8ms latency',
    desc: 'Mapped ArcFace 512D facial embeddings into FAISS IndexFlatIP for instant cosine similarity verification under peak load.'
  },
  {
    icon: ShieldCheck,
    colorClass: 'pillar-violet',
    title: 'Zero-Hallucination LLM Pipelines',
    metric: '75 analysis stages',
    desc: 'Designed deterministic multi-engine guardrails and validation layers for ResumePilot to prevent unreliable AI outputs.'
  },
  {
    icon: Users,
    colorClass: 'pillar-cyan',
    title: 'Squad Technical Leadership',
    metric: '6 engineers led',
    desc: 'Unblocked and coordinated a cross-functional engineering team at SMAP Technologies across inference, backends, and Docker.'
  }
];

export default function About() {
  const { playHover, playClick, playSuccess } = useSoundEffects();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('adithyan18092005@gmail.com');
    setCopied(true);
    if (playSuccess) playSuccess();
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="about" className="section-padding border-bottom section-rule-lines">
      {/* Background Watermark */}
      <span className="section-watermark-text" aria-hidden="true">ENGINEER</span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Status Pill */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="status-tag status-tag-emerald" style={{ fontSize: '0.68rem' }}>
            <span className="status-dot" style={{ width: 6, height: 6, marginRight: 6 }} />
            AVAILABLE FOR HIRE: AI/ML &amp; SWE ROLES (FULL-TIME &amp; INTERNSHIPS)
          </span>
        </div>

        <div className="section-header-row" style={{ marginBottom: '3rem' }}>
          <span className="section-eyebrow mono-text">CANDIDATE DOSSIER</span>
          <ChromaText as="h2" className="section-title">
            The Engineer Behind the Systems
          </ChromaText>
          <p className="section-subtitle">
            Most machine learning projects stall in a Jupyter notebook. I engineer the distributed backends, async ingestion, and containerized runtimes that keep them alive in production.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Recruiter-Catchy Story & Pillars */}
          <div className="about-content">
            <div className="about-bio-statement">
              <p className="about-lead">
                I'm <strong>21</strong>, based in <strong>Bengaluru</strong>. I specialize in the high-stakes gap between a trained model's weights and a 99.9% uptime production deployment.
              </p>
              <p className="about-subtext">
                As a Technical Lead Intern at SMAP Technologies, I didn't just write scripts — I architected multi-camera computer vision infrastructure, established low-latency vector indexing, and unblocked an engineering squad.
              </p>
            </div>

            {/* 4 Outcome-Driven Pillars */}
            <div className="about-pillars-grid">
              {recruiterPillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className={`about-pillar-card ${pillar.colorClass} liquid-glass`} onMouseEnter={playHover}>
                    <div className="pillar-header">
                      <div className="pillar-icon-box">
                        <Icon size={17} />
                      </div>
                      <span className="pillar-metric mono-text">{pillar.metric}</span>
                    </div>
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-desc">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Core Philosophy Quote Callout */}
            <div className="about-quote-box liquid-glass">
              <span className="quote-accent-bar" />
              <p className="quote-text">
                "The measure of an AI engineer isn't how well a model runs on curated test splits, but how gracefully it recovers under real-world network drops, noisy feeds, and concurrent traffic."
              </p>
            </div>
          </div>

          {/* Right Column: Sleek Recruiter Fast-Facts Spec Sheet */}
          <div className="about-visual">
            <div className="recruiter-spec-sheet liquid-glass">
              {/* Header with Avatar & Live Status */}
              <div className="spec-header">
                <div className="spec-avatar-wrap">
                  <img src={profileImage} alt="Adithyan Prakash" className="spec-avatar-img" />
                  <span className="spec-online-indicator" title="Available for immediate hiring" />
                </div>
                <div className="spec-header-text">
                  <div className="spec-name-row">
                    <h3 className="spec-name">Adithyan Prakash</h3>
                    <span className="spec-verified-badge" title="Verified Production Engineer">✓ Verified</span>
                  </div>
                  <span className="spec-role mono-text">AI &amp; ML Engineer · 21 y/o</span>
                  <span className="spec-location">
                    <MapPin size={12} /> Bengaluru, India (Open to Relocate)
                  </span>
                </div>
              </div>

              {/* Spec Rows */}
              <div className="spec-rows">
                <div className="spec-row">
                  <span className="spec-label mono-text">TARGET ROLES</span>
                  <span className="spec-value spec-value-highlight">AI/ML Engineer · Applied ML · Backend Systems</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label mono-text">LATEST ROLE</span>
                  <span className="spec-value">Technical Lead Intern @ SMAP Technologies</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label mono-text">ACADEMIC BACKGROUND</span>
                  <span className="spec-value">B.E. in AI &amp; ML, DSATM · CGPA 8.44 / 10 (2023–2027)</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label mono-text">RESEARCH</span>
                  <span className="spec-value">Co-Author, Biometric Multi-Camera Tracking (IEEE Submitted)</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label mono-text">CORE STACK</span>
                  <div className="spec-tech-pills mono-text">
                    <span>Python</span>
                    <span>PyTorch</span>
                    <span>FastAPI</span>
                    <span>Docker</span>
                    <span>FAISS</span>
                    <span>YOLOv8</span>
                    <span>PostgreSQL</span>
                  </div>
                </div>
              </div>

              {/* Recruiter Action Buttons */}
              <div className="spec-actions">
                <a 
                  href="https://drive.google.com/file/d/1Ae3BQqbOK4oB60SYEHfBo5MVp6R4kEnX/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary spec-btn-resume"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  <FileText size={15} />
                  <span>View Resume (PDF)</span>
                  <ExternalLink size={13} style={{ opacity: 0.7 }} />
                </a>

                <div className="spec-secondary-actions">
                  <button 
                    type="button" 
                    className="spec-btn-secondary" 
                    onClick={handleCopyEmail}
                    title="Copy direct email"
                  >
                    {copied ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied Email!' : 'Copy Email'}</span>
                  </button>

                  <a 
                    href="https://github.com/Adithyan1809" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="spec-icon-link" 
                    title="GitHub Profile"
                  >
                    <FaGithub size={16} />
                  </a>

                  <a 
                    href="https://in.linkedin.com/in/adithyan-prakash" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="spec-icon-link" 
                    title="LinkedIn Profile"
                  >
                    <FaLinkedin size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
