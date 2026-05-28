import React from 'react';

const BackgroundMarquee = ({ text, reverse = false }) => {
  const repeatedText = Array(6).fill(text).join(' • ') + ' • ';

  return (
    <div className={`bg-marquee-container ${reverse ? 'marquee-reverse' : ''}`}>
      <div className="bg-marquee">
        <span>{repeatedText}</span>
        <span>{repeatedText}</span>
      </div>
    </div>
  );
};

export default BackgroundMarquee;
