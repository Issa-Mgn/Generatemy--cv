import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToBuilder = () => {
    document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="container">
        <h1>
          Créez votre <span>CV Parfait</span> en <br />quelques clics
        </h1>
        <p>
          Démarquez-vous avec un design ultra classe, pensé pour l'impact visuel et structuré de manière professionnelle. Choisissez parmi nos 5 modèles exceptionnels et téléchargez votre CV en PDF.
        </p>
        <button className="btn-primary" onClick={scrollToBuilder}>
          <Sparkles size={20} />
          <span>Commencer maintenant</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
