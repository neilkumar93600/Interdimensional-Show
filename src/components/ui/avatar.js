// Avatar.js
import React from 'react';

export const Avatar = ({ className = '', ...props }) => (
  <div className={`inline-block rounded-full overflow-hidden ${className}`} {...props} />
);

export const AvatarImage = ({ src, alt = '', className = '', ...props }) => (
  <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} {...props} />
);

export const AvatarFallback = ({ children, className = '', ...props }) => (
  <div className={`flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 ${className}`} {...props}>
    {children}
  </div>
);
