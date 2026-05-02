import { Download, FileText } from 'lucide-react';

const ProductDemo = () => {
  return (
    <div className="hero-visual" aria-label="Aperçu animé de l'éditeur" tabIndex={0}>
      <div className="product-demo">
        <div className="demo-toolbar">
          <span></span>
          <span></span>
          <span></span>
          <strong>generate-my-cv.app</strong>
        </div>

        <div className="demo-body">
          <div className="demo-form">
            <div className="demo-form-title">
              <FileText size={18} aria-hidden="true" />
              Contenu
            </div>

            <label>
              Nom complet
              <span className="demo-input">MAGENGO Guttembert</span>
            </label>
            <label>
              Poste
              <span className="demo-input active">Développeur Full Stack</span>
            </label>
            <label>
              Compétences
              <span className="demo-input">React, Node.js, CSS</span>
            </label>
          </div>

          <div className="demo-preview">
            <div className="demo-sheet">
              <div className="sheet-sidebar">
                <span className="sheet-avatar"></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="sheet-content">
                <strong>MAGENGO Guttembert</strong>
                <p>Développeur Full Stack</p>
                <span className="sheet-line long"></span>
                <span className="sheet-line"></span>
                <span className="sheet-line short"></span>
                <div className="sheet-block">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            <div className="demo-export">
              <Download size={16} aria-hidden="true" />
              PDF prêt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDemo;
