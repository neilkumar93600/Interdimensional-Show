// Progress.js
import React from 'react';

const Progress = ({ value, max = 100, className = '', ...props }) => {
  return (
    <div className={`bg-gray-200 rounded-full overflow-hidden ${className}`} {...props}>
      <div
        className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
};

export default Progress;
