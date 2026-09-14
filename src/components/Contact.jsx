import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
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
    <section id="contact" className="contact-section section-padding border-bottom">
      <div className="bg-grid"></div>
      <div className="container">
        
        <div className="section-header-row" style={{ marginBottom: '3rem' }}>
          <div>
            <span className="section-eyebrow mono-text">GET IN TOUCH</span>
            <h2 className="section-title">Initiate Contact</h2>
          </div>
          <p className="section-subtitle">
            Open to full-time engineering opportunities, technical collaborations, and research inquiries.
          </p>
        </div>
        
        <div className="contact-grid">
          {/* Left Column: Info */}
          <div className="contact-info">
            <p className="contact-description">
              I'm currently seeking high-impact roles where I can contribute to challenging AI, computer vision, and backend data engineering projects. Whether you're hiring, prototyping, or discussing distributed architectures, my inbox is open!
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
                  <Mail size={22} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text contact-label">EMAIL ADDRESS</span>
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
                  <FaLinkedin size={22} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text contact-label">LINKEDIN PROFILE</span>
                  <span className="contact-val">in/adithyan-prakash</span>
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
                  <Phone size={22} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text contact-label">DIRECT PHONE</span>
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

              {/* Location Card */}
              <div className="contact-method-card liquid-glass" onMouseEnter={playHover}>
                <div className="contact-icon-wrapper">
                  <MapPin size={22} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text contact-label">LOCATION</span>
                  <span className="contact-val">Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-form-container liquid-glass">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="mono-text">NAME</label>
                <input type="text" id="name" name="name" required placeholder="John Doe" onFocus={playType} />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="mono-text">EMAIL</label>
                <input type="email" id="email" name="email" required placeholder="john@company.com" onFocus={playType} />
              </div>
              
              <div className="form-group message-group">
                <label htmlFor="message" className="mono-text">MESSAGE</label>
                <textarea id="message" name="message" required placeholder="Tell me about your project..." onFocus={playType}></textarea>
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
