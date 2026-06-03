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
              I am an AI & ML undergraduate at DSATM and a Technical Lead Intern at SMAP Technologies. My expertise lies at the intersection of bleeding-edge AI models and high-stakes production environments, architecting distributed systems capable of processing vast data streams in real-time.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              I specialize in MLOps, asynchronous microservices, and hardware-accelerated inferencing. Rather than simply training isolated models, I focus on the rigorous engineering required to seamlessly deploy, monitor, and scale intelligent infrastructure for the real world.
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
