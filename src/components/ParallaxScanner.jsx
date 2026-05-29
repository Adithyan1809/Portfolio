import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./ParallaxScanner.css";

export const ParallaxScanner = ({ src }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax the image slightly differently from the scanner line
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  // The scanner line sweeps from top to bottom
  const scannerY = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
  
  // Overall container tilt
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -10]);

  return (
    <div ref={containerRef} className="parallax-scanner-container">
      <motion.div 
        className="scanner-model"
        style={{
          rotateX,
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="scanner-viewport">
          <motion.img 
            src={src} 
            alt="Mustering System Track" 
            className="scanner-bg-image"
            style={{ y: imageY }}
          />
          
          <div className="scanner-overlay-ui">
            <div className="scanner-header mono-text">
              <span>MUSTERING_SYS v2.4</span>
              <span className="scanner-live">LIVE TRACKING</span>
            </div>
            
            {/* The Sweeping Laser Line */}
            <motion.div 
              className="scanner-laser-line"
              style={{ top: scannerY }}
            >
              <div className="laser-glow"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
