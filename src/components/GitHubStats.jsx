import React, { useEffect, useState, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const GitHubStats = () => {
  const [theme, setTheme] = useState('light');
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
    return () => observer.disconnect();
  }, []);

  // Auto-scroll to the right to show current month on mobile
  useEffect(() => {
    if (scrollRef.current) {
      // Small timeout to ensure the calendar has rendered its content
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      }, 500);
    }
  }, []);

  return (
    <section id="github" className="section-padding border-bottom">
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>Coding Activity</h2>
        <div ref={scrollRef} className="calendar-container" style={{ 
          padding: '2rem', 
          border: '2px solid var(--color-accent)', 
          borderRadius: '8px',
          boxShadow: '4px 4px 0 var(--color-accent)',
          background: 'var(--color-bg)',
          overflowX: 'auto'
        }}>
          <GitHubCalendar 
            username="Adithyan1809" 
            colorScheme={theme}
            blockSize={14}
            blockMargin={4}
            fontSize={14}
          />
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
