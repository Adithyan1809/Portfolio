import React from 'react';
import Experience from '../components/Experience';
import ScrollReveal from '../components/ScrollReveal';

const ExperiencePage = () => {
  return (
    <ScrollReveal>
      <div className="border-top" style={{ minHeight: '80vh' }}>
        <Experience />
      </div>
    </ScrollReveal>
  );
};

export default ExperiencePage;
