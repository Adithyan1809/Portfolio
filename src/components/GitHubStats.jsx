import React, { useEffect, useState, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { GitCommit, ExternalLink } from 'lucide-react';
import ChromaText from './shared/ChromaText';
import { useSoundEffects } from '../hooks/useSoundEffects';

const GitHubStats = () => {
  const [theme, setTheme] = useState('light');
  const [lastPush, setLastPush] = useState(null);
  const scrollRef = useRef(null);
  const { playTwinkle } = useSoundEffects();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
    return () => observer.disconnect();
  }, []);

  // Fetch real GitHub recent event for live credibility signal (cached in sessionStorage)
  useEffect(() => {
    const cached = sessionStorage.getItem('gh_last_push');
    if (cached) {
      setLastPush(cached);
      return;
    }

    fetch('https://api.github.com/users/Adithyan1809/events?per_page=5')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const pushEvent = data.find(e => e.type === 'PushEvent') || data[0];
          if (pushEvent?.created_at) {
            const date = new Date(pushEvent.created_at);
            const now = new Date();
            const diffHours = Math.round((now - date) / (1000 * 60 * 60));
            const diffDays = Math.round(diffHours / 24);
            let timeStr = 'recently';
            if (diffHours < 1) timeStr = 'just now';
            else if (diffHours < 24) timeStr = `${diffHours}h ago`;
            else if (diffDays === 1) timeStr = 'yesterday';
            else timeStr = `${diffDays}d ago`;

            const repoName = pushEvent.repo?.name ? pushEvent.repo.name.replace('Adithyan1809/', '') : 'repository';
            const label = `Pushed to ${repoName} (${timeStr})`;
            setLastPush(label);
            sessionStorage.setItem('gh_last_push', label);
          }
        }
      })
      .catch(() => {
        // Fallback gracefully without breaking UI
        setLastPush('Active contributor');
      });
  }, []);

  // Auto-scroll to current month on mobile
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      }, 500);
    }
  }, []);

  return (
    <section id="github" className="section-padding border-bottom section-rule-lines" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <span className="section-watermark-text" aria-hidden="true">ACTIVITY</span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header-row" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-eyebrow mono-text">CONTRIBUTIONS &amp; CODEBASE</span>
            <ChromaText as="h2" className="section-title">Live Engineering Activity</ChromaText>
          </div>
          
          {lastPush && (
            <div className="status-tag status-tag-emerald mono-text" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="ping-dot" style={{ color: '#10b981', width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />
              <GitCommit size={13} />
              <span>{lastPush}</span>
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="calendar-container liquid-glass"
          onMouseEnter={playTwinkle}
          style={{ 
            padding: '2.25rem', 
            borderRadius: '16px',
            overflowX: 'auto'
          }}
        >
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
