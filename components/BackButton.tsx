'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  destination?: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export default function BackButton({ 
  destination = '/dashboard', 
  label = 'Back to Dashboard',
  className = '',
  showIcon = true
}: BackButtonProps) {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push(destination)}
      className={`flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 group bg-white/90 backdrop-blur-sm shadow-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      suppressHydrationWarning
    >
      {showIcon ? (
        destination === '/dashboard' ? (
          <BarChart3 className="w-5 h-5 group-hover:text-purple-600 transition-colors duration-300" />
        ) : (
          <ArrowLeft className="w-5 h-5 group-hover:text-blue-600 transition-colors duration-300" />
        )
      ) : null}
      <span className="text-sm font-medium group-hover:text-purple-600 transition-colors duration-300">{label}</span>
    </motion.button>
  );
}
