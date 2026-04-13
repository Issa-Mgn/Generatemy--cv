import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, LayoutTemplate } from 'lucide-react';

// Format 1: Left Dark Column (Modern)
const Format1 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ display: 'flex', minHeight: '100%', fontFamily: 'Outfit, sans-serif' }}>
      {/* Left Sidebar */}
      <div style={{ width: '35%', backgroundColor: '#0F172A', color: 'white', padding: '40px 30px' }}>
        {personal.profileImage && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
            <img 
              src={personal.profileImage} 
              alt="Profile" 
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3B82F6' }} 
            />
          </div>
        )}
        <h1 style={{ fontSize: '28px', fontWeight: '800', lineHeight: 1.1, marginBottom: '10px', textAlign: personal.profileImage ? 'center' : 'left',   color: '#F1F5F9' }}>
          {personal.fullName || 'Nom et Prénom'}
        </h1>
        <p style={{ color: '#3B82F6', fontSize: '16px', fontWeight: '600', marginBottom: '30px', letterSpacing: '1px', textAlign: personal.profileImage ? 'center' : 'left' }}>
          {personal.jobTitle || 'Votre Titre'}
        </p>

        <div style={{ marginBottom: '40px', fontSize: '14px', lineHeight: 1.6 }}>
          <h3 style={{ borderBottom: '2px solid #3B82F6', paddingBottom: '5px', marginBottom: '15px' }}>Contact</h3>
          {personal.email && <div style={{ marginBottom: '8px' }}>{personal.email}</div>}
          {personal.phone && <div style={{ marginBottom: '8px' }}>{personal.phone}</div>}
          {personal.location && <div style={{ marginBottom: '8px' }}>{personal.location}</div>}
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ borderBottom: '2px solid #3B82F6', paddingBottom: '5px', marginBottom: '15px' }}>Compétences</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: 1.8 }}>
            {skillsList.map((skill, i) => (
              <li key={i}>• {skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Content */}
      <div style={{ width: '65%', backgroundColor: '#FFFFFF', padding: '40px', color: '#0F172A' }}>
        {personal.summary && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{ color: '#2563EB', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', marginBottom: '10px' }}>Profil</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#334155' }}>
              {personal.summary}
            </p>
          </div>
        )}

        <div style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#2563EB', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', marginBottom: '15px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Expériences</h3>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <strong style={{ fontSize: '16px', color: '#0F172A' }}>{exp.title}</strong>
                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={{ color: '#2563EB', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>{exp.company}</div>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{exp.description}</p>
            </div>
          ))}
        </div>

        <div>
           <h3 style={{ color: '#2563EB', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', marginBottom: '15px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Formation</h3>
           {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                <strong style={{ fontSize: '15px', color: '#0F172A' }}>{edu.degree}</strong>
                <span style={{ fontSize: '13px', color: '#64748B' }}>{edu.year}</span>
              </div>
              <div style={{ color: '#475569', fontSize: '14px' }}>{edu.school}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// Format 2: Minimalist Clean Header
const Format2 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100%', padding: '50px', fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #E2E8F0', paddingBottom: '30px' }}>
        {personal.profileImage && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img 
              src={personal.profileImage} 
              alt="Profile" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
            />
          </div>
        )}
        <h1 style={{ fontSize: '36px', color: '#0F172A', marginBottom: '8px', letterSpacing: '1px' }}>{personal.fullName || 'Votre Nom'}</h1>
        <h2 style={{ fontSize: '18px', color: '#2563EB', fontWeight: '500', marginBottom: '15px' }}>{personal.jobTitle || 'Votre Titre'}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', color: '#64748B' }}>
          <span>{personal.location}</span>
          <span>{personal.phone}</span>
          <span>{personal.email}</span>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <p style={{ textAlign: 'center', fontSize: '15px', lineHeight: 1.6, color: '#334155', maxWidth: '600px', margin: '0 auto' }}>
          {personal.summary}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 2 }}>
          <h3 style={{ fontSize: '18px', color: '#0F172A', borderBottom: '1px solid #cbd5e1', paddingBottom: '8px', marginBottom: '20px' }}>Expérience</h3>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '25px' }}>
              <div style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A' }}>{exp.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0 8px 0', fontSize: '14px' }}>
                <span style={{ color: '#2563EB', fontWeight: '500' }}>{exp.company}</span>
                <span style={{ color: '#64748B' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{exp.description}</p>
            </div>
          ))}

          <h3 style={{ fontSize: '18px', color: '#0F172A', borderBottom: '1px solid #cbd5e1', paddingBottom: '8px', marginBottom: '20px', marginTop: '40px' }}>Formation</h3>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', fontSize: '15px', color: '#0F172A' }}>{edu.degree}</span>
                <span style={{ color: '#64748B', fontSize: '14px' }}>{edu.year}</span>
              </div>
              <div style={{ color: '#475569', fontSize: '14px' }}>{edu.school}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
           <h3 style={{ fontSize: '18px', color: '#0F172A', borderBottom: '1px solid #cbd5e1', paddingBottom: '8px', marginBottom: '20px' }}>Compétences</h3>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
             {skillsList.map((skill, i) => (
               <span key={i} style={{ backgroundColor: '#F1F5F9', color: '#334155', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '500' }}>
                 {skill}
               </span>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// Format 3: Executive Blue Header
const Format3 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100%', fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ backgroundColor: '#1E3A8A', color: 'white', padding: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          {personal.profileImage && (
            <img 
              src={personal.profileImage} 
              alt="Profile" 
              style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover', border: '2px solid #93C5FD' }} 
            />
          )}
          <div>
            <h1 style={{ fontSize: '38px', margin: 0, fontWeight: '800' }}>{personal.fullName || 'Nom'}</h1>
            <h2 style={{ fontSize: '20px', margin: '10px 0 0 0', fontWeight: '400', color: '#93C5FD' }}>{personal.jobTitle}</h2>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '14px', lineHeight: 1.6, color: '#DBEAFE' }}>
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.location}</div>
        </div>
      </div>

      <div style={{ padding: '40px 50px' }}>
        {personal.summary && (
          <div style={{ marginBottom: '30px' }}>
            <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{personal.summary}"
            </p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
          {/* Left Col */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '16px', color: '#1E3A8A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Compétences Cles</h3>
              <ul style={{ paddingLeft: '18px', color: '#475569', fontSize: '14px', lineHeight: 1.8 }}>
                {skillsList.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </div>
            
            <div>
              <h3 style={{ fontSize: '16px', color: '#1E3A8A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Éducation</h3>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A' }}>{edu.degree}</div>
                  <div style={{ color: '#475569', fontSize: '13px', margin: '4px 0' }}>{edu.school}</div>
                  <div style={{ color: '#64748B', fontSize: '12px' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Col */}
          <div>
             <h3 style={{ fontSize: '16px', color: '#1E3A8A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px' }}>Expérience Professionnelle</h3>
             {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '25px' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>{exp.title}</div>
                <div style={{ margin: '5px 0 10px 0', fontSize: '14px', color: '#1E3A8A', fontWeight: '600' }}>{exp.company} <span style={{ color: '#94A3B8', fontWeight: '400' }}>| {exp.startDate} - {exp.endDate}</span></div>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Format 4: Contemporary Split
const Format4 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Col */}
        <div style={{ width: '40%', padding: '40px', backgroundColor: '#F8FAFC' }}>
          {personal.profileImage ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
              <img 
                src={personal.profileImage} 
                alt="Profile" 
                style={{ width: '120px', height: '120px', borderRadius: '20px', objectFit: 'cover', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
              />
            </div>
          ) : (
            <div style={{ width: '100px', height: '100px', backgroundColor: '#2563EB', borderRadius: '20px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '36px', fontWeight: '800', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
              {personal.fullName?.[0] || 'C'}
            </div>
          )}
          <h2 style={{ fontSize: '18px', color: '#0F172A', marginBottom: '20px', borderBottom: '1px solid #CBD5E1', paddingBottom: '10px' }}>Contact</h2>
          <div style={{ fontSize: '14px', color: '#475569', marginBottom: '40px', lineHeight: 1.8 }}>
            <div>{personal.email}</div>
            <div>{personal.phone}</div>
            <div>{personal.location}</div>
          </div>
          
          <h2 style={{ fontSize: '18px', color: '#0F172A', marginBottom: '20px', borderBottom: '1px solid #CBD5E1', paddingBottom: '10px' }}>Formation</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>{edu.degree}</div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>{edu.school} • {edu.year}</div>
            </div>
          ))}

          <h2 style={{ fontSize: '18px', color: '#0F172A', marginBottom: '20px', marginTop: '40px', borderBottom: '1px solid #CBD5E1', paddingBottom: '10px' }}>Aptitudes</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
             {skillsList.map((skill, i) => (
               <div key={i} style={{ border: '1px solid #2563EB', color: '#2563EB', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '500' }}>
                 {skill}
               </div>
             ))}
          </div>
        </div>
        
        {/* Right Col */}
        <div style={{ width: '60%', padding: '50px 40px', backgroundColor: '#ffffff' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#0F172A', lineHeight: 1, marginBottom: '10px' }}>{personal.fullName || 'Votre Nom'}</h1>
          <h3 style={{ fontSize: '20px', color: '#2563EB', fontWeight: '500', marginBottom: '30px' }}>{personal.jobTitle}</h3>
          
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6 }}>{personal.summary}</p>
          </div>

          <h2 style={{ fontSize: '22px', color: '#0F172A', marginBottom: '25px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '30px', height: '2px', backgroundColor: '#2563EB', marginRight: '15px' }}></span>
            Expérience Professionnelle
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #E2E8F0', paddingBottom: '30px' }}>
              <div style={{ position: 'absolute', left: '-6px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2563EB' }}></div>
              <div style={{ fontWeight: '700', fontSize: '17px', color: '#0F172A' }}>{exp.title}</div>
              <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '10px', marginTop: '2px' }}>{exp.company} | {exp.startDate} - {exp.endDate}</div>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Format 5: Classic Centered Elegant
const Format5 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100%', padding: '60px', fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        {personal.profileImage && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img 
              src={personal.profileImage} 
              alt="Profile" 
              style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #CBD5E1', padding: '4px' }} 
            />
          </div>
        )}
        <h1 style={{ fontSize: '32px', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: '600', color: '#0F172A', marginBottom: '10px' }}>{personal.fullName || 'Nom'}</h1>
        <div style={{ fontSize: '14px', color: '#64748B', letterSpacing: '1px', marginBottom: '15px' }}>{personal.jobTitle}</div>
        <div style={{ fontSize: '12px', color: '#475569', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <span>{personal.location}</span>
          <span>•</span>
          <span>{personal.phone}</span>
          <span>•</span>
          <span>{personal.email}</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #CBD5E1', borderBottom: '1px solid #CBD5E1', padding: '20px 0', marginBottom: '30px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#334155', maxWidth: '80%', margin: '0 auto' }}>
          {personal.summary}
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600', color: '#0F172A', marginBottom: '20px', textAlign: 'center' }}>Expérience</h2>
        {experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px dotted #CBD5E1', paddingBottom: '4px', marginBottom: '8px' }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A' }}>{exp.title}, {exp.company}</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>{exp.startDate} – {exp.endDate}</div>
            </div>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginLeft: '10px' }}>• {exp.description}</p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600', color: '#0F172A', marginBottom: '20px', textAlign: 'center' }}>Formation</h2>
        {education.map(edu => (
          <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>{edu.degree} - {edu.school}</div>
            <div style={{ fontSize: '13px', color: '#64748B' }}>{edu.year}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600', color: '#0F172A', marginBottom: '15px', textAlign: 'center' }}>Compétences</h2>
        <div style={{ textAlign: 'center', fontSize: '13px', color: '#334155', lineHeight: 1.8 }}>
          {skillsList.join('  •  ')}
        </div>
      </div>
    </div>
  );
};


// Format 6: Creative Modern (Pastel Accents)
const Format6 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ backgroundColor: '#F0F9FF', minHeight: '100%', fontFamily: 'Outfit, sans-serif', padding: '40px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', minHeight: '1033px' }}>
        <div style={{ height: '180px', background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)', padding: '40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>{personal.fullName || 'Votre Nom'}</h1>
            <p style={{ fontSize: '18px', opacity: 0.9 }}>{personal.jobTitle}</p>
          </div>
          {personal.profileImage && (
            <img 
              src={personal.profileImage} 
              alt="Profile" 
              style={{ width: '120px', height: '120px', borderRadius: '20px', objectFit: 'cover', border: '6px solid rgba(255, 255, 255, 0.2)' }} 
            />
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', padding: '40px' }}>
          <div>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '16px', color: '#6366F1', fontWeight: '700', marginBottom: '15px', textTransform: 'uppercase' }}>Contact</h3>
              <div style={{ fontSize: '14px', color: '#475569', space: '10px' }}>
                <p style={{ marginBottom: '8px' }}> {personal.email}</p>
                <p style={{ marginBottom: '8px' }}> {personal.phone}</p>
                <p> {personal.location}</p>
              </div>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '16px', color: '#6366F1', fontWeight: '700', marginBottom: '15px', textTransform: 'uppercase' }}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skillsList.map((skill, i) => (
                  <span key={i} style={{ backgroundColor: '#EEF2FF', color: '#4338CA', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', color: '#6366F1', fontWeight: '700', marginBottom: '15px', textTransform: 'uppercase' }}>Formation</h3>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#1E293B' }}>{edu.degree}</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>{edu.school}, {edu.year}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '40px' }}>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '18px', color: '#1E293B', fontWeight: '800', marginBottom: '15px' }}>À propos de moi</h3>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, fontStyle: 'italic' }}>{personal.summary}</p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '18px', color: '#1E293B', fontWeight: '800', marginBottom: '20px' }}>Expériences</h3>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#4338CA' }}>{exp.title}</h4>
                    <span style={{ fontSize: '13px', color: '#94A3B8' }}>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>{exp.company}</div>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Format 7: Royal Elegance (Sidebar Right)
const Format7 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ display: 'flex', minHeight: '100%', fontFamily: 'Outfit, sans-serif', backgroundColor: '#FBFCFE' }}>
      <div style={{ width: '65%', padding: '50px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#0F172A', marginBottom: '10px' }}>{personal.fullName || 'Nom'}</h1>
        <h2 style={{ fontSize: '20px', color: '#B45309', fontWeight: '600', marginBottom: '40px' }}>{personal.jobTitle}</h2>
        
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '800', borderBottom: '2px solid #FEF3C7', paddingBottom: '10px', marginBottom: '20px' }}>Expériences Professionnelles</h3>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '17px', color: '#1E293B' }}>{exp.title}</strong>
                <span style={{ fontSize: '13px', color: '#D97706', fontWeight: '700' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#475569', fontWeight: '500', margin: '4px 0 10px 0' }}>{exp.company}</div>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>{exp.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '800', borderBottom: '2px solid #FEF3C7', paddingBottom: '10px', marginBottom: '20px' }}>Formation Académique</h3>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#1E293B' }}>{edu.degree}</div>
              <div style={{ fontSize: '14px', color: '#475569' }}>{edu.school} • {edu.year}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ width: '35%', backgroundColor: '#FFFBEB', padding: '50px 30px', borderLeft: '1px solid #FEF3C7' }}>
        {personal.profileImage && (
          <img 
            src={personal.profileImage} 
            alt="Profile" 
            style={{ width: '100%', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
          />
        )}
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#92400E', marginBottom: '15px' }}>Contact</h3>
          <div style={{ fontSize: '14px', color: '#92400E', lineHeight: 1.8 }}>
            <div>{personal.email}</div>
            <div>{personal.phone}</div>
            <div>{personal.location}</div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#92400E', marginBottom: '15px' }}>Profil</h3>
          <p style={{ fontSize: '13px', color: '#92400E', lineHeight: 1.6, opacity: 0.9 }}>{personal.summary}</p>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#92400E', marginBottom: '15px' }}>Expertise</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {skillsList.map((skill, i) => (
              <div key={i} style={{ fontSize: '14px', color: '#92400E', display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: '#D97706', borderRadius: '50%', marginRight: '10px' }}></span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Format 8: Minimalist Dark Mode
const Format8 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100%', color: '#F9FAFB', fontFamily: 'Inter, sans-serif', padding: '60px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '10px' : }}>{personal.fullName || 'Nom'}</h1>
            <h2 style={{ fontSize: '24px', color: '#60A5FA', fontWeight: '300' }}>{personal.jobTitle}</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', fontSize: '14px', color: '#9CA3AF' }}>
              <span>{personal.email}</span>
              <span>{personal.phone}</span>
              <span>{personal.location}</span>
            </div>
          </div>
          {personal.profileImage && (
            <img 
              src={personal.profileImage} 
              alt="Profile" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #374151' }} 
            />
          )}
        </header>

        <section style={{ marginBottom: '50px' }}>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#D1D5DB' }}>{personal.summary}</p>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#60A5FA', borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '25px' }}>Work Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '35px' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '5px' }}>{exp.title}</div>
                <div style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '12px' }}>{exp.company} // {exp.startDate} – {exp.endDate}</div>
                <p style={{ fontSize: '14px', color: '#9CA3AF', lineHeight: 1.6 }}>{exp.description}</p>
              </div>
            ))}
          </div>
          
          <div>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#60A5FA', borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '25px' }}>Expertise</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
              {skillsList.map((skill, i) => (
                <span key={i} style={{ border: '1px solid #374151', padding: '5px 12px', fontSize: '12px', color: '#E5E7EB' }}>{skill}</span>
              ))}
            </div>

            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#60A5FA', borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '25px' }}>Education</h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{edu.degree}</div>
                <div style={{ fontSize: '13px', color: '#9CA3AF' }}>{edu.school}, {edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Format 9: Modern Corporate Border
const Format9 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ minHeight: '100%', fontFamily: 'Outfit, sans-serif', padding: '2px', backgroundColor: '#2563EB' }}>
       <div style={{ backgroundColor: 'white', height: '100%', minHeight: '1120px', padding: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '50px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                {personal.profileImage && (
                  <img 
                    src={personal.profileImage} 
                    alt="Profile" 
                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #DBEAFE' }} 
                  />
                )}
                <div>
                   <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#1E40AF', margin: 0 }}>{personal.fullName || 'Nom'}</h1>
                   <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#64748B', marginTop: '5px' }}>{personal.jobTitle}</h2>
                </div>
             </div>
             <div style={{ textAlign: 'right', fontSize: '14px', color: '#64748B' }}>
                <div>{personal.email}</div>
                <div>{personal.phone}</div>
                <div>{personal.location}</div>
             </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#2563EB', fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Professional Summary</h3>
            <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7 }}>{personal.summary}</p>
          </div>

          <div style={{ display: 'flex', gap: '50px' }}>
             <div style={{ flex: 1 }}>
                <h3 style={{ borderBottom: '3px solid #DBEAFE', color: '#1E40AF', paddingBottom: '8px', marginBottom: '20px', fontSize: '18px' }}>Experience</h3>
                {experience.map(exp => (
                  <div key={exp.id} style={{ marginBottom: '30px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{exp.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                      <span style={{ color: '#2563EB', fontWeight: '600', fontSize: '14px' }}>{exp.company}</span>
                      <span style={{ color: '#94A3B8', fontSize: '13px' }}>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{exp.description}</p>
                  </div>
                ))}
             </div>
             <div style={{ width: '250px' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '25px', borderRadius: '15px', marginBottom: '30px' }}>
                  <h3 style={{ color: '#1E40AF', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Top Skills</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {skillsList.map((skill, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#2563EB', marginRight: '10px' }}></div>
                        <span style={{ fontSize: '14px', color: '#334155' }}>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 style={{ color: '#1E40AF', fontSize: '16px', fontWeight: '700', marginBottom: '15px' }}>Education</h3>
                {education.map(edu => (
                  <div key={edu.id} style={{ marginBottom: '15px' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#1E293B' }}>{edu.degree}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>{edu.school}</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>{edu.year}</div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

// Format 10: Modern Luxury (Ethereal)
const Format10 = ({ data }) => {
  const { personal, experience, education, skills } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100%', fontFamily: 'Outfit, sans-serif' }}>
       {/* Top Design Header */}
       <div style={{ height: '240px', backgroundColor: '#0F172A', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '0 60px 40px 60px' }}>
          <div style={{ position: 'absolute', top: 30, right: 60, color: 'rgba(255,255,255,0.1)', fontSize: '100px', fontWeight: '900', userSelect: 'none', pointerEvents: 'none' }}>RESUME</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', zIndex: 1 }}>
             {personal.profileImage && (
               <img 
                 src={personal.profileImage} 
                 alt="Profile" 
                 style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', border: '8px solid white', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} 
               />
             )}
             <div style={{ color: '#ffffff' }}>
                <h1 style={{ fontSize: '42px', fontWeight: '800', margin: 0,color: '#ffffff', letterSpacing: '-1px' }}>{personal.fullName || 'Candidat'}</h1>
                <h2 style={{ fontSize: '20px', color: '#3B82F6', fontWeight: '500', margin: '5px 0 0 0' }}>{personal.jobTitle}</h2>
             </div>
          </div>
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '60px', padding: '60px 60px 60px 60px' }}>
          {/* Left Side: Info & Skills */}
          <div>
             <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', borderLeft: '4px solid #3B82F6', paddingLeft: '15px' }}>Contact</h3>
                <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
                   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ color: '#3B82F6', marginRight: '10px' }}></span> {personal.email}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ color: '#3B82F6', marginRight: '10px' }}></span> {personal.phone}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#3B82F6', marginRight: '10px' }}></span> {personal.location}
                   </div>
                </div>
             </div>

             <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', borderLeft: '4px solid #3B82F6', paddingLeft: '15px' }}>Compétences</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                   {skillsList.map((skill, i) => (
                     <span key={i} style={{ backgroundColor: '#E2E8F0', color: '#1E293B', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                       {skill}
                     </span>
                   ))}
                </div>
             </div>

             <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', borderLeft: '4px solid #3B82F6', paddingLeft: '15px' }}>Formation</h3>
                {education.map(edu => (
                  <div key={edu.id} style={{ marginBottom: '20px' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#1E293B' }}>{edu.degree}</div>
                    <div style={{ fontSize: '13px', color: '#64748B', margin: '2px 0' }}>{edu.school}</div>
                    <div style={{ fontSize: '12px', color: '#3B82F6', fontWeight: '600' }}>{edu.year}</div>
                  </div>
                ))}
             </div>
          </div>

          {/* Right Side: Profile & Experience */}
          <div>
             <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Profil Professionnel</h3>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>{personal.summary}</p>
             </div>

             <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '25px' }}>Expériences</h3>
                {experience.map(exp => (
                  <div key={exp.id} style={{ marginBottom: '35px', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                       <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', margin: 0 }}>{exp.title}</h4>
                       <span style={{ fontSize: '12px', backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '4px 10px', borderRadius: '10px', fontWeight: '600' }}>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: '600', margin: '5px 0 12px 0' }}>{exp.company}</div>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{exp.description}</p>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};



const CVPreview = ({ data, updateFormat }) => {
  const printRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    setDownloading(true);
    const element = printRef.current;
    
    // On conserve le style original pour le restaurer après
    const originalWidth = element.style.width;
    
    try {
      // Force la largeur à 794px (largeur A4 standard en px) pour garantir le layout "desktop"
      // même sur mobile lors de la capture.
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
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // On calcule la hauteur de l'image pour qu'elle garde ses proportions
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // On ajoute l'image au PDF en gardant les proportions calculées
      // Si le CV dépasse une page A4, on pourrait ajouter d'autres pages,
      // mais ici on garde une seule page pour le format standard du CV.
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      
      pdf.save(`CV_${data.personal.fullName?.replace(/\s+/g, '_') || 'Mon_CV'}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF', error);
      alert("Une erreur est survenue lors de la création du PDF.");
    } finally {
      // On restaure la largeur originale
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
    <div className="preview-panel">
      <div className="preview-actions">
        <div className="format-selector">
          <LayoutTemplate size={20} color="#64748B" />
          <select value={data.format} onChange={(e) => updateFormat(e.target.value)}>
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
        
        <button 
          className="btn-primary" 
          onClick={downloadPDF} 
          disabled={downloading}
          style={{ padding: '10px 20px' }}
        >
          <Download size={18} />
          {downloading ? 'Génération...' : 'Télécharger PDF'}
        </button>
      </div>

      <div className="preview-wrapper">
        <div className="cv-document-container">
          {/* We attach the ref to this inner wrapper that will be captured */}
          <div ref={printRef} style={{ width: '100%', height: '100%', minHeight: '1123px' }}>
            {renderFormat()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
