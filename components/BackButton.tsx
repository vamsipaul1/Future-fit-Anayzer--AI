'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  destination?: string;
  label?: string;
  className?: string;
}

export default function BackButton({ 
  destination = '/dashboard', 
  label = 'Back to Dashboard',
  className = ''
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(destination)}
      className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      suppressHydrationWarning
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
