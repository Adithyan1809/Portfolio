import React, { useEffect, useRef, useState } from 'react';
import './Neural3DCore.css';

/**
 * Neural3DCore — Ultra-stylish interactive 3D Neural Sphere & Hologram Core.
 * Pure Vanilla Canvas 2D with true 3D projection math (0KB dependencies).
 * Features:
 * - 130 Fibonacci sphere neural nodes
 * - Dynamic synapse connection beams with traveling signal pulses
 * - Inner glowing energy singularity
 * - 3D dual orbital rings with independent spin axes
 * - Interactive: mouse hover tilt, click shockwave pulse, drag-to-spin
 * - Adaptive light & dark mode rendering with retina DPI sharpness
 */

export default function Neural3DCore() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // ── Theme Detection ──
    const isDark = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      return theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    };

    // ── 3D Sphere Nodes Setup ──
    const NODE_COUNT = 120;
    const SPHERE_RADIUS = 135;
    const nodes = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const y = 1 - (i / (NODE_COUNT - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      nodes.push({
        baseX: x * SPHERE_RADIUS,
        baseY: y * SPHERE_RADIUS,
        baseZ: z * SPHERE_RADIUS,
        x: x * SPHERE_RADIUS,
        y: y * SPHERE_RADIUS,
        z: z * SPHERE_RADIUS,
        size: Math.random() * 2 + 2,
        pulseOffset: Math.random() * Math.PI * 2,
        connections: []
      });
    }

    // Precalculate proximate connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dz = nodes[i].baseZ - nodes[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 58) {
          nodes[i].connections.push(j);
        }
      }
    }

    // ── Synapse Traveling Pulses ──
    const PULSE_COUNT = 16;
    const pulses = [];
    for (let p = 0; p < PULSE_COUNT; p++) {
      const from = Math.floor(Math.random() * nodes.length);
      const to = nodes[from].connections.length > 0 
        ? nodes[from].connections[Math.floor(Math.random() * nodes[from].connections.length)]
        : (from + 1) % nodes.length;

      pulses.push({
        from,
        to,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012
      });
    }

    // ── Rotation & Physics State ──
    let rotX = 0.2;
    let rotY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;
    let autoSpinSpeed = 0.005;
    let ringAngle1 = 0;
    let ringAngle2 = 0;
    let shockwaveRadius = 0;
    let shockwaveMax = 0;

    // Mouse drag state
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // ── Resize with High-DPI support ──
    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = Math.max(380, Math.min(460, rect.width * 1.05));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // ── Mouse & Touch Event Handlers ──
    const onMouseDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      } else {
        // Interactive gentle perspective tilt toward mouse
        targetRotY += (mouseX * 0.0006 - (targetRotY % (Math.PI * 2))) * 0.05;
        targetRotX = 0.2 + (mouseY * 0.0006);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 500);
    };

    const onClick = () => {
      // Trigger a 3D expanding shockwave pulse
      shockwaveRadius = 10;
      shockwaveMax = SPHERE_RADIUS * 1.5;
    };

    const canvasEl = canvas;
    canvasEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvasEl.addEventListener('click', onClick);

    // Touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    canvasEl.addEventListener('touchstart', onTouchStart, { passive: true });
    canvasEl.addEventListener('touchmove', onTouchMove, { passive: true });

    // ── Render Loop ──
    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth rotation interpolation
      if (!isDragging) {
        targetRotY += autoSpinSpeed;
      }
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;
      ringAngle1 += 0.012;
      ringAngle2 -= 0.008;

      ctx.clearRect(0, 0, width, height);

      const dark = isDark();
      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 380; // Perspective focal length

      // Palette
      const primaryColor = dark ? '16, 185, 129' : '16, 149, 106';    // Emerald
      const secondaryColor = dark ? '99, 102, 241' : '79, 70, 229';  // Indigo
      const cyanColor = dark ? '6, 182, 212' : '2, 132, 199';        // Cyan
      const coreColor = dark ? '139, 92, 246' : '124, 58, 237';      // Violet

      // ── 1. Central Radial Hologram Glow ──
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, SPHERE_RADIUS * 1.3);
      bgGlow.addColorStop(0, `rgba(${secondaryColor}, ${dark ? 0.22 : 0.12})`);
      bgGlow.addColorStop(0.4, `rgba(${primaryColor}, ${dark ? 0.12 : 0.06})`);
      bgGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, SPHERE_RADIUS * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // ── 2. 3D Rotation Matrix Calculation ──
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Rotate and project nodes
      const projectedNodes = nodes.map((node, idx) => {
        // Rotate Y
        const x1 = node.baseX * cosY - node.baseZ * sinY;
        const z1 = node.baseX * sinY + node.baseZ * cosY;
        // Rotate X
        const y2 = node.baseY * cosX - z1 * sinX;
        const z2 = node.baseY * sinX + z1 * cosX;

        // Perspective scale
        const scale = fov / (fov + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        return {
          idx,
          x: projX,
          y: projY,
          z: z2,
          scale,
          orig: node
        };
      });

      // ── 3. Draw Connecting Synapse Beams ──
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projectedNodes.length; i++) {
        const p1 = projectedNodes[i];
        for (const targetIdx of p1.orig.connections) {
          if (targetIdx > i) {
            const p2 = projectedNodes[targetIdx];
            // Average depth controls opacity
            const avgZ = (p1.z + p2.z) / 2;
            const depthAlpha = Math.max(0.04, Math.min(0.65, (avgZ + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));

            ctx.strokeStyle = `rgba(${secondaryColor}, ${depthAlpha * (dark ? 0.45 : 0.35)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // ── 4. Draw Traveling Synapse Pulses ──
      for (const pulse of pulses) {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.from = pulse.to;
          const conn = nodes[pulse.from].connections;
          pulse.to = conn.length > 0 ? conn[Math.floor(Math.random() * conn.length)] : (pulse.from + 1) % nodes.length;
        }

        const pA = projectedNodes[pulse.from];
        const pB = projectedNodes[pulse.to];
        if (pA && pB) {
          const pulseX = pA.x + (pB.x - pA.x) * pulse.progress;
          const pulseY = pA.y + (pB.y - pA.y) * pulse.progress;
          const pulseZ = pA.z + (pB.z - pA.z) * pulse.progress;
          const alpha = Math.max(0.1, (pulseZ + SPHERE_RADIUS) / (SPHERE_RADIUS * 2));

          ctx.fillStyle = `rgba(${primaryColor}, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2.5 * ((pulseZ + SPHERE_RADIUS) / SPHERE_RADIUS + 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── 5. Draw 3D Orbital Gimbal Rings ──
      const draw3DRing = (radius, tiltAngle, spinAngle, color, lineWidth) => {
        const ringSegments = 64;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        let first = true;
        for (let s = 0; s <= ringSegments; s++) {
          const a = (s / ringSegments) * Math.PI * 2;
          let rx = Math.cos(a) * radius;
          let ry = Math.sin(a) * radius * Math.cos(tiltAngle);
          let rz = Math.sin(a) * radius * Math.sin(tiltAngle);

          // Rotate by global rotX, rotY + ring spin
          const cosSpin = Math.cos(spinAngle);
          const sinSpin = Math.sin(spinAngle);
          const rx2 = rx * cosSpin - rz * sinSpin;
          const rz2 = rx * sinSpin + rz * cosSpin;

          const rx3 = rx2 * cosY - rz2 * sinY;
          const rz3 = rx2 * sinY + rz2 * cosY;
          const ry3 = ry * cosX - rz3 * sinX;
          const rz4 = ry * sinX + rz3 * cosX;

          const scale = fov / (fov + rz4);
          const px = centerX + rx3 * scale;
          const py = centerY + ry3 * scale;

          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = color;
        ctx.stroke();
      };

      draw3DRing(SPHERE_RADIUS * 1.25, 0.9, ringAngle1, `rgba(${cyanColor}, ${dark ? 0.35 : 0.25})`, 1.2);
      draw3DRing(SPHERE_RADIUS * 1.45, -0.7, ringAngle2, `rgba(${coreColor}, ${dark ? 0.3 : 0.2})`, 0.9);

      // ── 6. Shockwave Ring (if active) ──
      if (shockwaveRadius > 0 && shockwaveRadius < shockwaveMax) {
        shockwaveRadius += 4.5;
        const shockAlpha = 1 - (shockwaveRadius / shockwaveMax);
        ctx.strokeStyle = `rgba(${primaryColor}, ${shockAlpha * 0.75})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── 7. Inner Nucleus Core ──
      const corePulse = Math.sin(time * 3) * 4;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, 28 + corePulse);
      coreGrad.addColorStop(0, dark ? '#ffffff' : '#4f46e5');
      coreGrad.addColorStop(0.3, `rgba(${coreColor}, 0.8)`);
      coreGrad.addColorStop(0.7, `rgba(${secondaryColor}, 0.3)`);
      coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32 + corePulse, 0, Math.PI * 2);
      ctx.fill();

      // ── 8. Draw Depth-Sorted Nodes ──
      projectedNodes.sort((a, b) => a.z - b.z);

      for (const p of projectedNodes) {
        const depthNorm = (p.z + SPHERE_RADIUS) / (SPHERE_RADIUS * 2); // 0 (back) to 1 (front)
        const alpha = Math.max(0.18, Math.min(1, depthNorm * 0.9 + 0.1));
        const nodeRadius = p.orig.size * p.scale;

        // Front nodes get glowing halo
        if (depthNorm > 0.6) {
          ctx.fillStyle = `rgba(${primaryColor}, ${alpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRadius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        ctx.fillStyle = depthNorm > 0.7 
          ? (dark ? '#ffffff' : '#0f172a')
          : `rgba(${primaryColor}, ${alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvasEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasEl.removeEventListener('click', onClick);
      canvasEl.removeEventListener('touchstart', onTouchStart);
      canvasEl.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div className="neural-3d-wrapper" ref={containerRef} aria-label="Interactive 3D Neural Core Hologram">
      {/* High-tech HUD Container */}
      <div className={`neural-3d-card liquid-glass ${isInteracting ? 'is-interacting' : ''}`}>
        {/* HUD Top Bar */}
        <div className="neural-hud-header">
          <div className="hud-identity">
            <span className="hud-live-dot" />
            <span className="hud-title mono-text">NEURAL_CORE // 3D_LATTICE</span>
          </div>
          <div className="hud-badge mono-text">
            <span>REALTIME 3D</span>
          </div>
        </div>

        {/* The 3D Canvas */}
        <canvas ref={canvasRef} className="neural-3d-canvas" title="Click or drag to rotate 3D Neural Core" />

        {/* HUD Bottom Bar */}
        <div className="neural-hud-footer">
          <span className="hud-hint mono-text">✦ DRAG TO ROTATE · CLICK FOR IMPULSE</span>
          <span className="hud-metric mono-text">120 NODES · 60 FPS</span>
        </div>
      </div>
    </div>
  );
}
