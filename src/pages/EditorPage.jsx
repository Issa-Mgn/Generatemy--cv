import { Clock } from 'lucide-react';
import Builder from '../components/Builder';

const editorSteps = ['Remplir', 'Prévisualiser', 'Télécharger'];

const EditorPage = () => {
  return (
    <div className="editor-page">
      <section className="editor-hero">
        <div className="container editor-hero-inner">
          <div>
            <p className="page-tag">Éditeur</p>
            <h1>Construisez votre CV sans quitter l’aperçu.</h1>
            <p>
              Complétez les champs à gauche, vérifiez le rendu à droite, puis exportez quand tout est prêt.
            </p>
            <div className="editor-steps" aria-label="Étapes de création">
              {editorSteps.map((step, index) => (
                <span key={step}>{index + 1}. {step}</span>
              ))}
            </div>
          </div>

          <div className="editor-note">
            <Clock size={18} aria-hidden="true" />
            Le brouillon reste dans ce navigateur.
          </div>
        </div>
      </section>

      <Builder />
    </div>
  );
};

export default EditorPage;
