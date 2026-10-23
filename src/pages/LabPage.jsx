import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical, Activity, ShieldCheck, Eye, Sparkles } from 'lucide-react';
import LatencyCalculator from '../components/blog/widgets/LatencyCalculator';
import ConstrainedDecoderSimulator from '../components/blog/widgets/ConstrainedDecoderSimulator';
import './StaticPages.css';

export default function LabPage() {
  const [activeTab, setActiveTab] = useState('latency');

  useEffect(() => {
    document.title = "Lab — Interactive AI & Systems Demos | Adithyan P.";
    window.scrollTo(0, 0);
  }, []);

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
          <FlaskConical size={13} />
          <span>INTERACTIVE PLAYGROUND • AI LAB</span>
        </div>
        <h1 className="static-main-title">Interactive AI &amp; Systems Lab</h1>
        <p className="static-main-subtitle">
          Hands-on client-side simulations and interactive models demonstrating edge computer vision,
          hardware constraints, and deterministic LLM architectures.
        </p>

        {/* Demo switcher tabs */}
        <div className="lab-tabs mono-text">
          <button
            type="button"
            onClick={() => setActiveTab('latency')}
            className={`lab-tab-btn ${activeTab === 'latency' ? 'active' : ''}`}
          >
            <Activity size={14} />
            <span>01. Edge Vision Concurrency Simulator</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('decoder')}
            className={`lab-tab-btn ${activeTab === 'decoder' ? 'active' : ''}`}
          >
            <ShieldCheck size={14} />
            <span>02. Constrained Finite-State Decoder</span>
          </button>
        </div>
      </header>

      {/* Render active interactive simulation */}
      <div className="lab-demo-container">
        {activeTab === 'latency' && (
          <div className="lab-demo-wrapper">
            <div className="lab-demo-intro">
              <h2 className="lab-demo-title">RTSP Ingestion &amp; Hardware Load Simulator</h2>
              <p className="lab-demo-desc">
                Evaluate how dynamic batching ($B=1 \dots 32$), NVDEC hardware decoding, and TensorRT FP16/INT8
                quantization preserve sub-40ms P99 latency across up to 120 live RTSP camera feeds.
              </p>
            </div>
            <LatencyCalculator />
          </div>
        )}

        {activeTab === 'decoder' && (
          <div className="lab-demo-wrapper">
            <div className="lab-demo-intro">
              <h2 className="lab-demo-title">Grammar-Guided Token Masking Engine</h2>
              <p className="lab-demo-desc">
                Step through model generation states to observe how invalid tokens have their logits dynamically
                masked to $-\infty$, preventing conversational hallucinations and JSON syntax errors.
              </p>
            </div>
            <ConstrainedDecoderSimulator />
          </div>
        )}
      </div>
    </div>
  );
}
