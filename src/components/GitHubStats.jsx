import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const GitHubStats = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
    return () => observer.disconnect();
  }, []);

  return (
    <section id="github" className="section-padding border-bottom">
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>Coding Activity</h2>
        <div className="calendar-container" style={{ 
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
