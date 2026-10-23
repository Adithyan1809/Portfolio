import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ScrollReveal from './components/ScrollReveal';
import CommandPalette from './components/CommandPalette';
import LiveDashboard from './components/LiveDashboard';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import ErrorBoundary from './components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';

const ResumePilotPage = lazy(() => import('./pages/ResumePilotPage'));
const ProjectIrisPage = lazy(() => import('./pages/ProjectIrisPage'));
const MusteringSystemPage = lazy(() => import('./pages/MusteringSystemPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NowPage = lazy(() => import('./pages/NowPage'));
const UsesPage = lazy(() => import('./pages/UsesPage'));
const GardenPage = lazy(() => import('./pages/GardenPage'));
const LabPage = lazy(() => import('./pages/LabPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

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
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
            <Route path="/projects" element={<PageTransitionWrapper><ProjectsPage /></PageTransitionWrapper>} />
            <Route path="/projects/iris" element={<PageTransitionWrapper><ProjectIrisPage /></PageTransitionWrapper>} />
            <Route path="/projects/project-iris" element={<PageTransitionWrapper><ProjectIrisPage /></PageTransitionWrapper>} />
            <Route path="/projects/resumepilot" element={<PageTransitionWrapper><ResumePilotPage /></PageTransitionWrapper>} />
            <Route path="/projects/mustering-system" element={<PageTransitionWrapper><MusteringSystemPage /></PageTransitionWrapper>} />
            <Route path="/blog" element={<PageTransitionWrapper><BlogIndex /></PageTransitionWrapper>} />
            <Route path="/blog/:slug" element={<PageTransitionWrapper><BlogPost /></PageTransitionWrapper>} />
            <Route path="/about" element={<PageTransitionWrapper><AboutPage /></PageTransitionWrapper>} />
            <Route path="/now" element={<PageTransitionWrapper><NowPage /></PageTransitionWrapper>} />
            <Route path="/uses" element={<PageTransitionWrapper><UsesPage /></PageTransitionWrapper>} />
            <Route path="/garden" element={<PageTransitionWrapper><GardenPage /></PageTransitionWrapper>} />
            <Route path="/lab" element={<PageTransitionWrapper><LabPage /></PageTransitionWrapper>} />
            <Route path="/contact" element={<PageTransitionWrapper><ContactPage /></PageTransitionWrapper>} />
            <Route path="*" element={<PageTransitionWrapper><NotFound /></PageTransitionWrapper>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default function DesktopApp() {
  return (
    <Router>
      <SmoothScroll>
        <div className="app-container">
          {/* Grain film overlay */}
          <div className="grain-overlay" aria-hidden="true" />
          <ScrollProgress />
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
          <Analytics />
        </div>
      </SmoothScroll>
    </Router>
  );
}
