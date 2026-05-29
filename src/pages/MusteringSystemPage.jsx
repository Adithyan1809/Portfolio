import React from 'react';
import CaseStudyLayout from '../components/CaseStudyLayout';
import { ParallaxScanner } from '../components/ParallaxScanner';
import musteringImg from '../assets/mustering_system.png';

const MusteringSystemPage = () => {
  return (
    <CaseStudyLayout
      visualElement={
        <ParallaxScanner src={musteringImg} />
      }
      title="AI Mustering Event System"
      role="AI & Computer Vision Researcher"
      overview="Real-time personnel accountability system using an edge-cloud architecture. IEEE-submitted research project."
      problem="During emergency evacuations, accounting for all personnel in real-time is critical but often chaotic. Existing solutions rely on manual headcounts or RFID scanning which can be slow. This research project aimed to create a passive, high-accuracy computer vision system to track personnel movement into safe zones."
      architecture={
        <div>
          <h4 style={{color: 'var(--color-text)', marginBottom: '1rem'}}>Edge-Cloud Architecture</h4>
          <p>1. <strong>Edge Nodes</strong>: Local cameras running YOLOv8 for immediate person detection.</p>
          <p>2. <strong>Feature Extraction</strong>: FaceNet512 extracts high-dimensional facial embeddings.</p>
          <p>3. <strong>Tracking</strong>: Deep SORT assigns tracking IDs to maintain continuity across frames.</p>
          <p>4. <strong>Cloud Sync</strong>: Processed metadata (not raw video) is synced to the cloud dashboard for real-time commander overview.</p>
        </div>
      }
      stack={['Python', 'YOLOv8', 'FaceNet512', 'Deep SORT', 'OpenCV', 'PyTorch']}
      challenges={[
        { title: 'Maintaining Tracking Continuity', description: 'In crowded emergency scenarios, occlusions frequently break tracking algorithms. By integrating Deep SORT with YOLOv8, we utilized motion and appearance information to re-identify individuals after occlusion, significantly improving tracking stability.' },
        { title: 'Edge Hardware Limitations', description: 'Running complex models on edge devices required heavy optimization. We quantized the YOLOv8 and FaceNet models to reduce memory footprint and improve inference speed without sacrificing the accuracy required for accountability.' },
        { title: 'Academic Rigor', description: 'The project required rigorous testing and ablation studies to prove the efficacy of the combined YOLOv8 + Deep SORT pipeline, culminating in a formal research paper submitted to IEEE.' }
      ]}
      metrics={[
        'IEEE Research Submission',
        'High Accuracy Occlusion Handling',
        'Optimized Edge Inference',
        'Real-time Dashboard Analytics'
      ]}
      links={{ github: '#' }}
    />
  );
};

export default MusteringSystemPage;
