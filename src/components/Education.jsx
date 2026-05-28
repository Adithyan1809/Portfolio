import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <section id="education" className="section-padding">
      <div className="container brutalist-grid">
        <div className="edu-title">
          <h2 className="uppercase">Education & Leadership</h2>
        </div>
        
        <div className="edu-content">
          <h3 className="uppercase border-bottom pb-1" style={{paddingBottom: '1rem', marginBottom: '2rem'}}>Education</h3>
          <div className="edu-item">
            <div className="edu-header">
              <h4>B.E. in Artificial Intelligence and Machine Learning</h4>
              <span className="mono-text">2023 – 2027</span>
            </div>
            <p className="mono-text">Dayananda Sagar Academy of Technology and Management (DSATM)</p>
            <p className="mono-text"><strong>CGPA: 8.9 / 10.0</strong></p>
          </div>
          
          <div className="edu-item mt-2">
            <div className="edu-header">
              <h4>Pre-University — Science (PCM + CS)</h4>
              <span className="mono-text">2021 – 2023</span>
            </div>
            <p className="mono-text">REVA University, Bengaluru | 84%</p>
          </div>

          <h3 className="uppercase border-bottom pb-1" style={{paddingBottom: '1rem', marginBottom: '2rem', marginTop: '4rem'}}>Leadership & Activities</h3>
          
          <div className="edu-item">
            <div className="edu-header">
              <h4>Student Coordinator</h4>
              <span className="mono-text">2024 – Present</span>
            </div>
            <p className="mono-text" style={{fontWeight: 'bold'}}>ALMAtron (AI & ML Club), DSATM</p>
            <ul>
              <li>Coordinated AI-VERSE 2026, an inter-college tech fest with 200+ participants; organised workshops and ML bootcamps</li>
            </ul>
          </div>

          <div className="edu-item mt-2">
            <div className="edu-header">
              <h4>Product Head & Valorant Head</h4>
              <span className="mono-text">2023 – 2025</span>
            </div>
            <p className="mono-text" style={{fontWeight: 'bold'}}>Gaming Club, DSATM</p>
            <ul>
              <li>Led club product strategy and event operations; headed Valorant division — organised inter-college tournaments and managed competitive team rosters</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Education;
