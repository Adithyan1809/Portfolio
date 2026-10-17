import React from 'react';
import { Video, Zap, ShieldCheck, Users, Terminal, CheckCircle2, Cpu } from 'lucide-react';
import './SystemTelemetryCard.css';

const telemetryData = [
  {
    icon: Video,
    colorClass: 'telemetry-emerald',
    badge: 'EDGE INGESTION',
    title: '90+ RTSP Live Feeds',
    desc: 'Sub-50ms inference @ 24fps across camera zones',
    meta: 'ONVIF Async · 0 dropped frames'
  },
  {
    icon: Zap,
    colorClass: 'telemetry-indigo',
    badge: 'VECTOR SEARCH',
    title: '< 3.8ms Retrieval',
    desc: 'ArcFace 512D mapped to FAISS IndexFlatIP',
    meta: 'Sub-second real-time verification'
  },
  {
    icon: ShieldCheck,
    colorClass: 'telemetry-violet',
    badge: 'DETERMINISTIC AI',
    title: '75 LLM Analysis Stages',
    desc: 'Strict hallucination guardrails & validation',
    meta: 'ResumePilot production pipeline'
  },
  {
    icon: Users,
    colorClass: 'telemetry-cyan',
    badge: 'ENGINEERING LEAD',
    title: '6-Engineer Squad',
    desc: 'Led cross-functional inference, backend & edge',
    meta: 'SMAP Technologies'
  }
];

export default function SystemTelemetryCard() {
  return (
    <div className="telemetry-card liquid-glass" aria-label="Production Systems Telemetry">
      {/* Terminal window header */}
      <div className="telemetry-header">
        <div className="telemetry-dots" aria-hidden="true">
          <span className="telemetry-dot dot-red" />
          <span className="telemetry-dot dot-amber" />
          <span className="telemetry-dot dot-emerald" />
        </div>
        <div className="telemetry-title mono-text">
          <Terminal size={12} className="telemetry-term-icon" />
          <span>production_telemetry.sys</span>
        </div>
        <div className="telemetry-status-pill mono-text">
          <span className="telemetry-pulse-dot" />
          <span>ACTIVE</span>
        </div>
      </div>

      {/* Metric entries */}
      <div className="telemetry-body">
        {telemetryData.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className={`telemetry-row ${item.colorClass}`}>
              <div className="telemetry-icon-box">
                <Icon size={16} />
              </div>
              <div className="telemetry-row-content">
                <div className="telemetry-row-top">
                  <span className="telemetry-row-title">{item.title}</span>
                  <span className="telemetry-row-badge mono-text">{item.badge}</span>
                </div>
                <p className="telemetry-row-desc">{item.desc}</p>
                <span className="telemetry-row-meta mono-text">{item.meta}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer verification line */}
      <div className="telemetry-footer mono-text">
        <CheckCircle2 size={13} className="telemetry-check-icon" />
        <span>Verified in production · Zero mock data</span>
      </div>
    </div>
  );
}
