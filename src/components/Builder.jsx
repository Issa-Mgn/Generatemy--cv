import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import CVForm from './CVForm';
import CVPreview from './CVPreview';

const STORAGE_KEY = 'generatemycv:data';
const DEFAULT_PROFILE_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="240" height="240" fill="#ADDFF1"/>
  <circle cx="120" cy="92" r="46" fill="#003152"/>
  <path d="M48 220c10-52 45-82 72-82s62 30 72 82" fill="#003152"/>
  <circle cx="104" cy="86" r="6" fill="#ADDFF1"/>
  <circle cx="136" cy="86" r="6" fill="#ADDFF1"/>
  <path d="M102 112c10 10 26 10 36 0" fill="none" stroke="#ADDFF1" stroke-width="8" stroke-linecap="round"/>
</svg>
`)}`;

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createStudentSampleData = () => ({
  profileType: 'student',
  personal: {
    fullName: 'MAGENGO Guttembert',
    jobTitle: 'Etudiant en developpement web',
    email: 'guttembertmagengo@gmail.com',
    phone: '+229 01 23 45 67 89',
    location: 'Cotonou, Benin',
    summary:
      "Etudiant motive en developpement web, a la recherche d'un stage pour renforcer mes competences sur des projets concrets. Serieux, curieux et a l'aise avec React, JavaScript et l'integration web.",
    profileImage: DEFAULT_PROFILE_IMAGE,
  },
  experience: [
    {
      id: createId(),
      title: 'Projet academique - Application de gestion',
      company: "Universite d'Abomey-Calavi",
      startDate: '2024',
      endDate: '2025',
      description:
        "Conception d'une interface React, structuration des composants et gestion des donnees cote client pour un projet d'equipe.",
    },
  ],
  education: [
    {
      id: createId(),
      degree: 'Licence en Informatique',
      school: "Universite d'Abomey-Calavi",
      year: '2025',
    },
  ],
  skills: 'JavaScript, React, HTML, CSS, Git, Travail en equipe',
  format: 'format1',
});

const createExperiencedSampleData = () => ({
  profileType: 'experienced',
  personal: {
    fullName: 'MAGENGO Guttembert',
    jobTitle: 'Développeur Full Stack',
    email: 'guttembertmagengo@gmail.com',
    phone: '+229 01 23 45 67 89',
    location: 'Cotonou, Bénin',
    summary:
      "Développeur full stack avec 5 ans d'expérience dans la conception d'applications web fiables. J'aime les interfaces simples, les APIs propres et les produits qui restent faciles à maintenir.",
    profileImage: DEFAULT_PROFILE_IMAGE,
  },
  experience: [
    {
      id: createId(),
      title: 'Développeur Frontend',
      company: 'Tech Innovators',
      startDate: '2020',
      endDate: '2023',
      description:
        "Création de composants React réutilisables, intégration d'APIs REST et amélioration des performances sur les parcours clés.",
    },
  ],
  education: [
    {
      id: createId(),
      degree: 'Master en Informatique',
      school: "Université d'Abomey-Calavi",
      year: '2019',
    },
  ],
  skills: 'JavaScript, React, Node.js, CSS, HTML5, Git',
  format: 'format1',
});

const createSampleData = (profileType = 'student') => (
  profileType === 'experienced' ? createExperiencedSampleData() : createStudentSampleData()
);

const getInitialData = () => {
  const sampleData = createSampleData();

  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return sampleData;

    const parsedData = JSON.parse(savedData);
    return {
      ...sampleData,
      ...parsedData,
      profileType: parsedData.profileType || sampleData.profileType,
      personal: {
        ...sampleData.personal,
        ...parsedData.personal,
      },
      experience: Array.isArray(parsedData.experience) ? parsedData.experience : sampleData.experience,
      education: Array.isArray(parsedData.education) ? parsedData.education : sampleData.education,
    };
  } catch {
    return sampleData;
  }
};

const hasText = (value) => Boolean(value?.trim());

const getCompletionScore = (data) => {
  const checks = [
    hasText(data.personal.fullName),
    hasText(data.personal.jobTitle),
    hasText(data.personal.email),
    hasText(data.personal.phone),
    hasText(data.personal.location),
    hasText(data.personal.summary),
    data.experience.some(exp => hasText(exp.title) && hasText(exp.company)),
    data.education.some(edu => hasText(edu.degree) && hasText(edu.school)),
    hasText(data.skills),
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
};

const Builder = () => {
  const [data, setData] = useState(getInitialData);
  const [savedAt, setSavedAt] = useState(() => new Date());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (updater) => {
    setData(updater);
    setSavedAt(new Date());
  };

  const completionScore = getCompletionScore(data);
  const completionLabel = completionScore >= 85
    ? 'CV presque prêt'
    : completionScore >= 55
      ? 'Bonne base'
      : 'À compléter';

  const resetData = () => {
    updateData(createSampleData(data.profileType));
  };

  const updateProfileType = (profileType) => {
    updateData(prev => {
      const nextData = createSampleData(profileType);

      return {
        ...nextData,
        format: prev.format,
        personal: {
          ...nextData.personal,
          profileImage: prev.personal.profileImage || DEFAULT_PROFILE_IMAGE,
        },
      };
    });
  };

  const updatePersonal = (field, value) => {
    updateData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const updateFormat = (format) => {
    updateData(prev => ({ ...prev, format }));
  };

  const addExperience = () => {
    updateData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: createId(), title: '', company: '', startDate: '', endDate: '', description: '' },
      ],
    }));
  };

  const updateExperience = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id) => {
    updateData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  };

  const addEducation = () => {
    updateData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: createId(), degree: '', school: '', year: '' },
      ],
    }));
  };

  const updateEducation = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id) => {
    updateData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  const updateSkills = (value) => {
    updateData(prev => ({ ...prev, skills: value }));
  };

  return (
    <section id="builder-section" className="builder-section">
      <div className="container">
        <div className="builder-status">
          <div className="builder-progress-card">
            <div className="builder-progress-top">
              <span>{completionLabel}</span>
              <strong>{completionScore}%</strong>
            </div>
            <div className="builder-progress-track" aria-hidden="true">
              <span style={{ width: `${completionScore}%` }}></span>
            </div>
          </div>

          <div className="builder-save-state">
            <Save size={18} aria-hidden="true" />
            {`Sauvegardé à ${savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
          </div>
        </div>

        <div className="builder-layout">
          <CVForm
            data={data}
            updatePersonal={updatePersonal}
            addExperience={addExperience}
            updateExperience={updateExperience}
            removeExperience={removeExperience}
            addEducation={addEducation}
            updateEducation={updateEducation}
            removeEducation={removeEducation}
            updateSkills={updateSkills}
            resetData={resetData}
            updateProfileType={updateProfileType}
          />
          <CVPreview
            data={data}
            updateFormat={updateFormat}
          />
        </div>
      </div>
    </section>
  );
};

export default Builder;
