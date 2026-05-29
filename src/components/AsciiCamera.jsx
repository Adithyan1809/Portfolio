import React, { useEffect, useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './AsciiCamera.css';

const DENSITY = 'Ñ@#W$9876543210?!abc;:+=-,._          ';

const AsciiCamera = () => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const preRef = useRef(null);
  const requestRef = useRef(null);
  
  const { playClick, playAlien, playLaser } = useSoundEffects();

  useEffect(() => {
    if (!isActive) {
      stopCamera();
      return;
    }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 120, height: 90 } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          playAlien(); // play sound on success
        }
      } catch (err) {
        setError('Camera access denied or unavailable.');
        setIsActive(false);
      }
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isActive, playAlien]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  const renderAscii = () => {
    if (!videoRef.current || !canvasRef.current || !preRef.current || videoRef.current.paused || videoRef.current.ended) {
      requestRef.current = requestAnimationFrame(renderAscii);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Draw video to canvas (scale down for ascii)
    const w = 120;
    const h = 90;
    
    ctx.drawImage(videoRef.current, 0, 0, w, h);
    
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    
    let asciiStr = '';
    
    for (let i = 0; i < h; i += 2) { // Skip rows for character aspect ratio
      for (let j = 0; j < w; j++) {
        const pixelIndex = (j + i * w) * 4;
        const r = data[pixelIndex];
        const g = data[pixelIndex + 1];
        const b = data[pixelIndex + 2];
        
        // Calculate brightness
        const avg = (r + g + b) / 3;
        
        // Map brightness to character
        const charIndex = Math.floor(mapRange(avg, 0, 255, DENSITY.length - 1, 0));
        const c = DENSITY.charAt(charIndex);
        
        asciiStr += (c === ' ' ? '&nbsp;' : c);
      }
      asciiStr += '<br/>';
    }
    
    preRef.current.innerHTML = asciiStr;
    requestRef.current = requestAnimationFrame(renderAscii);
  };

  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(renderAscii);
    }
    return () => cancelAnimationFrame(requestRef.current);
  });

  const mapRange = (value, a, b, c, d) => {
    value = (value - a) / (b - a);
    return c + value * (d - c);
  };

  if (!isActive) {
    return (
      <button 
        className="btn btn-secondary ascii-toggle-btn"
        onClick={() => {
          playClick();
          setIsActive(true);
        }}
      >
        <Camera size={16} style={{ marginRight: '8px' }} />
        INITIALIZE ASCII MIRROR
      </button>
    );
  }

  return (
    <div className="ascii-camera-container">
      <div className="ascii-header">
        <span className="mono-text" style={{ fontSize: '12px', color: 'var(--color-accent)' }}>LIVE SURVEILLANCE FEED</span>
        <button 
          className="ascii-close-btn"
          onClick={() => {
            playLaser();
            setIsActive(false);
          }}
        >
          <X size={16} />
        </button>
      </div>
      
      {error ? (
        <div className="ascii-error mono-text">{error}</div>
      ) : (
        <div className="ascii-content-wrapper">
          <pre ref={preRef} className="ascii-pre mono-text"></pre>
        </div>
      )}
      
      {/* Hidden elements for processing */}
      <video ref={videoRef} style={{ display: 'none' }} playsInline muted />
      <canvas ref={canvasRef} width={120} height={90} style={{ display: 'none' }} />
    </div>
  );
};

export default AsciiCamera;
