import React, { useState, useMemo } from 'react';
import { Cpu, Zap, Activity, HardDrive, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function LatencyCalculator() {
  const [cameras, setCameras] = useState(90);
  const [resolution, setResolution] = useState('1080p');
  const [precision, setPrecision] = useState('INT8');
  const [batchSize, setBatchSize] = useState(16);

  // Compute pipeline dynamics
  const metrics = useMemo(() => {
    const resFactor = resolution === '4K' ? 3.8 : resolution === '1080p' ? 1.0 : 0.55;
    const precFactor = precision === 'FP32' ? 1.0 : precision === 'FP16' ? 0.45 : 0.28;

    // Base inference time per batch in ms
    const batchInferenceMs = Math.round((14 * precFactor + batchSize * 0.9 * resFactor) * 10) / 10;
    
    // Ingestion & decode time per camera
    const decodeTimePerCam = 1.2 * resFactor;
    
    // End-to-End P99 latency
    const p99Latency = Math.round((batchInferenceMs + decodeTimePerCam * (cameras / batchSize) * 0.35 + 8) * 10) / 10;
    
    // Total aggregate FPS
    const aggregateFps = cameras * 30;

    // VRAM usage in GB
    const vramGb = Math.round((2.1 + (cameras * 0.045 * resFactor) + (batchSize * 0.18 * precFactor)) * 10) / 10;

    const isSub40 = p99Latency <= 40;

    return {
      batchInferenceMs,
      p99Latency,
      aggregateFps,
      vramGb,
      isSub40,
    };
  }, [cameras, resolution, precision, batchSize]);

  return (
    <div className="interactive-widget-card">
      <div className="widget-header">
        <div className="widget-badge mono-text">
          <Activity size={13} className="pulsing-icon" />
          <span>INTERACTIVE BENCHMARK SIMULATOR</span>
        </div>
        <h4 className="widget-title">Edge Vision Latency &amp; Hardware Load Calculator</h4>
        <p className="widget-desc">
          Adjust camera concurrency, tensor quantization, and batch sizes to model end-to-end pipeline latency in real time.
        </p>
      </div>

      <div className="widget-controls-grid">
        {/* Stream Count Slider */}
        <div className="widget-control-item">
          <div className="control-label-row mono-text">
            <span>Concurrent Cameras:</span>
            <span className="control-val">{cameras} RTSP streams</span>
          </div>
          <input
            type="range"
            min="10"
            max="120"
            step="5"
            value={cameras}
            onChange={(e) => setCameras(Number(e.target.value))}
            className="widget-slider"
          />
        </div>

        {/* Batch Size Slider */}
        <div className="widget-control-item">
          <div className="control-label-row mono-text">
            <span>Dynamic Batch Size ($B$):</span>
            <span className="control-val">{batchSize} frames/batch</span>
          </div>
          <input
            type="range"
            min="1"
            max="32"
            step="1"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className="widget-slider"
          />
        </div>

        {/* Precision Toggle */}
        <div className="widget-control-item">
          <div className="control-label-row mono-text">
            <span>TensorRT Precision:</span>
            <span className="control-val">{precision}</span>
          </div>
          <div className="widget-pill-group">
            {['FP32', 'FP16', 'INT8'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrecision(p)}
                className={`widget-pill mono-text ${precision === p ? 'active' : ''}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Resolution Toggle */}
        <div className="widget-control-item">
          <div className="control-label-row mono-text">
            <span>Stream Resolution:</span>
            <span className="control-val">{resolution}</span>
          </div>
          <div className="widget-pill-group">
            {['720p', '1080p', '4K'].map((res) => (
              <button
                key={res}
                type="button"
                onClick={() => setResolution(res)}
                className={`widget-pill mono-text ${resolution === res ? 'active' : ''}`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output Metrics Dashboard */}
      <div className="widget-metrics-grid">
        <div className={`metric-card ${metrics.isSub40 ? 'metric-good' : 'metric-warn'}`}>
          <div className="metric-label mono-text">
            <Zap size={13} />
            <span>P99 End-to-End Latency</span>
          </div>
          <div className="metric-number mono-text">{metrics.p99Latency} <span className="metric-unit">ms</span></div>
          <div className="metric-status">
            {metrics.isSub40 ? (
              <span className="status-good"><CheckCircle2 size={12} /> Sub-40ms Target Met</span>
            ) : (
              <span className="status-bad"><AlertTriangle size={12} /> Buffer Bloat Risk</span>
            )}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label mono-text">
            <Cpu size={13} />
            <span>Batch Inference Time</span>
          </div>
          <div className="metric-number mono-text">{metrics.batchInferenceMs} <span className="metric-unit">ms</span></div>
          <div className="metric-subtext mono-text">per {batchSize} frames on TensorRT</div>
        </div>

        <div className="metric-card">
          <div className="metric-label mono-text">
            <HardDrive size={13} />
            <span>Est. VRAM Footprint</span>
          </div>
          <div className="metric-number mono-text">{metrics.vramGb} <span className="metric-unit">GB</span></div>
          <div className="metric-subtext mono-text">NVDEC zero-copy buffers</div>
        </div>

        <div className="metric-card">
          <div className="metric-label mono-text">
            <Activity size={13} />
            <span>Total Ingestion Load</span>
          </div>
          <div className="metric-number mono-text">{metrics.aggregateFps.toLocaleString()} <span className="metric-unit">FPS</span></div>
          <div className="metric-subtext mono-text">at 30 FPS / stream</div>
        </div>
      </div>
    </div>
  );
}
