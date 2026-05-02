import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/common/BackToTop';
import EditorPage from './pages/EditorPage';
import LandingPage from './pages/LandingPage';
import './App.css';

const getPageFromHash = () => (window.location.hash === '#editor' ? 'editor' : 'home');

function App() {
  const [page, setPage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      const nextPage = getPageFromHash();
      setPage(nextPage);

      window.requestAnimationFrame(() => {
        const hash = window.location.hash.replace('#', '');
        const target = hash ? document.getElementById(hash) : null;

        if (target && hash !== 'home' && hash !== 'editor') {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app-container">
      <Header currentPage={page} />
      <main className="main-content">
        {page === 'editor' ? <EditorPage /> : <LandingPage />}
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
