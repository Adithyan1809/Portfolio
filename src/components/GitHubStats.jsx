import React from 'react';
import GithubCity3D from './GithubCity3D';

const GitHubStats = () => {
  return (
    <section id="github" className="section-padding border-bottom">
      <div className="container">
        <h2 style={{ marginBottom: '1rem' }}>Contribution City</h2>
        <p style={{ marginBottom: '3rem', color: 'var(--color-text-muted)' }}>
          A 3D isometric representation of my real-time GitHub activity over the last 6 months. Hover over buildings to see commits, and drag to rotate the city.
        </p>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <GithubCity3D username="Adithyan1809" />
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
