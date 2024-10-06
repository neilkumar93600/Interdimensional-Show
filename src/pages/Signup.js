import React, { useState } from 'react';

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here (API call, etc.)
        if (formData.password !== formData.confirmPassword) {
            console.log('Passwords do not match');
            return;
        }
        console.log('Signup data:', formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">Create your account</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
