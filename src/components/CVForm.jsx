import { Briefcase, Camera, GraduationCap, Plus, RotateCcw, Trash2, User, Wrench } from 'lucide-react';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const CVForm = ({
  data,
  updatePersonal,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  updateSkills,
  resetData,
  updateProfileType,
}) => {
  const isStudentProfile = data.profileType === 'student';

  const handlePersonalChange = (event) => {
    updatePersonal(event.target.name, event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      alert('La photo doit faire moins de 2 Mo.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updatePersonal('profileImage', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-panel">
      <div className="form-header">
        <div>
          <p className="eyebrow">Éditeur</p>
          <h2>Votre contenu</h2>
        </div>
        <button type="button" className="icon-text-btn" onClick={resetData}>
          <RotateCcw size={16} aria-hidden="true" />
          Exemple
        </button>
      </div>

      <div className="form-body">
        <section className="form-section">
          <div className="form-section-title">
            <User size={20} aria-hidden="true" />
            Type de CV
          </div>
          <div className="profile-type-switch" role="group" aria-label="Type de parcours">
            <button
              type="button"
              className={isStudentProfile ? 'is-active' : ''}
              onClick={() => updateProfileType('student')}
            >
              Etudiant / debutant
              <span>Stage, alternance, premier emploi</span>
            </button>
            <button
              type="button"
              className={!isStudentProfile ? 'is-active' : ''}
              onClick={() => updateProfileType('experienced')}
            >
              Profil experimente
              <span>Parcours, impact, responsabilites</span>
            </button>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-title">
            <User size={20} aria-hidden="true" />
            Informations personnelles
          </div>

          <div className="form-group">
            <label className="label">Photo de profil</label>
            <div className="photo-upload-row">
              {data.personal.profileImage && (
                <img
                  src={data.personal.profileImage}
                  alt="Aperçu de la photo de profil"
                  className="profile-thumb"
                />
              )}
              <label className="upload-btn">
                <Camera size={18} aria-hidden="true" />
                <span>Choisir une photo</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>
              {data.personal.profileImage && (
                <button
                  type="button"
                  onClick={() => updatePersonal('profileImage', null)}
                  className="link-danger"
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="fullName">Nom complet</label>
            <input
              id="fullName"
              name="fullName"
              value={data.personal.fullName}
              onChange={handlePersonalChange}
              className="input-field"
              placeholder="Ex: Jean Dupont"
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="jobTitle">Titre professionnel</label>
            <input
              id="jobTitle"
              name="jobTitle"
              value={data.personal.jobTitle}
              onChange={handlePersonalChange}
              className="input-field"
              placeholder="Ex: Développeur web"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={data.personal.email}
              onChange={handlePersonalChange}
              className="input-field"
              placeholder="jean@example.com"
              type="email"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="phone">Téléphone</label>
            <input
              id="phone"
              name="phone"
              value={data.personal.phone}
              onChange={handlePersonalChange}
              className="input-field"
              placeholder="+33 6 12 34 56 78"
              autoComplete="tel"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="location">Localisation</label>
            <input
              id="location"
              name="location"
              value={data.personal.location}
              onChange={handlePersonalChange}
              className="input-field"
              placeholder="Paris, France"
              autoComplete="address-level2"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="summary">
              {isStudentProfile ? 'Objectif de stage / profil' : 'Résumé professionnel'}
            </label>
            <textarea
              id="summary"
              name="summary"
              value={data.personal.summary}
              onChange={handlePersonalChange}
              className="input-field"
              placeholder="Une courte présentation de votre profil..."
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-title">
            <Briefcase size={20} aria-hidden="true" />
            {isStudentProfile ? 'Stages, projets et expériences' : 'Expérience professionnelle'}
          </div>

          {data.experience.map((exp) => (
            <div key={exp.id} className="repeated-item">
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeExperience(exp.id)}
                aria-label="Supprimer cette expérience"
                title="Supprimer"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
              <div className="form-group repeated-first-field">
                <label className="label">{isStudentProfile ? 'Projet / stage / rôle' : 'Poste'}</label>
                <input
                  value={exp.title}
                  onChange={(event) => updateExperience(exp.id, 'title', event.target.value)}
                  className="input-field"
                  placeholder={isStudentProfile ? 'Projet académique, stage, bénévolat...' : 'Développeur Frontend'}
                />
              </div>
              <div className="form-group">
                <label className="label">{isStudentProfile ? 'École / structure / contexte' : 'Entreprise'}</label>
                <input
                  value={exp.company}
                  onChange={(event) => updateExperience(exp.id, 'company', event.target.value)}
                  className="input-field"
                  placeholder={isStudentProfile ? 'Université, association, entreprise...' : 'TechCorp'}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="label">Date de début</label>
                  <input
                    value={exp.startDate}
                    onChange={(event) => updateExperience(exp.id, 'startDate', event.target.value)}
                    className="input-field"
                    placeholder="Jan 2020"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Date de fin</label>
                  <input
                    value={exp.endDate}
                    onChange={(event) => updateExperience(exp.id, 'endDate', event.target.value)}
                    className="input-field"
                    placeholder="Aujourd'hui"
                  />
                </div>
              </div>
              <div className="form-group mb-0">
                <label className="label">{isStudentProfile ? 'Ce que vous avez appris ou réalisé' : 'Missions principales'}</label>
                <textarea
                  value={exp.description}
                  onChange={(event) => updateExperience(exp.id, 'description', event.target.value)}
                  className="input-field input-field-small"
                  placeholder={isStudentProfile ? 'Technos utilisées, rôle dans le projet, résultat...' : 'Ce que vous avez réalisé, amélioré ou livré...'}
                />
              </div>
            </div>
          ))}

          <button type="button" className="btn-outline full-width-btn" onClick={addExperience}>
            <Plus size={18} aria-hidden="true" />
            {isStudentProfile ? 'Ajouter un projet ou stage' : 'Ajouter une expérience'}
          </button>
        </section>

        <section className="form-section">
          <div className="form-section-title">
            <GraduationCap size={20} aria-hidden="true" />
            Formation
          </div>

          {data.education.map((edu) => (
            <div key={edu.id} className="repeated-item">
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeEducation(edu.id)}
                aria-label="Supprimer cette formation"
                title="Supprimer"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
              <div className="form-group repeated-first-field">
                <label className="label">Diplôme / titre</label>
                <input
                  value={edu.degree}
                  onChange={(event) => updateEducation(edu.id, 'degree', event.target.value)}
                  className="input-field"
                  placeholder="Licence Informatique"
                />
              </div>
              <div className="form-group">
                <label className="label">Établissement</label>
                <input
                  value={edu.school}
                  onChange={(event) => updateEducation(edu.id, 'school', event.target.value)}
                  className="input-field"
                  placeholder="Université Paris"
                />
              </div>
              <div className="form-group mb-0">
                <label className="label">Année d'obtention</label>
                <input
                  value={edu.year}
                  onChange={(event) => updateEducation(edu.id, 'year', event.target.value)}
                  className="input-field"
                  placeholder="2019"
                />
              </div>
            </div>
          ))}

          <button type="button" className="btn-outline full-width-btn" onClick={addEducation}>
            <Plus size={18} aria-hidden="true" />
            Ajouter une formation
          </button>
        </section>

        <section className="form-section form-section-last">
          <div className="form-section-title">
            <Wrench size={20} aria-hidden="true" />
            Compétences
          </div>
          <div className="form-group">
            <label className="label" htmlFor="skills">Compétences séparées par des virgules</label>
            <textarea
              id="skills"
              value={data.skills}
              onChange={(event) => updateSkills(event.target.value)}
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
