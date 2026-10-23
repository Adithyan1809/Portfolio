import React, { useEffect, useRef, useMemo } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';

// Core Prism languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-diff';

// Interactive Blog Widgets
import LatencyCalculator from './widgets/LatencyCalculator';
import ConstrainedDecoderSimulator from './widgets/ConstrainedDecoderSimulator';

const WIDGET_MAP = {
  'latency-calculator': LatencyCalculator,
  'decoder-simulator': ConstrainedDecoderSimulator,
};

/**
 * Preprocesses GitHub-style Admonitions:
 * > [!NOTE]
 * > Content...
 */
function processAdmonitions(markdown) {
  const alertIcons = {
    note: 'ℹ️',
    tip: '💡',
    important: '📌',
    warning: '⚠️',
    caution: '🛑',
  };

  return markdown.replace(
    />\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\r?\n|\s+)([\s\S]*?)(?=(?:\r?\n\r?\n[^\s>]|$))/gi,
    (match, type, content) => {
      const cleanContent = content
        .split('\n')
        .map((line) => line.replace(/^>\s?/, ''))
        .join('\n')
        .trim();
      const lowerType = type.toLowerCase();
      const icon = alertIcons[lowerType] || 'ℹ️';

      return `\n\n<div class="admonition admonition-${lowerType}">
<div class="admonition-title mono-text">
  <span class="admonition-icon">${icon}</span>
  <span>${type.toUpperCase()}</span>
</div>
<div class="admonition-body">

${cleanContent}

</div>
</div>\n\n`;
    }
  );
}

/**
 * Custom MarkdownRenderer with:
 * - Interactive widgets embedding (:::widget:name:::)
 * - GitHub alert admonitions ([!NOTE], [!WARNING], [!TIP])
 * - Filename labels & diff highlighting in code blocks
 * - Copy-to-clipboard functionality
 * - Auto-extracted Table of Contents anchors
 */
export default function MarkdownRenderer({ content, onHeadingsExtracted }) {
  const containerRef = useRef(null);

  // Split content by widget markers: :::widget:name:::
  const segments = useMemo(() => {
    if (!content) return [];

    const processed = processAdmonitions(content);
    const regex = /:::widget:([a-zA-Z0-9_-]+):::/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(processed)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'markdown',
          content: processed.slice(lastIndex, match.index),
        });
      }
      parts.push({
        type: 'widget',
        widgetName: match[1],
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < processed.length) {
      parts.push({
        type: 'markdown',
        content: processed.slice(lastIndex),
      });
    }

    return parts;
  }, [content]);

  // Configure marked with Prism syntax highlighting
  const renderMarkdown = (mdText) => {
    marked.setOptions({
      gfm: true,
      breaks: false,
      highlight: (code, langWithFile) => {
        const [lang] = (langWithFile || '').split(':');
        const cleanLang = lang.trim().toLowerCase();

        if (Prism.languages[cleanLang]) {
          return Prism.highlight(code, Prism.languages[cleanLang], cleanLang);
        }
        return code;
      },
    });

    return marked.parse(mdText || '');
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Extract headings for Table of Contents
    if (onHeadingsExtracted) {
      const headingEls = containerRef.current.querySelectorAll('h2, h3');
      const headings = Array.from(headingEls).map((el) => {
        if (!el.id) {
          el.id = el.textContent
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
        }
        return {
          id: el.id,
          text: el.textContent,
          level: Number(el.tagName.replace('H', '')),
        };
      });
      onHeadingsExtracted(headings);
    }

    // Enhance code blocks
    const preBlocks = containerRef.current.querySelectorAll('pre');
    preBlocks.forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return;

      const codeEl = pre.querySelector('code');
      const rawLang = (codeEl?.className || '').replace('language-', '');
      let lang = 'CODE';
      let filename = '';

      if (rawLang.includes(':')) {
        const parts = rawLang.split(':');
        lang = parts[0].toUpperCase();
        filename = parts.slice(1).join(':');
      } else if (rawLang) {
        lang = rawLang.toUpperCase();
      }

      // Check for diff styling
      if (codeEl) {
        const lines = codeEl.innerHTML.split('\n');
        const hasDiff = lines.some((l) => l.startsWith('+') || l.startsWith('-'));
        if (hasDiff) {
          codeEl.innerHTML = lines
            .map((line) => {
              if (line.startsWith('+')) return `<span class="line-diff line-add">${line}</span>`;
              if (line.startsWith('-')) return `<span class="line-diff line-del">${line}</span>`;
              return line;
            })
            .join('\n');
        }
      }

      // Create Header bar
      const header = document.createElement('div');
      header.className = 'code-block-header';

      const leftSide = document.createElement('div');
      leftSide.className = 'code-header-left';

      const langBadge = document.createElement('span');
      langBadge.className = 'code-lang-badge mono-text';
      langBadge.textContent = lang;
      leftSide.appendChild(langBadge);

      if (filename) {
        const filenameBadge = document.createElement('span');
        filenameBadge.className = 'code-filename-badge mono-text';
        filenameBadge.textContent = filename;
        leftSide.appendChild(filenameBadge);
      }

      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn mono-text';
      copyBtn.type = 'button';
      copyBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <span>Copy</span>
      `;

      copyBtn.addEventListener('click', async () => {
        const text = codeEl ? codeEl.innerText : pre.innerText;
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.classList.add('copied');
          copyBtn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Copied!</span>
          `;
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = `
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>Copy</span>
            `;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });

      header.appendChild(leftSide);
      header.appendChild(copyBtn);

      pre.parentNode.insertBefore(header, pre);
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      header.parentNode.insertBefore(wrapper, header);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    });
  }, [segments, onHeadingsExtracted]);

  return (
    <div ref={containerRef} className="markdown-body blog-prose">
      {segments.map((seg, idx) => {
        if (seg.type === 'widget') {
          const WidgetComponent = WIDGET_MAP[seg.widgetName];
          if (!WidgetComponent) return null;
          return (
            <div key={`widget-${idx}`} className="embedded-widget-wrapper">
              <WidgetComponent />
            </div>
          );
        }

        return (
          <div
            key={`md-${idx}`}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(seg.content) }}
          />
        );
      })}
    </div>
  );
}
