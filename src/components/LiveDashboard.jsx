import React, { useState, useEffect } from 'react';
import './LiveDashboard.css';

const LiveDashboard = () => {
  const [time, setTime] = useState(new Date());
  const [cpu, setCpu] = useState(14);
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    // Clock interval
    const clockTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Metrics fluctuation interval
    const metricsTimer = setInterval(() => {
      // Fluctuate CPU between 11% and 19%
      setCpu(Math.floor(Math.random() * (19 - 11 + 1) + 11));
      
      // Fluctuate Latency between 21ms and 32ms
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
    <div className="live-dashboard">
      <div className="dashboard-section clock-section">
        <div className="clock-display mono-text">{formatTime(time)}</div>
        <div className="date-display mono-text">{formatDate(time)}</div>
      </div>
      
      <div className="dashboard-section metrics-section">
        <div className="metric">
          <span className="metric-label mono-text">CPU USAGE</span>
          <span className="metric-value mono-text">{cpu}%</span>
        </div>
        <div className="metric">
          <span className="metric-label mono-text">LATENCY</span>
          <span className="metric-value mono-text">{latency}ms</span>
        </div>
      </div>

      <div className="dashboard-section status-section">
        <div className="status-indicator">
          <div className="blinking-light"></div>
          <span className="mono-text">SYSTEM ONLINE</span>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
