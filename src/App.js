import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Music from './pages/Music';
import ComedyShow from './pages/ComedyShow';
import Mixes from './pages/Mixes';
import NewReleases from './pages/NewReleases';
import Library from './pages/Library';
import TwentyFourHourShow from './pages/TwentyFourHourShow';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/comedy" element={<ComedyShow />} />
          <Route path="/mixes" element={<Mixes />} />
          <Route path="/new-releases" element={<NewReleases />} />
          <Route path="/library" element={<Library />} />
          <Route path="/24h-show" element={<TwentyFourHourShow />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
