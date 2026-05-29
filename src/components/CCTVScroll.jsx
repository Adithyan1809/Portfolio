import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./CCTVScroll.css";

export const CCTVScroll = ({ src }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Tilt the CCTV dashboard into view
  const rotateX = useTransform(scrollYProgress, [0.1, 0.5], [60, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Moving bounding box (simulating FaceNet tracking)
  // Maps scroll progress to the box's X and Y position
  const boxX = useTransform(scrollYProgress, [0.3, 0.7], ["10%", "60%"]);
  const boxY = useTransform(scrollYProgress, [0.3, 0.7], ["20%", "45%"]);
  
  const boxWidth = useTransform(scrollYProgress, [0.3, 0.5, 0.7], ["15%", "25%", "10%"]);
  const boxHeight = useTransform(scrollYProgress, [0.3, 0.5, 0.7], ["30%", "40%", "20%"]);

  return (
    <div ref={containerRef} className="cctv-scroll-container">
      <motion.div
        className="cctv-model"
        style={{
          rotateX,
          scale,
          opacity,
          perspective: "1200px",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="cctv-screen">
          <img src={src} alt="Project Iris CCTV" className="cctv-image" />
          
          <div className="cctv-overlay-grid"></div>
          
          <div className="cctv-text-top-left mono-text">REC • CH_01-90</div>
          <div className="cctv-text-top-right mono-text">RTSP://10.0.0.42:554</div>
          <div className="cctv-text-bottom-left mono-text">SYS: ACTIVE [FAISS OK]</div>
          
          {/* Animated Tracking Bounding Box */}
          <motion.div 
            className="tracking-box"
            style={{
              left: boxX,
              top: boxY,
              width: boxWidth,
              height: boxHeight,
            }}
          >
            <div className="tracking-label mono-text">ID: 8492 [99.2%]</div>
            <div className="tracking-corner top-left"></div>
            <div className="tracking-corner top-right"></div>
            <div className="tracking-corner bottom-left"></div>
            <div className="tracking-corner bottom-right"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
