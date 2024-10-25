import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Mic, Clock, Sliders, Play, Pause, SkipBack, SkipForward, Eye, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useNavigate } from 'react-router-dom';

// New MusicPlayer component
const MusicPlayer = ({ song, isPlaying, onPlayPause, onPrevious, onNext }) => {
    return (
        <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between z-50"
        >
        <div className="flex items-center">
            <img src={song.imageUrl} alt={song.title} className="w-12 h-12 mr-4 rounded" />
            <div>
            <h3 className="font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <button onClick={onPrevious}><SkipBack /></button>
            <button onClick={onPlayPause}>
            {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={onNext}><SkipForward /></button>
        </div>
        </motion.div>
    );
};

const HomePage = () => {
    const [trendingMusic, setTrendingMusic] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [musicCollections, setMusicCollections] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('global');
    const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');
    const navigate = useNavigate();

    // New state for music player
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const features = [
        { title: "Generate lofi", description: "convert any song into Lofi", icon: <Music />, path: "/lofi-converter" },
        { title: "Generate Song by Description", description: "Create a unique song based on your description", icon: <Music />, path: "/song-creation" },
        { title: "Custom Song", description: "Tailor every aspect of your song", icon: <Mic />, path: "/custom-song" },
        { title: "Extend Song", description: "Lengthen your favorite tracks seamlessly", icon: <Clock />, path: "/extend-song" },
    ];

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

    // Updated TrendingCard component
    const TrendingCard = ({ item }) => (
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
                        onClick={() => handlePlayPause(item)}
                    >
                        {currentSong && currentSong.title === item.title && isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
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

    // New function to handle play/pause
    const handlePlayPause = (song) => {
        if (currentSong && currentSong.title === song.title) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
        }
    };

    const handlePrevious = () => {
        // Implement logic to play previous song
        console.log("Previous song");
    };

    const handleNext = () => {
        // Implement logic to play next song
        console.log("Next song");
    };

    // Filter trending items based on selected language
    const filteredTrendingMusic = trendingMusic.filter(item => 
        selectedLanguage === 'global' || item.language === selectedLanguage
    );

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

        setMusicCollections([
            { genre: "Rap", image: "https://picsum.photos/400/320?random=51" },
            { genre: "EDM", image: "https://picsum.photos/400/320?random=61" },
            { genre: "Funk", image: "https://picsum.photos/400/320?random=71" },
            { genre: "Metal", image: "https://picsum.photos/400/320?random=81" },
            { genre: "Folk", image: "https://picsum.photos/400/320?random=91" },
            { genre: "Rap", image: "https://picsum.photos/400/320?random=52" },
            { genre: "EDM", image: "https://picsum.photos/400/320?random=63" },
            { genre: "Funk", image: "https://picsum.photos/400/320?random=72" },
            { genre: "Metal", image: "https://picsum.photos/400/320?random=82" },
            { genre: "Folk", image: "https://picsum.photos/400/320?random=92" },
            { genre: "Rap", image: "https://picsum.photos/400/320?random=53" },
            { genre: "EDM", image: "https://picsum.photos/400/320?random=62" },
            { genre: "Funk", image: "https://picsum.photos/400/320?random=73" },
            { genre: "Metal", image: "https://picsum.photos/400/320?random=83" },
            { genre: "Folk", image: "https://picsum.photos/400/320?random=93" },
            { genre: "Rap", image: "https://picsum.photos/400/320?random=54" },
            { genre: "EDM", image: "https://picsum.photos/400/320?random=64" },
            { genre: "Funk", image: "https://picsum.photos/400/320?random=74" },
            { genre: "Metal", image: "https://picsum.photos/400/320?random=84" },
            { genre: "Folk", image: "https://picsum.photos/400/320?random=94" },
        ]);

        setTopArtists([
            { name: "BBM", handle: "@bananabreakdmuffin", followers: "634 followers", avatar: "https://picsum.photos/100/100?random=101" },
            { name: "Feline Music", handle: "@felinemusic", followers: "3.4K followers", avatar: "https://picsum.photos/100/100?random=19" },
            { name: "sushileaf", handle: "@sushileaf", followers: "1.2K followers", avatar: "https://picsum.photos/100/100?random=18" },
            { name: "Dray", handle: "@draystation", followers: "1.0K followers", avatar: "https://picsum.photos/100/100?random=17" },
            { name: "BBM", handle: "@bananabreakdmuffin", followers: "634 followers", avatar: "https://picsum.photos/100/100?random=10" },
            { name: "Feline Music", handle: "@felinemusic", followers: "3.4K followers", avatar: "https://picsum.photos/100/100?random=131" },
            { name: "sushileaf", handle: "@sushileaf", followers: "1.2K followers", avatar: "https://picsum.photos/100/100?random=112" },
            { name: "Dray", handle: "@draystation", followers: "1.0K followers", avatar: "https://picsum.photos/100/100?random=113" },
            { name: "BBM", handle: "@bananabreakdmuffin", followers: "634 followers", avatar: "https://picsum.photos/100/100?random=110" },
            { name: "Feline Music", handle: "@felinemusic", followers: "3.4K followers", avatar: "https://picsum.photos/100/100?random=121" },
            { name: "sushileaf", handle: "@sushileaf", followers: "1.2K followers", avatar: "https://picsum.photos/100/100?random=122" },
            { name: "Dray", handle: "@draystation", followers: "1.0K followers", avatar: "https://picsum.photos/100/100?random=132" },
            { name: "BBM", handle: "@bananabreakdmuffin", followers: "634 followers", avatar: "https://picsum.photos/100/100?random=102" },
            { name: "Feline Music", handle: "@felinemusic", followers: "3.4K followers", avatar: "https://picsum.photos/100/100?random=112" },
            { name: "sushileaf", handle: "@sushileaf", followers: "1.2K followers", avatar: "https://picsum.photos/100/100?random=212" },
            { name: "Dray", handle: "@draystation", followers: "1.0K followers", avatar: "https://picsum.photos/100/100?random=213" },
        ]);
    }, [selectedLanguage]);

    const CollectionCard = ({ genre, image }) => (
        <motion.div
            className="relative rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}
        >
            <img src={image} alt={genre} className="w-full h-64 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-2xl font-bold text-white">{genre}</h3>
            </div>
        </motion.div>
    );

    const ArtistCard = ({ artist }) => (
        <motion.div
            className="flex items-center space-x-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/artist/${artist.handle}`)}
        >
            <img src={artist.avatar} alt={artist.name} className="w-16 h-16 rounded-full" />
            <div>
                <h3 className="text-lg font-semibold text-white">{artist.name}</h3>
                <p className="text-sm text-gray-400">{artist.handle}</p>
                <p className="text-xs text-gray-500">{artist.followers}</p>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-6 pt-20">AI-Powered Music Creation</h1>
                    <p className="text-xl mb-10">Transform your ideas into professional tracks with our cutting-edge AI technology</p>
                    
                </div>
            </section>

            {/* Feature Boxes */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-10 text-center">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-purple-500 mb-4 text-2xl">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 mb-4">{feature.description}</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => navigate(feature.path)}
                                >
                                    Try Now
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Music Section */}
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
                                navigation={true}
                                modules={[Navigation]}
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

            {/* Top Categories Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold mb-8">Top Categories</h2>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        navigation={true}
                        modules={[Navigation]}
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
                        {musicCollections.map((collection, index) => (
                            <SwiperSlide key={`collection-${index}`}>
                                <CollectionCard genre={collection.genre} image={collection.image} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Creators You May Like Section */}
            <section className="py-16 px-4 bg-gray-800">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-4xl font-bold">Creators You May Like</h2>
                    </div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        navigation={true}
                        modules={[Navigation]}
                        breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    1024: {
                                        slidesPerView: 6,
                                    },
                                }}
                    >
                        {topArtists.map((artist, index) => (
                            <SwiperSlide key={`artist-${index}`}>
                                <ArtistCard artist={artist} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            

            {/* Popular Trends Section */}
            <section className="relative py-20 px-4">
                <div className="container mx-auto">
                    <motion.div 
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Music Section Carousel */}
                        <div className="mb-16">
                            <div className="flex items-center mb-8">
                                <Music className="w-6 h-6 text-purple-400 mr-3" />
                                <h3 className="text-2xl font-bold text-white">POP Trending</h3>
                            </div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                navigation={true}
                                modules={[Navigation]}
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
                        <div className="mb-16">
                            <div className="flex items-center mb-8">
                                <Music className="w-6 h-6 text-purple-400 mr-3" />
                                <h3 className="text-2xl font-bold text-white">New</h3>
                            </div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                navigation={true}
                                modules={[Navigation]}
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
                        <div className="mb-16">
                            <div className="flex items-center mb-8">
                                <Music className="w-6 h-6 text-purple-400 mr-3" />
                                <h3 className="text-2xl font-bold text-white">Soundclash Remix Contest (feat. Flosstradamus) Winners</h3>
                            </div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                navigation={true}
                                modules={[Navigation]}
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
                        <div className="mb-16">
                            <div className="flex items-center mb-8">
                                <Music className="w-6 h-6 text-purple-400 mr-3" />
                                <h3 className="text-2xl font-bold text-white">Lo-Fi</h3>
                            </div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                navigation={true}
                                modules={[Navigation]}
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
                        <div className="mb-16">
                            <div className="flex items-center mb-8">
                                <Music className="w-6 h-6 text-purple-400 mr-3" />
                                <h3 className="text-2xl font-bold text-white">Smooth</h3>
                            </div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                navigation={true}
                                modules={[Navigation]}
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
            {currentSong && (
        <MusicPlayer 
            song={currentSong}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onPrevious={handlePrevious}
            onNext={handleNext}
            />
        )}
        </div>
    );
};

export default HomePage;