import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaBars, FaSignOutAlt } from 'react-icons/fa';
import logo from '../asset/logo.png';
import { auth, logout } from '../firebase';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
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
        { path: '/', label: 'Home' },
        { path: '/music', label: 'Music' },
        { path: '/comedy', label: 'Comedy Show' },
        { path: '/24h-show', label: '24/7 Show' },
    ];

    const getLinkClass = (path) => {
        const baseClass = "nav-link text-white hover:text-purple-400 transition-colors duration-200";
        return location.pathname === path
            ? `${baseClass} text-purple-400 font-bold`
            : baseClass;
    };

    const buttonClass = "px-4 py-2 rounded-full font-semibold text-white transition-all duration-200 ease-in-out flex items-center";
    const loginButtonClass = `${buttonClass} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600`;
    const signUpButtonClass = `${buttonClass} bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 ml-4`;
    const logoutButtonClass = `${buttonClass} bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600`;

    return (
        <header className="header bg-gray-900 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="header-left flex items-center">
                    <img src={logo} alt="Logo" className="logo w-12 h-12 mr-4" />
                    <nav className="hidden md:flex space-x-6">
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

                <div className="header-right hidden md:flex">
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
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FaBars size={24} />
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    <nav className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={getLinkClass(link.path)}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-4 flex flex-col space-y-4">
                        {user ? (
                            <button onClick={handleLogout} className={logoutButtonClass}>
                                <FaSignOutAlt className="mr-2" />
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className={loginButtonClass} onClick={() => setIsMenuOpen(false)}>
                                    <FaSignInAlt className="mr-2" />
                                    Login
                                </Link>
                                <Link to="/signup" className={signUpButtonClass} onClick={() => setIsMenuOpen(false)}>
                                    <FaUser className="mr-2" />
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;