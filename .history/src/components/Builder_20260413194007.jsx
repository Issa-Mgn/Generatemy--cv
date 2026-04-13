import React, { useState } from 'react';
import CVForm from './CVForm';
import CVPreview from './CVPreview';

const initialData = {
  personal: {
    fullName: 'Jean Dupont',
    jobTitle: 'Développeur Full Stack',
    email: 'jean.dupont@email.com',
    phone: '+229 01 23 45 67 89',
    location: 'Cotonou, Bénin',
    summary: 'Développeur passionné avec plus de 5 ans d\'expérience dans la création d\'applications web robustes et scalables. Expertise en React et Node.js.',
    profileImage: null
  },
  experience: [
    {
      id: Date.now(),
      title: 'Développeur Frontend',
      company: 'Tech Innovators',
      startDate: '2020',
      endDate: '2023',
      description: 'Développement de composants UI réutilisables, optimisation des performances web et intégration d\'APIs REST.'
    }
  ],
  education: [
    {
      id: Date.now() + 1,
      degree: 'Master en Informatique',
      school: 'Université d\'Abomey-Calavi ()',
      year: '2019'
    }
  ],
  skills: 'JavaScript, React, Node.js, CSS, HTML5, Git',
  format: 'format1'
};

const Builder = () => {
  const [data, setData] = useState(initialData);

  const updatePersonal = (field, value) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateFormat = (format) => {
    setData(prev => ({ ...prev, format }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now(), title: '', company: '', startDate: '', endDate: '', description: '' }
      ]
    }));
  };

  const updateExperience = (id, field, value) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), degree: '', school: '', year: '' }
      ]
    }));
  };

  const updateEducation = (id, field, value) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateSkills = (value) => {
    setData(prev => ({ ...prev, skills: value }));
  };

  return (
    <section id="builder-section" className="builder-section">
      <div className="container">
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
