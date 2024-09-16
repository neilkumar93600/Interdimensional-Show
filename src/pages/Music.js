import React, { useState } from 'react';
import RetroDiskPlayer from './RetroDiskPlayer'; // Import the new RetroDiskPlayer component
import music from '../asset/1215608_72.jpg';

const API_KEY = 'AIzaSyA6SbYDTrXqjh1kmElr5PonW9tCzzkawvk'; // Replace with your actual API key
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const Music = () => {
  const [mode, setMode] = useState('custom');
  const [lyrics, setLyrics] = useState('');
  const [style, setStyle] = useState('');
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [generatedTrack, setGeneratedTrack] = useState(null);

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleCreate = () => {
    console.log('Creating music with the following details:');
    console.log({ mode, lyrics, style, title, isPublic });

    const newTrack = {
      title: title || 'Generated Song',
      artist: 'AI Composer',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Use a known working URL
      image: music,
    };
    setGeneratedTrack(newTrack);
  };

  const handleRandomLyrics = async () => {
    try {
      const prompt = 'Generate random lyrics for a song';
      const result = await model.generateContent(prompt);
      const randomLyrics = result.response.text();
      setLyrics(randomLyrics);
    } catch (error) {
      console.error('Error generating random lyrics:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 via-purple-300 to-purple-100 p-10 flex justify-center items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white/30 shadow-lg rounded-lg overflow-hidden p-8">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-purple-600 mb-6">AI Music Generation</h1>
          <p className="text-gray-400 mb-6">Input description or lyrics to make music with one click</p>

          {/* Mode Selection */}
          <div className="mb-4">
            <p className="font-semibold text-gray-600 mb-2">Mode</p>
            <div className="flex items-center space-x-4">
              <button
                className={`py-2 px-4 rounded-lg ${mode === 'custom' ? 'bg-purple-600 text-white' : 'bg-gray-700'}`}
                onClick={() => handleModeChange('custom')}
              >
                Custom
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${mode === 'instrumental' ? 'bg-purple-600 text-white' : 'bg-gray-700'}`}
                onClick={() => handleModeChange('instrumental')}
              >
                Instrumental
              </button>
            </div>
          </div>

          {/* Lyrics Input */}
          <div className="mb-4">
            <p className="font-semibold text-gray-600 mb-2">Lyrics</p>
            <textarea
              className="w-full h-24 p-4 bg-white text-gray-500 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Write any lyrics you want. Add [Verse], [Bridge], and [Chorus] tags for additional control..."
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
            />
            <button 
              className="mt-2 text-sm text-purple-700 hover:text-purple-300"
              onClick={handleRandomLyrics}
            >
              Make Random Lyrics
            </button>
          </div>

          {/* Style Input */}
          <div className="mb-4">
            <p className="font-semibold text-gray-600 mb-2">Style</p>
            <input
              type="text"
              className="w-full p-4 bg-white text-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter style of music"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>

          {/* Title Input */}
          <div className="mb-4">
            <p className="font-semibold text-gray-600 mb-2">Title</p>
            <input
              type="text"
              className="w-full p-4 bg-white text-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Public Checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="public"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <label htmlFor="public" className="ml-2 text-gray-700">Make Public</label>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            Create
          </button>
        </div>

        {/* Right Section */}
        <div className="bg-gray-800 p-4 max-h-full rounded-lg shadow-inner overflow-y-auto">
          <nav className="flex space-x-4 justify-center mb-4 text-gray-400">
            <button className="hover:text-purple-400">Introduction</button>
            <button className="hover:text-purple-400">Tags</button>
            <button className="hover:text-purple-400">FAQ</button>
            <button className="hover:text-purple-400">What's New</button>
          </nav>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-4">A Powerful AI Music Generation Tool</h2>
            
            <p className="text-gray-400 text-sm">
              You can generate a song by entering one sentence description or by specifying lyrics. Then click compose to generate a song.
            </p>

            {generatedTrack && (
              <>
                <RetroDiskPlayer image={generatedTrack.image} audioSrc={generatedTrack.audioSrc} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
