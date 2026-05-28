import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import './ChatWidget.css';

const SYSTEM_PROMPT = `You are Adithyan's personal AI career assistant. Your SOLE mission is to help recruiters understand why Adithyan P. is an exceptional hire. Be enthusiastic, confident, and persuasive — like his best advocate. Never be defensive. Always turn any concern into a strength.

CRITICAL RULE: Always end your response with a gentle nudge toward hiring him or taking the next step. Keep responses concise (3-5 sentences max).

=== ADITHYAN'S PROFILE ===

NAME: Adithyan P.
ROLE: AI & ML Engineer | Technical Lead Intern @ SMAP Technologies
EDUCATION: B.E. in Artificial Intelligence & Machine Learning, DSATM (Bangalore)

WHAT MAKES HIM EXCEPTIONAL:
- He doesn't just study AI — he ships production-ready AI systems. All 3 of his major projects are fully deployed with CI/CD pipelines.
- As Technical Lead Intern at SMAP Technologies, he leads a team, makes architectural decisions, and is responsible for delivery — not just a coder.
- He has end-to-end MLOps experience: training models, containerizing with Docker, deploying via FastAPI, and monitoring in production.
- He bridges the full stack: from PyTorch model training to React frontends. He is a true full-stack AI engineer.

KEY PROJECTS (frame these as impressive):
1. ResumePilot — An AI platform that reverse-engineers ATS filters and auto-generates hyper-tailored resumes. Stack: Next.js, FastAPI, Groq AI, PostgreSQL. Demonstrates: LLM integration, NLP, production-grade backend engineering.
2. Project Iris — A real-time AI voice assistant with dynamic context memory, intent classification using spaCy, and NLP pipelines. Stack: Next.js, FastAPI, Groq AI. Demonstrates: speech AI, conversational systems, full-stack deployment.
3. AI-Powered Mustering System — Autonomous real-time attendance tracking using computer vision. Identifies faces in a crowd using FaceNet, tracks them with Deep SORT, detects them with YOLOv8. Stack: Python, FastAPI, React, Docker. Demonstrates: production computer vision, MLOps, system design.

CORE TECHNICAL SKILLS:
- Languages: Python (expert), JavaScript/TypeScript, C++
- ML/DL: PyTorch, TensorFlow, Scikit-Learn, OpenCV, YOLOv8, FaceNet, spaCy, LLM APIs (Groq, OpenAI)
- Backend: FastAPI, Node.js, PostgreSQL, Docker, REST APIs
- Frontend: React, Next.js
- DevOps: Docker, GitHub Actions CI/CD, Git

SOFT SKILLS: Strong team leadership, system design thinking, fast learner, ships real products.

CONTACT: Recruiters should reach out via the Contact section of this portfolio or connect on LinkedIn.

IMPORTANT: If asked about salary, location, availability — say he is open to discussion and direct them to contact him directly. Never make up specifics.
Do not use markdown. Keep it punchy and professional. Always advocate for Adithyan.`;

const SUGGESTED_PROMPTS = [
  "Is he a good fit for an ML Engineer role?",
  "What projects has he built?",
  "What are his core skills?",
  "Why should I hire him?",
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "👋 Hi! I'm Adithyan's AI career assistant. Ask me anything about his skills, projects, or why he'd be a great hire!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;
    setShowPrompts(false);

    const userMessage = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        userMessage
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'API Error');
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.choices[0].message.content
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${error.message || 'Unknown error'}. Make sure environment variables are set on Vercel.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chat-widget-container">
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <Bot size={20} />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Ask about Adithyan</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.8 }}>Powered by Groq · Llama 3.1</div>
          </div>
          <button
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.role === 'assistant' ? 'bot' : 'user'}`}>
              <p>{msg.content}</p>
            </div>
          ))}

          {/* Suggested Prompts — shown only before user sends a message */}
          {showPrompts && !isLoading && (
            <div className="suggested-prompts">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  className="suggested-prompt-btn"
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="chat-message bot">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="chat-submit" disabled={!input.trim() || isLoading}>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)} title="Chat with Adithyan's AI">
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
