import React, { useState, useEffect } from 'react';
import { Clock, Cpu, Activity } from 'lucide-react';
import './LiveDashboard.css';

const LiveDashboard = () => {
  const [time, setTime] = useState(new Date());
  const [cpu, setCpu] = useState(14);
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const metricsTimer = setInterval(() => {
      setCpu(Math.floor(Math.random() * (19 - 11 + 1) + 11));
      setLatency(Math.floor(Math.random() * (32 - 21 + 1) + 21));
    }, 3500);

    return () => {
      clearInterval(clockTimer);
      clearInterval(metricsTimer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).toUpperCase();
  };

  return (
    <div className="live-dashboard-wrapper">
      <div className="live-dashboard liquid-glass">
        {/* Clock Section */}
        <div className="dashboard-section clock-section">
          <Clock size={15} className="telemetry-icon" />
          <div className="clock-text-group">
            <span className="clock-display mono-text">{formatTime(time)}</span>
            <span className="date-display mono-text">{formatDate(time)}</span>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="dashboard-section metrics-section">
          <div className="telemetry-metric">
            <Cpu size={14} className="metric-icon-cpu" />
            <div className="metric-info">
              <span className="metric-label mono-text">CPU LOAD</span>
              <span className="metric-value mono-text">{cpu}%</span>
            </div>
          </div>
          <div className="telemetry-metric">
            <Activity size={14} className="metric-icon-latency" />
            <div className="metric-info">
              <span className="metric-label mono-text">EDGE LATENCY</span>
              <span className="metric-value mono-text">{latency}ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
