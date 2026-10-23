import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import About from '../components/About';
import Education from '../components/Education';
import ScrollReveal from '../components/ScrollReveal';
import './StaticPages.css';

const AboutPage = () => {
  useEffect(() => {
    document.title = "About — Personal Story & Journey | Adithyan P.";
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
          <User size={13} />
          <span>PERSONAL STORY • ABOUT</span>
        </div>
        <h1 className="static-main-title">Engineering Journey &amp; Story</h1>
        <p className="static-main-subtitle">
          From tinkering with edge hardware to building sub-40ms distributed computer vision systems
          and leading an engineering squad of 11 at SMAP Technologies.
        </p>
      </header>

      <ScrollReveal>
        <div style={{ marginTop: '2rem' }}>
          <About />
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="border-top" style={{ marginTop: '3rem' }}>
          <Education />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default AboutPage;
