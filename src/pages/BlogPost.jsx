import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Calendar, Clock, Share2, Check,
  ChevronRight, Link as LinkIcon, BookOpen, Terminal, Sparkles
} from 'lucide-react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { getPostBySlug, getAllPosts } from '../content/blogLoader';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import './Blog.css';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const allPosts = useMemo(() => getAllPosts(), []);

  // Compute previous and next post
  const { prevPost, nextPost } = useMemo(() => {
    if (!post) return { prevPost: null, nextPost: null };
    const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
    return {
      prevPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
      nextPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    };
  }, [allPosts, post]);

  // Set document title
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Adithyan P.`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  // Track scroll progress & active TOC heading
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
      }

      // Detect active heading
      if (headings.length > 0) {
        const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
        for (let i = headingElements.length - 1; i >= 0; i--) {
          const el = headingElements[i];
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveHeading(el.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${post.title}" by @Adithyan1809`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  if (!post) {
    return (
      <div className="blog-not-found">
        <h1 className="mono-text">404 — Article Not Found</h1>
        <p>The post you are looking for does not exist or has moved.</p>
        <Link to="/blog" className="btn btn-secondary mono-text">
          <ArrowLeft size={14} /> Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <article className="blog-post-page">
      {/* Top Reading Progress Bar */}
      <div
        className="blog-reading-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="blog-post-layout">
        {/* Main Article Content */}
        <div className="blog-post-main">
          {/* Breadcrumb / Back Navigation */}
          <nav className="blog-breadcrumb mono-text">
            <Link to="/blog" className="blog-back-btn">
              <ArrowLeft size={14} />
              <span>Back to all notes</span>
            </Link>
          </nav>

          {/* Article Header */}
          <header className="blog-post-header">
            <div className="blog-post-tags">
              {(post.tags || []).map((tag) => (
                <span key={tag} className="blog-card-tag mono-text">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="blog-post-title">{post.title}</h1>

            <div className="blog-post-meta mono-text">
              <div className="blog-author-meta">
                <div className="blog-author-avatar">AP</div>
                <div>
                  <span className="blog-author-name">Adithyan Prakash</span>
                  <span className="blog-author-role">AI &amp; ML Engineer</span>
                </div>
              </div>

              <div className="blog-date-meta">
                <span>
                  <Calendar size={13} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span>
                  <Clock size={13} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          <hr className="blog-divider" />

          {/* Markdown Content */}
          <MarkdownRenderer
            content={post.content}
            onHeadingsExtracted={setHeadings}
          />

          {/* Share & Actions Bar */}
          <div className="blog-share-section">
            <span className="mono-text share-label">
              <Share2 size={14} /> Share this article
            </span>
            <div className="blog-share-buttons">
              <button
                type="button"
                onClick={handleShareTwitter}
                className="blog-share-btn mono-text"
                title="Share on X"
              >
                <FaTwitter size={13} />
                <span>Post</span>
              </button>
              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="blog-share-btn mono-text"
                title="Share on LinkedIn"
              >
                <FaLinkedin size={13} />
                <span>Share</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="blog-share-btn mono-text"
                title="Copy link"
              >
                {copiedLink ? <Check size={14} /> : <LinkIcon size={14} />}
                <span>{copiedLink ? 'Copied URL!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Author Bio Card */}
          <div className="blog-author-box">
            <div className="author-box-avatar">AP</div>
            <div className="author-box-content">
              <h3 className="author-box-name">Written by Adithyan Prakash</h3>
              <p className="author-box-bio">
                AI &amp; ML Engineer from Bengaluru. Builds production computer vision systems,
                sub-40ms edge pipelines, and deterministic LLM agents. Technical Lead Intern at SMAP Technologies.
              </p>
              <div className="author-box-links mono-text">
                <a href="https://github.com/Adithyan1809" target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
                <a href="https://in.linkedin.com/in/adithyan-prakash" target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
                <a href="/#contact">
                  Get in Touch ↗
                </a>
              </div>
            </div>
          </div>

          {/* Previous / Next Article Navigation */}
          <nav className="blog-pagination">
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className="pagination-card pagination-prev">
                <span className="pagination-label mono-text">← Older Note</span>
                <span className="pagination-title">{prevPost.title}</span>
              </Link>
            ) : <div className="pagination-empty" />}

            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="pagination-card pagination-next">
                <span className="pagination-label mono-text">Newer Note →</span>
                <span className="pagination-title">{nextPost.title}</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Sidebar: Table of Contents */}
        {headings.length > 0 && (
          <aside className="blog-toc-sidebar" aria-label="Table of Contents">
            <div className="blog-toc-sticky">
              <div className="toc-header mono-text">
                <Terminal size={13} />
                <span>ON THIS PAGE</span>
              </div>
              <ul className="toc-list">
                {headings.map((h) => (
                  <li
                    key={h.id}
                    className={`toc-item level-${h.level} ${activeHeading === h.id ? 'active' : ''}`}
                  >
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(h.id);
                        if (el) {
                          const yOffset = -90;
                          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
