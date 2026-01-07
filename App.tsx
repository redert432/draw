import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Studio } from './pages/Studio';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="font-sans text-slate-900 min-h-screen animated-bg-gradient pt-20">
        <Header />
        <main>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studio" element={<Studio />} />
            </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;