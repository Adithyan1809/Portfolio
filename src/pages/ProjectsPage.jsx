import React from 'react';
import Projects from '../components/Projects';
import ScrollReveal from '../components/ScrollReveal';

const ProjectsPage = () => {
  return (
    <ScrollReveal>
      <div className="border-top" style={{ minHeight: '80vh' }}>
        <Projects />
      </div>
    </ScrollReveal>
  );
};

export default ProjectsPage;
