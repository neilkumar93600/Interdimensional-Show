import React from 'react';
import music from '../asset/1215608_72.jpg'

const MixesPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-12 bg-gradient-to-r from-green-500 via-yellow-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
        Mixes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Example of a mix item */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <img 
            src={music}  
            alt="Mix" 
            className="rounded-lg w-full mb-4"
          />
          <h2 className="text-xl font-semibold">Mix Title</h2>
          <p className="text-sm text-gray-400">DJ Name</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <img 
            src={music}  
            alt="Mix" 
            className="rounded-lg w-full mb-4"
          />
          <h2 className="text-xl font-semibold">Mix Title</h2>
          <p className="text-sm text-gray-400">DJ Name</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <img 
            src={music} 
            alt="Mix" 
            className="rounded-lg w-full mb-4"
          />
          <h2 className="text-xl font-semibold">Mix Title</h2>
          <p className="text-sm text-gray-400">DJ Name</p>
        </div>

        {/* Repeat for more mixes */}
      </div>
    </div>
  );
};

export default MixesPage;
