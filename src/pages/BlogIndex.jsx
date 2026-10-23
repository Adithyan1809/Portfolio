import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { getAllPosts, getAllTags } from '../content/blogLoader';
import './Blog.css';

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const allPosts = useMemo(() => getAllPosts(), []);
  const allTags = useMemo(() => getAllTags(), []);

  useEffect(() => {
    document.title = "Blog & Technical Deep Dives | Adithyan P.";
    window.scrollTo(0, 0);
  }, []);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesTag = selectedTag === 'All' || (post.tags && post.tags.includes(selectedTag));
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesTag;

      const inTitle = (post.title || '').toLowerCase().includes(query);
      const inExcerpt = (post.excerpt || '').toLowerCase().includes(query);
      const inTags = (post.tags || []).some((t) => t.toLowerCase().includes(query));

      return matchesTag && (inTitle || inExcerpt || inTags);
    });
  }, [allPosts, searchQuery, selectedTag]);

  return (
    <div className="blog-page-container">
      {/* Background glow accents */}
      <div className="blog-ambient-glow" aria-hidden="true" />

      {/* Header Section */}
      <header className="blog-header">
        <div className="blog-category-badge mono-text">
          <BookOpen size={13} />
          <span>WRITING &amp; RESEARCH</span>
        </div>
        <h1 className="blog-main-title">Engineering Notes &amp; Deep Dives</h1>
        <p className="blog-main-subtitle">
          Real-world architecture breakdowns on production computer vision, distributed edge systems,
          LLM agent pipelines, and high-throughput model serving.
        </p>

        {/* Search and Filters */}
        <div className="blog-controls">
          <div className="blog-search-box">
            <Search size={16} className="blog-search-icon" />
            <input
              type="text"
              placeholder="Search articles, keywords, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="blog-search-clear"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Tag filter pills */}
          <div className="blog-tags-scroll">
            <button
              type="button"
              onClick={() => setSelectedTag('All')}
              className={`blog-tag-pill mono-text ${selectedTag === 'All' ? 'active' : ''}`}
            >
              All ({allPosts.length})
            </button>
            {allTags.map(({ name, count }) => (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedTag(name)}
                className={`blog-tag-pill mono-text ${selectedTag === name ? 'active' : ''}`}
              >
                {name} <span className="tag-count">({count})</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Post List */}
      <section className="blog-posts-grid">
        {filteredPosts.length === 0 ? (
          <div className="blog-empty-state">
            <p className="blog-empty-title">No articles found</p>
            <p className="blog-empty-desc">
              No write-ups match "{searchQuery}" with tag "{selectedTag}". Try clearing your filters.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}
              className="btn btn-secondary mono-text"
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article key={post.slug} className="blog-post-card">
              <Link to={`/blog/${post.slug}`} className="blog-card-link">
                <div className="blog-card-meta mono-text">
                  <span className="blog-card-date">
                    <Calendar size={13} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="blog-card-dot">•</span>
                  <span className="blog-card-readtime">
                    <Clock size={13} />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>

                <div className="blog-card-footer">
                  <div className="blog-card-tags">
                    {(post.tags || []).map((tag) => (
                      <span key={tag} className="blog-card-tag mono-text">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="blog-card-read-more mono-text">
                    Read article <ArrowRight size={14} className="arrow-icon" />
                  </span>
                </div>
              </Link>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
