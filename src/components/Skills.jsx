import React from 'react';
import BackgroundMarquee from './BackgroundMarquee';
import { Code2, Cpu, Eye, Server, Settings, Layout } from 'lucide-react';
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
  return (
    <section className="skills section-padding" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundMarquee text="SKILLS" />
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>Technical Arsenal</h2>
        <div className="skills-grid">
          {skillCategories.map(cat => (
            <div className="card skill-card" key={cat.title}>
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
