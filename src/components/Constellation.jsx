import React, { useEffect, useRef } from 'react';

const Constellation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse
    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Track when mouse leaves
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Check collision / distance with mouse
        // We make particles slowly move away from the mouse, or we can just connect them
        
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.height * canvas.width) / 12000;
      
      // We will grab the accent color from CSS variables, but fallback to a grey
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const particleColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';

      for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 2) + 0.5;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;

        particles.push(new Particle(x, y, directionX, directionY, size, particleColor));
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const lineColor = isDark ? '255,255,255' : '0,0,0';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }

      connect(lineColor);
    };

    const connect = (lineColor) => {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                           ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          
          if (distance < (canvas.width / 10) * (canvas.height / 10)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacityValue * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouse.x && mouse.y) {
          const distanceToMouse = ((particles[a].x - mouse.x) * (particles[a].x - mouse.x)) +
                                  ((particles[a].y - mouse.y) * (particles[a].y - mouse.y));
          
          if (distanceToMouse < 25000) {
             opacityValue = 1 - (distanceToMouse / 25000);
             ctx.strokeStyle = `rgba(${lineColor}, ${opacityValue * 0.5})`;
             ctx.lineWidth = 1;
             ctx.beginPath();
             ctx.moveTo(particles[a].x, particles[a].y);
             ctx.lineTo(mouse.x, mouse.y);
             ctx.stroke();
          }
        }
      }
    };

    init();
    animate();

    // Re-init on theme change to update colors
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          init();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.8
      }}
    />
  );
};

export default Constellation;
