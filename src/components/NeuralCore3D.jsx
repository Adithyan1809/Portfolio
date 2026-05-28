import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import './NeuralCore3D.css';

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
        <Icosahedron args={[2.2, 2]}>
          <meshBasicMaterial color={wireframeColor} wireframe={true} transparent opacity={0.15} />
        </Icosahedron>

        <Icosahedron args={[1.6, 1]}>
          <meshBasicMaterial color={wireframeColor} wireframe={true} transparent opacity={0.3} />
        </Icosahedron>

        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={coreColor}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.1}
            roughness={0.5}
            distort={0.4}
            speed={2}
            emissive={isDark ? '#222222' : '#000000'}
          />
        </Sphere>

        <Sphere args={[1.2, 32, 32]}>
          <meshBasicMaterial color={glowColor} transparent opacity={0.1} />
        </Sphere>
      </Float>
    </group>
  );
};

const NeuralCore3D = () => {
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
    <div className="neural-core-container">
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
  );
};

export default NeuralCore3D;
