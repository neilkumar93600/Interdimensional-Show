import React, { useState, useRef, useEffect } from 'react';
import Music from '../asset/27999669_7252005.jpg';
import '../style/App.css'; // Import the CSS file for custom Tailwind classes

const RetroDiskPlayer = ({ imageUrl, audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Update the audio source when the component mounts or audioUrl changes
        }
    }, [audioUrl]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime += 5; // Forward by 5 seconds
        }
    };

    const handleBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime -= 5; // Backward by 5 seconds
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            {/* Retro Music Player Container */}
            <div className="relative flex items-center justify-center">
                {/* The "Stick Arm" */}
                <div
                    className={`absolute top-0 left-1/2 transform ${
                        isPlaying ? '-translate-x-1/2 rotate-45' : '-translate-x-1/2'
                    } transition-transform duration-500`}
                >
                    <div className="h-20 w-2 bg-gray-400"></div>
                </div>

                {/* The Retro Disk (Circle) */}
                <div
                    className={`${
                        isPlaying ? 'w-64 h-64' : 'w-48 h-48'
                    } bg-cover bg-center rounded-full bg-black border-4 border-gray-300 relative transition-all duration-700 ease-in-out transform ${
                        isPlaying ? 'rotate-360' : 'rotate-0'
                    }`}
                    style={{ backgroundImage: `url(${Music})` }}
                >
                    {/* Rotating disk */}
                    <div
                        className={`${
                            isPlaying ? 'animate-spin-slow' : ''
                        } rounded-full absolute top-0 left-0 w-full h-full`}
                    ></div>
                </div>
            </div>

            {/* Play/Pause Button */}
            <button
                onClick={handlePlayPause}
                className="mt-4 bg-pink-500 text-white px-6 py-3 rounded-full focus:outline-none hover:bg-pink-600 transition-all duration-300"
            >
                {isPlaying ? 'Pause' : 'Play'}
            </button>

            {/* Control Buttons */}
            <div className="mt-4 flex space-x-4">
                <button
                    onClick={handleBackward}
                    className="bg-gray-600 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-gray-700 transition-all duration-300"
                >
                    -5s
                </button>
                <button
                    onClick={handleForward}
                    className="bg-gray-600 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-gray-700 transition-all duration-300"
                >
                    +5s
                </button>
            </div>

            {/* Audio Element */}
            <audio ref={audioRef} />
        </div>
    );
};

export default RetroDiskPlayer;
