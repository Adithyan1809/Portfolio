import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import WireframePyramid from './WireframePyramid';
import ChromaText from './shared/ChromaText';
import TechTooltip from './shared/TechTooltip';
import './Research.css';

const Research = () => {
  return (
    <section id="research" className="section-padding border-bottom section-rule-lines" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <span className="section-watermark-text" aria-hidden="true">SCIENCE</span>

      <WireframePyramid />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header-row" style={{ marginBottom: '3rem' }}>
          <div>
            <span className="section-eyebrow mono-text">PEER-REVIEWED &amp; PREPRINTS</span>
            <ChromaText as="h2" className="section-title">Papers &amp; Proof</ChromaText>
          </div>
          <p className="section-subtitle">
            Formal research contributions focusing on edge-cloud accountability and real-time computer vision.
          </p>
        </div>

        <div className="research-card liquid-glass stripe-violet">
          <div className="research-badge-row">
            <span className="status-tag status-tag-violet">
              <BookOpen size={12} className="status-icon" />
              IEEE SUBMITTED
            </span>
            <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Under Review · 2025
            </span>
          </div>

          <h3 className="research-title">
            AI-Based Mustering Event System Using Real-Time Face Recognition
          </h3>

          <p className="research-desc">
            Co-authored research establishing a real-time personnel accountability architecture across multi-camera edge nodes. 
            The system coordinates{' '}
            <TechTooltip
              term="YOLOv8"
              explanation="You Only Look Once v8 — cutting-edge real-time object and face detection model optimized for edge devices."
            />{' '}
            for high-confidence face detection,{' '}
            <TechTooltip
              term="FaceNet512"
              explanation="Deep convolutional network producing 512-dimensional L2-normalized embeddings for precise open-set biometric identification."
            />{' '}
            for biometric vector embeddings, and{' '}
            <TechTooltip
              term="Deep SORT"
              explanation="Simple Online and Realtime Tracking with Deep Association Metric to re-identify subjects across camera occlusions."
            />{' '}
            for cross-camera trajectory tracking during critical evacuation scenarios.
          </p>

          <div className="research-tech-row mono-text">
            <span className="tech-pill">Edge-Cloud Topology</span>
            <span className="tech-pill">Multi-Camera Re-ID</span>
            <span className="tech-pill">Sub-50ms Inference</span>
            <span className="tech-pill">Zero Blind-Spots</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
