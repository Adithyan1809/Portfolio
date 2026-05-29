import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <h2 className="uppercase text-center" style={{marginBottom: '4rem'}}>Projects & Research</h2>
        
        <div className="brutalist-grid project-list">
          <div className="project-card border-right border-bottom">
            <div className="project-header">
              <h3>ResumePilot</h3>
              <span className="mono-text">2025 – 2026</span>
            </div>
            <p className="mono-text" style={{fontWeight: 'bold', marginBottom: '1rem'}}>AI Career Intelligence Platform</p>
            <p className="mono-text" style={{marginBottom: '1.5rem'}}>Next.js · FastAPI · PostgreSQL · Groq AI · spaCy · Docker · GitHub Actions · <a href="#" style={{textDecoration:'underline'}}>GitHub</a></p>
            <ul>
              <li>Built a full-stack AI resume tailoring platform with 75+ engine AI pipeline for JD extraction, semantic gap analysis, ATS optimisation, resume tailoring, and hallucination-safe content generation.</li>
              <li>Zero-hallucination guarantee prevents fabricated tech/projects in output; features Interview Simulator, Career Intelligence dashboards, and Personal Branding Engine; deployed via Docker Compose with CI/CD</li>
            </ul>
          </div>

          <div className="project-card border-bottom">
            <div className="project-header">
              <h3>AI-Based Mustering Event System</h3>
              <span className="mono-text">2025 – 2026</span>
            </div>
            <p className="mono-text" style={{fontWeight: 'bold', marginBottom: '1rem'}}>Research Prototype & IEEE Publication</p>
            <p className="mono-text" style={{marginBottom: '1.5rem'}}>YOLOv8 · FaceNet512 · MTCNN · Deep SORT · Python</p>
            <ul>
              <li>Co-authored IEEE-submitted paper on intelligent emergency personnel accountability using YOLOv8 (44.9% mAP, 60 FPS) + FaceNet512 (97.4% accuracy) + Deep SORT; designed three-layer edge-cloud architecture with sub-500ms latency.</li>
              <li>Benchmarked YOLOv8 vs Faster R-CNN and Mask R-CNN; Softmax-based evacuation routing and multi-camera identity fusion with ±30s temporal filtering.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Projects;
