module.exports = {
  mode: 'jit',  // Enable JIT (Just-in-Time) mode for faster build
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0B132B',
        'dark-blue': '#1C2541',
        'bright-pink': '#F72585',
      },
      textColor: {
        'gradient': 'linear-gradient(45deg, #ff0080, #ff8c00)', // For text gradient
      },
    },
  },
  plugins: [],
};
