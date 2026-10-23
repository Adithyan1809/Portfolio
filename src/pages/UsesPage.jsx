import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Laptop, Cpu, Terminal, Database, Wrench } from 'lucide-react';
import './StaticPages.css';

export default function UsesPage() {
  useEffect(() => {
    document.title = "Uses — Tools, Hardware & Setup | Adithyan P.";
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    {
      title: 'Workstation & Hardware',
      icon: <Laptop size={18} />,
      items: [
        { name: 'GPU Workstation', desc: 'Custom Linux rig powered by NVIDIA GeForce RTX 4090 (24GB VRAM) for local model training, TensorRT compilation, and multi-stream RTSP stress tests.' },
        { name: 'Edge AI Dev Kit', desc: 'NVIDIA Jetson AGX Orin & Jetson Orin Nano for testing embedded real-time computer vision inference with NVDEC.' },
        { name: 'Primary Laptop', desc: 'Apple MacBook Pro (Apple Silicon) for mobile development, remote SSH sessions, and distributed architecture design.' },
        { name: 'Displays & Peripherals', desc: 'Dual 27" 4K high-refresh monitors with a mechanical keyboard (Gateron Browns) and ergonomic vertical mouse.' }
      ]
    },
    {
      title: 'AI, ML & Computer Vision Stack',
      icon: <Cpu size={18} />,
      items: [
        { name: 'PyTorch & torchvision', desc: 'Primary deep learning framework for training, custom loss functions, and dataset pipelines.' },
        { name: 'NVIDIA TensorRT', desc: 'High-performance inference optimizer for FP16 and INT8 quantization, engine serialization, and zero-copy bindings.' },
        { name: 'OpenCV & FFmpeg', desc: 'Low-latency video decoding, RTSP stream ingestion, optical flow calculations, and frame transformations.' },
        { name: 'Instructor & Pydantic', desc: 'Grammar-guided structured generation for zero-hallucination LLM workflows.' },
        { name: 'Groq & Ollama', desc: 'Ultra-low latency LPU cloud inference via Groq combined with Ollama for offline local experiments.' }
      ]
    },
    {
      title: 'Editor, Terminal & Tooling',
      icon: <Terminal size={18} />,
      items: [
        { name: 'Editor & IDE', desc: 'VS Code & Cursor with Vim keybindings, GitHub Copilot, and custom Tokyo Night / GitHub Dark themes.' },
        { name: 'Font', desc: 'JetBrains Mono with programming ligatures enabled.' },
        { name: 'Shell & Multiplexer', desc: 'Zsh with Starship prompt and Tmux for persistent remote GPU sessions over SSH.' },
        { name: 'Containers & CI', desc: 'Docker, Docker Compose, and GitHub Actions for reproducible CUDA builds.' }
      ]
    },
    {
      title: 'Backend & Infrastructure',
      icon: <Database size={18} />,
      items: [
        { name: 'Language & Frameworks', desc: 'Python (FastAPI, asyncio), Node.js, and modern React 19 + Vite.' },
        { name: 'Databases & Caches', desc: 'PostgreSQL for relational telemetry and Redis for in-memory stream queues and caching.' },
        { name: 'Cloud & Hosting', desc: 'Google Cloud Platform (GCP) for cloud computing, Vercel for frontend hosting, and Cloudflare for DNS & CDN.' }
      ]
    }
  ];

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
          <Wrench size={13} />
          <span>DEVELOPER SETUP • USES</span>
        </div>
        <h1 className="static-main-title">Hardware, Tools &amp; Daily Stack</h1>
        <p className="static-main-subtitle">
          A living breakdown of the hardware, development environment, AI frameworks, and productivity tools
          I rely on daily to engineer production systems.
        </p>
      </header>

      <div className="uses-grid">
        {categories.map((cat) => (
          <section key={cat.title} className="uses-card">
            <div className="uses-card-header">
              <span className="uses-card-icon">{cat.icon}</span>
              <h2 className="uses-card-title">{cat.title}</h2>
            </div>
            <div className="uses-items-list">
              {cat.items.map((item) => (
                <div key={item.name} className="uses-item">
                  <h3 className="uses-item-name mono-text">{item.name}</h3>
                  <p className="uses-item-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
