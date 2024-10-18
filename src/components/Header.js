import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaBars, FaSignOutAlt, FaMusic, FaMicrophone, FaVideo, FaClock } from 'react-icons/fa';
import logo from '../asset/logo.png';
import { auth, logout } from '../firebase';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate('/');
        }
    };

    const navLinks = [
        { path: '/', label: 'Home', icon: <FaMusic className="mr-2" /> },
        { path: '/Musichomepage', label: 'Music Studio', icon: <FaMicrophone className="mr-2" /> },
        { path: '/comedy', label: 'Comedy Lab', icon: <FaVideo className="mr-2" /> },
        { path: '/24h-show', label: 'Live Shows', icon: <FaClock className="mr-2" /> },
    ];

    const headerClass = `fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`;

    const getLinkClass = (path) => {
        const baseClass = "nav-link flex items-center px-4 py-2 rounded-lg transition-all duration-200";
        return location.pathname === path
            ? `${baseClass} bg-purple-500/20 text-purple-400 font-bold`
            : `${baseClass} text-white hover:bg-purple-500/10 hover:text-purple-400`;
    };

    const buttonClass = "px-6 py-2 rounded-full font-semibold text-white transition-all duration-200 ease-in-out flex items-center";
    const loginButtonClass = `${buttonClass} bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600`;
    const signUpButtonClass = `${buttonClass} bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 ml-4`;
    const logoutButtonClass = `${buttonClass} bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600`;

    return (
        <header className={headerClass}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center space-x-3">
                            <img src={logo} alt="Logo" className="w-12 h-12 transform hover:rotate-12 transition-transform duration-200" />
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Vibe Vision
                            </span>
                        </Link>
                        <nav className="hidden lg:flex space-x-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={getLinkClass(link.path)}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <button onClick={handleLogout} className={logoutButtonClass}>
                                <FaSignOutAlt className="mr-2" />
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className={loginButtonClass}>
                                    <FaSignInAlt className="mr-2" />
                                    Login
                                </Link>
                                <Link to="/signup" className={signUpButtonClass}>
                                    <FaUser className="mr-2" />
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="lg:hidden text-white p-2 rounded-lg hover:bg-purple-500/10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <FaBars size={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                    <nav className="flex flex-col space-y-2 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={getLinkClass(link.path)}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}
                        {user ? (
                            <button onClick={handleLogout} className={logoutButtonClass}>
                                <FaSignOutAlt className="mr-2" />
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className={loginButtonClass}>
                                    <FaSignInAlt className="mr-2" />
                                    Login
                                </Link>
                                <Link to="/signup" className={signUpButtonClass}>
                                    <FaUser className="mr-2" />
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;