import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaSpotify, FaSoundcloud } from 'react-icons/fa';

function Footer() {
    const socialLinks = [
        { icon: <FaFacebookF />, href: '/', label: 'Facebook' },
        { icon: <FaTwitter />, href: '/', label: 'Twitter' },
        { icon: <FaInstagram />, href: '/', label: 'Instagram' },
        { icon: <FaYoutube />, href: '/', label: 'YouTube' },
        { icon: <FaSpotify />, href: '/', label: 'Spotify' },
        { icon: <FaSoundcloud />, href: '/', label: 'SoundCloud' },
    ];

    const features = [
        'AI-Powered Music Creation',
        'Song Extension Technology',
        '15-Second Comedy Reels',
        'Live Performance Streaming',
        'Custom Comedy Roasts',
        'Event Production Tools'
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Vibe Vision
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            Revolutionizing entertainment through AI-powered music creation and comedy production.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white transition-all duration-200"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Features</h4>
                        <ul className="space-y-2">
                            {features.map((feature, index) => (
                                <li key={index} className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Pricing Plans
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Stay updated with our latest features and releases.</p>
                        <form className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                            />
                            <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-200">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Vibe Vision. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;