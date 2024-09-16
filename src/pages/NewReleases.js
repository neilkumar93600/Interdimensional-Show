import React from 'react';
import music from '../asset/1215608_72.jpg'

const NewReleasePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-12 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-transparent bg-clip-text animate-gradient">
        New Releases
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Example of a new release item */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <img 
            src={music}  
            alt="New Release" 
            className="rounded-lg w-full mb-4"
          />
          <h2 className="text-xl font-semibold">Album Title</h2>
          <p className="text-sm text-gray-400">Artist Name</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <img 
            src={music}
            alt="New Release" 
            className="rounded-lg w-full mb-4"
          />
          <h2 className="text-xl font-semibold">Album Title</h2>
          <p className="text-sm text-gray-400">Artist Name</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <img 
            src={music}
            alt="New Release" 
            className="rounded-lg w-full mb-4"
          />
          <h2 className="text-xl font-semibold">Album Title</h2>
          <p className="text-sm text-gray-400">Artist Name</p>
        </div>

        {/* Repeat for more releases */}
      </div>
    </div>
  );
};

export default NewReleasePage;
