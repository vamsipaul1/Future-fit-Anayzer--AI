'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import IntroOverlay from './IntroOverlay';

interface DashboardWithIntroProps {
  children: React.ReactNode;
}

const DashboardWithIntro: React.FC<DashboardWithIntroProps> = ({ children }) => {
  const [showIntro, setShowIntro] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Check if intro was already completed for this specific user
    if (session?.user?.email) {
      const userIntroKey = `futurefit_intro_completed_${session.user.email}`;
      const introCompleted = localStorage.getItem(userIntroKey);
      if (introCompleted !== 'true') {
        setShowIntro(true);
      }
    } else if (session === null) {
      // If no session, check for general intro completion
      const introCompleted = localStorage.getItem('futurefit_intro_completed');
      if (introCompleted !== 'true') {
        setShowIntro(true);
      }
    }
  }, [session]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && (
        <IntroOverlay 
          onComplete={handleIntroComplete} 
          userName={session?.user?.name || 'Future Professional'}
          userEmail={session?.user?.email || undefined}
        />
      )}
      {children}
    </>
  );
};

export default DashboardWithIntro;
