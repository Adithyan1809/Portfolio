import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Copy, Check, Send, MapPin, Clock, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './StaticPages.css';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState('Full-Time Role');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = "Contact & Collaboration | Adithyan P.";
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('adithyan18092005@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${topic}] Collaboration Inquiry from ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(`${message}\n\n— Sent from adithyanp.me/contact`);
    window.location.href = `mailto:adithyan18092005@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="static-page-container">
      <div className="static-ambient-glow" aria-hidden="true" />

      <nav className="static-breadcrumb mono-text">
        <Link to="/" className="static-back-btn">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </nav>

      <header className="static-header">
        <div className="static-category-badge mono-text">
          <Mail size={13} />
          <span>CONTACT &amp; COLLABORATION</span>
        </div>
        <h1 className="static-main-title">Let's Build Something Impactful</h1>
        <p className="static-main-subtitle">
          I'm currently open to full-time AI/ML Engineering roles, high-scale computer vision consulting,
          and technical architecture advisory. Feel free to reach out directly.
        </p>
      </header>

      <div className="contact-grid-layout">
        {/* Left: Quick Channels */}
        <div className="contact-channels-card">
          <h2 className="contact-channels-title">Direct Channels</h2>
          
          <div className="contact-channel-item">
            <div className="contact-channel-header">
              <span className="contact-channel-label mono-text">PRIMARY EMAIL</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="contact-copy-btn mono-text"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <a href="mailto:adithyan18092005@gmail.com" className="contact-channel-val">
              adithyan18092005@gmail.com
            </a>
          </div>

          <div className="contact-channel-item">
            <span className="contact-channel-label mono-text">CONNECT ON SOCIALS</span>
            <div className="contact-social-links">
              <a
                href="https://in.linkedin.com/in/adithyan-prakash"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn mono-text"
              >
                <FaLinkedin size={14} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Adithyan1809"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn mono-text"
              >
                <FaGithub size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/Adithyan1809"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn mono-text"
              >
                <FaTwitter size={14} />
                <span>X / Twitter</span>
              </a>
            </div>
          </div>

          <div className="contact-meta-box mono-text">
            <div className="contact-meta-row">
              <MapPin size={14} />
              <span>Bengaluru, India (IST / UTC +5:30)</span>
            </div>
            <div className="contact-meta-row">
              <Clock size={14} />
              <span>Typical reply time: Within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Message Launcher */}
        <form onSubmit={handleSendEmail} className="contact-form-card">
          <h2 className="contact-form-title">Send a Quick Note</h2>
          <p className="contact-form-subtitle">
            Select your inquiry topic and launch your preferred email client instantly.
          </p>

          <div className="form-group">
            <label className="form-label mono-text">INQUIRY TYPE</label>
            <div className="form-topic-pills">
              {['Full-Time Role', 'AI Consulting', 'Research', 'General Inquiry'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={`form-topic-btn mono-text ${topic === t ? 'active' : ''}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact-name" className="form-label mono-text">YOUR NAME / COMPANY</label>
            <input
              id="contact-name"
              type="text"
              placeholder="e.g. Sarah from Acme AI"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-msg" className="form-label mono-text">MESSAGE</label>
            <textarea
              id="contact-msg"
              rows={4}
              placeholder="Tell me about the role, technical challenge, or opportunity..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-textarea"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mono-text contact-submit-btn">
            <Send size={14} />
            <span>Open Email Draft</span>
          </button>
        </form>
      </div>
    </div>
  );
}
