import React, { useState, useEffect } from 'react';

const DataCascade = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Generate static columns on mount to prevent hydration mismatch or excessive re-rendering
    const cols = [...Array(15)].map(() => ({
      duration: 15 + Math.random() * 15,
      delay: -(Math.random() * 20),
      content: Array(40).fill(0).map(() => Math.random().toString(16).substring(2, 8)).join('\n')
    }));
    setColumns(cols);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      overflow: 'hidden',
      zIndex: -1,
      opacity: 0.05,
      pointerEvents: 'none',
      display: 'flex',
      justifyContent: 'space-evenly',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--color-text)'
    }}>
      {columns.map((col, i) => (
        <div key={i} style={{
          animation: `fall-data ${col.duration}s linear infinite`,
          animationDelay: `${col.delay}s`,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          width: '1ch',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          {col.content}
        </div>
      ))}
      <style>{`
        @keyframes fall-data {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default DataCascade;
