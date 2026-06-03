import React from 'react';
import { Mail, MapPin, Send, Phone } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Contact.css';

const Contact = () => {
  const { playHover, playClick, playType, playSuccess, playError } = useSoundEffects();
  const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

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
        <h2 style={{ marginBottom: '3rem' }}>Initiate Contact</h2>
        
        <div className="contact-grid">
          {/* Left Column: Info */}
          <div className="contact-info">
            <p className="contact-description">
              Building scalable infrastructure? Need to architect an AI pipeline? Or just want to discuss distributed systems over coffee? My inbox is always open. Let's build something extraordinary.
            </p>
            
            <div className="contact-methods">
              <a href="mailto:adithyan18092005@gmail.com" className="contact-method-card" onMouseEnter={playHover} onClick={playClick}>
                <div className="contact-icon-wrapper">
                  <Mail size={24} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text">EMAIL</span>
                  <span>adithyan18092005@gmail.com</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/adithyan-prakash" target="_blank" rel="noopener noreferrer" className="contact-method-card" onMouseEnter={playHover} onClick={playClick}>
                <div className="contact-icon-wrapper">
                  <FaLinkedin size={24} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text">LINKEDIN</span>
                  <span>adithyan-prakash</span>
                </div>
              </a>

              <a href="tel:+919738585365" className="contact-method-card" onMouseEnter={playHover} onClick={playClick}>
                <div className="contact-icon-wrapper">
                  <Phone size={24} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text">PHONE</span>
                  <span>+91 9738585365</span>
                </div>
              </a>

              <div className="contact-method-card" onMouseEnter={playHover}>
                <div className="contact-icon-wrapper">
                  <MapPin size={24} />
                </div>
                <div className="contact-method-details">
                  <span className="mono-text">LOCATION</span>
                  <span>Bengaluru, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-form-container">
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
