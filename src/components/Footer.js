import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-10">
                    {/* Company Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Company</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about-us" className="hover:text-blue-400 transition duration-200">About Us</a>
                            </li>
                            <li>
                                <a href="/careers" className="hover:text-blue-400 transition duration-200">Careers</a>
                            </li>
                            <li>
                                <a href="/goal" className="hover:text-blue-400 transition duration-200">Our Goal</a>
                            </li>
                            <li>
                                <a href="/team" className="hover:text-blue-400 transition duration-200">Our Team</a>
                            </li>
                        </ul>
                    </div>

                    {/* Help Center Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Help Center</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="/discord" className="hover:text-blue-400 transition duration-200">Discord</a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-blue-400 transition duration-200">Contact Us</a>
                            </li>
                            <li>
                                <a href="/faq" className="hover:text-blue-400 transition duration-200">FAQ</a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Legal</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="/privacy-policy" className="hover:text-blue-400 transition duration-200">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms" className="hover:text-blue-400 transition duration-200">Terms & Conditions</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Subscribe</h2>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 p-2 rounded-l-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 px-4 rounded-r-md hover:bg-blue-500 transition duration-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="border-t border-gray-700 pt-6 flex flex-col items-center md:flex-row justify-between">
                    <span className="text-sm text-gray-400 sm:text-center">
                        &copy; 2024 Interdimensional Comedy & Song. All Rights Reserved.
                    </span>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {/* Social Media Icons */}
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition duration-200">
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-200">
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 transition duration-200">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-500 transition duration-200">
                            <Youtube className="w-6 h-6" />
                        </a>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
