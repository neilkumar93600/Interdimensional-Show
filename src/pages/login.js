import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { loginWithEmailAndPassword, loginWithGoogle } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await loginWithEmailAndPassword(email, password);
        if (result.success) {
            navigate('/'); // Redirect to home page after successful login
        } else {
            setError(result.error);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        const result = await loginWithGoogle();
        if (result.success) {
            navigate('/'); // Redirect to home page after successful login
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 flex items-center justify-center"
                    >
                        <FaGoogle className="mr-2" />
                        Login with Google
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
                        Forgot Password?
                    </Link>
                </div>
                <div className="mt-6 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link to="/signup" className="text-purple-600 hover:text-purple-800">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
