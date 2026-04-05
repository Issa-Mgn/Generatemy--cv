import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Powered By <a href="https://litxxcompany.netlify.app" style={{ color: "#2563EB", textDecoration: "none" }} target="_blank" rel="noreferrer">L!txx</a> .
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} GenerateMyCV. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
