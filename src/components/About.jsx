import React from 'react';

const About = () => {
  return (
    <section id="about" className="section-padding border-bottom" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="bg-dots"></div>
      <div className="container">
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>About</h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-text)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            I am an AI & ML undergraduate at DSATM and a Technical Lead Intern at SMAP Technologies. My work bridges the gap between research and production, focusing on architecting scalable AI systems, robust backend infrastructures, and real-time computer vision applications.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
            I have a strong interest in MLOps, distributed systems, and scalable deployments. Rather than just training models, I specialize in the practical engineering required to deploy them effectively in real-world, high-stakes environments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
