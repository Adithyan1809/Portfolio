import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useSpring } from "framer-motion";
import * as THREE from "three";
import "./DeepDiveFlythrough.css";

const NeuralNodes = ({ scrollProgress }) => {
  const groupRef = useRef();
  
  // Generate random node positions
  const nodeCount = 300;
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      // Spread nodes along the Z axis (depth) from 0 to -100
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = -Math.random() * 100;
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, []);

  // Use InstancedMesh for performance
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (meshRef.current) {
      nodes.forEach((pos, i) => {
        dummy.position.copy(pos);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [nodes, dummy]);

  useFrame((state) => {
    // Scroll progress goes 0 -> 1. We move the entire group forward in Z
    // so the camera flies "through" it.
    const scroll = scrollProgress.get();
    groupRef.current.position.z = scroll * 100;
    
    // Slow rotation for ambient feel
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = t * 0.05;
  });

  // Check theme
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
  }, []);

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, nodeCount]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color={isDark ? "#00ffff" : "#000000"} />
      </instancedMesh>
    </group>
  );
};

export const DeepDiveFlythrough = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth the scroll progress so the camera doesn't jump
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 100,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="deep-dive-container">
      <div className="deep-dive-sticky">
        <div className="deep-dive-overlay">
          <h2 className="deep-dive-title">NEURAL ARCHITECTURE</h2>
          <p className="deep-dive-subtitle mono-text">SCROLL TO DIVE // FLY-THROUGH</p>
        </div>
        
        <Canvas camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 200 }} dpr={[1, 2]}>
          <color attach="background" args={['transparent']} />
          <fog attach="fog" args={['#000000', 10, 50]} />
          <NeuralNodes scrollProgress={smoothProgress} />
        </Canvas>
      </div>
    </section>
  );
};
