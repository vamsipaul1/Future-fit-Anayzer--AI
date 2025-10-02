'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Target, Brain, FileText, TrendingUp, CheckCircle, Users, Zap, BookOpen, SkipForward } from 'lucide-react';

interface IntroOverlayProps {
  onComplete: () => void;
  userName?: string;
  userEmail?: string;
}

// Custom Typewriter Effect Hook
const useTypewriterEffect = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    setDisplayText('');
    setIsComplete(false);
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete, userName = "Future Professional", userEmail }) => {
  const [narrativeStep, setNarrativeStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Visual sections with icons and simple content
  const sections = [
    {
      title: "Welcome to FutureFit AI",
      content: `Hello ${userName}! We're here to transform your career with AI-powered insights and personalized learning paths.`,
      icon: Star,
      color: "from-pink-500 to-purple-500",
      type: "welcome"
    },
    {
      title: "Our Mission",
      content: `Build your future-proof career by combining cutting-edge AI with real-time industry data for personalized skill development.`,
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      type: "mission"
    },
    {
      title: "How It Works",
      content: `Our 5-step process identifies your strengths, uncovers opportunities, and creates a clear path to your career goals.`,
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      type: "intro"
    },
    {
      title: "Step 1: Choose Your Domain",
      content: `Select your target career from 50+ high-demand fields. Our AI analyzes market trends and growth opportunities.`,
      icon: Users,
      color: "from-purple-500 to-violet-500",
      type: "step"
    },
    {
      title: "Step 2: Skill Gap Analysis", 
      content: `We analyze your current skills against industry requirements and identify exactly what you need to advance.`,
      icon: Brain,
      color: "from-indigo-500 to-blue-500",
      type: "step"
    },
    {
      title: "Step 3: AI-Powered Quiz",
      content: `Take a personalized 15-question assessment that adapts to your responses and measures your capabilities accurately.`,
      icon: BookOpen,
      color: "from-yellow-500 to-orange-500",
      type: "step"
    },
    {
      title: "Step 4: Career Path Mapping",
      content: `Get a detailed 3-year roadmap with specific milestones and strategic recommendations for your advancement.`,
      icon: TrendingUp,
      color: "from-teal-500 to-cyan-500",
      type: "step"
    },
    {
      title: "Step 5: Resume Optimization",
      content: `Our AI scans your resume, identifies improvements, and aligns your skills with high-value roles.`,
      icon: FileText,
      color: "from-rose-500 to-pink-500",
      type: "step"
    },
    {
      title: "Ready to Start?",
      content: `You're ready to transform your career! Let's begin your personalized journey to success.`,
      icon: CheckCircle,
      color: "from-emerald-500 to-green-500",
      type: "cta"
    }
  ];

  const currentSection = sections[narrativeStep] || sections[0];
  const { displayText: titleDisplay, isComplete: titleComplete } = useTypewriterEffect(
    currentSection?.title || '', 50
  );
  const { displayText: contentDisplay, isComplete: contentComplete } = useTypewriterEffect(
    currentSection?.content || '', 30
  );

  // Section progression logic - Faster timing
  useEffect(() => {
    if (titleComplete && contentComplete && narrativeStep < sections.length - 1) {
      // Wait only 1.5 seconds for each section to be read
      const timer = setTimeout(() => {
        setNarrativeStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [titleComplete, contentComplete, narrativeStep, sections.length]);

  // Note: localStorage check is handled by the parent component (Dashboard)
  // This component only handles the intro display logic

  const handleStartJourney = () => {
    // Mark intro as completed for this specific user
    if (userEmail) {
      const userIntroKey = `futurefit_intro_completed_${userEmail}`;
      localStorage.setItem(userIntroKey, 'true');
    }
    setIsExiting(true);
    
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const handleSkip = () => {
    // Mark intro as completed for this specific user
    if (userEmail) {
      const userIntroKey = `futurefit_intro_completed_${userEmail}`;
      localStorage.setItem(userIntroKey, 'true');
    }
    setIsExiting(true);
    
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const handleSkipSection = () => {
    if (narrativeStep < sections.length - 1) {
      setNarrativeStep(prev => prev + 1);
    } else {
      // If we're at the last section, complete the intro
      handleSkip();
    }
  };


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isExiting ? 0 : 1,
          y: isExiting ? '100vh' : 0
        }}
        exit={{ 
          opacity: 0,
          y: '100vh'
        }}
        transition={{ 
          duration: isExiting ? 0.8 : 0.4,
          ease: isExiting ? [0.25, 0.46, 0.45, 0.94] : "easeInOut"
        }}
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, 
            rgba(248, 250, 252, 0.98), 
            rgba(241, 245, 249, 0.95), 
            rgba(226, 232, 240, 0.92),
            rgba(236, 72, 153, 0.08),
            rgba(168, 85, 247, 0.08),
            rgba(99, 102, 241, 0.05)
          )`,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Gradient Orbs - Enhanced */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-12"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)',
              filter: 'blur(70px)'
            }}
          />
          
          {/* Additional floating orbs for more depth */}
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)',
              filter: 'blur(50px)'
            }}
          />
          
          {/* Floating Particles - Enhanced */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.6, 0.1],
                scale: [0.5, 1.2, 0.5],
                x: [0, Math.sin(i) * 15, 0],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="absolute rounded-full"
              style={{
                left: `${5 + (i * 3)}%`,
                top: `${10 + (i * 3)}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                background: i % 4 === 0 ? 'rgba(236, 72, 153, 0.6)' : 
                           i % 4 === 1 ? 'rgba(168, 85, 247, 0.6)' : 
                           i % 4 === 2 ? 'rgba(99, 102, 241, 0.6)' : 'rgba(34, 197, 94, 0.6)',
                boxShadow: `0 0 ${8 + (i % 3) * 3}px ${i % 4 === 0 ? 'rgba(236, 72, 153, 0.4)' : 
                           i % 4 === 1 ? 'rgba(168, 85, 247, 0.4)' : 
                           i % 4 === 2 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(34, 197, 94, 0.4)'}`
              }}
            />
          ))}
        </div>

        {/* Skip Section Button - Top Right */}
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={handleSkipSection}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
          }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-8 right-8 z-10 flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <SkipForward className="w-4 h-4" />
          <span className="text-sm font-medium">
            {narrativeStep < sections.length - 1 ? 'Skip Section' : 'Complete Intro'}
          </span>
        </motion.button>

        {/* Main Content Container - Full Page */}
        <div className="relative w-full h-screen flex items-center justify-center px-8">
          {/* Enhanced Glassmorphism Card */}
          <motion.div
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative max-w-6xl w-full"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(25px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '32px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Content */}
            <div className="p-16 text-center">
              {/* Visual Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
              >
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-r ${currentSection?.color} flex items-center justify-center mx-auto shadow-xl`}>
                  {currentSection?.icon && React.createElement(currentSection.icon, { className: "w-12 h-12 text-white" })}
                </div>
              </motion.div>

              {/* Typewriter Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="min-h-[200px] flex flex-col items-center justify-center"
              >
                <h1 
                  className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6 text-center"
                  style={{ 
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: '700'
                  }}
                >
                  {titleDisplay}
                  {!titleComplete && (
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-pink-500 ml-2"
                    >
                      |
                    </motion.span>
                  )}
                </h1>
                
                {titleComplete && (
                  <p 
                    className="text-xl text-gray-700 leading-relaxed max-w-5xl text-center px-4"
                    style={{ 
                      fontFamily: 'system-ui, sans-serif',
                      fontWeight: '400'
                    }}
                  >
                    {contentDisplay}
                    {!contentComplete && (
                      <motion.span 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-pink-500 ml-2"
                      >
                        |
                      </motion.span>
                    )}
                  </p>
                )}
              </motion.div>

              {/* Progress Indicator with Section Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12"
              >
                {/* Section Counter */}
                <div className="mb-6">
                  <span className="text-lg text-gray-600 font-medium">
                    Section {narrativeStep + 1} of {sections.length}
                  </span>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <motion.div
                    className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((narrativeStep + 1) / sections.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)'
                    }}
                  />
                </div>
              </motion.div>

              {/* Skip Section Button - Bottom Center (when not on last section) */}
              {narrativeStep < sections.length - 1 && titleComplete && contentComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-12"
                >
                  <motion.button
                    onClick={handleSkipSection}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-8 py-4 rounded-xl text-gray-700 hover:text-gray-900 transition-all duration-300 mx-auto"
                    style={{
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(15px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <SkipForward className="w-5 h-5" />
                    <span className="text-base font-medium">Skip to Next Section</span>
                  </motion.button>
                </motion.div>
              )}

              {/* Action Buttons - Show after all sections are complete */}
              {narrativeStep === sections.length - 1 && titleComplete && contentComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center"
                >
                  <motion.button
                    onClick={handleStartJourney}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center space-x-3 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(168, 85, 247, 0.8))',
                      boxShadow: '0 15px 30px rgba(236, 72, 153, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <span>Start My Journey</span>
                    <motion.div
                      whileHover={{ x: 3, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </motion.button>

                  <motion.button
                    onClick={handleSkip}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-gray-600 hover:text-gray-800 px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-300 border border-gray-300 hover:border-gray-400"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    Skip for now
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroOverlay;