import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../asset/logo.png';
import user from '../asset/user.png';

function Header() {
    const [isPremiumModalVisible, setPremiumModalVisible] = useState(false);
    const [isSignInModalVisible, setSignInModalVisible] = useState(false);

    const togglePremiumModal = () => setPremiumModalVisible(!isPremiumModalVisible);
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
                    <Link to="/mixes" className="nav-link">Mixes</Link>
                    <Link to="/new-releases" className="nav-link">New Releases</Link>
                    <Link to="/library" className="nav-link">Library</Link>
                </nav>
            </div>
            <div className="header-right">
                <button
                    onClick={togglePremiumModal}
                    className="premium-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Upgrade to Premium
                </button>
                <img
                    src={user}
                    alt="User"
                    className="user-image"
                    onClick={toggleSignInModal}
                />
            </div>

            {/* Upgrade to Premium Modal */}
            {isPremiumModalVisible && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
                    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 rounded-lg p-1"
                            onClick={togglePremiumModal}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Standard plan</h5>
                        <div className="flex items-baseline text-gray-900 dark:text-white">
                            <span className="text-3xl font-semibold">$</span>
                            <span className="text-5xl font-extrabold tracking-tight">49</span>
                            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
                        </div>
                        <ul className="space-y-5 my-7">
                            <li className="flex items-center">
                                <svg className="w-4 h-4 text-blue-700 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="ms-3">2 team members</span>
                            </li>
                            <li className="flex">
                                <svg className="w-4 h-4 text-blue-700 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="ms-3">20GB Cloud storage</span>
                            </li>
                            {/* Other list items omitted for brevity */}
                        </ul>
                        <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5">
                            Choose plan
                        </button>
                    </div>
                </div>
            )}

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
