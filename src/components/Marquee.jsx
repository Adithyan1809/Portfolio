import React from 'react';
import { 
  SiPython, 
  SiPytorch, 
  SiTensorflow, 
  SiFastapi, 
  SiRedis, 
  SiDocker, 
  SiPostgresql, 
  SiReact 
} from 'react-icons/si';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Marquee.css';

const Marquee = () => {
  const { playGlitchPop } = useSoundEffects();
  const items = [
    { name: 'AI SYSTEMS', icon: SiPython },
    { name: 'PYTORCH & TENSORFLOW', icon: SiPytorch },
    { name: 'FASTAPI MICROSERVICES', icon: SiFastapi },
    { name: 'COMPUTER VISION & RTSP', icon: SiTensorflow },
    { name: 'REDIS QUEUES', icon: SiRedis },
    { name: 'CONTAINERIZED DEPLOYMENTS', icon: SiDocker },
    { name: 'POSTGRESQL & FAISS', icon: SiPostgresql },
    { name: 'HIGH-PERF INTERFACES', icon: SiReact }
  ];

  return (
    <div className="marquee-container" onMouseEnter={playGlitchPop}>
      <div className="marquee-track">
        {[0, 1, 2].map((rep) => (
          <div className="marquee-content" key={`rep-${rep}`} aria-hidden={rep > 0}>
            {items.map((item, i) => {
              const IconComp = item.icon;
              return (
                <React.Fragment key={`item-${rep}-${i}`}>
                  <span className="marquee-item" onMouseEnter={playGlitchPop}>
                    <IconComp className="marquee-icon" />
                    <span>{item.name}</span>
                  </span>
                  <span className="marquee-separator">✦</span>
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
