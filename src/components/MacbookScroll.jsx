import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./MacbookScroll.css";

export const MacbookScroll = ({ src, title, description, link }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale the entire component
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.8]);

  // Rotate the lid open as you scroll down
  // Starts closed (90deg), opens to 0deg
  const lidRotation = useTransform(scrollYProgress, [0.1, 0.5], [-90, 0]);

  // Slide up slightly
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["20%", "0%", "-20%"]);

  return (
    <div ref={containerRef} className="macbook-scroll-container">
      {(title || description || link) && (
        <div className="macbook-text-container">
          {title && <h2 className="macbook-title">{title}</h2>}
          {description && <p className="macbook-description">{description}</p>}
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              View Live
            </a>
          )}
        </div>
      )}

      <motion.div
        className="macbook-model-container"
        style={{
          scale,
          y,
          perspective: "1200px",
        }}
      >
        <div className="macbook-wrapper">
          {/* LID (Screen) */}
          <motion.div
            className="macbook-lid"
            style={{
              rotateX: lidRotation,
              transformOrigin: "bottom center",
            }}
          >
            <div className="macbook-screen">
              <div className="macbook-camera"></div>
              <div className="macbook-display">
                <img src={src} alt={title} className="macbook-image" />
              </div>
            </div>
            {/* The back of the lid when closed */}
            <div className="macbook-lid-back">
              <div className="macbook-logo">AP</div>
            </div>
          </motion.div>

          {/* BASE (Keyboard) */}
          <div className="macbook-base">
            <div className="macbook-keyboard">
              <div className="macbook-trackpad"></div>
            </div>
            <div className="macbook-base-front"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
