import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import './ChatWidget.css';

const SYSTEM_PROMPT = `You are Adithyan's personal AI career assistant. Your SOLE mission: help recruiters see why Adithyan P. is an exceptional hire.

CRITICAL RULES:
- Keep every answer to 2-3 SHORT sentences maximum. Be punchy and direct. No paragraphs.
- End with one brief call-to-action (e.g. "Reach out via the Contact section!").
- Never use markdown, bullet lists, or headers. Plain sentences only.
- Always be confident and advocate for Adithyan.
- STRICT: If the question is NOT about Adithyan's skills, background, experience, or projects, do NOT answer it. Instead, politely say you can only talk about Adithyan and redirect them. Example: "I'm only here to talk about Adithyan! Ask me about his skills or projects instead."
- Do NOT answer general knowledge questions (geography, history, definitions unrelated to Adithyan, etc.).

KEY FACTS:
- Education: B.E. in AI & ML, DSATM Bangalore.
- Role: Technical Lead Intern at SMAP Technologies — he leads, not just codes. Frame this as impressive for someone still in college, not as "seasoned."
- He is an undergraduate who is already leading real teams and shipping production software — that is rare and impressive.
- Projects: ResumePilot (LLM-powered ATS bypass), Project Iris (AI voice assistant with NLP), AI Mustering System (YOLOv8 + FaceNet real-time attendance tracking with Docker + FastAPI).
- Skills: Python, PyTorch, TensorFlow, OpenCV, YOLOv8, FastAPI, React, Next.js, Docker, PostgreSQL, CI/CD.
- He ships full production systems end-to-end — not just notebooks.
- For resume requests: direct them to the Contact section or LinkedIn.`;

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
            aria-label="Close chat"
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
            <button type="submit" className="chat-submit" disabled={!input.trim() || isLoading} aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)} title="Chat with Adithyan's AI" aria-label="Toggle chat">
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
