import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsRow.css';

const stats = [
  { value: 3, suffix: '+', label: 'Years Building' },
  { value: 10, suffix: '+', label: 'Projects Shipped' },
  { value: 90, suffix: '+', label: 'Camera Feeds Handled' },
  { value: 50, suffix: 'K+', label: 'Lines of Code' },
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
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Counter value={s.value} suffix={s.suffix} />
              <span className="stat-label mono-text">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsRow;
