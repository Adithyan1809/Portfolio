import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useSpring } from "framer-motion";
import { Box, Edges, Text } from "@react-three/drei";
import "./ExplodedServer.css";

const ServerBlade = ({ position, scrollProgress, expandMultiplier, label, color }) => {
  const meshRef = useRef();
  
  // Base Y position
  const baseY = position[1];

  useFrame(() => {
    // Scroll progress from 0 -> 1
    const scroll = scrollProgress.get();
    
    // When scrolled, move blades apart based on their multiplier
    meshRef.current.position.y = baseY + (scroll * expandMultiplier);
  });

  return (
    <group ref={meshRef} position={position}>
      <Box args={[4, 0.8, 3]}>
        <meshBasicMaterial color="#111111" transparent opacity={0.9} />
        <Edges scale={1} threshold={15} color={color} />
      </Box>
      <Text 
        position={[0, 0, 1.51]} 
        fontSize={0.2} 
        color={color} 
        anchorX="center" 
        anchorY="middle"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwI.woff"
      >
        {label}
      </Text>
    </group>
  );
};

const ServerRack = ({ scrollProgress }) => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Slow rotation
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3 + 0.5;
    groupRef.current.rotation.x = 0.2;
  });

  // Check theme
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
  }, []);

  return (
    <group ref={groupRef}>
      <ServerBlade 
        position={[0, 1.2, 0]} 
        scrollProgress={scrollProgress} 
        expandMultiplier={2.5} 
        label="AI / ML MODELS" 
        color={isDark ? "#ff3366" : "#e11d48"} 
      />
      <ServerBlade 
        position={[0, 0, 0]} 
        scrollProgress={scrollProgress} 
        expandMultiplier={0} 
        label="BACKEND PIPELINE" 
        color={isDark ? "#00ffcc" : "#0d9488"} 
      />
      <ServerBlade 
        position={[0, -1.2, 0]} 
        scrollProgress={scrollProgress} 
        expandMultiplier={-2.5} 
        label="INFRASTRUCTURE" 
        color={isDark ? "#4f46e5" : "#4338ca"} 
      />
    </group>
  );
};

export const ExplodedServer = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="exploded-server-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={1} />
        <ServerRack scrollProgress={smoothProgress} />
      </Canvas>
    </div>
  );
};
