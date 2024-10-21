import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Video, Image, Mic, Share, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-purple-900/30 backdrop-blur-sm p-6 rounded-xl cursor-pointer"
    onClick={onClick}
  >
    <Icon className="w-12 h-12 text-purple-400 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const VideoCard = ({ thumbnail, title, duration }) => {
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
        <Play className="w-12 h-12 text-white" />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80">
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-gray-300 text-sm">{duration}</p>
      </div>
    </motion.div>
  );
};

const ComedyStudioPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Video,
      title: "15-Reel Format",
      description: "Create hilarious 15-second comedy reels that'll make everyone laugh",
      onClick: () => navigate('/15-reel')
    },
    {
      icon: Image,
      title: "Roasting Show",
      description: "Turn any image into a comedic roasting masterpiece"
    },
    {
      icon: Mic,
      title: "Stand-up Generator",
      description: "Generate stand-up comedy material with AI assistance"
    },
    {
      icon: Share,
      title: "Comedy Collaboration",
      description: "Connect with other comedians and create together"
    }
  ];

  const tutorialVideos = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    title: `How to Create ${i === 0 ? '15-Reels' : i === 1 ? 'Roasting Shows' : `Comedy Content ${i + 1}`}`,
    thumbnail: `/api/placeholder/400/320?text=Tutorial${i + 1}`,
    duration: '3:45'
  }));

  const reels = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    title: `Funny Reel ${i + 1}`,
    thumbnail: `/api/placeholder/400/320?text=Reel${i + 1}`,
    duration: '0:15'
  }));

  const shows = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    title: `Comedy Show ${i + 1}`,
    thumbnail: `/api/placeholder/400/320?text=Show${i + 1}`,
    duration: '5:00'
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-purple-900 text-white overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-6xl font-bold mb-6"
        >
          Comedy Studio
        </motion.h1>
        <p className="text-xl text-gray-300 mb-12">Turn your ideas into comedy gold</p>
      </motion.section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Tutorial Videos Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">How It Works</h2>
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
          {tutorialVideos.map((video) => (
            <SwiperSlide key={video.id}>
              <VideoCard {...video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 15-Reel Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Trending 15-Reels</h2>
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
          {reels.map((reel) => (
            <SwiperSlide key={reel.id}>
              <VideoCard {...reel} />
            </SwiperSlide>
          ))}
        </Swiper>
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
    </div>
  );
};

export default ComedyStudioPage;