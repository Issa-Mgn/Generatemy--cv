import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, LayoutTemplate } from 'lucide-react';
import './CVPreview.css';

const FORMAT_OPTIONS = [
  { value: 'format1', label: 'Moderne bleu' },
  { value: 'format2', label: 'Minimaliste épuré' },
  { value: 'format3', label: 'Exécutif bleu nuit' },
  { value: 'format4', label: 'Contemporain split' },
  { value: 'format5', label: 'Classique centré' },
  { value: 'format6', label: 'Créatif moderne' },
  { value: 'format7', label: 'Élégance sable' },
  { value: 'format8', label: 'Minimaliste sombre' },
  { value: 'format9', label: 'Corporate bordure' },
  { value: 'format10', label: 'Luxe moderne' },
];

const getSkillsList = (skills = '') => skills.split(',').map(skill => skill.trim()).filter(Boolean);

const getPdfFileName = (fullName) => {
  const cleanedName = fullName?.trim().replace(/[^\p{L}\p{N}]+/gu, '_').replace(/^_+|_+$/g, '');
  return `CV_${cleanedName || 'Mon_CV'}.pdf`;
};

const getExperienceTitle = (data, long = false) => {
  if (data.profileType === 'student') {
    return long ? 'Stages, projets et expériences' : 'Stages et projets';
  }

  return long ? 'Expérience professionnelle' : 'Expériences';
};

