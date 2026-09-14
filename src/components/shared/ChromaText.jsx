import React, { useRef, useEffect, useState } from 'react';

/**
 * ChromaText — wraps any heading tag and sweeps a multi-color gradient
 * across the text when it enters the viewport. Animation fires once.
 *
 * @param {string} as       - HTML tag to render (default: 'h2')
 * @param {string} className - Extra class names
 */
const ChromaText = ({ as: Tag = 'h2', className = '', style = {}, children, ...rest }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${active ? 'chroma-text' : ''} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default ChromaText;
