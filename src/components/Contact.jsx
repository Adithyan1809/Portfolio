import React from 'react';
import { Mail, MapPin, Send, Phone } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './Contact.css';

const Contact = () => {
  const { playHover, playClick, playType, playSuccess } = useSoundEffects();

  return (
    <section id="contact" className="contact-section section-padding border-bottom">
      <div className="bg-grid"></div>
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>Get In Touch</h2>
        
        <div className="contact-grid">
          {/* Left Column: Info */}
          <div className="contact-info">
            <p className="contact-description">
              I'm always looking for new opportunities and exciting projects. Whether you have a question, a proposal, or just want to say hi, my inbox is always open!
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
            {/* Formspree integration for live email sending */}
            <form className="contact-form" action="https://formspree.io/f/xkoeyvwj" method="POST">
              <div className="form-group">
                <label htmlFor="name" className="mono-text">NAME</label>
                <input type="text" id="name" name="name" required placeholder="Enter your name" onFocus={playType} />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="mono-text">EMAIL</label>
                <input type="email" id="email" name="_replyto" required placeholder="Enter your email" onFocus={playType} />
              </div>
              
              <div className="form-group message-group">
                <label htmlFor="message" className="mono-text">MESSAGE</label>
                <textarea id="message" name="message" required placeholder="Write your message here..." onFocus={playType}></textarea>
              </div>
              
              <button type="submit" className="submit-button" onMouseEnter={playHover} onClick={playSuccess}>
                <span>SEND MESSAGE</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
