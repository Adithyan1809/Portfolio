import React from 'react';
import { motion } from 'framer-motion';
import WireframeTorus from './WireframeTorus';
import { Code2, Cpu, Eye, Server, Settings, Layout } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code2 size={24} />,
    skills: ['Python', 'JavaScript/TypeScript', 'C++', 'SQL']
  },
  {
    title: 'AI & Machine Learning',
    icon: <Cpu size={24} />,
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Transformers', 'LLMs']
  },
  {
    title: 'Computer Vision',
    icon: <Eye size={24} />,
    skills: ['OpenCV', 'YOLOv8', 'FaceNet', 'Deep SORT', 'MediaPipe']
  },
  {
    title: 'Backend & APIs',
    icon: <Server size={24} />,
    skills: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'REST/GraphQL']
  },
  {
    title: 'DevOps & MLOps',
    icon: <Settings size={24} />,
    skills: ['Docker', 'Git', 'CI/CD', 'AWS', 'Linux']
  },
  {
    title: 'Frontend',
    icon: <Layout size={24} />,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Vite']
  }
];

const Skills = () => {
  const { playHover } = useSoundEffects();

  return (
    <section className="skills section-padding" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      <WireframeTorus />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ marginBottom: '2rem' }}>Core Proficiencies</h2>
        <div className="proficiency-bars">
          {[
            { name: 'Python', percentage: 95 },
            { name: 'PyTorch / TensorFlow', percentage: 85 },
            { name: 'Computer Vision (OpenCV, YOLO)', percentage: 90 },
            { name: 'FastAPI & Backend', percentage: 80 }
          ].map((skill, index) => (
            <div className="proficiency-bar-container" key={skill.name}>
              <div className="proficiency-header">
                <span className="mono-text">{skill.name}</span>
                <span className="mono-text">{skill.percentage}%</span>
              </div>
              <div className="proficiency-track">
                <motion.div 
                  className="proficiency-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: '3rem', marginTop: '4rem' }}>Technical Arsenal</h2>
        <div className="bento-grid">
          {skillCategories.map((cat, index) => (
            <div 
              className={`card skill-card bento-item-${index}`} 
              key={cat.title}
              onMouseEnter={playHover}
            >
              <div className="skill-icon">{cat.icon}</div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{cat.title}</h3>
              <div className="skill-tags">
                {cat.skills.map(skill => (
                  <span key={skill} className="skill-tag mono-text">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Skills;
