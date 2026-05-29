import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Research from '../components/Research';
import GitHubStats from '../components/GitHubStats';
import Contact from '../components/Contact';
import ScrollReveal from '../components/ScrollReveal';
import Marquee from '../components/Marquee';
import { DeepDiveFlythrough } from '../components/DeepDiveFlythrough';
import { DataPipelineScroll } from '../components/DataPipelineScroll';

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <DeepDiveFlythrough />
      <Marquee />
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><FeaturedProjects /></ScrollReveal>
      <ScrollReveal><Skills /></ScrollReveal>
      <ScrollReveal><Experience /></ScrollReveal>
      <ScrollReveal><Research /></ScrollReveal>
      <ScrollReveal><GitHubStats /></ScrollReveal>
      <DataPipelineScroll />
      <ScrollReveal><Contact /></ScrollReveal>
    </div>
  );
};

export default Home;
