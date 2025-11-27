import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Guide } from './pages/Guide';
import { Events } from './pages/Events';
import { MapPlanner } from './pages/MapPlanner';
import { PageView, LanguageCode } from './types';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [language, setLanguage] = useState<LanguageCode>('en');

  const renderPage = () => {
    switch (currentPage) {
      case PageView.HOME:
        return <Home navigate={setCurrentPage} />;
      case PageView.EXPLORE:
        return <Explore />;
      case PageView.GUIDE:
        return <Guide />; // Guide component might need updating to accept language if strict props, but currently it handles internal state or we can pass language prop if we update Guide
      case PageView.EVENTS:
        return <Events language={language} />;
      case PageView.MAP:
        return <MapPlanner language={language} />;
      default:
        return <Home navigate={setCurrentPage} />;
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen">
      {/* We can pass language to specific pages that need it via props in renderPage */}
      {renderPage()}
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
