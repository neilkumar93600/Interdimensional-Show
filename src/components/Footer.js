import React from 'react';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-700">
        <div className="mx-auto w-full ">
            <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
            {/* Company Section */}
            <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="/about-us" className="hover:underline">About</a>
                </li>
                <li className="mb-4">
                    <a href="/careers" className="hover:underline">Careers</a>
                </li>
                <li className="mb-4">
                    <a href="/goal" className="hover:underline">Our Goal</a>
                </li>
                <li className="mb-4">
                    <a href="/team" className="hover:underline">Our Team</a>
                </li>
                </ul>
            </div>

            {/* Help Center Section */}
            <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help Center</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="/discord" className="hover:underline">Discord Server</a>
                </li>
                <li className="mb-4">
                    <a href="/twitter" className="hover:underline">Twitter</a>
                </li>
                <li className="mb-4">
                    <a href="/facebook" className="hover:underline">Facebook</a>
                </li>
                <li className="mb-4">
                    <a href="/contact" className="hover:underline">Contact Us</a>
                </li>
                </ul>
            </div>

            {/* Legal Section */}
            <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                </li>
                <li className="mb-4">
                    <a href="/licensing" className="hover:underline">Licensing</a>
                </li>
                <li className="mb-4">
                    <a href="/terms" className="hover:underline">Terms & Conditions</a>
                </li>
                </ul>
            </div>

            {/* Download Section */}
            <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="/ios" className="hover:underline">iOS</a>
                </li>
                <li className="mb-4">
                    <a href="/android" className="hover:underline">Android</a>
                </li>
                
                </ul>
            </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="px-4 py-6 bg-gray-100 dark:bg-gray-800 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
                &copy; 2024 Interdimensional Comedy & Song. All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                {/* Social Media Icons */}
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <img src="/path/to/facebook-icon.png" alt="Facebook" className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <img src="/path/to/twitter-icon.png" alt="Twitter" className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <img src="/path/to/instagram-icon.png" alt="Instagram" className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <img src="/path/to/youtube-icon.png" alt="YouTube" className="w-4 h-4" />
                </a>
            </div>
            </div>
        </div>
        </footer>
    );
}

export default Footer;
