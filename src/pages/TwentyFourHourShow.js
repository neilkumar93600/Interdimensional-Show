import React from 'react';
import comingsoon from '../asset/24504365_03092022_rorozoa_10.jpg';

const TwentyFourSevenPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text animate-gradient">24/7 Music and Comedy</h1>
      
      {/* Two Sections */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* Comedy Section */}
        <div className="flex-1 flex flex-col items-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out">
          <h2 className="text-3xl font-bold mb-4">Comedy Stream</h2>
          <img 
            src={comingsoon}
            alt="Comedy Placeholder" 
            className="w-full h-auto rounded-lg shadow-xl hover:opacity-90 transition-opacity duration-300"
          />
        </div>

        {/* Music Section */}
        <div className="flex-1 flex flex-col items-center bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out">
          <h2 className="text-3xl font-bold mb-4">Music Stream</h2>
          <img 
            src={comingsoon}
            alt="Music Placeholder" 
            className="w-full h-auto rounded-lg shadow-xl hover:opacity-90 transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default TwentyFourSevenPage;
