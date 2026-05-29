import React from 'react';
import CaseStudyLayout from '../components/CaseStudyLayout';
import { CCTVScroll } from '../components/CCTVScroll';
import projectIrisImg from '../assets/project_iris_cctv.png';

const ProjectIrisPage = () => {
  return (
    <CaseStudyLayout
      visualElement={
        <CCTVScroll src={projectIrisImg} />
      }
      title="Project IRIS"
      role="Technical Lead Intern"
      overview="Real-time surveillance and attendance system processing 90+ live camera feeds using async RTSP/ONVIF pipelines."
      problem="Manual attendance logging in large facilities is inefficient and prone to errors. We needed a robust, automated system capable of recognizing faces across dozens of concurrent video streams in real-time, handling varied lighting conditions and occlusions without dropping frames."
      architecture={
        <div>
          <h4 style={{color: 'var(--color-text)', marginBottom: '1rem'}}>Video Processing Architecture</h4>
          <p>1. <strong>Ingestion</strong>: Async RTSP/ONVIF pipelines capture streams from 90+ IP cameras.</p>
          <p>2. <strong>Preprocessing</strong>: Frames are decoded, resized, and batched efficiently.</p>
          <p>3. <strong>Inference</strong>: ArcFace and FaceNet models extract facial embeddings on GPU.</p>
          <p>4. <strong>Matching</strong>: FAISS performs high-speed vector similarity search against the employee database.</p>
          <p>5. <strong>State Management</strong>: Redis caches recent detections to prevent spamming the PostgreSQL database.</p>
        </div>
      }
      stack={['FastAPI', 'Python', 'Redis', 'PostgreSQL', 'ArcFace', 'FaceNet', 'FAISS', 'OpenCV', 'RTSP']}
      challenges={[
        { title: 'Real-time Processing at Scale', description: 'Processing 90+ concurrent camera feeds overwhelmed initial single-threaded implementations. I refactored the ingestion pipeline to use asynchronous I/O and implemented frame skipping/batching before GPU inference, allowing the system to scale efficiently.' },
        { title: 'Database Bottlenecks', description: 'High-frequency detections caused massive write loads. I introduced a Redis caching layer to handle transient state and implement a debounce mechanism, reducing PostgreSQL database latency by 20% and improving overall fault tolerance.' },
        { title: 'Team Coordination', description: 'As Technical Lead, I mentored a cross-functional team of AI, backend, and DevOps engineers, coordinating sprint planning and ensuring smooth integration between the CV models and the API services.' }
      ]}
      metrics={[
        '90+ Concurrent Camera Feeds',
        '20% Latency Reduction',
        'Sub-second Vector Search (FAISS)',
        'Fault-tolerant Alert Mechanisms'
      ]}
      links={{ github: '#' }}
    />
  );
};

export default ProjectIrisPage;
