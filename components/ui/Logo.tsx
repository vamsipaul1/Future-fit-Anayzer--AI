'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'auth' | 'navigation';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'default'
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const imageSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  const containerClasses = {
    default: 'bg-white rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300',
    auth: 'bg-white rounded-2xl shadow-2xl hover:shadow-3xl border-2 border-white/30 hover:border-white/50',
    navigation: 'bg-white rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300'
  };

  const fallbackContainerClasses = {
    default: 'bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl',
    auth: 'bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-2xl hover:shadow-3xl',
    navigation: 'bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl'
  };

  const textColorClasses = {
    default: 'text-gray-700',
    auth: 'text-white',
    navigation: 'text-gray-700'
  };

  const subtextColorClasses = {
    default: 'text-gray-500',
    auth: 'text-gray-300',
    navigation: 'text-gray-500'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`${sizeClasses[size]} ${imageError ? fallbackContainerClasses[variant] : containerClasses[variant]} flex items-center justify-center transition-all duration-300`}
      >
        {!imageError ? (
          <img
            src="/images/even.png"
            alt="FutureFit Logo"
            className={`${imageSizeClasses[size]} object-contain`}
            onError={() => setImageError(true)}
          />
        ) : (
          <Zap className={`${iconSizeClasses[size]} text-white`} />
        )}
      </motion.div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold ${textColorClasses[variant]} transition-colors duration-300`}>
            FutureFit
          </span>
          <span className={`text-xs ${subtextColorClasses[variant]} -mt-1`}>
            AI-Powered Learning
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;