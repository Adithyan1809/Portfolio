import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Cpu, Activity, Layers, CheckCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import resumePilotImg from '../assets/resumepilot_ui.webp';
import projectIrisImg from '../assets/project_iris_cctv.webp';
import musteringImg from '../assets/mustering_system.webp';

const CASE_STUDIES = {
  'resumepilot': {
    title: 'ResumePilot',
    category: 'Production AI System',
    role: 'Full Stack AI Engineer',
    img: resumePilotImg,
    github: 'https://github.com/Adithyan1809/resumepilot',
    overview: 'An advanced, AI-driven career intelligence platform that leverages a multi-stage language model pipeline to generate hyper-targeted, ATS-optimized resumes. Acts as a factual proxy between candidate history and job requirements with zero hallucinations.',
    problem: "Traditional resume tools rely on single-pass LLM prompts, introducing generic phrases and fabricated metrics that recruiters discard. Candidates spend hours trying to trick AI. We built an architecture that cross-references facts against candidate history deterministically.",
    architecture: [
      'FastAPI asynchronously orchestrates 75 distinct LLM prompts in parallel.',
      'Intent extraction, semantic matching, and final formatting run in non-dependent stages.',
      'Static contextual embeddings are cached in Redis to cut latency by 65%.',
      'A secondary Judge Model validates every bullet point against original documents.'
    ],
    challenges: [
      { title: 'The Hallucination Firewall', desc: 'Implemented strict multi-pass validation where a secondary Judge Model verifies outputs against source documents, stripping unverified claims.' },
      { title: '75-Engine Concurrency', desc: 'Re-architected sequential prompt chaining into concurrent worker pools using FastAPI & Celery with Redis caching.' },
      { title: 'Context Window Optimization', desc: 'Pre-processed and clustered relevant skills before dispatching to LLM prompts, slashing token costs by 40%.' }
    ],
    metrics: [
      '75 Parallel LLM Engines',
      '65% Reduction in Latency',
      '0% Core Hallucination Rate'
    ],
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Celery', 'OpenAI API']
  },
  'project-iris': {
    title: 'Project IRIS',
    category: 'Computer Vision & Edge',
    role: 'Technical Lead Intern',
    img: projectIrisImg,
    github: 'https://github.com/Adithyan1809',
    overview: 'Real-time computer vision attendance and surveillance platform ingesting 90+ concurrent RTSP/ONVIF camera feeds with ArcFace embeddings at 24fps.',
    problem: 'Manual attendance logging in large institutions is slow and error-prone. Required a system capable of real-time recognition across dozens of concurrent feeds without dropping frames or bottlenecking databases.',
    architecture: [
      'Async RTSP/ONVIF ingestion captures streams from 90+ IP cameras.',
      'Frames are decoded, resized, and batched efficiently for GPU inference.',
      'ArcFace & FaceNet extract 512D facial embeddings.',
      'FAISS IndexFlatIP executes sub-4ms cosine similarity search against employee identities.',
      'Redis ring buffer manages recent detections to avoid duplicate PostgreSQL writes.'
    ],
    challenges: [
      { title: 'Real-Time Ingestion at Scale', desc: 'Refactored single-threaded capture into asynchronous I/O with GPU batching, maintaining 24fps across 90+ feeds.' },
      { title: 'Database Bottlenecks', desc: 'Introduced Redis debouncing layer for high-frequency detections, cutting database latency by 20%.' },
      { title: 'Engineering Leadership', desc: 'Mentored a squad of 11 engineers across model optimization, FastAPI backend, and containerization.' }
    ],
    metrics: [
      '90+ Concurrent Camera Feeds',
      'Sub-4ms Vector Search (FAISS)',
      '20% Database Latency Reduction'
    ],
    stack: ['FastAPI', 'Redis', 'PostgreSQL', 'ArcFace', 'FaceNet', 'FAISS', 'OpenCV', 'RTSP']
  },
  'mustering-system': {
    title: 'AI Mustering Event System',
    category: 'Distributed Edge-Cloud',
    role: 'AI & Computer Vision Researcher',
    img: musteringImg,
    github: 'https://github.com/Adithyan1809',
    overview: 'Real-time personnel accountability architecture across multi-camera edge nodes for emergency evacuations. IEEE-submitted research paper.',
    problem: 'During building emergencies, accounting for personnel is chaotic and slow with manual headcounts. This system provides automated, passive tracking into assembly areas.',
    architecture: [
      'Edge camera nodes run YOLOv8 for rapid person and face detection.',
      'FaceNet512 extracts high-dimensional biometric vectors.',
      'Deep SORT assigns tracking IDs to maintain identity continuity through occlusions.',
      'Only lightweight metadata (not heavy video) syncs to the central cloud dashboard.'
    ],
    challenges: [
      { title: 'Crowd Occlusions', desc: 'Integrated Deep SORT with motion appearance metrics to re-identify individuals across occluded camera zones.' },
      { title: 'Edge Hardware Optimization', desc: 'Quantized YOLOv8 and FaceNet models to maintain high frame rates on resource-constrained edge devices.' },
      { title: 'Academic Rigor', desc: 'Conducted ablation studies and empirical validation for formal IEEE paper submission.' }
    ],
    metrics: [
      'IEEE Research Submission',
      'Robust Multi-Camera Tracking',
      'Edge-Optimized Inference'
    ],
    stack: ['Python', 'YOLOv8', 'FaceNet512', 'Deep SORT', 'OpenCV', 'PyTorch']
  }
};

