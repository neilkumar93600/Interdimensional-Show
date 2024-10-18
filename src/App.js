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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;