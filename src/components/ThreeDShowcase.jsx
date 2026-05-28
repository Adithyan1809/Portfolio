import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import './ThreeDShowcase.css';

const NeuralCore = ({ isDark }) => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = t * 0.1;
  });

  const wireframeColor = isDark ? '#ffffff' : '#000000';
  const coreColor = isDark ? '#ffffff' : '#000000';
  const glowColor = isDark ? '#ffffff' : '#000000';

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer complex wireframe */}
        <Icosahedron args={[2.2, 2]}>
          <meshBasicMaterial color={wireframeColor} wireframe={true} transparent opacity={0.15} />
        </Icosahedron>

        {/* Middle geometric cage */}
        <Icosahedron args={[1.6, 1]}>
          <meshBasicMaterial color={wireframeColor} wireframe={true} transparent opacity={0.3} />
        </Icosahedron>

        {/* Inner dynamic distorted core */}
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={coreColor}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </Sphere>

        {/* Core Glow */}
        <Sphere args={[1.2, 32, 32]}>
          <meshBasicMaterial color={glowColor} transparent opacity={0.1} />
        </Sphere>
      </Float>
    </group>
  );
};

const ThreeDShowcase = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="threed-section section-padding border-bottom">
      <div className="container">
        <div className="threed-grid">
          <div className="threed-content">
            <div className="section-badge">INTERACTIVE SYSTEM</div>
            <h2 className="section-title">The Neural Core</h2>
            <p className="threed-description">
              This interactive 3D model represents the dynamic, ever-evolving nature of artificial intelligence. 
              Built using <strong>React Three Fiber</strong> and <strong>WebGL</strong>, it demonstrates real-time rendering capabilities and complex shader materials within a browser environment.
            </p>
            <p className="threed-instruction mono-text text-muted">
              &gt; Click and drag to orbit <br />
              &gt; Scroll to zoom
            </p>
          </div>
          
          <div className="threed-canvas-container card">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
              <ambientLight intensity={isDark ? 0.5 : 1} />
              <directionalLight position={[10, 10, 10]} intensity={isDark ? 1 : 2} />
              <directionalLight position={[-10, -10, -10]} intensity={0.5} />
              <pointLight position={[0, 0, 0]} intensity={0.5} color={isDark ? '#ffffff' : '#000000'} />
              
              <NeuralCore isDark={isDark} />
              
              <OrbitControls 
                enablePan={false}
                minDistance={3}
                maxDistance={8}
                autoRotate
                autoRotateSpeed={1}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDShowcase;
