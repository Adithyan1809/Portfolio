import React, { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';

export default function GiscusComments() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check current theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const giscusTheme = isDark ? 'dark_dimmed' : 'light';

    // Remove old iframe/script if any
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'Adithyan1809/Portfolio');
    script.setAttribute('data-repo-id', 'R_kgDONp15-g'); // Default placeholder or will sync with repo discussions
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDONp15-s4CmW5_');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', giscusTheme);
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    containerRef.current.appendChild(script);

    // Observer for theme changes to dynamically switch Giscus theme
    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const iframe = document.querySelector('iframe.giscus-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            giscus: {
              setConfig: {
                theme: currentDark ? 'dark_dimmed' : 'light',
              },
            },
          },
          'https://giscus.app'
        );
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="giscus-section" aria-label="Article Discussion">
      <div className="giscus-header mono-text">
        <MessageSquare size={16} />
        <span>DISCUSSION &amp; COMMUNITY FEEDBACK</span>
      </div>
      <p className="giscus-subtitle">
        Have thoughts, questions, or optimizations? Leave a comment below via GitHub.
      </p>
      <div ref={containerRef} className="giscus-container" />
    </section>
  );
}
