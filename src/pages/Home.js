import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Music, Video, Clock, Zap, Star, Users, Play, 
    Code, Eye, Heart, ChevronRight, Pause, SkipBack, 
    SkipForward, Volume2, VolumeX, Shuffle, Repeat
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useNavigate } from 'react-router-dom';
import hero from '../asset/rb_2149440808.png';

// MusicPlayer Component
const MusicPlayer = ({ song, isPlaying, onPlayPause, onPrevious, onNext }) => {
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const [repeatMode, setRepeatMode] = useState('none'); // none, one, all
    const duration = song?.duration || 180;
    
        useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
            setCurrentTime((prev) => {
                if (prev >= duration) {
                clearInterval(interval);
                return 0;
                }
                return prev + 1;
            });
            }, 1000);
        }
        return () => clearInterval(interval);
        }, [isPlaying, duration]);
    
        const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
        };
    
        const handleVolumeChange = (newValue) => {
        setVolume(newValue);
        if (newValue === 0) setIsMuted(true);
        else setIsMuted(false);
        };
    
        const toggleMute = () => {
        setIsMuted(!isMuted);
        };
    
        const handleTimeChange = (newValue) => {
        setCurrentTime(newValue);
        };
    
        const toggleRepeatMode = () => {
        const modes = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(repeatMode);
        setRepeatMode(modes[(currentIndex + 1) % modes.length]);
        };
    
        return (
        <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md text-white p-4 flex items-center justify-between z-50 border-t border-gray-800"
        >
            <div className="flex items-center w-1/4">
            <div className="relative group">
                <img 
                src={song?.imageUrl || "/api/placeholder/48/48"} 
                alt={song?.title} 
                className="w-12 h-12 rounded-lg shadow-lg" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <button className="text-white hover:text-purple-400">
                    <Play className="w-6 h-6" />
                </button>
                </div>
            </div>
            <div className="ml-4">
                <h3 className="font-semibold text-white hover:text-purple-400 cursor-pointer transition-colors">
                {song?.title || "No track selected"}
                </h3>
                <p className="text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors">
                {song?.artist || "Unknown artist"}
                </p>
            </div>
            </div>
    
            <div className="flex flex-col items-center w-2/4">
            <div className="flex items-center space-x-6 mb-2">
                <button 
                onClick={() => setIsShuffling(!isShuffling)}
                className={`hover:text-purple-400 transition-colors ${isShuffling ? 'text-purple-400' : 'text-gray-400'}`}
                >
                <Shuffle className="w-5 h-5" />
                </button>
                <button onClick={onPrevious} className="hover:text-purple-400 transition-colors">
                <SkipBack className="w-6 h-6" />
                </button>
                <button 
                onClick={onPlayPause} 
                className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button onClick={onNext} className="hover:text-purple-400 transition-colors">
                <SkipForward className="w-6 h-6" />
                </button>
                <button 
                onClick={toggleRepeatMode}
                className={`hover:text-purple-400 transition-colors ${repeatMode !== 'none' ? 'text-purple-400' : 'text-gray-400'}`}
                >
                <Repeat className="w-5 h-5" />
                {repeatMode === 'one' && <span className="absolute text-xs">1</span>}
                </button>
            </div>
    
            <div className="w-full flex items-center space-x-3">
                <span className="text-xs text-gray-400 w-12 text-right">
                {formatTime(currentTime)}
                </span>
                <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => handleTimeChange(Number(e.target.value))}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-gray-400 w-12">
                {formatTime(duration)}
                </span>
            </div>
            </div>
    
            <div className="flex items-center space-x-4 w-1/4 justify-end">
            <button onClick={toggleMute} className="hover:text-purple-400 transition-colors">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            </div>
        </motion.div>
        );
    };

// VideoCard Component
const VideoCard = ({ thumbnail, title, duration, views, creator }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
                <button className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
                    <Play className="w-8 h-8" />
                </button>
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80">
                <h4 className="text-white font-semibold line-clamp-1">{title}</h4>
                <p className="text-gray-300 text-sm">{creator}</p>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-sm">{views} views</span>
                    <span className="text-gray-400 text-sm">{duration}</span>
                </div>
            </div>
        </motion.div>
    );
};