export default function MobileCaseStudy() {
  const { id } = useParams();
  const study = CASE_STUDIES[id] || CASE_STUDIES['resumepilot'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="mobile-case-study mobile-container">
      <Link to="/" className="mobile-cs-back">
        <ArrowLeft size={16} /> Back to Overview
      </Link>

      <div className="mobile-cs-img-card">
        <img src={study.img} alt={study.title} className="mobile-cs-img" />
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <span className="mobile-eyebrow">{study.category}</span>
        <h1 className="mobile-title" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{study.title}</h1>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600 }}>{study.role}</span>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1.75rem' }}>
        {study.metrics.map((m) => (
          <div key={m} style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.65rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle size={13} style={{ color: '#10b981', flexShrink: 0 }} />
            <span>{m}</span>
          </div>
        ))}
      </div>

      {/* Overview */}
      <div className="mobile-cs-section">
        <h2 className="mobile-cs-heading">Executive Overview</h2>
        <p className="mobile-cs-text">{study.overview}</p>
      </div>

      {/* Problem */}
      <div className="mobile-cs-section">
        <h2 className="mobile-cs-heading">The Core Problem</h2>
        <p className="mobile-cs-text">{study.problem}</p>
      </div>

      {/* Architecture */}
      <div className="mobile-cs-section">
        <h2 className="mobile-cs-heading">Architecture Breakdown</h2>
        <ul className="mobile-bullet-list" style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
          {study.architecture.map((a, i) => (
            <li key={i} className="mobile-cs-text" style={{ marginBottom: '0.5rem' }}>{a}</li>
          ))}
        </ul>
      </div>

      {/* Challenges */}
      <div className="mobile-cs-section">
        <h2 className="mobile-cs-heading">Engineering Challenges Solved</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          {study.challenges.map((c) => (
            <div key={c.title} style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '0.85rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.45' }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mobile-cs-section">
        <h2 className="mobile-cs-heading">Technology Stack</h2>
        <div className="mobile-tech-tags" style={{ marginTop: '0.5rem' }}>
          {study.stack.map((t) => (
            <span key={t} className="mobile-tech-tag" style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '2rem' }}>
        <a href={study.github} target="_blank" rel="noreferrer" className="mobile-btn mobile-btn-primary">
          <FaGithub size={16} /> View Code on GitHub <ExternalLink size={14} />
        </a>
        <Link to="/" className="mobile-btn mobile-btn-secondary">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    </div>
  );
}
