import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, LayoutTemplate } from 'lucide-react';
import '';

// ==================== FORMAT 1: Left Dark Column ====================
const Format1 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f1-root">
      <div className="f1-sidebar">
        {personal.profileImage && (
          <div className="f1-photo-wrap">
            <img src={personal.profileImage} alt="Profile" className="f1-photo" />
          </div>
        )}
        <h1 className={`f1-name ${personal.profileImage ? 'text-center' : 'text-left'}`}>
          {personal.fullName || 'Nom et Prénom'}
        </h1>
        <p className={`f1-title ${personal.profileImage ? 'text-center' : 'text-left'}`}>
          {personal.jobTitle || 'Votre Titre'}
        </p>

        <div className="f1-contact-box">
          <h3 className="f1-section-title">Contact</h3>
          {personal.email && <div className="f1-contact-item">{personal.email}</div>}
          {personal.phone && <div className="f1-contact-item">{personal.phone}</div>}
          {personal.location && <div className="f1-contact-item">{personal.location}</div>}
        </div>

        <div className="f1-skills-box">
          <h3 className="f1-section-title">Compétences</h3>
          <ul className="f1-skills-list">
            {skillsList.map((skill, i) => <li key={i}>• {skill}</li>)}
          </ul>
        </div>
      </div>

      <div className="f1-main">
        {personal.summary && (
          <div className="f1-summary-box">
            <h3 className="f1-summary-title">Profil</h3>
            <p className="f1-summary-text">{personal.summary}</p>
          </div>
        )}

        <div className="f1-exp-box">
          <h3 className="f1-exp-header">Expériences</h3>
          {experience.map(exp => (
            <div key={exp.id} className="f1-exp-item">
              <div className="f1-exp-top">
                <strong className="f1-exp-title">{exp.title}</strong>
                <span className="f1-exp-date">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="f1-exp-company">{exp.company}</div>
              <p className="f1-exp-desc">{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="f1-edu-box">
          <h3 className="f1-edu-title">Formation</h3>
          {education.map(edu => (
            <div key={edu.id} className="f1-edu-item">
              <div className="f1-edu-top">
                <strong className="f1-edu-degree">{edu.degree}</strong>
                <span className="f1-edu-year">{edu.year}</span>
              </div>
              <div className="f1-edu-school">{edu.school}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== FORMAT 2: Minimalist Clean ====================
const Format2 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f2-root">
      <div className="f2-header">
        {personal.profileImage && (
          <div className="f2-photo-wrap">
            <img src={personal.profileImage} alt="Profile" className="f2-photo" />
          </div>
        )}
        <h1 className="f2-name">{personal.fullName || 'Votre Nom'}</h1>
        <h2 className="f2-title">{personal.jobTitle || 'Votre Titre'}</h2>
        <div className="f2-contact-row">
          <span>{personal.location}</span>
          <span>{personal.phone}</span>
          <span>{personal.email}</span>
        </div>
      </div>

      <div className="f2-summary-wrap">
        <p className="f2-summary">{personal.summary}</p>
      </div>

      <div className="f2-grid">
        <div className="f2-col-main">
          <div className="f2-section">
            <h3 className="f2-section-title">Expérience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="f2-exp-item">
                <div className="f2-exp-title">{exp.title}</div>
                <div className="f2-exp-meta">
                  <span className="f2-exp-company">{exp.company}</span>
                  <span className="f2-exp-date">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="f2-exp-desc">{exp.description}</p>
              </div>
            ))}
          </div>

          <div className="f2-section" style={{ marginTop: '40px' }}>
            <h3 className="f2-section-title">Formation</h3>
            {education.map(edu => (
              <div key={edu.id} className="f2-edu-item">
                <div className="f2-edu-top">
                  <span className="f2-edu-degree">{edu.degree}</span>
                  <span className="f2-edu-year">{edu.year}</span>
                </div>
                <div className="f2-edu-school">{edu.school}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="f2-col-side">
          <div className="f2-section">
            <h3 className="f2-section-title">Compétences</h3>
            <div className="f2-skills-wrap">
              {skillsList.map((skill, i) => (
                <span key={i} className="f2-skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== FORMAT 3: Executive Blue ====================
const Format3 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f3-root">
      <div className="f3-header">
        <div className="f3-header-inner">
          {personal.profileImage && <img src={personal.profileImage} alt="Profile" className="f3-photo" />}
          <div>
            <h1 className="f3-name">{personal.fullName || 'Nom'}</h1>
            <h2 className="f3-title">{personal.jobTitle}</h2>
          </div>
        </div>
        <div className="f3-header-contact">
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.location}</div>
        </div>
      </div>

      <div className="f3-content">
        {personal.summary && (
          <div className="f3-summary">"{personal.summary}"</div>
        )}

        <div className="f3-grid">
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h3 className="f3-section-title">Compétences Clés</h3>
              <ul className="f3-skills-list">
                {skillsList.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="f3-section-title">Éducation</h3>
              {education.map(edu => (
                <div key={edu.id} className="f3-edu-item">
                  <div className="f3-edu-degree">{edu.degree}</div>
                  <div className="f3-edu-school">{edu.school}</div>
                  <div className="f3-edu-year">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="f3-exp-header">Expérience Professionnelle</h3>
            {experience.map(exp => (
              <div key={exp.id} className="f3-exp-item">
                <div className="f3-exp-title">{exp.title}</div>
                <div className="f3-exp-meta">
                  {exp.company} <span className="f3-exp-company">| {exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="f3-exp-desc">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== FORMAT 4: Contemporary Split ====================
const Format4 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f4-root">
      <div className="f4-inner">
        <div className="f4-sidebar">
          {personal.profileImage ? (
            <div className="f4-photo-wrap">
              <img src={personal.profileImage} alt="Profile" className="f4-photo" />
            </div>
          ) : (
            <div className="f4-initial-box">{personal.fullName?.[0] || 'C'}</div>
          )}
          
          <h2 className="f4-section-title">Contact</h2>
          <div className="f4-contact-box">
            <div>{personal.email}</div>
            <div>{personal.phone}</div>
            <div>{personal.location}</div>
          </div>

          <h2 className="f4-section-title">Formation</h2>
          {education.map(edu => (
            <div key={edu.id} className="f4-edu-item">
              <div className="f4-edu-degree">{edu.degree}</div>
              <div className="f4-edu-school">{edu.school} • {edu.year}</div>
            </div>
          ))}

          <div className="f4-skills-wrap">
            <h2 className="f4-section-title" style={{ borderBottom: 'none', marginTop: '40px' }}>Aptitudes</h2>
            {skillsList.map((skill, i) => (
              <div key={i} className="f4-skill-tag">{skill}</div>
            ))}
          </div>
        </div>

        <div className="f4-main">
          <h1 className="f4-name">{personal.fullName || 'Votre Nom'}</h1>
          <h3 className="f4-title">{personal.jobTitle}</h3>
          
          <div className="f4-summary-box">
            <p className="f4-summary">{personal.summary}</p>
          </div>

          <h2 className="f4-exp-header">
            <span className="f4-exp-header-line"></span>
            Expérience Professionnelle
          </h2>
          {experience.map(exp => (
            <div key={exp.id} className="f4-exp-item">
              <div className="f4-exp-dot"></div>
              <div className="f4-exp-title">{exp.title}</div>
              <div className="f4-exp-meta">{exp.company} | {exp.startDate} - {exp.endDate}</div>
              <p className="f4-exp-desc">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== FORMAT 5: Classic Centered ====================
const Format5 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f5-root">
      <div className="f5-header">
        {personal.profileImage && (
          <div className="f5-photo-wrap">
            <img src={personal.profileImage} alt="Profile" className="f5-photo" />
          </div>
        )}
        <h1 className="f5-name">{personal.fullName || 'Nom'}</h1>
        <div className="f5-title">{personal.jobTitle}</div>
        <div className="f5-contact-row">
          <span>{personal.location}</span>•<span>{personal.phone}</span>•<span>{personal.email}</span>
        </div>
      </div>

      <div className="f5-summary-box">
        <p className="f5-summary">{personal.summary}</p>
      </div>

      <div className="f5-section">
        <h2 className="f5-section-title">Expérience</h2>
        {experience.map(exp => (
          <div key={exp.id} className="f5-exp-item">
            <div className="f5-exp-top">
              <div className="f5-exp-title">{exp.title}, {exp.company}</div>
              <div className="f5-exp-date">{exp.startDate} – {exp.endDate}</div>
            </div>
            <p className="f5-exp-desc">• {exp.description}</p>
          </div>
        ))}
      </div>

      <div className="f5-section">
        <h2 className="f5-section-title">Formation</h2>
        {education.map(edu => (
          <div key={edu.id} className="f5-edu-item">
            <div className="f5-edu-degree">{edu.degree} - {edu.school}</div>
            <div className="f5-edu-year">{edu.year}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="f5-section-title">Compétences</h2>
        <div className="f5-skills-text">{skillsList.join('  •  ')}</div>
      </div>
    </div>
  );
};

// ==================== FORMAT 6: Creative Modern ====================
const Format6 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f6-root">
      <div className="f6-card">
        <div className="f6-header">
          <div>
            <h1 className="f6-name">{personal.fullName || 'Votre Nom'}</h1>
            <p className="f6-title">{personal.jobTitle}</p>
          </div>
          {personal.profileImage && <img src={personal.profileImage} alt="Profile" className="f6-photo" />}
        </div>

        <div className="f6-grid">
          <div className="f6-col-left">
            <div>
              <h3 className="f6-section-title">Contact</h3>
              <div className="f6-contact-box">
                <p className="f6-contact-item">{personal.email}</p>
                <p className="f6-contact-item">{personal.phone}</p>
                <p>{personal.location}</p>
              </div>
            </div>

            <div>
              <h3 className="f6-section-title">Skills</h3>
              <div className="f6-skills-wrap">
                {skillsList.map((skill, i) => (
                  <span key={i} className="f6-skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="f6-section-title">Formation</h3>
              {education.map(edu => (
                <div key={edu.id} className="f6-edu-item">
                  <div className="f6-edu-degree">{edu.degree}</div>
                  <div className="f6-edu-school">{edu.school}, {edu.year}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="f6-col-right">
            <div className="f6-summary-box">
              <h3 className="f6-summary-title">À propos de moi</h3>
              <p className="f6-summary">{personal.summary}</p>
            </div>

            <div>
              <h3 className="f6-exp-header">Expériences</h3>
              {experience.map(exp => (
                <div key={exp.id} className="f6-exp-item">
                  <div className="f6-exp-top">
                    <h4 className="f6-exp-title">{exp.title}</h4>
                    <span className="f6-exp-date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="f6-exp-company">{exp.company}</div>
                  <p className="f6-exp-desc">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== FORMAT 7: Royal Elegance ====================
const Format7 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f7-root">
      <div className="f7-main">
        <h1 className="f7-name">{personal.fullName || 'Nom'}</h1>
        <h2 className="f7-title">{personal.jobTitle}</h2>
        
        <div className="f7-section">
          <h3 className="f7-section-title">Expériences Professionnelles</h3>
          {experience.map(exp => (
            <div key={exp.id} className="f7-exp-item">
              <div className="f7-exp-top">
                <strong className="f7-exp-title">{exp.title}</strong>
                <span className="f7-exp-date">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="f7-exp-company">{exp.company}</div>
              <p className="f7-exp-desc">{exp.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="f7-section-title">Formation Académique</h3>
          {education.map(edu => (
            <div key={edu.id} className="f7-edu-item">
              <div className="f7-edu-degree">{edu.degree}</div>
              <div className="f7-edu-school">{edu.school} • {edu.year}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="f7-sidebar">
        {personal.profileImage && <img src={personal.profileImage} alt="Profile" className="f7-photo" />}
        
        <div className="f7-contact-box">
          <h3 className="f7-contact-title">Contact</h3>
          <div className="f7-contact-text">
            <div>{personal.email}</div>
            <div>{personal.phone}</div>
            <div>{personal.location}</div>
          </div>
        </div>

        <div className="f7-summary-box">
          <h3 className="f7-contact-title">Profil</h3>
          <p className="f7-summary-text">{personal.summary}</p>
        </div>

        <div>
          <h3 className="f7-contact-title">Expertise</h3>
          <div className="f7-expertise-list">
            {skillsList.map((skill, i) => (
              <div key={i} className="f7-expertise-item">
                <span className="f7-dot"></span> {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== FORMAT 8: Minimalist Dark ====================
const Format8 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f8-root">
      <div className="f8-inner">
        <header className="f8-header">
          <div>
            <h1 className="f8-name">{personal.fullName || 'Nom'}</h1>
            <h2 className="f8-title">{personal.jobTitle}</h2>
            <div className="f8-contact-row">
              <span>{personal.email}</span>
              <span>{personal.phone}</span>
              <span>{personal.location}</span>
            </div>
          </div>
          {personal.profileImage && <img src={personal.profileImage} alt="Profile" className="f8-photo" />}
        </header>

        <section className="f8-summary">
          <p>{personal.summary}</p>
        </section>

        <div className="f8-grid">
          <div>
            <h3 className="f8-section-title">Work Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="f8-exp-item">
                <div className="f8-exp-title">{exp.title}</div>
                <div className="f8-exp-meta">{exp.company} // {exp.startDate} – {exp.endDate}</div>
                <p className="f8-exp-desc">{exp.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="f8-section-title">Expertise</h3>
            <div className="f8-skills-wrap">
              {skillsList.map((skill, i) => (
                <span key={i} className="f8-skill-tag">{skill}</span>
              ))}
            </div>

            <h3 className="f8-section-title">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="f8-edu-item">
                <div className="f8-edu-degree">{edu.degree}</div>
                <div className="f8-edu-school">{edu.school}, {edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== FORMAT 9: Corporate Border ====================
const Format9 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f9-root">
      <div className="f9-card">
        <div className="f9-header">
          <div className="f9-header-inner">
            {personal.profileImage && <img src={personal.profileImage} alt="Profile" className="f9-photo" />}
            <div>
              <h1 className="f9-name">{personal.fullName || 'Nom'}</h1>
              <h2 className="f9-title">{personal.jobTitle}</h2>
            </div>
          </div>
          <div className="f9-header-contact">
            <div>{personal.email}</div>
            <div>{personal.phone}</div>
            <div>{personal.location}</div>
          </div>
        </div>

        <div className="f9-summary-box">
          <h3 className="f9-section-title">Professional Summary</h3>
          <p className="f9-summary">{personal.summary}</p>
        </div>

        <div className="f9-grid">
          <div className="f9-col-main">
            <h3 className="f9-section-header">Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="f9-exp-item">
                <div className="f9-exp-title">{exp.title}</div>
                <div className="f9-exp-meta">
                  <span className="f9-exp-company">{exp.company}</span>
                  <span className="f9-exp-date">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="f9-exp-desc">{exp.description}</p>
              </div>
            ))}
          </div>
          <div className="f9-col-side">
            <div className="f9-skills-box">
              <h3 className="f9-section-title">Top Skills</h3>
              <div className="f9-skills-list">
                {skillsList.map((skill, i) => (
                  <div key={i} className="f9-skill-item">
                    <div className="f9-dot"></div>
                    <span className="f9-skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="f9-edu-title">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="f9-edu-item">
                <div className="f9-edu-degree">{edu.degree}</div>
                <div className="f9-edu-school">{edu.school}</div>
                <div className="f9-edu-year">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== FORMAT 10: Modern Luxury ====================
const Format10 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="f10-root">
      <div className="f10-header">
        <div className="f10-bg-text">CV</div>
        <div className="f10-header-inner">
          {personal.profileImage && <img src={personal.profileImage} alt="Profile" className="f10-photo" />}
          <div>
            <h1 className="f10-name">{personal.fullName || 'Candidat'}</h1>
            <h2 className="f10-title">{personal.jobTitle}</h2>
          </div>
        </div>
      </div>

      <div className="f10-grid">
        <div className="f10-col-left">
          <div>
            <h3 className="f10-section-title">Contact</h3>
            <div className="f10-contact-box">
              <div className="f10-contact-item"><span className="f10-dot">●</span> {personal.email}</div>
              <div className="f10-contact-item"><span className="f10-dot">●</span> {personal.phone}</div>
              <div className="f10-contact-item"><span className="f10-dot">●</span> {personal.location}</div>
            </div>
          </div>

          <div>
            <h3 className="f10-section-title">Compétences</h3>
            <div className="f10-skills-wrap">
              {skillsList.map((skill, i) => (
                <span key={i} className="f10-skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="f10-section-title">Formation</h3>
            {education.map(edu => (
              <div key={edu.id} className="f10-edu-item">
                <div className="f10-edu-degree">{edu.degree}</div>
                <div className="f10-edu-school">{edu.school}</div>
                <div className="f10-edu-year">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="f10-col-right">
          <div className="f10-summary-box">
            <h3 className="f10-summary-title">Profil Professionnel</h3>
            <p className="f10-summary">{personal.summary}</p>
          </div>

          <div>
            <h3 className="f10-exp-header">Expériences</h3>
            {experience.map(exp => (
              <div key={exp.id} className="f10-exp-item">
                <div className="f10-exp-top">
                  <h4 className="f10-exp-title">{exp.title}</h4>
                  <span className="f10-exp-date">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="f10-exp-company">{exp.company}</div>
                <p className="f10-exp-desc">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const CVPreview = ({ data, updateFormat }) => {
  const printRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    setDownloading(true);
    const element = printRef.current;
    const originalWidth = element.style.width;

    try {
      element.style.width = '794px';
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        windowWidth: 794,
        scrollX: 0,
        scrollY: -window.scrollY
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save(`CV_${data.personal.fullName?.replace(/\s+/g, '_') || 'Mon_CV'}.pdf`);
    } catch (error) {
      console.error('Erreur PDF', error);
      alert("Erreur lors de la génération du PDF.");
    } finally {
      element.style.width = originalWidth;
      setDownloading(false);
    }
  };

  const renderFormat = () => {
    switch(data.format) {
      case 'format1': return <Format1 data={data} />;
      case 'format2': return <Format2 data={data} />;
      case 'format3': return <Format3 data={data} />;
      case 'format4': return <Format4 data={data} />;
      case 'format5': return <Format5 data={data} />;
      case 'format6': return <Format6 data={data} />;
      case 'format7': return <Format7 data={data} />;
      case 'format8': return <Format8 data={data} />;
      case 'format9': return <Format9 data={data} />;
      case 'format10': return <Format10 data={data} />;
      default: return <Format1 data={data} />;
    }
  };

  return (
    <div className="cv-preview-root">
      <div className="cv-controls-bar">
        <div className="cv-controls-left">
          <LayoutTemplate size={20} color="#64748B" />
          <select value={data.format} onChange={(e) => updateFormat(e.target.value)} className="cv-format-select">
            <option value="format1">Format 1: Moderne (Bleu & Blanc)</option>
            <option value="format2">Format 2: Minimaliste Épuré</option>
            <option value="format3">Format 3: Exécutif (Bleu Nuit)</option>
            <option value="format4">Format 4: Contemporain (Split)</option>
            <option value="format5">Format 5: Élégant Centré</option>
            <option value="format6">Format 6: Créatif (Dégradé)</option>
            <option value="format7">Format 7: Royal (Sable & Or)</option>
            <option value="format8">Format 8: Minimaliste Sombre</option>
            <option value="format9">Format 9: Bordure Corporative</option>
            <option value="format10">Format 10: Luxe Moderne (Éthéré)</option>
          </select>
        </div>
        <button className="cv-download-btn" onClick={downloadPDF} disabled={downloading}>
          <Download size={18} />
          {downloading ? 'Génération...' : 'Télécharger PDF'}
        </button>
      </div>

      <div className="cv-preview-wrapper">
        <div className="cv-document-container">
          <div ref={printRef} className="cv-capture-area">
            {renderFormat()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;