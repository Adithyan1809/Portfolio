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

  // Default to a highly visible bright color in dark mode, and a solid dark color in light mode
  const wireframeColor = isDark ? '#ffffff' : '#000000';
  const coreColor = isDark ? '#ffffff' : '#111111';
  const glowColor = isDark ? '#ffffff' : '#000000';

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[2.2, 2]}>
          <meshBasicMaterial color={wireframeColor} wireframe={true} transparent opacity={isDark ? 0.4 : 0.15} />
        </Icosahedron>

        <Icosahedron args={[1.6, 1]}>
          <meshBasicMaterial color={wireframeColor} wireframe={true} transparent opacity={isDark ? 0.6 : 0.3} />
        </Icosahedron>

        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={coreColor}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={isDark ? 0.2 : 0.1}
            roughness={0.5}
            distort={0.4}
            speed={2}
            emissive={isDark ? '#555555' : '#000000'}
            emissiveIntensity={isDark ? 1.5 : 0}
          />
        </Sphere>

        <Sphere args={[1.2, 32, 32]}>
          <meshBasicMaterial color={glowColor} transparent opacity={isDark ? 0.15 : 0.05} />
        </Sphere>
      </Float>
    </group>
  );
};

const NeuralCore3D = () => {
  const [isDark, setIsDark] = useState(true); // Default true for safety

  useEffect(() => {
    const checkTheme = () => {
      const isDataThemeDark = document.documentElement.getAttribute('data-theme') === 'dark';
      let isBgDark = isDataThemeDark;
      
      try {
        const bgColor = window.getComputedStyle(document.body).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          isBgDark = brightness < 128; // If brightness is low, it's dark mode
        }
      } catch (e) {
        // Fallback
      }
      
      setIsDark(isDataThemeDark || isBgDark);
    };

    checkTheme();
    // Poll to catch dark reader or delayed theme changes
    const interval = setInterval(checkTheme, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="neural-core-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={isDark ? 1.5 : 1} />
        <directionalLight position={[10, 10, 10]} intensity={isDark ? 2.5 : 2} />
        <directionalLight position={[-10, -10, -10]} intensity={isDark ? 1 : 0.5} />
        <pointLight position={[0, 0, 0]} intensity={isDark ? 2 : 0.5} color={isDark ? '#ffffff' : '#000000'} />
        
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
