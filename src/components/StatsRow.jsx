import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Layers, Video, Terminal } from 'lucide-react';
import './StatsRow.css';

const stats = [
  { value: 3, suffix: '+', label: 'Years Building', sub: 'Engineering & Research', icon: Clock, stripe: 'stripe-indigo' },
  { value: 10, suffix: '+', label: 'Systems Shipped', sub: 'Production & Scaled', icon: Layers, stripe: 'stripe-cyan' },
  { value: 90, suffix: '+', label: 'Live RTSP Feeds', sub: 'Async Edge Ingestion', icon: Video, stripe: 'stripe-emerald' },
  { value: 50, suffix: 'K+', label: 'Lines of Code', sub: 'Python — C++ — TS', icon: Terminal, stripe: 'stripe-violet' },
];

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="stat-number mono-text">
      {count}{suffix}
    </span>
  );
};

const StatsRow = () => {
  return (
    <div className="stats-row">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => {
            const IconComp = s.icon;
            return (
              <motion.div
                key={s.label}
                className={`stat-glass-item liquid-glass ${s.stripe}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="stat-icon-wrapper">
                  <IconComp size={18} className="stat-icon" />
                </div>
                <div className="stat-body">
                  <Counter value={s.value} suffix={s.suffix} />
                  <span className="stat-label mono-text">{s.label}</span>
                  <span className="stat-sub mono-text">{s.sub}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsRow;
