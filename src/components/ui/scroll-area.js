// ScrollArea.js
import React from 'react';

const ScrollArea = ({ children, className = '', maxHeight = '300px', ...props }) => {
  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ maxHeight }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
