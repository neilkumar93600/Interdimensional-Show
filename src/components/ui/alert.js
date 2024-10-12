// Alert.js
import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Define all the variant styles and icons
const VARIANT_STYLES = {
  default: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    style: 'bg-blue-100 text-blue-800',
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    style: 'bg-blue-50 text-blue-700',
  },
  success: {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    style: 'bg-green-50 text-green-700',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    style: 'bg-yellow-50 text-yellow-700',
  },
  error: {
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    style: 'bg-red-50 text-red-700',
  },
};

// Main Alert component with support for different variants and custom class names
export const Alert = ({ variant = 'default', children, className = '', ...props }) => {
  const { icon, style } = VARIANT_STYLES[variant] || VARIANT_STYLES.default;

  return (
    <div className={`flex items-start p-4 rounded-md ${style} ${className}`} {...props}>
      <div className="mr-3">{icon}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Title component for the alert, with flexible class names
export const AlertTitle = ({ children, className = '', ...props }) => (
  <h4 className={`font-bold text-lg mb-2 ${className}`} {...props}>{children}</h4>
);

AlertTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Description component for the alert, also customizable with class names
export const AlertDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm ${className}`} {...props}>{children}</p>
);

AlertDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
