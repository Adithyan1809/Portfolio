import React from 'react';
import CaseStudyLayout from '../components/CaseStudyLayout';

const ResumePilotPage = () => {
  return (
    <CaseStudyLayout
      title="ResumePilot"
      role="Full Stack AI Engineer"
      overview="AI-powered career intelligence platform utilizing a multi-stage AI pipeline for ATS optimization and hallucination-safe content generation."
      problem="Traditional resume builders lack intelligent context understanding, often leading to generic content that fails ATS parsers. We needed a system capable of deeply understanding job descriptions and candidate histories to generate highly targeted, hallucination-free resumes."
      architecture={
        <div className="arch-flow">
          <h3 style={{color: 'var(--color-accent)', marginBottom: '1rem', fontFamily: 'var(--font-display)'}}>Architecture & AI Pipeline</h3>
          
          <div className="arch-node">
            User Input & Job Description (Next.js)
          </div>
          
          <div style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', margin: '-0.5rem 0' }}>↓</div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '500px' }}>
            <div className="arch-node" style={{flex: 1.5}}>FastAPI Orchestrator</div>
            <div className="arch-node secondary">Redis</div>
            <div className="arch-node secondary">PostgreSQL</div>
          </div>

          <div style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', margin: '-0.5rem 0' }}>↓</div>

          <div className="arch-node highlight">
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>75-Engine Prompt Orchestration</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.9, fontWeight: 400 }}>Semantic ATS Search • Parallel Prompting • Embedding Matching</div>
          </div>

          <div style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', margin: '-0.5rem 0' }}>↓</div>

          <div className="arch-node warning">
            <div style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Safety / Validation Judge Model</div>
            <div style={{ fontSize: '0.8rem', color: 'inherit', fontWeight: 400 }}>Strict zero-hallucination factual cross-referencing</div>
          </div>
        </div>
      }
      pipeline={null}
      stack={['Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Celery', 'OpenAI API']}
      challenges={[
        { title: 'Preventing LLM Hallucinations', description: 'Implemented a robust multi-pass validation layer where a secondary "judge" model strictly compares generated resume bullets against the user\'s original factual input, filtering out any fabricated claims.' },
        { title: 'Pipeline Latency', description: 'Executing 75 prompt engines sequentially took too long. I optimized this by orchestrating asynchronous batch requests and caching intermediate embeddings in Redis, reducing generation time by 65%.' },
        { title: 'CI/CD Workflow', description: 'Established automated GitHub Actions pipelines for running unit tests on the prompt orchestration logic before building and pushing Docker containers to production.' }
      ]}
      metrics={[
        '75-Engine Prompt Pipeline',
        '65% reduction in latency',
        '0% hallucination rate on facts',
        '100% ATS parse success rate'
      ]}
      links={{ github: '#', demo: '#' }}
    />
  );
};

export default ResumePilotPage;
