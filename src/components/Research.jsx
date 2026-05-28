import React from 'react';
import { BookOpen } from 'lucide-react';

const Research = () => {
  return (
    <section id="research" className="section-padding border-bottom" style={{ position: 'relative' }}>
      <div className="bg-dots"></div>
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>Research & Publications</h2>
        <div className="card" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <BookOpen size={24} color="var(--color-text-muted)" />
              <span className="metric-badge mono-text">IEEE Submitted</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>
              AI-Based Mustering Event System Using Real-Time Face Recognition
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Co-authored research on establishing a real-time personnel accountability system using an edge-cloud architecture. The system leverages YOLOv8 for detection, FaceNet512 for facial embeddings, and Deep SORT for object tracking to optimize emergency mustering scenarios.
            </p>
            <div className="project-tech">
              Architecture Overview • High Accuracy Tracking • Edge-Cloud Optimization
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
