import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResumePilotPage from './pages/ResumePilotPage';
import ProjectIrisPage from './pages/ProjectIrisPage';
import MusteringSystemPage from './pages/MusteringSystemPage';
import ScrollReveal from './components/ScrollReveal';
import CommandPalette from './components/CommandPalette';
import LiveDashboard from './components/LiveDashboard';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

const NotFound = () => (
  <div style={{ padding: '12rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>This page doesn't exist.</p>
    <a href="/" className="btn btn-secondary">Go Home</a>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
        <Route path="/projects/resumepilot" element={<PageTransitionWrapper><ResumePilotPage /></PageTransitionWrapper>} />
        <Route path="/projects/project-iris" element={<PageTransitionWrapper><ProjectIrisPage /></PageTransitionWrapper>} />
        <Route path="/projects/mustering-system" element={<PageTransitionWrapper><MusteringSystemPage /></PageTransitionWrapper>} />
        <Route path="*" element={<PageTransitionWrapper><NotFound /></PageTransitionWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <CommandPalette />
        <Navbar />
        <LiveDashboard />
        <main>
          <AnimatedRoutes />
        </main>
        <ScrollReveal>
          <Footer />
        </ScrollReveal>
        <ChatWidget />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
