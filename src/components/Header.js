import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../asset/logo.png';
import user from '../asset/user.png';

function Header() {
    const [isSignInModalVisible, setSignInModalVisible] = useState(false);
    const toggleSignInModal = () => setSignInModalVisible(!isSignInModalVisible);

    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="Logo" className="logo" />
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/music" className="nav-link">Music</Link>
                    <Link to="/comedy" className="nav-link">Comedy Show</Link>
                    <Link to="/24h-show" className="nav-link">24/7 Show</Link>
                    <Link to="/Music24" className="nav-link">Music24</Link>
                </nav>
            </div>
            <div className="header-right">
                <img
                    src={user}
                    alt="User"
                    className="user-image"
                    onClick={toggleSignInModal}
                />
            </div>

            {/* User Sign-in Modal */}
            {isSignInModalVisible && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
                    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 rounded-lg p-1"
                            onClick={toggleSignInModal}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                        <form className="space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500"
                                    required
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-start">
                                    <input id="remember" type="checkbox" className="w-4 h-4 border rounded bg-gray-50 dark:bg-gray-700" />
                                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                </div>
                                <a href="/forgetpassword" className="ml-auto text-sm text-blue-700 dark:text-blue-500">Lost Password?</a>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800"
                            >
                                Login to your account
                            </button>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered? <a href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
