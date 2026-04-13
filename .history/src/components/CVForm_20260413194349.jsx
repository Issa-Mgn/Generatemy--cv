import React from 'react';
import { User, Briefcase, GraduationCap, Wrench, Plus, Trash2, Camera } from 'lucide-react';

const CVForm = ({
  data,
  updatePersonal,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  updateSkills
}) => {

  const handlePersonalChange = (e) => {
    updatePersonal(e.target.name, e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-panel">
      <div className="form-header">
        <h2>Entrez vos informations</h2>
      </div>
      
      <div className="form-body">
        
        {/* Personal Info Section */}
        <section className="form-section">
          <div className="form-section-title">
            <User size={20} color="#2563EB" />
            Informations Personnelles
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
            <label className="label">Photo de profil</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {data.personal.profileImage && (
                <img 
                  src={data.personal.profileImage} 
                  alt="Profile" 
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563EB' }} 
                />
              )}
              <label style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', 
                padding: '8px 16px', backgroundColor: '#F1F5F9', 
                color: '#334155', borderRadius: '6px', cursor: 'pointer',
                fontSize: '14px', fontWeight: '500', transition: 'all 0.2s',
                border: '1px solid #CBD5E1'
              }}>
                <Camera size={18} />
                <span>Sélectionner une photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  style={{ display: 'none' }} 
                />
              </label>
              {data.personal.profileImage && (
                <button 
                  type="button"
                  onClick={() => updatePersonal('profileImage', null)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="label">Nom complet</label>
            <input name="fullName" value={data.personal.fullName} onChange={handlePersonalChange} className="input-field" placeholder="Ex: Jean Dupont" />
          </div>
          <div className="form-group">
            <label className="label">Titre professionnel</label>
            <input name="jobTitle" value={data.personal.jobTitle} onChange={handlePersonalChange} className="input-field" placeholder="Ex: Développeur Web" />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input name="email" value={data.personal.email} onChange={handlePersonalChange} className="input-field" placeholder="jean@example.com" type="email" />
          </div>
          <div className="form-group">
            <label className="label">Téléphone</label>
            <input name="phone" value={data.personal.phone} onChange={handlePersonalChange} className="input-field" placeholder="+33 6 12 34 56 78" />
          </div>
          <div className="form-group">
            <label className="label">Localisation</label>
            <input name="location" value={data.personal.location} onChange={handlePersonalChange} className="input-field" placeholder="Paris, France" />
          </div>
          <div className="form-group">
            <label className="label">Résumé / Objectif</label>
            <textarea name="summary" value={data.personal.summary} onChange={handlePersonalChange} className="input-field" placeholder="Une brève description de vous..." />
          </div>
        </section>

        {/* Experience Section */}
        <section className="form-section">
          <div className="form-section-title">
            <Briefcase size={20} color="#2563EB" />
            Expérience Professionnelle
          </div>
          
          {data.experience.map((exp, ) => (
            <div key={exp.id} className="repeated-item">
              <button className="remove-btn" onClick={() => removeExperience(exp.id)} title="Supprimer">
                <Trash2 size={16} />
              </button>
              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="label">Poste</label>
                <input value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} className="input-field" placeholder="Développeur Frontend" />
              </div>
              <div className="form-group">
                <label className="label">Entreprise</label>
                <input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="input-field" placeholder="TechCorp" />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="label">Date de début</label>
                  <input value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className="input-field" placeholder="Jan 2020" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="label">Date de fin</label>
                  <input value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className="input-field" placeholder="Présent" />
                </div>
              </div>
              <div className="form-group mb-0">
                <label className="label">Description des missions</label>
                <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="input-field" placeholder="Réalisation de..." style={{ minHeight: '80px' }} />
              </div>
            </div>
          ))}
          
          <button className="btn-outline" style={{ width: '100%' }} onClick={addExperience}>
            <Plus size={18} />
            Ajouter une expérience
          </button>
        </section>

        {/* Education Section */}
        <section className="form-section">
          <div className="form-section-title">
            <GraduationCap size={20} color="#2563EB" />
            Formation
          </div>
          
          {data.education.map((edu, index) => (
            <div key={edu.id} className="repeated-item">
              <button className="remove-btn" onClick={() => removeEducation(edu.id)} title="Supprimer">
                <Trash2 size={16} />
              </button>
              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="label">Diplôme / Titre</label>
                <input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="input-field" placeholder="Licence Informatique" />
              </div>
              <div className="form-group">
                <label className="label">Établissement</label>
                <input value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} className="input-field" placeholder="Université Paris" />
              </div>
              <div className="form-group mb-0">
                <label className="label">Année d'obtention</label>
                <input value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} className="input-field" placeholder="2019" />
              </div>
            </div>
          ))}

          <button className="btn-outline" style={{ width: '100%' }} onClick={addEducation}>
            <Plus size={18} />
            Ajouter une formation
          </button>
        </section>

        {/* Skills Section */}
        <section className="form-section" style={{ borderBottom: 'none' }}>
          <div className="form-section-title">
            <Wrench size={20} color="#2563EB" />
            Compétences
          </div>
          <div className="form-group">
            <label className="label">Liste de compétences (séparées par des virgules)</label>
            <textarea 
              value={data.skills} 
              onChange={(e) => updateSkills(e.target.value)} 
              className="input-field" 
              placeholder="Ex: JavaScript, Rédaction web, Gestion de projet..."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default CVForm;
