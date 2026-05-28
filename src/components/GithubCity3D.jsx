import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './GithubCity3D.css';

const CityBlock = ({ position, height, color, count, date, onHover }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const targetScale = hovered ? 1.2 : 1;
  const targetHeight = Math.max(0.15, height);

  useFrame((state, delta) => {
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, delta * 15);
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 15);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, delta * 15);
    
    if (hovered) {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (targetHeight / 2) + 0.5, delta * 10);
    } else {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetHeight / 2, delta * 10);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[position[0], targetHeight / 2, position[2]]}
      onPointerOver={(e) => { 
        e.stopPropagation(); 
        setHovered(true); 
        onHover({count, date}); 
      }}
      onPointerOut={() => { 
        setHovered(false); 
        onHover(null); 
      }}
    >
      <boxGeometry args={[0.7, targetHeight, 0.7]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={hovered ? 1 : (height > 0.5 ? 0.4 : 0)}
      />
    </mesh>
  );
};

const GithubCity = ({ data, onHover, isDark }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.05;
  });

  // Limit to last 26 weeks (half year) so it looks good on mobile and doesn't get too cramped
  const weeksToShow = Math.min(26, data.length);
  const recentData = data.slice(-weeksToShow);

  const gridOffsetX = weeksToShow / 2;
  const gridOffsetZ = 7 / 2;

  const emptyColor = isDark ? '#1a1a1a' : '#e0e0e0';

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {recentData.map((week, weekIndex) => (
        week.map((day, dayIndex) => {
          if (!day) return null;
          
          const x = weekIndex - gridOffsetX;
          const z = dayIndex - gridOffsetZ;
          const height = day.contributionCount * 0.3;
          
          let boxColor = day.color;
          if (day.contributionLevel === 'NONE' || day.contributionCount === 0) {
            boxColor = emptyColor;
          }

          return (
            <CityBlock
              key={`${weekIndex}-${dayIndex}`}
              position={[x, 0, z]}
              height={height}
              color={boxColor}
              count={day.contributionCount}
              date={day.date}
              onHover={onHover}
            />
          );
        })
      ))}
      
      {/* Base Platform */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[weeksToShow + 2, 0.4, 10]} />
        <meshStandardMaterial 
          color={isDark ? '#050505' : '#ffffff'} 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};

const GithubCity3D = ({ username }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [isDark, setIsDark] = useState(true);

  // Theme Detection
  useEffect(() => {
    const checkTheme = () => {
      const isDataThemeDark = document.documentElement.getAttribute('data-theme') === 'dark';
      let isBgDark = isDataThemeDark;
      try {
        const bgColor = window.getComputedStyle(document.body).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          isBgDark = brightness < 128;
        }
      } catch (e) {}
      setIsDark(isDataThemeDark || isBgDark);
    };
    checkTheme();
    const interval = setInterval(checkTheme, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch GitHub Data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
        if (!response.ok) throw new Error('API down');
        const json = await response.json();
        setData(json.contributions);
        setLoading(false);
      } catch (err) {
        console.warn('Failed to fetch real Github stats, generating fallback city.', err);
        // Fallback: generate a random city that looks realistic
        const fallbackData = [];
        for (let i = 0; i < 52; i++) {
          const week = [];
          for (let j = 0; j < 7; j++) {
            const count = Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0;
            week.push({
              date: `202X-XX-XX`,
              contributionCount: count,
              contributionLevel: count > 0 ? 'FIRST_QUARTILE' : 'NONE',
              color: count > 5 ? '#39d353' : count > 0 ? '#26a641' : '#ebedf0'
            });
          }
          fallbackData.push(week);
        }
        setData(fallbackData);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  return (
    <div className="github-city-container">
      {loading && <div className="loading-city">Fetching GitHub Matrix...</div>}
      
      {!loading && (
        <Canvas camera={{ position: [10, 10, 10], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={isDark ? 0.3 : 0.8} />
          <directionalLight position={[10, 20, 5]} intensity={isDark ? 2 : 1.5} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.5 : 0.2} />
          
          <GithubCity data={data} onHover={setHoverInfo} isDark={isDark} />
          
          <OrbitControls 
            enablePan={false}
            minDistance={5}
            maxDistance={30}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2 - 0.1} // Prevent looking from underneath
          />
        </Canvas>
      )}

      {/* Hover Tooltip */}
      {hoverInfo && (
        <div className="city-tooltip mono-text">
          <h4>{hoverInfo.count}</h4>
          <p>Commits on {hoverInfo.date}</p>
        </div>
      )}
    </div>
  );
};

export default GithubCity3D;
