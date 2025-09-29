'use client';

import React, { useState, useEffect } from 'react';
import IntroOverlay from './IntroOverlay';

interface DashboardWithIntroProps {
  children: React.ReactNode;
}

const DashboardWithIntro: React.FC<DashboardWithIntroProps> = ({ children }) => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro was already completed
    const introCompleted = localStorage.getItem('futurefit_intro_completed');
    if (introCompleted !== 'true') {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      {children}
    </>
  );
};

export default DashboardWithIntro;
