import { ArrowRight, CheckCircle } from 'lucide-react';
import ProductDemo from '../components/landing/ProductDemo';
import TemplateCarousel from '../components/landing/TemplateCarousel';

const proofItems = [
  'Sans compte obligatoire',
  'Brouillon gardé localement',
  'PDF prêt à envoyer',
];

const details = [
  {
    title: 'On écrit d’abord.',
    text: 'Le formulaire suit l’ordre naturel d’un CV, sans champs cachés partout.',
  },
  {
    title: 'On regarde tout de suite.',
    text: 'L’aperçu sert de repère pendant la saisie. Pas besoin d’exporter dix fois pour vérifier.',
  },
  {
    title: 'On garde ça propre.',
    text: 'Les modèles restent sobres, parce qu’un CV doit surtout se lire vite.',
  },
];

const exportChecklist = [
  'Relire le titre du poste et le résumé',
  'Garder les expériences les plus pertinentes',
  'Exporter seulement quand le modèle reste lisible sur une page',
];

const LandingPage = () => {
  return (
    <>
      <section className="landing-hero">
        <div className="container landing-hero-layout">
          <div className="landing-copy">
            <h1>Votre CV, clair et prêt avant d’envoyer la candidature.</h1>
            <p className="landing-lead">
              Un petit outil pour écrire le contenu, choisir une mise en page sobre et télécharger un PDF sans se battre avec l’alignement.
            </p>

            <div className="landing-actions">
              <a className="btn-primary" href="#editor">
                Ouvrir l’éditeur
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="btn-secondary" href="#templates">
                Voir les modèles
              </a>
            </div>

            <ul className="landing-proof" aria-label="Points clés">
              {proofItems.map((item) => (
                <li key={item}>
                  <CheckCircle size={18} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <ProductDemo />
        </div>
      </section>

      <section className="landing-section">
        <div className="container split-section">
          <div className="section-copy">
            <p className="page-tag">Approche</p>
            <h2>Pas une usine. Juste ce qu’il faut pour finaliser un CV.</h2>
          </div>

          <div className="detail-list">
            {details.map((item) => (
              <article key={item.title} className="detail-row">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="landing-section muted-section">
        <div className="container split-section">
          <div className="section-copy">
            <p className="page-tag">Modèles</p>
            <h2>Des bases visuelles simples, faciles à assumer.</h2>
            <p>
              Chaque modèle garde la même logique de lecture: identité, contact, profil, parcours, compétences.
            </p>
          </div>

          <TemplateCarousel />
        </div>
      </section>

      <section className="landing-section checklist-section">
        <div className="container split-section">
          <div className="section-copy">
            <p className="page-tag">Avant export</p>
            <h2>Quelques vérifications simples avant d’envoyer.</h2>
          </div>

          <div className="export-checklist">
            {exportChecklist.map((item) => (
              <div key={item} className="export-check-item">
                <CheckCircle size={18} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div className="container landing-cta-inner">
          <div>
            <p className="page-tag">Prêt</p>
            <h2>Commencez avec l’exemple, puis remplacez par votre parcours.</h2>
          </div>
          <a className="btn-primary" href="#editor">
            Ouvrir l’éditeur
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
