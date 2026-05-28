import React from 'react';
import NeuralCore3D from './NeuralCore3D';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section-padding border-bottom">
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>About</h2>
        <div className="about-grid">
          <div className="about-content">
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              I am an AI & ML undergraduate at DSATM and a Technical Lead Intern at SMAP Technologies. My work bridges the gap between research and production, focusing on architecting scalable AI systems, robust backend infrastructures, and real-time computer vision applications.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              I have a strong interest in MLOps, distributed systems, and scalable deployments. Rather than just training models, I specialize in the practical engineering required to deploy them effectively in real-world, high-stakes environments.
            </p>
          </div>
          <div className="about-visual">
            <NeuralCore3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