const TrendingCard = ({ item, onPlayPause, isCurrentlyPlaying, isCurrentSong }) => {
    return (
      <motion.div
        className="bg-gray-800/30 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative group">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-purple-600 rounded-full"
              onClick={() => onPlayPause(item)}
            >
              {isCurrentlyPlaying && isCurrentSong ? 
                <Pause className="w-6 h-6 text-white" /> : 
                <Play className="w-6 h-6 text-white" />
              }
            </motion.button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{item.type === 'music' ? item.artist : item.creator}</p>
          <p className="text-gray-500 text-sm mb-3">{item.type === 'music' ? item.genre : item.category}</p>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2 text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{item.views}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Heart className="w-4 h-4" />
              <span>{item.likes}</span>
            </div>
            <span className="text-gray-400">{item.duration}</span>
          </div>
        </div>
      </motion.div>
    );
  };

// Main HomePage Component
const HomePage = () => {
    const navigate = useNavigate();
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trendingMusic, setTrendingMusic] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('global');
    const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');
    const [isYearly, setIsYearly] = useState(false);
    const [stats, setStats] = useState({
        activeUsers: 0,
        dailyVisits: 0,
        videosGenerated: 0,
        songsGenerated: 0
    });

    // Stats counter effect
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                activeUsers: Math.min(prev.activeUsers + 100, 15000),
                dailyVisits: Math.min(prev.dailyVisits + 500, 50000),
                videosGenerated: Math.min(prev.videosGenerated + 200, 25000),
                songsGenerated: Math.min(prev.songsGenerated + 300, 35000)
            }));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Load trending music data
    useEffect(() => {
        // Simulated API fetch for trending music
        setTrendingMusic([
            { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "https://picsum.photos/400/320?random=1", type: "music", language: "global" },
            { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "https://picsum.photos/400/320?random=2", type: "music", language: "english" },
            { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "https://picsum.photos/400/320?random=3", type: "music", language: "hindi" },
            { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "https://picsum.photos/400/320?random=4", type: "music", language: "global" },
            { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "https://picsum.photos/400/320?random=5", type: "music", language: "global" },
            { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "https://picsum.photos/400/320?random=6", type: "music", language: "english" },
            { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "https://picsum.photos/400/320?random=7", type: "music", language: "hindi" },
            { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "https://picsum.photos/400/320?random=8", type: "music", language: "global" },
            { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "https://picsum.photos/400/320?random=9", type: "music", language: "global" },
            { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "https://picsum.photos/400/320?random=21", type: "music", language: "english" },
            { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "https://picsum.photos/400/320?random=31", type: "music", language: "hindi" },
            { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "https://picsum.photos/400/320?random=41", type: "music", language: "global" },
            { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "https://picsum.photos/400/320?random=11", type: "music", language: "global" },
            { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "https://picsum.photos/400/320?random=22", type: "music", language: "english" },
            { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "https://picsum.photos/400/320?random=32", type: "music", language: "hindi" },
            { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "https://picsum.photos/400/320?random=42", type: "music", language: "global" },
            { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "https://picsum.photos/400/320?random=12", type: "music", language: "global" },
            { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "https://picsum.photos/400/320?random=23", type: "music", language: "english" },
            { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "https://picsum.photos/400/320?random=33", type: "music", language: "hindi" },
            { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "https://picsum.photos/400/320?random=43", type: "music", language: "global" },
        ]);
    }, []);

        const shows = Array(10).fill(null).map((_, i) => ({
            id: i + 1,
            title: `Comedy Show ${i + 1}`,
            thumbnail: `/api/placeholder/400/320?text=Show${i + 1}`,
            duration: '5:00'
        }));

        const handlePlayPause = (song) => {
            if (currentSong && currentSong.id === song.id) {
                setIsPlaying(!isPlaying);
            } else {
                setCurrentSong(song);
                setIsPlaying(true);
            }
        };

    const handlePrevious = () => {
        console.log("Previous song");
        // Implement previous song logic
    };

    const handleNext = () => {
        console.log("Next song");
        // Implement next song logic
    };

    // Filter trending items based on selected language
    const filteredTrendingMusic = trendingMusic.filter(item => 
        selectedLanguage === 'global' || item.language === selectedLanguage
    );

    const getTrendingTitle = () => {
        const titles = {
            global: 'Global Trending',
            english: 'English Trending',
            hindi: 'Hindi Trending',
            bangali: 'Bengali Trending',
            arabic: 'Arabic Trending',
            korean: 'Korean Trending',
            spanish: 'Spanish Trending',
            chinese: 'Chinese Trending'
        };
        return titles[selectedLanguage] || 'Global Trending';
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
        {/* Animated Background */}
        <div className="fixed inset-0 opacity-20">
            <motion.div 
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.3),rgba(0,0,0,0))]"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    easings: ["easeInOut"]
                }}
            />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                    className="text-white space-y-8 z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        Create.
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Perform.
                        </span>
                        Entertain.
                    </h1>
                    <p className="text-xl text-gray-300">
                        Transform your creative vision into reality with AI-powered music and comedy production.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                        >
                            Get Started Free
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 rounded-full border border-purple-500 text-white hover:bg-purple-500/10"
                        >
                            Watch Demo
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div 
                    className="relative hidden lg:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-30" />
                    <img 
                        src={hero}
                        alt="Creative Platform" 
                        className="relative rounded-2xl shadow-2xl"
                    />
                </motion.div>
            </div>
        </section>
            {/* Live Stats Section */}
            <section className="relative py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <motion.div 
                            className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Users className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</h3>
                            <p className="text-gray-400">Active Users</p>
                        </motion.div>
                        <motion.div 
                            className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Eye className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-2xl font-bold text-white">{stats.dailyVisits.toLocaleString()}</h3>
                            <p className="text-gray-400">Daily Visits</p>
                        </motion.div>
                        <motion.div 
                            className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Video className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-2xl font-bold text-white">{stats.videosGenerated.toLocaleString()}</h3>
                            <p className="text-gray-400">Videos Generated</p>
                        </motion.div>
                        <motion.div 
                            className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Music className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-2xl font-bold text-white">{stats.songsGenerated.toLocaleString()}</h3>
                            <p className="text-gray-400">Songs Generated</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="relative py-20 px-4">
                <div className="container mx-auto">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
                        <p className="text-gray-300">Unleash your creativity with our powerful tools</p>
                    </motion.div>

                    <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-8">
                        {[
                            {
                                icon: <Music className="w-8 h-8" />,
                                title: "AI Music Creation",
                                description: "Create original music with our advanced AI technology"
                            },
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: "Song Extension",
                                description: "Extend and remix your favorite tracks seamlessly"
                            },
                            {
                                icon: <Video className="w-8 h-8" />,
                                title: "Comedy Reels",
                                description: "Generate hilarious 15-second comedy reels instantly"
                            },
                            {
                                icon: <Clock className="w-8 h-8" />,
                                title: "24/7 Live Shows",
                                description: "Watch endless entertainment around the clock"
                            },
                            {
                                icon: <Code className="w-8 h-8" />,
                                title: "Event Coding",
                                description: "Create codes for upcoming productions and events"
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-200 border border-gray-700"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                                <p className="text-gray-400">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
             {/* Trending Section */}
            <section className="relative py-20 px-4">
                <div className="container mx-auto">
                    <motion.div 
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-4xl font-bold text-white">{getTrendingTitle()}</h2>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-purple-400" />
                                <select 
                                    value={selectedLanguage} 
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                                >
                                    <option value="global">Global</option>
                                    <option value="english">English</option>
                                    <option value="hindi">Hindi</option>
                                    <option value="bangali">Bengali</option>
                                    <option value="arabic">Arabic</option>
                                    <option value="korean">Korean</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="chinese">Chinese</option>
                                </select>

                                <select
                                    value={selectedTimeframe}
                                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                                    className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                                >
                                    <option value="all-time">All-Time</option>
                                    <option value="yearly">Yearly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                        </div>

                        {/* Music Section Carousel */}
                        <div className="mb-16">
                            <div className="flex items-center mb-8">
                                <Music className="w-6 h-6 text-purple-400 mr-3" />
                                <h3 className="text-2xl font-bold text-white">Trending Music</h3>
                            </div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    1024: {
                                        slidesPerView: 7,
                                    },
                                }}
                            >
                                {filteredTrendingMusic.map((item, index) => (
                                    <SwiperSlide key={`music-${index}`}>
                                        <TrendingCard item={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Comedy Shows Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Popular Comedy Shows</h2>
                <button className="flex items-center text-purple-400 hover:text-purple-300">
                    View All <ChevronRight className="ml-2" />
                </button>
                </div>
                <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                }}
                >
                {shows.map((show) => (
                    <SwiperSlide key={show.id}>
                    <VideoCard {...show} />
                    </SwiperSlide>
                ))}
                </Swiper>
            </section>

            {/* Pricing Section */}
            <section className="relative py-20 px-4">
                <div className="container mx-auto">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
                        <p className="text-gray-300 mb-8">Select the perfect plan for your creative needs</p>
                        <div className="flex items-center justify-center gap-4">
                            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
                            <button
                                onClick={() => setIsYearly(!isYearly)}
                                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isYearly ? 'bg-purple-600' : 'bg-gray-600'}`}
                            >
                                <motion.div
                                    className="absolute w-5 h-5 bg-white rounded-full top-1"
                                    animate={{ left: isYearly ? '1.75rem' : '0.25rem' }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </button>
                            <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>Yearly</span>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: 'Free',
                                price: isYearly ? 0 : 0,
                                features: ['50 credits renew daily (10 songs/5 videos)','Non-commercial terms','No credit top ups','Shared generation queue','running jobs at once'],
                                buttonColor: 'bg-blue-500 hover:bg-blue-600',
                            },
                            {
                                name: 'Pro Plan',
                                price: isYearly ? 59 : 5,
                                features: ['2,500 credits renew monthly (500 songs/250 Videos)', 'Early access to new beta features', 'General commercial terms','Optional credit top ups','Priority generation queue',' 10 running jobs at once'],
                                buttonColor: 'bg-green-500 hover:bg-green-600',
                                discount: 'Save with yearly billing (20% off)'
                            },
                            {
                                name: 'Premium Plan',
                                price: isYearly ? 130 : 12,
                                features: ['10,000 credits renew monthly (2,000 songs/1000 videos)', 'Early access to new beta features', 'General commercial terms',' Optional credit top ups', 'Priority generation queue', '10 running jobs at once'],
                                buttonColor: 'bg-green-500 hover:bg-green-600',
                                discount: 'Save with yearly billing (20% off)'
                            },
                            {
                                name: 'Enterprise',
                                price: isYearly ? 250 : 25,
                                features: ['Custom credit amounts', 'General commercial terms', 'Custom top ups',' Custom generation queue', 'More concurrent generations'],
                                buttonColor: 'bg-green-500 hover:bg-green-600',
                            }
                        ].map((plan, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">
                                        {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                                    </span>
                                    {typeof plan.price === 'number' && (
                                        <span className="text-gray-400">/{isYearly ? 'year' : 'month'}</span>
                                    )}
                                </div>
                                {plan.discount && (
                                    <p className="text-green-400 text-sm mb-4">{plan.discount}</p>
                                )}
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start space-x-2 text-gray-300">
                                            <Star className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-full py-3 rounded-lg ${plan.buttonColor} text-white font-semibold`}
                                >
                                    {plan.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Add MusicPlayer if there's a current song */}
            {currentSong && (
                <MusicPlayer
                    song={currentSong}
                    isPlaying={isPlaying}
                    onPlayPause={() => handlePlayPause(currentSong)} // Correct usage
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                />
            )}
        </div>
    );
};

export default HomePage;