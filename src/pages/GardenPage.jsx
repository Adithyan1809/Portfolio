import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sprout, Search, ArrowRight, Tag, BookOpen, Clock } from 'lucide-react';
import { getAllPosts } from '../content/blogLoader';
import './StaticPages.css';

const GARDEN_NOTES = [
  {
    title: 'Why pin_memory=True in PyTorch Caused Intermittent CUDA Bus Errors',
    stage: 'Evergreen 🌲',
    date: '2026-10-22',
    tags: ['PyTorch', 'CUDA', 'Linux'],
    summary: 'Host pinned memory bypasses OS paging, but multi-process DataLoaders default to 64MB /dev/shm in Docker containers causing SIGBUS crashes.',
    link: '/blog/til-pytorch-cuda-pin-memory'
  },
  {
    title: 'Zero-Copy Frame Transfer Between NVDEC and TensorRT',
    stage: 'Budding 🌿',
    date: '2026-10-18',
    tags: ['Edge AI', 'NVDEC', 'TensorRT'],
    summary: 'Offloading H.264/H.265 decoding to dedicated silicon lands frames directly into unified device VRAM, bypassing PCIe saturation.',
    link: '/blog/real-time-edge-cv-pipeline'
  },
  {
    title: 'Grammar-Guided Finite State Machines for Zero-Hallucination Extraction',
    stage: 'Evergreen 🌲',
    date: '2026-10-10',
    tags: ['LLMs', 'JSON Schema', 'CFSM'],
    summary: 'Constrained decoding masks invalid token logits to -inf dynamically, guaranteeing mathematical syntax compliance without retry loops.',
    link: '/blog/zero-hallucination-llm-architecture'
  },
  {
    title: 'OpenCV cv2.CAP_PROP_BUFFERSIZE Pitfall in Live RTSP Ingestion',
    stage: 'Seedling 🌱',
    date: '2026-10-05',
    tags: ['OpenCV', 'RTSP', 'Python'],
    summary: 'Increasing buffer size causes runaway latency lag. For real-time CCTV analytics, use non-blocking grab() workers and drop stale historical frames.',
    link: '/blog/real-time-edge-cv-pipeline'
  },
  {
    title: 'TensorRT Dynamic Batch Window Calibration for Edge Orin',
    stage: 'Budding 🌿',
    date: '2026-09-28',
    tags: ['TensorRT', 'INT8', 'Jetson'],
    summary: 'Grouping camera frames into a 12ms micro-window allows dynamic batching (B=8/16) that maximizes Tensor Core utilization without user-visible lag.',
    link: '/blog/real-time-edge-cv-pipeline'
  }
];

export default function GardenPage() {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    document.title = "Digital Garden — Living Engineering Notes | Adithyan P.";
    window.scrollTo(0, 0);
  }, []);

  const allTags = useMemo(() => {
    const set = new Set();
    GARDEN_NOTES.forEach(n => n.tags.forEach(t => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredNotes = useMemo(() => {
    return GARDEN_NOTES.filter(note => {
      const matchesTag = selectedTag === 'All' || note.tags.includes(selectedTag);
      const q = query.toLowerCase().trim();
      if (!q) return matchesTag;

      const inTitle = note.title.toLowerCase().includes(q);
      const inSummary = note.summary.toLowerCase().includes(q);
      const inTags = note.tags.some(t => t.toLowerCase().includes(q));

      return matchesTag && (inTitle || inSummary || inTags);
    });
  }, [query, selectedTag]);

  return (
    <div className="static-page-container">
      <div className="static-ambient-glow" aria-hidden="true" />

      <nav className="static-breadcrumb mono-text">
        <Link to="/" className="static-back-btn">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </nav>

      <header className="static-header">
        <div className="static-category-badge mono-text">
          <Sprout size={13} />
          <span>DIGITAL GARDEN • LIVING NOTES</span>
        </div>
        <h1 className="static-main-title">Engineering Mind Garden</h1>
        <p className="static-main-subtitle">
          Unlike polished articles, a digital garden is an open collection of evolving ideas, debugging breakthroughs,
          hardware observations, and architecture cheatsheets that grow over time.
        </p>

        {/* Search & Tag filter */}
        <div className="garden-controls">
          <div className="garden-search-box">
            <Search size={15} className="garden-search-icon" />
            <input
              type="text"
              placeholder="Search notes, tags, or concepts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="garden-search-input"
            />
          </div>

          <div className="garden-tag-pills">
            {allTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`garden-tag-btn mono-text ${selectedTag === tag ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="garden-grid">
        {filteredNotes.map(note => (
          <article key={note.title} className="garden-card">
            <div className="garden-card-header mono-text">
              <span className="garden-stage">{note.stage}</span>
              <span className="garden-date">{note.date}</span>
            </div>

            <h2 className="garden-card-title">{note.title}</h2>
            <p className="garden-card-summary">{note.summary}</p>

            <div className="garden-card-footer">
              <div className="garden-card-tags mono-text">
                {note.tags.map(t => (
                  <span key={t} className="garden-tag-pill">#{t}</span>
                ))}
              </div>

              <Link to={note.link} className="garden-read-btn mono-text">
                <span>View Full Note</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
