import React, { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Handle,
  Position,
  MiniMap,
  ControlButton
} from '@xyflow/react';
import { Maximize, Minimize } from 'lucide-react';
import '@xyflow/react/dist/style.css';
import './ResumeArchitectureFlow.css';

const BrutalistNode = ({ data, isConnectable }) => {
  return (
    <div className={`arch-flow-node ${data.variant || 'default'}`}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="flow-handle" />
      {data.title && <div className="node-title">{data.title}</div>}
      {data.label && <div className="node-label">{data.label}</div>}
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="flow-handle" />
    </div>
  );
};

const nodeTypes = {
  brutalist: BrutalistNode,
};

const initialNodes = [
  // Frontend
  { id: '1', type: 'brutalist', position: { x: 400, y: 0 }, data: { title: 'Next.js Frontend', label: 'User Input & PDF Upload', variant: 'default' } },
  
  // Microservices & API
  { id: '2', type: 'brutalist', position: { x: 400, y: 150 }, data: { title: 'FastAPI Orchestrator', label: 'Main API Gateway', variant: 'default' } },
  { id: '3', type: 'brutalist', position: { x: 100, y: 150 }, data: { title: 'Celery Task Queue', label: 'Async Job Management', variant: 'secondary' } },
  { id: '4', type: 'brutalist', position: { x: 700, y: 150 }, data: { title: 'PostgreSQL DB', label: 'User Data & State', variant: 'secondary' } },
  
  // Data Processing Layer
  { id: '5', type: 'brutalist', position: { x: 100, y: 300 }, data: { title: 'PDF Parsing Engine', label: 'PyMuPDF + OCR', variant: 'default' } },
  { id: '6', type: 'brutalist', position: { x: 400, y: 300 }, data: { title: 'Redis Cache', label: 'Embedding & Session Cache', variant: 'secondary' } },
  { id: '7', type: 'brutalist', position: { x: 700, y: 300 }, data: { title: 'LangChain Text Chunking', label: 'Semantic Splitting', variant: 'default' } },
  
  // AI Core
  { id: '8', type: 'brutalist', position: { x: 400, y: 450 }, data: { title: 'Embedding Pipeline', label: 'OpenAI text-embedding-3', variant: 'highlight' } },
  { id: '9', type: 'brutalist', position: { x: 100, y: 600 }, data: { title: 'pgvector Database', label: 'Cosine Similarity Search', variant: 'secondary' } },
  { id: '10', type: 'brutalist', position: { x: 400, y: 600 }, data: { title: '75-Engine Orchestration', label: 'Parallel Micro-Prompting', variant: 'highlight' } },
  
  // Output & Safety
  { id: '11', type: 'brutalist', position: { x: 400, y: 750 }, data: { title: 'Safety Judge Model', label: 'Factual Cross-Referencing & Hallucination Filter', variant: 'warning' } },
  { id: '12', type: 'brutalist', position: { x: 400, y: 900 }, data: { title: 'PDF Generator', label: 'LaTeX Compilation & Output', variant: 'default' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
  
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
  { id: 'e5-7', source: '5', target: '7', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
  { id: 'e2-6', source: '2', target: '6', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2, strokeDasharray: '5,5' } },
  
  { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
  { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
  { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
  { id: 'e8-10', source: '8', target: '10', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
  
  { id: 'e10-11', source: '10', target: '11', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 3 } },
  { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: 'var(--color-accent)', strokeWidth: 2 } },
];

export default function ResumeArchitectureFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const wrapperRef = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      ref={wrapperRef}
      className={`react-flow-wrapper ${isFullscreen ? 'fullscreen-flow' : ''}`} 
      style={{ 
        height: isFullscreen ? '100vh' : '600px', 
        width: isFullscreen ? '100vw' : '100%', 
        marginBottom: isFullscreen ? '0' : '2rem', 
        padding: 0, 
        overflow: 'hidden', 
        border: isFullscreen ? 'none' : '2px solid var(--color-accent)', 
        borderRadius: isFullscreen ? '0' : '8px',
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 99999 : 1,
        backgroundColor: 'var(--color-bg)'
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        className="brutalist-flow"
      >
        <Background color="var(--color-grid-strong)" gap={20} size={1} />
        <Controls showInteractive={false} className="flow-controls">
          <ControlButton onClick={toggleFullscreen} title="Toggle Fullscreen">
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
          </ControlButton>
        </Controls>
      </ReactFlow>
      {!isFullscreen && (
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, background: 'var(--color-bg)', padding: '0.5rem 1rem', border: '2px solid var(--color-accent)', borderRadius: '24px', fontSize: '0.8rem', fontWeight: 700 }}>
          Interactive Diagram: Pan & Zoom
        </div>
      )}
    </div>
  );
}
