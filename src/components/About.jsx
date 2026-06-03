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
              I am an AI & ML undergraduate at DSATM and a Technical Lead Intern at SMAP Technologies. I love exploring the intersection of modern AI models and backend environments, building systems capable of processing large data streams efficiently.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              I'm highly interested in MLOps, asynchronous microservices, and robust software architecture. Rather than simply training isolated models, my goal is to learn and apply the engineering principles required to seamlessly deploy and scale AI infrastructure for the real world.
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
