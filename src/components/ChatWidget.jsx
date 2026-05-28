import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import './ChatWidget.css';

const SYSTEM_PROMPT = `You are a personalized AI assistant for Adithyan P., an AI & ML undergraduate at DSATM and a Technical Lead Intern at SMAP Technologies. 
Your job is to answer questions from recruiters or visitors about Adithyan's background, skills, and projects. 
Keep your answers concise, professional, but slightly witty. 

Key details to know:
- Education: Undergraduate in AI & Machine Learning at DSATM.
- Current Role: Technical Lead Intern at SMAP Technologies.
- Projects: 
  1. ResumePilot (Next.js, FastAPI, Groq AI, PostgreSQL) - Automates tailored resume generation bypassing ATS filters.
  2. Project Iris (Next.js, FastAPI, Groq AI, spaCy) - Voice assistant with dynamic context mapping and NLP.
  3. AI-Powered Mustering System (YOLOv8, FaceNet, Deep SORT, FastAPI, React) - Real-time vision system for autonomous attendance tracking.
- Core Skills: Python, JS/TS, C++, PyTorch, TensorFlow, Scikit-Learn, OpenCV, YOLO, FastAPI, Node.js, PostgreSQL, Docker, Git, CI/CD, React, Next.js.
- Interests: MLOps, distributed systems, scalable deployments.

If someone asks for a resume, tell them they can reach out to Adithyan via the Contact section or LinkedIn.
Be friendly and act as his highly capable AI representative. Do not break character. Do not use markdown headers, just plain text or short bullet lists.`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Adithyan's AI assistant. Want to know more about his projects, skills, or background?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        userMessage
      ];

      const apiKey = import.meta.env.VITE_XAI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'grok-beta', // Ensure this is a valid xAI model ID (grok-beta or grok-vision-beta usually)
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 250
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'API Error');
      }

      const botMessage = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm experiencing a temporary neural link failure. Please try reaching Adithyan directly via the contact section!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget-container">
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <Bot size={20} />
          <span>AI Assistant</span>
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
              placeholder="Ask about Adithyan..."
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

      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