// ==================== FORMAT 1: Left Dark Column ====================
const Format1 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = getSkillsList(skills);

  return (
    <div className="f1-root">
      <div className="f1-sidebar">
        {personal.profileImage && (
          <div className="f1-photo-wrap">
            <img src={personal.profileImage} alt="Portrait du candidat" className="f1-photo" />
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
          <h3 className="f1-exp-header">{getExperienceTitle(data)}</h3>
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
  const skillsList = getSkillsList(skills);

  return (
    <div className="f2-root">
      <div className="f2-header">
        {personal.profileImage && (
          <div className="f2-photo-wrap">
            <img src={personal.profileImage} alt="Portrait du candidat" className="f2-photo" />
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
            <h3 className="f2-section-title">{getExperienceTitle(data)}</h3>
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

          <div className="f2-section f2-section-spaced">
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
  const skillsList = getSkillsList(skills);

  return (
    <div className="f3-root">
      <div className="f3-header">
        <div className="f3-header-inner">
          {personal.profileImage && <img src={personal.profileImage} alt="Portrait du candidat" className="f3-photo" />}
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
          <div className="f3-summary">{personal.summary}</div>
        )}

        <div className="f3-grid">
          <div>
            <div className="f3-skills-section">
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
            <h3 className="f3-exp-header">{getExperienceTitle(data, true)}</h3>
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
  const skillsList = getSkillsList(skills);

  return (
    <div className="f4-root">
      <div className="f4-inner">
        <div className="f4-sidebar">
          {personal.profileImage ? (
            <div className="f4-photo-wrap">
              <img src={personal.profileImage} alt="Portrait du candidat" className="f4-photo" />
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
            <h2 className="f4-section-title f4-section-title-plain">Aptitudes</h2>
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
            {getExperienceTitle(data, true)}
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
  const skillsList = getSkillsList(skills);

  return (
    <div className="f5-root">
      <div className="f5-header">
        {personal.profileImage && (
          <div className="f5-photo-wrap">
            <img src={personal.profileImage} alt="Portrait du candidat" className="f5-photo" />
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
        <h2 className="f5-section-title">{getExperienceTitle(data)}</h2>
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
  const skillsList = getSkillsList(skills);

  return (
    <div className="f6-root">
      <div className="f6-card">
        <div className="f6-header">
          <div>
            <h1 className="f6-name">{personal.fullName || 'Votre Nom'}</h1>
            <p className="f6-title">{personal.jobTitle}</p>
          </div>
          {personal.profileImage && <img src={personal.profileImage} alt="Portrait du candidat" className="f6-photo" />}
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
              <h3 className="f6-section-title">Compétences</h3>
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
              <h3 className="f6-exp-header">{getExperienceTitle(data)}</h3>
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
  const skillsList = getSkillsList(skills);

  return (
    <div className="f7-root">
      <div className="f7-main">
        <h1 className="f7-name">{personal.fullName || 'Nom'}</h1>
        <h2 className="f7-title">{personal.jobTitle}</h2>
        
        <div className="f7-section">
          <h3 className="f7-section-title">{getExperienceTitle(data, true)}</h3>
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
        {personal.profileImage && <img src={personal.profileImage} alt="Portrait du candidat" className="f7-photo" />}
        
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
  const skillsList = getSkillsList(skills);

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
          {personal.profileImage && <img src={personal.profileImage} alt="Portrait du candidat" className="f8-photo" />}
        </header>

        <section className="f8-summary">
          <p>{personal.summary}</p>
        </section>

        <div className="f8-grid">
          <div>
            <h3 className="f8-section-title">{getExperienceTitle(data)}</h3>
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

            <h3 className="f8-section-title">Formation</h3>
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
  const skillsList = getSkillsList(skills);

  return (
    <div className="f9-root">
      <div className="f9-card">
        <div className="f9-header">
          <div className="f9-header-inner">
            {personal.profileImage && <img src={personal.profileImage} alt="Portrait du candidat" className="f9-photo" />}
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
          <h3 className="f9-section-title">Profil professionnel</h3>
          <p className="f9-summary">{personal.summary}</p>
        </div>

        <div className="f9-grid">
          <div className="f9-col-main">
            <h3 className="f9-section-header">{getExperienceTitle(data)}</h3>
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
              <h3 className="f9-section-title">Compétences clés</h3>
              <div className="f9-skills-list">
                {skillsList.map((skill, i) => (
                  <div key={i} className="f9-skill-item">
                    <div className="f9-dot"></div>
                    <span className="f9-skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="f9-edu-title">Formation</h3>
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
  const skillsList = getSkillsList(skills);

  return (
    <div className="f10-root">
      <div className="f10-header">
        <div className="f10-bg-text">CV</div>
        <div className="f10-header-inner">
          {personal.profileImage && <img src={personal.profileImage} alt="Portrait du candidat" className="f10-photo" />}
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
            <h3 className="f10-exp-header">{getExperienceTitle(data)}</h3>
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

const FORMAT_COMPONENTS = {
  format1: Format1,
  format2: Format2,
  format3: Format3,
  format4: Format4,
  format5: Format5,
  format6: Format6,
  format7: Format7,
  format8: Format8,
  format9: Format9,
  format10: Format10,
};

// ==================== MAIN COMPONENT ====================
const CVPreview = ({ data, updateFormat }) => {
  const printRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    setDownloading(true);
    const originalWidth = element.style.width;

    try {
      element.style.width = '794px';
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 794,
        scrollX: 0,
        scrollY: -window.scrollY,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      const pageOverflowTolerance = 2;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > pageOverflowTolerance) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(getPdfFileName(data.personal.fullName));
    } catch (error) {
      console.error('Erreur PDF', error);
      alert('Erreur lors de la génération du PDF.');
    } finally {
      element.style.width = originalWidth;
      setDownloading(false);
    }
  };

  const renderFormat = () => {
    const SelectedFormat = FORMAT_COMPONENTS[data.format] ?? Format1;
    return <SelectedFormat data={data} />;
  };

  return (
    <div className="cv-preview-root">
      <div className="cv-controls-bar">
        <div className="cv-controls-left">
          <LayoutTemplate size={20} aria-hidden="true" />
          <label className="sr-only" htmlFor="cv-format">Modèle de CV</label>
          <select
            id="cv-format"
            value={data.format}
            onChange={(event) => updateFormat(event.target.value)}
            className="cv-format-select"
          >
            {FORMAT_OPTIONS.map((format) => (
              <option key={format.value} value={format.value}>
                {format.label}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="cv-download-btn" onClick={downloadPDF} disabled={downloading}>
          <Download size={18} aria-hidden="true" />
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
