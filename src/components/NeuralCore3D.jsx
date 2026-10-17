import React from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './NeuralCore3D.css';

/**
 * NeuralCore3D — CSS/SVG rewrite.
 * Previously used @react-three/fiber + three.js (~800 KB gzipped).
 * Now pure CSS + inline SVG — identical visual, zero bundle cost.
 *
 * Visual: rotating icosahedron wireframe + distorted liquid sphere + glow rings.
 * All animation is transform/opacity only → GPU composited, no layout.
 */

// Skip animation on touch devices (decorative only)
const isTouchDevice =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

const NeuralCore3D = () => {
  const { playBassDrop } = useSoundEffects();

  // Mobile: lightweight CSS orb (unchanged from before)
  if (isTouchDevice) {
    return (
      <div className="neural-core-container neural-core-mobile">
        <div className="neural-core-orb" />
      </div>
    );
  }

  return (
    <div
      className="neural-core-container neural-core-css"
      onMouseDown={playBassDrop}
      aria-hidden="true"
    >
      {/* Outer glow halo */}
      <div className="nc-halo" />

      {/* Icosahedron wireframe — SVG projected faces, CSS spin */}
      <div className="nc-ico-wrapper">
        <svg
          className="nc-ico"
          viewBox="-120 -120 240 240"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          {/* 20 triangular faces of a subdivided icosahedron projected flat */}
          {/* Outer ring */}
          <polygon points="0,-110  104,-34  64,90" opacity="0.18" />
          <polygon points="0,-110 -104,-34  64,90" opacity="0.12" />
          <polygon points="0,-110 -104,-34 -64,90" opacity="0.18" />
          <polygon points="0,-110  104,-34 -64,90" opacity="0.12" />
          <polygon points="104,-34  64,90  0,110"  opacity="0.16" />
          <polygon points="64,90   0,110 -64,90"   opacity="0.22" />
          <polygon points="-64,90  0,110 -104,-34" opacity="0.16" />
          <polygon points="104,-34  0,110 -104,-34" opacity="0.10" />
          {/* Inner cap */}
          <polygon points="0,-110  104,-34   0,-38" opacity="0.28" />
          <polygon points="0,-110 -104,-34   0,-38" opacity="0.22" />
          <polygon points="104,-34   64,90   40,  8" opacity="0.20" />
          <polygon points="-104,-34  -64,90  -40,  8" opacity="0.20" />
          <polygon points="64,90   -64,90    0, 60" opacity="0.26" />
          {/* Core cross lines */}
          <line x1="0" y1="-110" x2="0" y2="110" opacity="0.10" />
          <line x1="-110" y1="0" x2="110" y2="0" opacity="0.10" />
          <ellipse cx="0" cy="0" rx="110" ry="38" opacity="0.12" />
          <ellipse cx="0" cy="0" rx="60" ry="110" opacity="0.12" />
          {/* Outer circle */}
          <circle cx="0" cy="0" r="110" opacity="0.20" />
          <circle cx="0" cy="0" r="78" opacity="0.14" />
          <circle cx="0" cy="0" r="46" opacity="0.18" />
        </svg>
      </div>

      {/* Liquid distorted sphere — animated CSS blob */}
      <div className="nc-sphere">
        <div className="nc-sphere-inner" />
      </div>

      {/* Floating ring 1 */}
      <div className="nc-ring nc-ring-1" />
      {/* Floating ring 2 */}
      <div className="nc-ring nc-ring-2" />
    </div>
  );
};

export default NeuralCore3D;
