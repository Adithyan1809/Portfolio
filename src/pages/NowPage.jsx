import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Briefcase, BookOpen, Cpu, Sparkles } from 'lucide-react';
import './StaticPages.css';

export default function NowPage() {
  useEffect(() => {
    document.title = "Now — What I'm Focused on Currently | Adithyan P.";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="static-page-container">
      <div className="static-ambient-glow" aria-hidden="true" />

      <nav className="static-breadcrumb mono-text">
        <Link to="/" className="static-back-btn">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </nav>

      <header className="static-header">
        <div className="static-category-badge mono-text">
          <Clock size={13} />
          <span>NOW PAGE • UPDATED OCTOBER 2026</span>
        </div>
        <h1 className="static-main-title">What I'm Doing Right Now</h1>
        <p className="static-main-subtitle">
          Inspired by Derek Sivers' <em>/now</em> movement. A live snapshot of what I'm currently building,
          researching, reading, and prioritizing in my life and work.
        </p>
      </header>

      <div className="static-content-grid">
        {/* Quick status card */}
        <div className="now-status-banner">
          <div className="now-status-item">
            <MapPin size={16} className="now-icon" />
            <div>
              <span className="now-status-label mono-text">LOCATION</span>
              <span className="now-status-val">Bengaluru, Karnataka, India</span>
            </div>
          </div>
          <div className="now-status-item">
            <Briefcase size={16} className="now-icon" />
            <div>
              <span className="now-status-label mono-text">CURRENT ROLE</span>
              <span className="now-status-val">Technical Lead Intern @ SMAP Technologies</span>
            </div>
          </div>
          <div className="now-status-item">
            <Sparkles size={16} className="now-icon" />
            <div>
              <span className="now-status-label mono-text">STATUS</span>
              <span className="now-status-val text-emerald">Open to AI/ML &amp; SWE roles</span>
            </div>
          </div>
        </div>

        {/* Section 1: Building */}
        <section className="now-section">
          <div className="now-section-title-row">
            <Cpu size={18} className="now-section-icon" />
            <h2 className="now-section-title">What I'm Building</h2>
          </div>
          <ul className="now-list">
            <li>
              <strong>Sub-40ms Edge Vision Ingestion:</strong> Scaling real-time RTSP camera pipelines across 90+ concurrent
              video streams with zero frame drops, leveraging NVDEC hardware decoders and custom TensorRT INT8 calibration.
            </li>
            <li>
              <strong>Deterministic LLM Pipelines:</strong> Eliminating generative hallucinations in production agent systems
              by replacing unstructured prompt-chains with grammar-guided finite state machine decoding and strict Pydantic schemas.
            </li>
            <li>
              <strong>Automated Mustering &amp; Safety Systems:</strong> Enhancing industrial site safety using computer vision,
              facial recognition, and automated worker muster count reporting during emergency protocols.
            </li>
          </ul>
        </section>

        {/* Section 2: Researching & Exploring */}
        <section className="now-section">
          <div className="now-section-title-row">
            <BookOpen size={18} className="now-section-icon" />
            <h2 className="now-section-title">What I'm Researching &amp; Reading</h2>
          </div>
          <ul className="now-list">
            <li>
              <strong>Speculative Decoding &amp; Low-Latency Inference:</strong> Studying speculative execution algorithms
              to reduce token generation latency on smaller edge accelerators.
            </li>
            <li>
              <strong>High-Throughput Vision-Language Models (VLMs):</strong> Experimenting with distilling 7B+ multimodal
              models into sub-2B parameter architectures suitable for edge devices (Jetson Orin Nano).
            </li>
            <li>
              <strong>Books on my desk:</strong> <em>Designing Data-Intensive Applications</em> by Martin Kleppmann and
              <em>Designing Machine Learning Systems</em> by Chip Huyen.
            </li>
          </ul>
        </section>

        {/* Section 3: Engineering Squad Leadership */}
        <section className="now-section">
          <div className="now-section-title-row">
            <Briefcase size={18} className="now-section-icon" />
            <h2 className="now-section-title">Squad Leadership &amp; Mentorship</h2>
          </div>
          <p className="now-text">
            Leading and mentoring an engineering squad of <strong>11 engineers</strong> at SMAP Technologies.
            Focusing heavily on high code review velocity, clean git branching hygiene, automated CI testing,
            and fostering an engineering culture that values verifiable benchmarks over hype.
          </p>
        </section>
      </div>
    </div>
  );
}
