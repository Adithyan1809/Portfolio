import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';

// Import core languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-sql';

/**
 * Enhanced Markdown renderer using marked + Prism.js with copy buttons,
 * anchor headers, and math blocks.
 */
export default function MarkdownRenderer({ content, onHeadingsExtracted }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Extract headings for Table of Contents
    if (onHeadingsExtracted) {
      const headingEls = containerRef.current.querySelectorAll('h2, h3');
      const headings = Array.from(headingEls).map((el) => {
        // Ensure ID
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

    // Enhance code blocks with copy buttons
    const preBlocks = containerRef.current.querySelectorAll('pre');
    preBlocks.forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return; // already added

      const codeEl = pre.querySelector('code');
      const langMatch = (codeEl?.className || '').match(/language-(\w+)/);
      const lang = langMatch ? langMatch[1].toUpperCase() : 'CODE';

      // Header bar for code block
      const header = document.createElement('div');
      header.className = 'code-block-header';

      const langBadge = document.createElement('span');
      langBadge.className = 'code-lang-badge mono-text';
      langBadge.textContent = lang;

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

      header.appendChild(langBadge);
      header.appendChild(copyBtn);

      pre.parentNode.insertBefore(header, pre);
      // Group header & pre into code wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      header.parentNode.insertBefore(wrapper, header);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    });
  }, [content, onHeadingsExtracted]);

  // Configure marked with Prism highlighter
  const html = React.useMemo(() => {
    marked.setOptions({
      gfm: true,
      breaks: false,
      highlight: (code, lang) => {
        if (Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang], lang);
        }
        return code;
      },
    });

    return marked.parse(content || '');
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="markdown-body blog-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
