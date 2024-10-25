import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Music from './pages/Music';
import ComedyShow from './pages/ComedyShow';
import TwentyFourHourShow from './pages/TwentyFourHourShow';
import ForgetPassword from './pages/forgot-password';
import Signup from './pages/signup';
import Login from './pages/login';
import Musichomepage from './pages/music-homepage';
import Comedystudio from './pages/comedy-studio';
import FifteenReel from './pages/15-Reel';  // Import the 15-Reel component
import LoFiPage from './pages/LoFiPage';
import SongCreation from './pages/song-creation';
import CustomSongGenerator from './pages/custom-song-generator';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/comedy" element={<ComedyShow />} />
            <Route path="/24h-show" element={<TwentyFourHourShow />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Musichomepage" element={<Musichomepage />} />
            <Route path="/Comedylab" element={<Comedystudio />} />
            <Route path="/15-reel" element={<FifteenReel />} />
            <Route path="/lofi-converter" element={<LoFiPage />} />
            <Route path="/song-creation" element={<SongCreation />} />
            <Route path="/custom-song" element={<CustomSongGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
