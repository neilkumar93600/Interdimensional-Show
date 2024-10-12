import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState('global');
    const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');
    const [isYearly, setIsYearly] = useState(false); // For yearly/monthly toggle

    // Sample trending data
    const trendingItems = [
        { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "/api/placeholder/400/320" },
        { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "/api/placeholder/400/320" },
        { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "/api/placeholder/400/320" },
        { title: "Dog", artist: "adios", genre: "Live music melodyjny rap", views: "442K", likes: "7.8K", duration: "3:22", imageUrl: "/api/placeholder/400/320" },
        { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "/api/placeholder/400/320" },
        { title: "MAYBE?!", artist: "AroundOnce", genre: "Electronic, sweet female", views: "876K", likes: "12K", duration: "3:45", imageUrl: "/api/placeholder/400/320" },
        { title: "Nikola Tesla", artist: "crispity", genre: "melodic Techno, 1800's rock", views: "185K", likes: "5.8K", duration: "4:30", imageUrl: "/api/placeholder/400/320" },
        { title: "Quantum Leap", artist: "FutureSounds", genre: "Experimental Electronic", views: "723K", likes: "11K", duration: "3:55", imageUrl: "/api/placeholder/400/320" },
        { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "/api/placeholder/400/320" },
        { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "/api/placeholder/400/320" },
        { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "/api/placeholder/400/320" },
        { title: "Dog", artist: "adios", genre: "Live music melodyjny rap", views: "442K", likes: "7.8K", duration: "3:22", imageUrl: "/api/placeholder/400/320" },
        { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "/api/placeholder/400/320" },
        { title: "MAYBE?!", artist: "AroundOnce", genre: "Electronic, sweet female", views: "876K", likes: "12K", duration: "3:45", imageUrl: "/api/placeholder/400/320" },
        { title: "Nikola Tesla", artist: "crispity", genre: "melodic Techno, 1800's rock", views: "185K", likes: "5.8K", duration: "4:30", imageUrl: "/api/placeholder/400/320" },
        { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "/api/placeholder/400/320" },
        { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "/api/placeholder/400/320" },
        { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "/api/placeholder/400/320" },
        { title: "Dog", artist: "adios", genre: "Live music melodyjny rap", views: "442K", likes: "7.8K", duration: "3:22", imageUrl: "/api/placeholder/400/320" },
        { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "/api/placeholder/400/320" },
        { title: "MAYBE?!", artist: "AroundOnce", genre: "Electronic, sweet female", views: "876K", likes: "12K", duration: "3:45", imageUrl: "/api/placeholder/400/320" },
        { title: "Nikola Tesla", artist: "crispity", genre: "melodic Techno, 1800's rock", views: "185K", likes: "5.8K", duration: "4:30", imageUrl: "/api/placeholder/400/320" },
        { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "/api/placeholder/400/320" },
        { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "/api/placeholder/400/320" },
        { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "/api/placeholder/400/320" },
        { title: "Dog", artist: "adios", genre: "Live music melodyjny rap", views: "442K", likes: "7.8K", duration: "3:22", imageUrl: "/api/placeholder/400/320" },
        { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "/api/placeholder/400/320" },
        { title: "MAYBE?!", artist: "AroundOnce", genre: "Electronic, sweet female", views: "876K", likes: "12K", duration: "3:45", imageUrl: "/api/placeholder/400/320" },
        { title: "Nikola Tesla", artist: "crispity", genre: "melodic Techno, 1800's rock", views: "185K", likes: "5.8K", duration: "4:30", imageUrl: "/api/placeholder/400/320" },
        { title: "OH AI (extended...", artist: "SpinningFee...", genre: "Driving 1980's Disco-po...", views: "413K", likes: "6.9K", duration: "3:30", imageUrl: "/api/placeholder/400/320" },
        { title: "AI Took My Job", artist: "徐亚轩TMao...", genre: "symphony, rock, chorus ...", views: "432K", likes: "6.8K", duration: "2:43", imageUrl: "/api/placeholder/400/320" },
        { title: "World Hello!!", artist: "Cody", genre: "pop", views: "596K", likes: "9.9K", duration: "4:15", imageUrl: "/api/placeholder/400/320" },
        { title: "Dog", artist: "adios", genre: "Live music melodyjny rap", views: "442K", likes: "7.8K", duration: "3:22", imageUrl: "/api/placeholder/400/320" },
        { title: "Deep Night", artist: "Moisty", genre: "lo-fi Japanese city funk r...", views: "1.3M", likes: "22K", duration: "5:01", imageUrl: "/api/placeholder/400/320" },
        { title: "MAYBE?!", artist: "AroundOnce", genre: "Electronic, sweet female", views: "876K", likes: "12K", duration: "3:45", imageUrl: "/api/placeholder/400/320" },
        { title: "Nikola Tesla", artist: "crispity", genre: "melodic Techno, 1800's rock", views: "185K", likes: "5.8K", duration: "4:30", imageUrl: "/api/placeholder/400/320" }
    ];

    const Collections = [
        "Beef Diplomat - Gone", 
        "i have a feeling Covers", 
        "Soundclash Covers", 
        "Stone Covers", 
        "Dialectic (Accept It) Covers", 
        "Once Covers"
    ];

    const plans = [
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
    ];

    const itemsPerSlide = 8;
    const totalSlides = Math.ceil(trendingItems.length / itemsPerSlide);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

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

    const getFilteredItems = () => {
        return trendingItems;
    };

    const visibleItems = getFilteredItems().slice(
        currentSlide * itemsPerSlide,
        (currentSlide * itemsPerSlide) + itemsPerSlide
    );

    return (
        <div className="home-page bg-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <section className="hero-section py-16 relative bg-gradient-to-br from-blue-600 to-purple-800 animate-gradient bg-gradient-size">
                <div className="absolute inset-0 z-0 opacity-50"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="hero-content max-w-3xl mx-auto">
                        <h1 className="text-5xl font-bold mb-4">Welcome to Interdimensional Comedy & Song</h1>
                        <p className="text-lg mb-8">Your daily dose of intergalactic music and comedy shows.</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                            Log in
                        </button>
                        <img src="/path/to/your/image.jpg" alt="Hero visual representation" className="mt-8 mx-auto w-full max-w-md rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>

            {/* Title for Song Section */}
            <section className="song-section text-center">
                <h2 className="text-4xl font-bold mb-4 pt-8">Top Songs</h2>
            </section>

            {/* Global Trending Section */}
            <section className="global-trending-section py-12">
                <div className="container mx-auto">
                    <div className="px-8 flex items-center justify-between mb-8">
                        <h2 className="text-4xl font-bold">{getTrendingTitle()}</h2>
                        <div className="flex gap-4">
                            <select 
                                value={selectedLanguage} 
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                <option value="all-time">All Time</option>
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="daily">Daily</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative px-8">
                        <div className="flex items-center">
                            <button 
                                onClick={prevSlide}
                                className="absolute left-0 z-10 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <div className="flex gap-4 transition-transform duration-300 ease-in-out overflow-hidden">
                                {visibleItems.map((item, index) => (
                                    <div key={index} className="trending-item bg-gray-800 rounded-lg overflow-hidden w-64">
                                        <div className="relative">
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                                            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                {item.duration}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="text-lg font-semibold mb-1 truncate">{item.title}</h3>
                                            <p className="text-xs text-gray-400 mb-1">{item.artist}</p>
                                            <p className="text-xs text-gray-400 mb-1">{item.genre}</p>
                                            <p className="text-xs text-gray-400">{item.views} views • {item.likes} likes</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={nextSlide}
                                className="absolute right-0 z-10 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Section */}
            <section className="Collection-section py-12 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">Collection</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Collections.map((cover, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition duration-300">
                                <p className="text-sm">{cover}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Title for Comedy Section */}
            <section className="trending-comedy-section  text-center ">
                <h2 className="text-4xl font-bold mb-4 pt-8">Top Comedy Shows</h2>
            </section>

            {/* Global Trending Section */}
            <section className="global-trending-section py-12">
                <div className="container mx-auto">
                    <div className="px-8 flex items-center justify-between mb-8">
                        <h2 className="text-4xl font-bold">{getTrendingTitle()}</h2>
                        <div className="flex gap-4">
                            <select 
                                value={selectedLanguage} 
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                <option value="all-time">All Time</option>
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="daily">Daily</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative px-8">
                        <div className="flex items-center">
                            <button 
                                onClick={prevSlide}
                                className="absolute left-0 z-10 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <div className="flex gap-4 transition-transform duration-300 ease-in-out overflow-hidden">
                                {visibleItems.map((item, index) => (
                                    <div key={index} className="trending-item bg-gray-800 rounded-lg overflow-hidden w-64">
                                        <div className="relative">
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                                            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                {item.duration}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="text-lg font-semibold mb-1 truncate">{item.title}</h3>
                                            <p className="text-xs text-gray-400 mb-1">{item.artist}</p>
                                            <p className="text-xs text-gray-400 mb-1">{item.genre}</p>
                                            <p className="text-xs text-gray-400">{item.views} views • {item.likes} likes</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={nextSlide}
                                className="absolute right-0 z-10 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/*Covers Section */}
            <section className="Collection-section py-12 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">Comedy Collection</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Collections.map((cover, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition duration-300">
                                <p className="text-sm">{cover}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8">Pricing Plans</h2>
                    <div className="flex justify-center mb-4">
                        <button 
                            onClick={() => setIsYearly(false)} 
                            className={`px-4 py-2 rounded-l-lg ${!isYearly ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setIsYearly(true)} 
                            className={`px-4 py-2 rounded-r-lg ${isYearly ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
                        >
                            Yearly
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {plans.map((plan, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                                <p className="text-4xl font-bold mb-4">${plan.price}</p>
                                <button className={`w-full py-2 rounded-lg ${plan.buttonColor}`}>
                                    Choose Plan
                                </button>
                                <p className="text-xs no-underline hover:underline white mt-2 font-bold">{plan.discount}</p>
                                <ul className="mb-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="text-gray-400 mb-2">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
