import React, { useEffect, useRef, useMemo } from 'react';
import { Marked } from 'marked';
import Prism from 'prismjs';
import katex from 'katex';
import 'katex/dist/katex.min.css';

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

// Interactive Blog Widgets
import LatencyCalculator from './widgets/LatencyCalculator';
import ConstrainedDecoderSimulator from './widgets/ConstrainedDecoderSimulator';

const WIDGET_MAP = {
  'latency-calculator': LatencyCalculator,
  'decoder-simulator': ConstrainedDecoderSimulator,
};

function escapeHtml(unsafe) {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Preprocesses LaTeX math formulas ($...$ and $$...$$):
 * Protects code blocks & inline code from being touched.
 */
function processMath(markdown) {
  if (!markdown) return '';

  // 1. Temporarily replace all code fences and inline code with tokens
  const codeBlocks = [];
  let text = markdown.replace(/(````[\s\S]*?````|```[\s\S]*?```|`[^`\n]+`)/g, (match) => {
    codeBlocks.push(match);
    return `%%MATH_CODE_TOKEN_${codeBlocks.length - 1}%%`;
  });

  // 2. Block math: $$ ... $$
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
    } catch {
      return match;
    }
  });

  // 3. Inline math: $ ... $ (must not be preceded or followed by $)
  text = text.replace(/(?<!\$)\$(?!\$)([^\$\n]+?)(?<!\$)\$(?!\$)/g, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return match;
    }
  });

  // 4. Restore code blocks
  text = text.replace(/%%MATH_CODE_TOKEN_(\d+)%%/g, (_, idx) => codeBlocks[Number(idx)]);

  return text;
}

/**
 * Preprocesses GitHub-style Admonitions:
 * > [!NOTE]
 * > Content...
 */
function processAdmonitions(markdown) {
  const alertBadges = {
    note: { label: 'NOTE', icon: 'ℹ' },
    tip: { label: 'PRO TIP', icon: '★' },
    important: { label: 'IMPORTANT', icon: '!' },
    warning: { label: 'WARNING', icon: '⚠' },
    caution: { label: 'CAUTION', icon: '✖' },
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
      const badge = alertBadges[lowerType] || { label: type.toUpperCase(), icon: 'ℹ' };

      return `\n\n<div class="admonition admonition-${lowerType}">
<div class="admonition-title mono-text">
  <span class="admonition-badge">${badge.icon} ${badge.label}</span>
</div>
<div class="admonition-body">

${cleanContent}

</div>
</div>\n\n`;
    }
  );
}

// Build a custom marked instance with dedicated code block renderer
const customMarked = new Marked();

customMarked.use({
  gfm: true,
  breaks: false,
  renderer: {
    code({ text, lang }) {
      const rawLang = lang || '';
      let cleanLang = 'text';
      let filename = '';

      if (rawLang.includes(':')) {
        const parts = rawLang.split(':');
        cleanLang = parts[0].trim().toLowerCase();
        filename = parts.slice(1).join(':').trim();
      } else if (rawLang) {
        cleanLang = rawLang.trim().toLowerCase();
      }

      let highlighted = '';

      // Clean, bulletproof line-by-line diff formatting (no Prism tag splitting leaks)
      if (cleanLang === 'diff') {
        const lines = text.split('\n');
        highlighted = lines
          .map((line) => {
            if (line.startsWith('+')) {
              return `<span class="line-diff line-add"><span class="diff-prefix">+</span>${escapeHtml(line.slice(1))}</span>`;
            }
            if (line.startsWith('-')) {
              return `<span class="line-diff line-del"><span class="diff-prefix">-</span>${escapeHtml(line.slice(1))}</span>`;
            }
            return `<span class="line-diff line-context"><span class="diff-prefix"> </span>${escapeHtml(line)}</span>`;
          })
          .join('\n');
      } else if (cleanLang !== 'text' && Prism.languages[cleanLang]) {
        try {
          highlighted = Prism.highlight(text, Prism.languages[cleanLang], cleanLang);
        } catch {
          highlighted = escapeHtml(text);
        }
      } else {
        highlighted = escapeHtml(text);
      }

      const encodedCode = encodeURIComponent(text);

      return `<div class="code-block-wrapper">
  <div class="code-block-header">
    <div class="code-header-left">
      <span class="code-lang-badge mono-text">${cleanLang.toUpperCase()}</span>
      ${filename ? `<span class="code-filename-badge mono-text">${escapeHtml(filename)}</span>` : ''}
    </div>
    <button class="code-copy-btn mono-text" type="button" data-code="${encodedCode}">
      <svg class="copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
      <span class="copy-text">Copy</span>
    </button>
  </div>
  <pre class="code-block-pre"><code class="language-${cleanLang}">${highlighted}</code></pre>
</div>`;
    },
  },
});

export default function MarkdownRenderer({ content, onHeadingsExtracted }) {
  const containerRef = useRef(null);

  // Split content by widget markers: :::widget:name:::
  const segments = useMemo(() => {
    if (!content) return [];

    const withAdmonitions = processAdmonitions(content);
    const withMath = processMath(withAdmonitions);
    const regex = /:::widget:([a-zA-Z0-9_-]+):::/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(withMath)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'markdown',
          content: withMath.slice(lastIndex, match.index),
        });
      }
      parts.push({
        type: 'widget',
        widgetName: match[1],
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < withMath.length) {
      parts.push({
        type: 'markdown',
        content: withMath.slice(lastIndex),
      });
    }

    return parts;
  }, [content]);

  // Extract headings & handle copy button clicks
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

    // Delegated click handler for copy buttons
    const handleCopyClick = async (e) => {
      const btn = e.target.closest('.code-copy-btn');
      if (!btn) return;

      const raw = decodeURIComponent(btn.getAttribute('data-code') || '');
      try {
        await navigator.clipboard.writeText(raw);
        btn.classList.add('copied');
        const textSpan = btn.querySelector('.copy-text');
        if (textSpan) textSpan.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          if (textSpan) textSpan.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    };

    const container = containerRef.current;
    container.addEventListener('click', handleCopyClick);
    return () => container.removeEventListener('click', handleCopyClick);
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
            dangerouslySetInnerHTML={{ __html: customMarked.parse(seg.content) }}
          />
        );
      })}
    </div>
  );
}
