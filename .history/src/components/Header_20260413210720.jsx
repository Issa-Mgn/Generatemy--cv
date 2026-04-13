import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          <FileText size={28} color="#2563EB" />
          <span>GenerateMy<span style={{ color: '#0F172A' }}>CV</span></span>
        </a>
        <nav className="nav">

          <a href="https://github.com/Issa-Mgn/Generatemy--cv.git" target="_blank" rel="noreferrer" className="btn-outline" >
            <span>Code src:GitHub</span>  
            </a>
        </nav>
      </div>  
    </header>
  );
};

export default Header;
