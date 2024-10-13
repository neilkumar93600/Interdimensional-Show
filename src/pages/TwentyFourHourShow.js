import React, { useState, useEffect } from 'react';
import { 
  FaPlay, FaPause, FaVolumeUp, FaHeart, FaShare, 
  FaPaperPlane, FaGlobe, FaUser
} from 'react-icons/fa';

const INITIAL_STATE = {
  streams: {
    comedy: {
      title: 'Comedy 24/7',
      activeUsers: 324,
      isLive: true,
      currentShow: {
        title: 'Stand-up Hour',
        host: 'John Smith',
        startTime: '10:00 AM',
        endTime: '11:00 AM',
        description: 'Non-stop laughter with our top comedians!',
        viewers: 324,
        likes: 1245,
        shares: 387,
        videoUrl: 'https://example.com/comedy-stream.mp4'
      },
      upNext: {
        title: 'Comedy Central',
        host: 'Sarah Johnson',
        startTime: '11:00 AM',
        trailerUrl: 'https://example.com/comedy-central-trailer.mp4'
      },
      chatMessages: [
        { id: 1, user: 'ComedyFan123', message: 'This show is hilarious! 😂', timestamp: '10:15 AM' },
        { id: 2, user: 'LaughTracker', message: "Can't stop laughing!", timestamp: '10:16 AM' },
        { id: 3, user: 'JokesMaster', message: 'The host is on fire today! 🔥', timestamp: '10:18 AM' }
      ]
    },
    music: {
      title: 'Music 24/7',
      activeUsers: 567,
      isLive: true,
      currentShow: {
        title: 'Morning Beats',
        host: 'DJ Mike',
        startTime: '9:00 AM',
        endTime: '12:00 PM',
        description: 'Wake up to the best beats in town!',
        viewers: 567,
        likes: 2389,
        shares: 942,
        videoUrl: 'https://example.com/music-stream.mp4'
      },
      upNext: {
        title: 'Jazz Hour',
        host: 'The Smooth Quartet',
        startTime: '12:00 PM',
        trailerUrl: 'https://example.com/jazz-hour-trailer.mp4'
      },
      chatMessages: [
        { id: 1, user: 'MusicLover', message: '🎵 This track is fire!', timestamp: '9:15 AM' },
        { id: 2, user: 'BeatMaster', message: 'Perfect vibes for working', timestamp: '9:17 AM' },
        { id: 3, user: 'RhythmKing', message: 'DJ Mike never disappoints! 🎧', timestamp: '9:20 AM' }
      ]
    }
  }
};

const VideoPlayer = ({ stream, isPlaying, onPlayPause, volume, onVolumeChange }) => {
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={stream.currentShow.videoUrl}
        playsInline
        autoPlay
        muted
        loop
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center space-x-4">
          <button onClick={onPlayPause} className="text-white">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className="flex-1">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value="50" 
              className="w-full"
              onChange={() => {}}
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaVolumeUp className="text-white" />
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              className="w-24"
              onChange={onVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CountdownTimer = ({ nextEventTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(nextEventTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="text-xl font-bold">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-2xl font-bold text-cyan-400">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

const EntertainmentHub = () => {
  const [streams, setStreams] = useState(INITIAL_STATE.streams);
  const [activeTab] = useState('comedy');
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const [showGlobalMap, setShowGlobalMap] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [chatMessage, setChatMessage] = useState('');

  const currentStream = streams[activeTab];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'You',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setStreams(prevStreams => ({
        ...prevStreams,
        [activeTab]: {
          ...prevStreams[activeTab],
          chatMessages: [...prevStreams[activeTab].chatMessages, newMessage]
        }
      }));
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <header className="bg-transparent p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            24/7 Entertainment Hub
          </h1>
          <button
            className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-black transition-colors"
            onClick={() => setShowGlobalMap(!showGlobalMap)}
          >
            <FaGlobe className="inline-block mr-2" />
            Global View
          </button>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <VideoPlayer
                stream={currentStream}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                volume={volume}
                onVolumeChange={(e) => setVolume(e.target.value)}
              />
              
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">
                    {currentStream.currentShow.title}
                  </h2>
                  <p className="text-gray-400">
                    Hosted by {currentStream.currentShow.host}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-2 py-1 bg-blue-500 text-white text-sm rounded-full">
                      <FaUser className="inline-block mr-1" />
                      {currentStream.activeUsers} watching
                    </span>
                    <span className="px-2 py-1 bg-red-500 text-white text-sm rounded-full">
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-pink-500">
                    <FaHeart />
                    <span className="ml-1">{currentStream.currentShow.likes}</span>
                  </button>
                  <button className="text-blue-500">
                    <FaShare />
                    <span className="ml-1">{currentStream.currentShow.shares}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">24/7 Schedule</h2>
              <div className="flex space-x-2 overflow-x-auto pb-4">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-32 h-24 bg-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => {
                      setSelectedShow({
                        title: `Show at ${i}:00`,
                        description: `This is the show scheduled for ${i}:00.`,
                        preview: 'https://example.com/show-preview.mp4'
                      });
                      setShowDialog(true);
                    }}
                  >
                    <p className="text-white font-bold">
                      {i}:00
                    </p>
                    <p className="text-gray-400 text-sm">
                      Show Title
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Next Event Countdown</h2>
              <CountdownTimer nextEventTime="2023-06-01T00:00:00" />
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Up Next</h2>
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-16 bg-gray-700 rounded-lg overflow-hidden">
                  <video
                    src={currentStream.upNext.trailerUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                  />
                </div>
                <div>
                  <h3 className="font-bold">{currentStream.upNext.title}</h3>
                  <p className="text-gray-400">{currentStream.upNext.host}</p>
                  <p className="text-cyan-400">Starts at {currentStream.upNext.startTime}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Live Chat</h2>
              <div className="h-64 overflow-y-auto mb-4 space-y-4">
                {currentStream.chatMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      {message.user[0]}
                    </div>
                    <div>
                      <p className="font-bold">{message.user}</p>
                      <p className="text-gray-300">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-grow bg-gray-700 rounded px-2 py-1"
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="bg-cyan-500 text-white rounded px-3 py-1"
                  onClick={handleSendMessage}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>

            {showGlobalMap && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h2 className="text-xl font-bold text-cyan-400 mb-4">Global Audience</h2>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Interactive global audience map would render here</p>
                </div>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Request a Song/Show</h2>
              <input
                type="text"
                className="w-full bg-gray-700 rounded px-2 py-1 mb-2"
                placeholder="Enter your request..."
              />
              <button className="w-full bg-cyan-500 text-white rounded px-3 py-1">
                Submit Request
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Customize Your Stream</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors">Upbeat</button>
                <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors">Chill</button>
                <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors">Funny</button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Join the Show</h2>
              <input
                type="text"
                className="w-full bg-gray-700 rounded px-2 py-1 mb-2"
                placeholder="Submit a question or joke..."
              />
              <button className="w-full bg-pink-500 text-white rounded px-3 py-1">
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>

      {showDialog && selectedShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedShow.title}</h2>
            <p className="text-gray-300 mb-4">{selectedShow.description}</p>
            {selectedShow.preview && (
              <video
                src={selectedShow.preview}
                className="w-full mb-4 rounded"
                controls
              />
            )}
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                onClick={() => setShowDialog(false)}
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
                onClick={() => {
                  // Logic to set a reminder
                  setShowDialog(false);
                }}
              >
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntertainmentHub;