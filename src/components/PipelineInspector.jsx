import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Video, Database, Zap, Cpu, Server, ShieldCheck, FileText, ArrowRight, Layers } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './PipelineInspector.css';

const pipelinesData = {
  iris: {
    id: 'iris',
    title: 'Project IRIS: 90+ Camera Biometrics & Edge Vision',
    badge: 'EDGE VISION PIPELINE',
    tagClass: 'status-tag-emerald',
    stripeClass: 'stripe-emerald',
    description: 'Real-time multi-camera biometric recognition processing 90+ concurrent RTSP feeds with sub-50ms end-to-end latency.',
    nodes: [
      {
        id: 'ingest',
        title: 'RTSP Stream Ingestion',
        icon: Video,
        latency: '12ms',
        metric: '90+ Concurrent Feeds',
        framework: 'FFmpeg / OpenCV / ONVIF',
        tolerance: 'Automatic reconnection & RTSP drop recovery',
        desc: 'Asynchronous frame capture from IP cameras across local network subnets with hardware-accelerated decoding.',
        tech: ['RTSP', 'ONVIF', 'OpenCV', 'H.264']
      },
      {
        id: 'queue',
        title: 'Redis In-Memory Buffer',
        icon: Activity,
        latency: '< 2ms',
        metric: '2,700 FPS Peak',
        framework: 'Redis Ring Buffer',
        tolerance: 'Drop oldest frame on worker queue backpressure',
        desc: 'Decouples high-frequency camera ingestion from downstream neural inference workers to guarantee zero frame stutter.',
        tech: ['Redis', 'Pub/Sub', 'Ring Buffer', 'Asyncio']
      },
      {
        id: 'detect',
        title: 'YOLOv8 Face Detection',
        icon: Cpu,
        latency: '16ms / frame',
        metric: 'Confidence > 0.88',
        framework: 'YOLOv8n / PyTorch',
        tolerance: 'Dynamic batching fallback when load spikes',
        desc: 'High-speed bounding box localization of human faces and landmarks under varied lighting conditions.',
        tech: ['YOLOv8', 'PyTorch', 'TensorRT', 'CUDA']
      },
      {
        id: 'vectorize',
        title: 'ArcFace 512D Vectorization',
        icon: Zap,
        latency: '14ms / crop',
        metric: '512D Embedding',
        framework: 'ArcFace / FaceNet512',
        tolerance: 'L2-normalization prevents drift under low contrast',
        desc: 'Transforms cropped facial regions into 512-dimensional hypersphere embeddings for invariant identity clustering.',
        tech: ['ArcFace', 'FaceNet512', 'FP16', 'NumPy']
      },
      {
        id: 'index',
        title: 'FAISS Vector Index',
        icon: Database,
        latency: '< 3.5ms',
        metric: '50,000+ Identities',
        framework: 'FAISS IndexFlatIP',
        tolerance: 'Periodic background sync to PostgreSQL storage',
        desc: 'Performs sub-4 millisecond cosine similarity searches across thousands of registered personnel vectors.',
        tech: ['FAISS', 'Cosine Similarity', 'In-Memory Index']
      },
      {
        id: 'dispatch',
        title: 'FastAPI & WebSocket Dispatch',
        icon: Server,
        latency: '< 2ms',
        metric: 'Sub-50ms Total',
        framework: 'FastAPI / Asyncpg',
        tolerance: 'Automatic WebSocket retry on client disconnect',
        desc: 'Publishes match telemetry, timestamps, and camera IDs to the real-time security dashboard and PostgreSQL audit logs.',
        tech: ['FastAPI', 'WebSockets', 'PostgreSQL', 'Docker']
      }
    ]
  },
  resumepilot: {
    id: 'resumepilot',
    title: 'ResumePilot: 75-Engine Career Intelligence Pipeline',
    badge: 'MULTI-STAGE AI CORE',
    tagClass: 'status-tag-indigo',
    stripeClass: 'stripe-indigo',
    description: 'High-precision ATS analysis platform orchestrating 75 parallel micro-prompts with deterministic hallucination guardrails.',
    nodes: [
      {
        id: 'parse',
        title: 'Multi-Format PDF Parser',
        icon: FileText,
        latency: '80ms',
        metric: '100% Text Extract',
        framework: 'PyMuPDF + Tesseract',
        tolerance: 'Dual OCR fallback for scanned non-searchable PDFs',
        desc: 'Extracts tabular columns, custom layouts, and font hierarchies without losing original document structure.',
        tech: ['PyMuPDF', 'Tesseract OCR', 'PDFminer']
      },
      {
        id: 'chunk',
        title: 'Semantic Context Splitter',
        icon: Layers,
        latency: '15ms',
        metric: '512 Token Windows',
        framework: 'LangChain Recursive',
        tolerance: 'Sliding overlap preserves sentence continuity',
        desc: 'Breaks down complex career histories into semantically coherent chunks while maintaining role chronology.',
        tech: ['LangChain', 'Regex', 'Token Counting']
      },
      {
        id: 'embed',
        title: 'Hybrid Embedding Engine',
        icon: Database,
        latency: '45ms',
        metric: '1536D Vector Space',
        framework: 'OpenAI text-embedding-3',
        tolerance: 'Redis cache hit-rate ~82% for repeat industry skills',
        desc: 'Maps resume skills and job requirements into joint vector space for semantic similarity scoring.',
        tech: ['OpenAI', 'pgvector', 'Redis Caching']
      },
      {
        id: 'prompt',
        title: '75-Micro-Prompt Engine',
        icon: Cpu,
        latency: '350ms (parallel)',
        metric: '75 Parallel Tasks',
        framework: 'Celery / FastAPI Async',
        tolerance: 'Automatic exponential backoff on model rate limits',
        desc: 'Dispatches targeted prompt micro-tasks to optimize action verbs, quantifiable metrics, and keyword match density.',
        tech: ['Celery', 'FastAPI', 'Prompt Engineering']
      },
      {
        id: 'judge',
        title: 'Deterministic Safety Judge',
        icon: ShieldCheck,
        latency: '60ms',
        metric: 'Zero Hallucinations',
        framework: 'Self-Consistency Judge',
        tolerance: 'Auto-reverts any claimed metric absent in original CV',
        desc: 'Cross-verifies generated suggestions against original user inputs to strictly prevent fabricated claims.',
        tech: ['Safety Guardrails', 'Factual Verification']
      },
      {
        id: 'export',
        title: 'LaTeX Compilation & Delivery',
        icon: Server,
        latency: '120ms',
        metric: 'Print-Ready PDF',
        framework: 'TeX Live & Cloudflare R2',
        tolerance: 'Pre-compiled templates prevent syntax compilation errors',
        desc: 'Compiles clean, ATS-compliant single-page LaTeX resumes rendered directly into downloadable PDF format.',
        tech: ['LaTeX', 'TeX Live', 'Cloudflare R2', 'Docker']
      }
    ]
  },
  mustering: {
    id: 'mustering',
    title: 'Mustering System: Distributed Edge-Cloud Re-Identification',
    badge: 'EDGE-CLOUD RE-ID PIPELINE',
    tagClass: 'status-tag-violet',
    stripeClass: 'stripe-violet',
    description: 'Real-time personnel accountability and emergency tracking using quantized edge models and multi-camera re-identification.',
    nodes: [
      {
        id: 'capture',
        title: 'Edge RTSP Ingestion',
        icon: Video,
        latency: '10ms',
        metric: '30 FPS Ingestion',
        framework: 'OpenCV / VideoCapture',
        tolerance: 'Drop corrupt keyframes without freezing worker thread',
        desc: 'Edge cameras capture localized personnel movement entering emergency muster checkpoints.',
        tech: ['RTSP', 'OpenCV', 'H.264', 'Edge Device']
      },
      {
        id: 'detect',
        title: 'Quantized YOLOv8 Person Detect',
        icon: Cpu,
        latency: '18ms',
        metric: 'INT8 Quantized',
        framework: 'YOLOv8s / TensorRT',
        tolerance: 'Model pruning ensures high throughput on edge hardware',
        desc: 'Identifies full-body bounding boxes and spatial centroids of moving evacuees.',
        tech: ['YOLOv8', 'TensorRT', 'INT8', 'Edge AI']
      },
      {
        id: 'embed',
        title: 'FaceNet512 Feature Extraction',
        icon: Zap,
        latency: '16ms',
        metric: '512D Re-ID Vectors',
        framework: 'FaceNet512 / ONNX',
        tolerance: 'Multi-scale cropping handles severe camera angles',
        desc: 'Extracts deep visual biometric descriptors for cross-camera person re-identification.',
        tech: ['FaceNet512', 'ONNX Runtime', 'PyTorch']
      },
      {
        id: 'track',
        title: 'Deep SORT Tracking',
        icon: Activity,
        latency: '8ms',
        metric: 'Kalman Filter Re-ID',
        framework: 'Deep SORT / Hungarian Matcher',
        tolerance: 'Cosine distance metric recovers identity after 15+ frame occlusions',
        desc: 'Maintains continuous target IDs through crowded choke-points and temporary visual blockages.',
        tech: ['Deep SORT', 'Kalman Filter', 'Occlusion Recovery']
      },
      {
        id: 'edge_sync',
        title: 'Edge Deduplication & Throttling',
        icon: Database,
        latency: '4ms',
        metric: 'Metadata Only Sync',
        framework: 'ZeroMQ / SQLite Edge',
        tolerance: 'Local buffer queues events during WAN internet drops',
        desc: 'Filters duplicate detections locally and transmits lightweight JSON telemetry instead of heavy raw video.',
        tech: ['ZeroMQ', 'Edge Cache', 'JSON Telemetry']
      },
      {
        id: 'cloud_stream',
        title: 'Cloud Dashboard WebSocket Sync',
        icon: Server,
        latency: '22ms',
        metric: 'Real-Time Commander UI',
        framework: 'FastAPI / WebSockets',
        tolerance: 'Instant reconciliation against personnel muster roster',
        desc: 'Streams real-time headcount tallies and missing personnel alerts to the incident commander dashboard.',
        tech: ['FastAPI', 'WebSockets', 'PostgreSQL', 'Cloud Dashboard']
      }
    ]
  }
};

const PipelineInspector = ({ pipelineId = 'iris' }) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const { playHover, playDigital } = useSoundEffects();

  const currentPipeline = pipelinesData[pipelineId] || pipelinesData.iris;
  const currentNode = currentPipeline.nodes[selectedNodeIndex];

  const handleNodeSelect = (index) => {
    playDigital();
    setSelectedNodeIndex(index);
  };

  return (
    <div className={`pipeline-box liquid-glass ${currentPipeline.stripeClass}`} style={{ margin: '1rem 0 2rem 0' }}>
      
      <div className="pipeline-top-header">
        <div>
          <span className={`status-tag ${currentPipeline.tagClass}`}>{currentPipeline.badge}</span>
          <h3 className="pipeline-main-title">{currentPipeline.title}</h3>
          <p className="pipeline-main-desc">{currentPipeline.description}</p>
        </div>
      </div>

      {/* Interactive Node Flow Strip */}
      <div className="pipeline-nodes-flow">
        {currentPipeline.nodes.map((node, nIdx) => {
          const IconComponent = node.icon;
          const isSelected = selectedNodeIndex === nIdx;
          return (
            <React.Fragment key={node.id}>
              <button
                type="button"
                className={`pipeline-node-card ${isSelected ? 'node-selected' : ''}`}
                onClick={() => handleNodeSelect(nIdx)}
                onMouseEnter={playHover}
              >
                <div className="node-step-tag mono-text">STAGE 0{nIdx + 1}</div>
                <div className="node-icon-box">
                  <IconComponent size={20} />
                </div>
                <span className="node-card-title">{node.title}</span>
                <span className="node-metric-pill mono-text">{node.metric}</span>
              </button>
              {nIdx < currentPipeline.nodes.length - 1 && (
                <div className="node-connector">
                  <div className="connector-line">
                    <span className="connector-pulse"></span>
                  </div>
                  <ArrowRight size={14} className="connector-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Detailed Node Inspector Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPipeline.id}-${currentNode.id}`}
          className="node-detail-panel liquid-glass"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="detail-panel-header">
            <div className="detail-title-group">
              <span className="detail-stage-label mono-text">STAGE 0{selectedNodeIndex + 1} / 0{currentPipeline.nodes.length} TELEMETRY</span>
              <h4 className="detail-node-name">{currentNode.title}</h4>
              <p className="detail-node-desc">{currentNode.desc}</p>
            </div>

            <div className="detail-latency-card mono-text">
              <span className="latency-label">LATENCY BUDGET</span>
              <span className="latency-val">{currentNode.latency}</span>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="detail-specs-grid">
            <div className="detail-spec-item">
              <span className="spec-label mono-text">CAPACITY / THROUGHPUT</span>
              <span className="spec-value mono-text">{currentNode.metric}</span>
            </div>
            <div className="detail-spec-item">
              <span className="spec-label mono-text">CORE FRAMEWORKS</span>
              <span className="spec-value mono-text">{currentNode.framework}</span>
            </div>
            <div className="detail-spec-item spec-full-width">
              <span className="spec-label mono-text">FAIL-SAFE &amp; RECOVERY STRATEGY</span>
              <span className="spec-value">{currentNode.tolerance}</span>
            </div>
          </div>

          {/* Node Tech Tags */}
          <div className="detail-tags-row">
            <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>TECH STACK:</span>
            {currentNode.tech.map(t => (
              <span key={t} className="tech-pill mono-text">{t}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default PipelineInspector;
