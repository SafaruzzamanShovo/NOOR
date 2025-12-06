import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Read from './pages/Read';
import AITeacher from './pages/AITeacher';
import Emotions from './pages/Emotions';
import Hifz from './pages/Hifz';
import Settings from './pages/Settings';
import PrayerTimes from './pages/PrayerTimes';
import Dua from './pages/Dua';
import Library from './pages/Library';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read" element={<Read />} />
          <Route path="/ai-teacher" element={<AITeacher />} />
          <Route path="/emotions" element={<Emotions />} />
          <Route path="/hifz" element={<Hifz />} />
          <Route path="/prayers" element={<PrayerTimes />} />
          <Route path="/dua" element={<Dua />} />
          <Route path="/library" element={<Library />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<div className="p-10 text-center text-gray-500">Page not found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
