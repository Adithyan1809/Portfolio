import React from 'react';
import CaseStudyLayout from '../components/CaseStudyLayout';
import ResumeArchitectureFlow from '../components/ResumeArchitectureFlow';

const ResumePilotPage = () => {
  return (
    <CaseStudyLayout
      title="ResumePilot"
      role="Full Stack AI Engineer"
      overview="An advanced, AI-driven career intelligence platform that leverages a massive multi-stage language model pipeline to generate hyper-targeted, ATS-optimized resumes. Built to eliminate the generic output of standard LLMs, this system acts as a factual proxy between a candidate's history and an employer's job description."
      problem="Traditional resume generation tools rely on single-pass LLM prompts, resulting in vague, generic content that triggers ATS filters and introduces massive hallucinations. Candidates spend hours trying to 'trick' AI into sounding authentic, while recruiters immediately discard fabricated or unquantified bullet points. We needed a system capable of deeply cross-referencing candidate history against job requirements without inventing fake metrics."
      architecture={
        <div>
          <p style={{marginBottom: '2rem'}}>The core of ResumePilot is a highly asynchronous pipeline orchestrated by FastAPI. By parallelizing 75 distinct LLM prompts, we construct the resume iteratively—first extracting intent, then matching semantics, and finally rendering the text—all while caching embeddings in Redis for speed.</p>
          <ResumeArchitectureFlow />
        </div>
      }
      pipeline={null}
      stack={['Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Celery', 'React Flow', 'OpenAI API']}
      challenges={[
        { title: 'The Hallucination Firewall', description: 'Large Language Models are prone to inventing facts to satisfy constraints. To counter this, I implemented a strict multi-pass validation layer. Before any bullet point is returned to the user, a secondary, highly constrained "Judge Model" cross-references the output against the user\'s original uploaded documents. Any fabricated metrics or unverified skills are immediately flagged and stripped.' },
        { title: 'Orchestrating a 75-Engine Pipeline', description: 'Running a single complex prompt degraded output quality, but splitting it into 75 sequential micro-prompts caused massive latency (upwards of 45 seconds per resume). I re-architected the backend using FastAPI and Celery to execute non-dependent prompts concurrently, caching static contextual embeddings in Redis. This brought generation time down by 65%.' },
        { title: 'Context Window Optimization', description: 'Feeding entire user histories and lengthy job descriptions repeatedly into the API was prohibitively expensive. I developed a pre-processing NLP engine that tokenizes, summarizes, and extracts only the relevant skill clusters before dispatching to the main LLM pipeline, cutting token costs by nearly 40%.' },
        { title: 'Production CI/CD Automation', description: 'To maintain stability across both the Next.js frontend and Python backend, I established strict GitHub Actions pipelines. These pipelines automatically run PyTest suites against the prompt orchestration logic, ensuring that upstream API changes don\'t break our factual grounding, before containerizing and deploying via Docker.' }
      ]}
      metrics={[
        '75 Parallel LLM Engines',
        '65% Reduction in Generation Latency',
        '0% Hallucination Rate on Core Facts',
        '40% Reduction in API Token Costs',
        '100% ATS Parser Success Rate'
      ]}
      links={{ github: '#', demo: '#' }}
    />
  );
};

export default ResumePilotPage;
