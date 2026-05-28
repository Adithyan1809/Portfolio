import React from 'react';
import About from '../components/About';
import Education from '../components/Education';
import ScrollReveal from '../components/ScrollReveal';

const AboutPage = () => {
  return (
    <>
      <ScrollReveal>
        <div className="border-top" style={{ minHeight: '50vh' }}>
          <About />
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="border-top">
          <Education />
        </div>
      </ScrollReveal>
    </>
  );
};

export default AboutPage;
