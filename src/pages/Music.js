import React, { useState, useRef, useEffect } from 'react';
import { Music, Mic, Upload, Loader2, Play, Pause, SkipBack, Volume2, VolumeX } from 'lucide-react';

// Audio Player Component
const AudioPlayer = ({ audioUrl, title }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-gray-700 p-4 rounded-lg">
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <img src="/api/placeholder/400/400" alt="Album Art" className="w-48 h-48 rounded-lg shadow-lg" />
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <audio ref={audioRef} src={audioUrl} />
        
        <div className="space-y-2">
          <input
            type="range"
            value={currentTime}
            min={0}
            max={duration || 100}
            step={0.1}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => { audioRef.current.currentTime = 0; }}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <SkipBack className="h-6 w-6" />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </button>
            <input
              type="range"
              value={isMuted ? 0 : volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-purple-400">{title}</h2>
        </div>
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ isChecked, onToggle, label }) => (
  <div className="flex items-center space-x-2">
    <span className="text-gray-300">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={onToggle}
      />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-purple-600 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
    </label>
  </div>
);

// Main Component
const MusicGenerator = () => {
  const [isCustom, setIsCustom] = useState(true);
  const [isInstrumental, setIsInstrumental] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedTrack, setGeneratedTrack] = useState(null);
  const [formData, setFormData] = useState({
    lyrics: '',
    style: '',
    title: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const stylePresets = ['ambient', 'trap', 'dark', 'chill', 'catchy'];

  const generateRandomLyrics = () => {
    const examples = [
      "Walking through the city lights\nDreaming of a better time\nWhen the world was yours and mine",
      "Sunset fading into night\nStars begin to shine so bright\nEverything will be alright",
      "Memories of yesterday\nLike clouds they float away\nBut in my heart they'll stay"
    ];
    const randomLyrics = examples[Math.floor(Math.random() * examples.length)];
    setFormData(prev => ({ ...prev, lyrics: randomLyrics }));
  };

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTrack = {
        title: isCustom ? formData.title || 'Untitled' : 'Generated Track',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      };

      setGeneratedTrack(mockTrack);
    } catch (err) {
      setError('Failed to generate music. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <Modal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        title="Welcome to AI Music Studio"
      >
        <div className="space-y-4 text-gray-300">
          <div className="space-y-2">
            <h3 className="font-semibold">Create Your Music:</h3>
            <p>Choose between custom mode for full creative control or instrumental for quick generation.</p>
          </div>
        </div>
      </Modal>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-purple-400 flex items-center gap-2">
            <Music className="h-8 w-8" />
            AI Music Studio
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-gray-200 hover:bg-gray-600">
            <Upload className="h-4 w-4" />
            Upload Audio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex justify-between mb-4">
              <ToggleSwitch
                isChecked={isCustom}
                onToggle={() => setIsCustom(!isCustom)}
                label="Custom"
              />
              <ToggleSwitch
                isChecked={isInstrumental}
                onToggle={() => setIsInstrumental(!isInstrumental)}
                label="Instrumental"
              />
            </div>

            {isCustom ? (
              <>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Lyrics</label>
                  <textarea
                    name="lyrics"
                    value={formData.lyrics}
                    onChange={handleInputChange}
                    className="w-full h-32 bg-gray-700 text-gray-200 rounded-lg p-4 resize-none"
                    placeholder="Enter your lyrics..."
                    maxLength={3000}
                  />
                  <div className="flex justify-between mt-2">
                    <button 
                      onClick={generateRandomLyrics}
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      Generate Random Lyrics
                    </button>
                    <span className="text-sm text-gray-400">
                      {formData.lyrics.length}/3000
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Style</label>
                  <div className="space-y-3">
                    <input
                      name="style"
                      value={formData.style}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-gray-200 rounded-lg p-4"
                      placeholder="Enter music style..."
                    />
                    <div className="flex gap-2 flex-wrap">
                      {stylePresets.map(style => (
                        <button
                          key={style}
                          onClick={() => setFormData(prev => ({ ...prev, style }))}
                          className="px-4 py-2 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600"
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-gray-200 rounded-lg p-4"
                    placeholder="Enter track title..."
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-gray-300 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full h-32 bg-gray-700 text-gray-200 rounded-lg p-4 resize-none"
                  placeholder="Describe the music you want to create..."
                  maxLength={200}
                />
                <div className="text-right mt-2">
                  <span className="text-sm text-gray-400">
                    {formData.description.length}/200
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5" />
                  Generate Music
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center">
            {generatedTrack ? (
              <AudioPlayer 
                audioUrl={generatedTrack.audioUrl}
                title={generatedTrack.title}
              />
            ) : (
              <div className="text-center text-gray-400">
                <Music className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Generated music will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicGenerator;