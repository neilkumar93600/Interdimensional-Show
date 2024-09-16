import React from 'react';
import music from '../asset/1215608_72.jpg'


const LibraryPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-12 bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 text-transparent bg-clip-text animate-gradient">
        Your Library
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Example of a library item */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <img 
            src={music} 
            alt="Library Item" 
            className="rounded-lg w-full mb-4"
          />
          <h2 className="text-xl font-semibold">Saved Album/Playlist</h2>
          <p className="text-sm text-gray-400">Artist/DJ Name</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <img 
            src={music}  
            alt="Library Item" 
            className="rounded-lg w-full mb-4"
          />
          <h2 className="text-xl font-semibold">Saved Album/Playlist</h2>
          <p className="text-sm text-gray-400">Artist/DJ Name</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <img 
            src={music}  
            alt="Library Item" 
            className="rounded-lg w-full mb-4"
          />
          <h2 className="text-xl font-semibold">Saved Album/Playlist</h2>
          <p className="text-sm text-gray-400">Artist/DJ Name</p>
        </div>

        {/* Repeat for more library items */}
      </div>
    </div>
  );
};

export default LibraryPage;
