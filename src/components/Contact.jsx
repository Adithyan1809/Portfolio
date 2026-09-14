import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone, Copy, Check, ExternalLink, Clock, Globe } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import ChromaText from './shared/ChromaText';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Contact.css';

const Contact = () => {
  const { playHover, playClick, playType, playSuccess, playError } = useSoundEffects();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (e, text, field) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    playSuccess();
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    formData.append("access_key", "c6c692ba-c335-4807-ba3f-8253a09400fa");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        playSuccess();
        e.target.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        if (playError) playError();
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      if (playError) playError();
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section section-padding border-bottom section-rule-lines" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <span className="section-watermark-text" aria-hidden="true">CONNECT</span>

      <div className="bg-grid"></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <div className="section-header-row" style={{ marginBottom: '3rem' }}>
          <div>
            <span className="section-eyebrow mono-text">GET IN TOUCH</span>
            <ChromaText as="h2" className="section-title">Let's Build Something Real</ChromaText>
          </div>
          <p className="section-subtitle">
            Open to full-time engineering opportunities, distributed systems architecture, and production AI roles.
          </p>
        </div>
        
        <div className="contact-grid">
          {/* Left Column: Info */}
          <div className="contact-info">
            <p className="contact-description">
              I'm seeking high-impact engineering roles where I can architect and ship computer vision pipelines, async backends, and reliable AI infrastructure. If you're building systems that need to scale with zero hallucinations, my inbox is open.
            </p>
            
            <div className="contact-methods">
              {/* Email Card */}
              <div 
                className="contact-method-card liquid-glass" 
                onMouseEnter={playHover}
                onClick={(e) => handleCopy(e, 'adithyan18092005@gmail.com', 'email')}
                title="Click to copy email address"
              >
                <div className="contact-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text contact-label">DIRECT EMAIL</span>
                  <span className="contact-val">adithyan18092005@gmail.com</span>
                </div>
                <div className="contact-copy-badge mono-text">
                  {copiedField === 'email' ? (
                    <span className="copied-pill"><Check size={12} /> Copied!</span>
                  ) : (
                    <span className="copy-action-hint"><Copy size={13} /> Copy</span>
                  )}
                </div>
              </div>

              {/* LinkedIn Card */}
              <a 
                href="https://linkedin.com/in/adithyan-prakash" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-method-card liquid-glass" 
                onMouseEnter={playHover} 
                onClick={playClick}
              >
                <div className="contact-icon-wrapper">
                  <FaLinkedin size={20} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text contact-label">PROFESSIONAL NETWORK</span>
                  <span className="contact-val">linkedin.com/in/adithyan-prakash</span>
                </div>
                <div className="contact-copy-badge mono-text">
                  <ExternalLink size={14} className="external-icon" />
                </div>
              </a>

              {/* Phone Card */}
              <div 
                className="contact-method-card liquid-glass" 
                onMouseEnter={playHover}
                onClick={(e) => handleCopy(e, '+91 9738585365', 'phone')}
                title="Click to copy phone number"
              >
                <div className="contact-icon-wrapper">
                  <Phone size={20} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text contact-label">DIRECT LINE</span>
                  <span className="contact-val">+91 9738585365</span>
                </div>
                <div className="contact-copy-badge mono-text">
                  {copiedField === 'phone' ? (
                    <span className="copied-pill"><Check size={12} /> Copied!</span>
                  ) : (
                    <span className="copy-action-hint"><Copy size={13} /> Copy</span>
                  )}
                </div>
              </div>

              {/* Premium Location & Availability Card */}
              <div className="contact-location-card liquid-glass" onMouseEnter={playHover}>
                <div className="location-card-header">
                  <div className="location-pulse-dot">
                    <span className="ping-dot" style={{ color: '#10b981', width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                  </div>
                  <div className="location-title-group">
                    <span className="location-city">Bengaluru, Karnataka, India</span>
                    <span className="location-tz mono-text">IST · UTC+5:30</span>
                  </div>
                </div>

                <div className="location-meta-grid mono-text">
                  <div className="location-meta-item">
                    <Clock size={12} />
                    <span>Active: 10:00 AM – 10:00 PM IST</span>
                  </div>
                  <div className="location-meta-item">
                    <Globe size={12} />
                    <span>Response: Under 24 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-form-container liquid-glass">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="mono-text">NAME</label>
                <input type="text" id="name" name="name" required placeholder="Jane Smith" onFocus={playType} />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="mono-text">EMAIL</label>
                <input type="email" id="email" name="email" required placeholder="jane@company.com" onFocus={playType} />
              </div>
              
              <div className="form-group message-group">
                <label htmlFor="message" className="mono-text">MESSAGE</label>
                <textarea id="message" name="message" required placeholder="Tell me about the engineering challenge, team, or role..." onFocus={playType}></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`submit-button ${status}`}
                disabled={status === 'loading' || status === 'success'}
                onMouseEnter={playHover}
              >
                <span>
                  {status === 'idle' && 'TRANSMIT MESSAGE'}
                  {status === 'loading' && 'TRANSMITTING...'}
                  {status === 'success' && 'MESSAGE SENT'}
                  {status === 'error' && 'TRANSMISSION FAILED'}
                </span>
                {status === 'idle' && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
