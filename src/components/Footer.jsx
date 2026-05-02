const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Propulsé par{' '}
          <a href="https://litxxcompany.netlify.app" target="_blank" rel="noreferrer">
            L!txx
          </a>
        </p>
        <p className="footer-note">
          &copy; {new Date().getFullYear()} GenerateMyCV. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
