import React from 'react';
import Header from './components/Header'
import Hero from './components/Hero';
import Builder from './components/Builder';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Hero />
        <Builder />
      </main>
      <Footer /> 

    </div>
  );
}

export default App;
