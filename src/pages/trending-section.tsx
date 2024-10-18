import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Heart, Music, Video, Clock } from 'lucide-react';

const TrendingSection = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('global');
    const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');
    
    const trendingMusic = [
        { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "/api/placeholder/400/320?text=AI+Music+1", type: "music" },
        { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "/api/placeholder/400/320?text=AI+Music+2", type: "music" },
        { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "/api/placeholder/400/320?text=AI+Music+3", type: "music" },
        { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "/api/placeholder/400/320?text=AI+Music+4", type: "music" },
    ];

    const trendingComedyShows = [
        { title: "AI Comedy Hour", creator: "FunnyBot", category: "Stand-up", views: "892K", likes: "15.2K", duration: "15:00", imageUrl: "/api/placeholder/400/320?text=Comedy+Show+1", type: "comedy" },
        { title: "Robot Jokes 2.0", creator: "AIComedy", category: "Sketch Comedy", views: "654K", likes: "12.1K", duration: "8:30", imageUrl: "/api/placeholder/400/320?text=Comedy+Show+2", type: "comedy" },
        { title: "Neural Network News", creator: "AINewsroom", category: "News Parody", views: "445K", likes: "9.8K", duration: "12:45", imageUrl: "/api/placeholder/400/320?text=Comedy+Show+3", type: "comedy" },
        { title: "Digital Laughs", creator: "ByteHumor", category: "Improv", views: "332K", likes: "7.5K", duration: "10:20", imageUrl: "/api/placeholder/400/320?text=Comedy+Show+4", type: "comedy" },
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

    const timeframeDisplay = {
        'all-time': 'All Time',
        'monthly': 'This Month',
        'weekly': 'This Week',
        'daily': 'Today'
    };

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
                    >
                        <Play className="w-6 h-6 text-white" />
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

    return (
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
                                value={selectedTimeframe} 
                                onChange={(e) => setSelectedTimeframe(e.target.value)}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            >
                                <option value="all-time">All Time</option>
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="daily">Daily</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex justify-start mb-8">
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
                    </div>
                </motion.div>

                {/* Music Section */}
                <div className="mb-16">
                    <div className="flex items-center mb-8">
                        <Music className="w-6 h-6 text-purple-400 mr-3" />
                        <h3 className="text-2xl font-bold text-white">Trending Music</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trendingMusic.map((item, index) => (
                            <TrendingCard key={`music-${index}`} item={item} />
                        ))}
                    </div>
                </div>

                {/* Comedy Shows Section */}
                <div>
                    <div className="flex items-center mb-8">
                        <Video className="w-6 h-6 text-purple-400 mr-3" />
                        <h3 className="text-2xl font-bold text-white">Trending Comedy Shows</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trendingComedyShows.map((item, index) => (
                            <TrendingCard key={`comedy-${index}`} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingSection;