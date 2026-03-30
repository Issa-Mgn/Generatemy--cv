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
        <h1 style={{ fontSize: '28px', fontWeight: '800', lineHeight: 1.1, marginBottom: '10px', textAlign: personal.profileImage ? 'center' : 'left' }}>
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
