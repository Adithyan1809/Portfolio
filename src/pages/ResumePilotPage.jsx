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
        <div>
          <h4 style={{color: 'var(--color-text)', marginBottom: '1rem'}}>Architecture Flow</h4>
          <p>1. <strong>User Input</strong>: Next.js frontend captures resume data & Job Description.</p>
          <p>2. <strong>Orchestration</strong>: FastAPI backend manages state and triggers async tasks.</p>
          <p>3. <strong>AI Pipeline</strong>: 75 individual prompt engines analyze specific ATS sections.</p>
          <p>4. <strong>Validation</strong>: Hallucination-prevention layer cross-references generated claims.</p>
          <p>5. <strong>Output</strong>: Document generated, cached in Redis, stored in PostgreSQL.</p>
        </div>
      }
      pipeline={
        <div style={{ lineHeight: '1.8' }}>
          <p><strong>Multi-stage AI Pipeline Visualization:</strong></p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--color-text-muted)' }}>
            <li><strong>Stage 1 (Extraction):</strong> Models extract hard skills and metrics from the base resume.</li>
            <li><strong>Stage 2 (ATS Mapping):</strong> Semantic search maps user skills to JD keywords.</li>
            <li><strong>Stage 3 (Generation):</strong> 75 distinct LLM engines generate targeted bullet points (Prompt Orchestration).</li>
            <li><strong>Stage 4 (Safety):</strong> An evaluation model checks for hallucinations.</li>
          </ul>
        </div>
      }
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
