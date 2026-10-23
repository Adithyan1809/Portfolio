import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import FeaturedProjects from '../components/FeaturedProjects';
import Projects from '../components/Projects';
import ScrollReveal from '../components/ScrollReveal';
import './StaticPages.css';

const ProjectsPage = () => {
  useEffect(() => {
    document.title = "Projects Directory — All AI & Engineering Systems | Adithyan P.";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="static-page-container">
      <div className="static-ambient-glow" aria-hidden="true" />
      <nav className="static-breadcrumb mono-text">
        <Link to="/" className="static-back-btn">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </nav>
      <header className="static-header">
        <div className="static-category-badge mono-text">
          <Layers size={13} />
          <span>PROJECT DIRECTORY • ALL SYSTEMS</span>
        </div>
        <h1 className="static-main-title">Systems, Architectures &amp; Repositories</h1>
        <p className="static-main-subtitle">
          A complete catalog of production computer vision pipelines, distributed edge architectures,
          LLM agent systems, and open-source tooling built by Adithyan Prakash.
        </p>
      </header>

      <ScrollReveal>
        <div style={{ marginTop: '2.5rem' }}>
          <FeaturedProjects />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="border-top" style={{ marginTop: '4rem', paddingTop: '2rem' }}>
          <Projects />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ProjectsPage;
