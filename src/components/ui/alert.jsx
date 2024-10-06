import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const VARIANT_STYLES = {
  info: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    style: 'bg-blue-50 text-blue-700',
  },
  error: {
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    style: 'bg-red-50 text-red-700',
  },
  success: {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    style: 'bg-green-50 text-green-700',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    style: 'bg-yellow-50 text-yellow-700',
  },
};

export const Alert = ({ variant = 'info', children, className = '' }) => {
  const { icon, style } = VARIANT_STYLES[variant] || VARIANT_STYLES.info;

  return (
    <div className={`flex items-start p-4 rounded-md ${style} ${className}`}>
      <div className="mr-3">{icon}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

// Define types and defaults for the props
Alert.propTypes = {
  variant: PropTypes.oneOf(['info', 'error', 'success', 'warning']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const AlertDescription = ({ children, className = '' }) => {
  return <p className={`text-sm ${className}`}>{children}</p>;
};

AlertDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
