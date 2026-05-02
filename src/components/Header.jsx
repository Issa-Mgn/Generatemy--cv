import { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';

const GithubLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.95c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92v2.8c0 .28.18.6.69.5A10.08 10.08 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
    />
  </svg>
);

const Header = ({ currentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#home" className="logo" aria-label="Retour à l'accueil">
          <FileText size={28} aria-hidden="true" />
          <span>GenerateMy<span>CV</span></span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(open => !open)}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>

        <nav id="main-navigation" className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
          <a className={`nav-link ${currentPage === 'home' ? 'is-active' : ''}`} href="#home" onClick={closeMenu}>
            Accueil
          </a>
          <a className={`nav-link ${currentPage === 'editor' ? 'is-active' : ''}`} href="#editor" onClick={closeMenu}>
            Éditeur
          </a>
          <a
            href="https://github.com/Issa-Mgn/Generatemy--cv.git"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary nav-github"
            onClick={closeMenu}
          >
            <GithubLogo />
            <span className="nav-github-text">
              <span>Code source</span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
