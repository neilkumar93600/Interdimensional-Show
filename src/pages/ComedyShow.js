import React, { useState } from 'react';

  const ComedyShowForm = () => {
    const [theme, setTheme] = useState('Standup');
    const [audience, setAudience] = useState('Everyone');
    const [duration, setDuration] = useState('3 minutes');
    const [humorStyle, setHumorStyle] = useState('Silly');
    const [character, setCharacter] = useState('');
    const [prompt, setPrompt] = useState('');
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Add API call and video generation logic here
    };
  
    return (
      <div className="min-h-screen flex flex-col justify-between bg-gray-800 text-white">
        <header className="text-center p-6">
          <h1 className="text-2xl font-bold">Create a Comedy Show</h1>
          <p className="text-sm">Customize your comedy show and let Comedy Genie work its magic!</p>
        </header>
  
        <form onSubmit={handleFormSubmit} className=" mx-auto bg-gray-900 p-6 rounded-md shadow-md">
          {/* Theme Section */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Theme</label>
            <div className="flex space-x-2">
              {['Standup', 'Sketch', 'Roast', 'Musical'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`px-4 py-2 rounded-full text-black ${
                    theme === item ? 'bg-blue-500 text-white' : 'bg-gray-400'
                  }`}
                  onClick={() => setTheme(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
  
          {/* Targeted Audience Section */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Targeted Audience</label>
            <div className="flex space-x-2">
              {['Everyone', 'Kids', 'Teens', 'Adults', 'Seniors'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`px-4 py-2 rounded-full text-black ${
                    audience === item ? 'bg-yellow-500 text-white' : 'bg-gray-400'
                  }`}
                  onClick={() => setAudience(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
  
          {/* Duration Section */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Duration</label>
            <div className="flex space-x-2">
              {['3 minutes', '5 minutes', '10 minutes', '15 minutes', '30 minutes'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`px-4 py-2 rounded-full text-black ${
                    duration === item ? 'bg-green-500 text-white' : 'bg-gray-400'
                  }`}
                  onClick={() => setDuration(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
  
          {/* Characters Input */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Characters</label>
            <input
              type="text"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
              placeholder="Mr. Bean"
            />
          </div>
  
          {/* Prompt Input */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
              placeholder="Write a short prompt to guide the show"
              rows="3"
            />
          </div>
  
          {/* Humor Style Section */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Humor Style</label>
            <div className="flex space-x-2">
              {['Wholesome', 'Silly', 'Dry', 'Dark'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`px-4 py-2 rounded-full text-black ${
                    humorStyle === item ? 'bg-orange-500 text-white' : 'bg-gray-400'
                  }`}
                  onClick={() => setHumorStyle(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
  
          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-yellow-500 text-black hover:bg-yellow-600 transition"
            >
              Generate Show
            </button>
          </div>
        </form>
  
        <footer className="text-center p-6 text-sm">
          Comedy Genie - Customize your comedy shows!
        </footer>
      </div>
    );
  };
  
  export default ComedyShowForm;
  