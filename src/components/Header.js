import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../asset/logo.png';

function Header() {
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/music', label: 'Music' },
        { path: '/comedy', label: 'Comedy Show' },
        { path: '/24h-show', label: '24/7 Show' },
        // { path: '/Music24', label: 'Music24' },
    ];

    const getLinkClass = (path) => {
        const baseClass = "nav-link text-white hover:text-purple-400";
        return location.pathname === path
            ? `${baseClass} text-purple-400 font-bold`
            : baseClass;
    };

    const buttonClass = "px-4 py-2 rounded-full font-semibold text-white transition-all duration-200 ease-in-out";
    const loginButtonClass = `${buttonClass} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600`;
    const signUpButtonClass = `${buttonClass} bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 ml-4`;

    return (
        <header className="header bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="header-left flex items-center">
                <img src={logo} alt="Logo" className="logo w-16 h-16 mr-4" />
                <nav className="flex space-x-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={getLinkClass(link.path)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="header-right">
                <Link to="/login" className={loginButtonClass}>
                    Login
                </Link>
                <Link to="/signup" className={signUpButtonClass}>
                    Sign Up
                </Link>
            </div>
        </header>
    );
}

export default Header;