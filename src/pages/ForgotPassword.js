import React, { useState } from 'react';

function ForgetPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle forget password logic here (API call, etc.)
        console.log('Email submitted for password reset:', email);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">Forgot your password?</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Enter your email and we'll send you a link to reset your password.</p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;
