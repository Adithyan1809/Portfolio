import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./DataPipelineScroll.css";
import pipelineImg from "../assets/data_pipeline.png";

export const DataPipelineScroll = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Tilt the board as the user scrolls
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  
  // Data packets flowing (dash offset)
  const packetFlow = useTransform(scrollYProgress, [0, 1], [1000, 0]);

  return (
    <div ref={containerRef} className="pipeline-scroll-container">
      <div className="pipeline-header">
        <h2 className="mono-text">SYSTEM_ARCHITECTURE</h2>
        <p>Live Data Routing Simulation</p>
      </div>

      <motion.div
        className="pipeline-model"
        style={{
          rotateX,
          scale,
          perspective: "1200px",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="pipeline-board">
          <img src={pipelineImg} alt="Data Pipeline Blueprint" className="pipeline-image" />
          
          <div className="pipeline-overlay">
            <svg width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="none">
              {/* Animated glowing pipes representing data flow */}
              <motion.path 
                d="M 100 250 L 300 250 L 400 150 L 700 150 L 800 250 L 900 250"
                className="glowing-pipe"
                strokeDasharray="20 40"
                style={{ strokeDashoffset: packetFlow }}
              />
              <motion.path 
                d="M 100 350 L 300 350 L 400 400 L 700 400 L 800 250"
                className="glowing-pipe secondary"
                strokeDasharray="15 30"
                style={{ strokeDashoffset: packetFlow }}
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
