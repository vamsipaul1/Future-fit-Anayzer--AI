'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from '../../components/ui/Logo';
import { 
  ArrowRight,
  Brain,
  Target,
  FileText,
  BarChart3,
  Settings,
  User,
  Bell,
  Search,
  LogOut,
  Home,
  Lightbulb,
  Clock,
  Crown,
  Filter,
  Bookmark,
  ChevronDown,
  Rocket,
  TrendingUp,
  Globe,
  Star,
  CheckCircle,
  XCircle,
  SkipForward,
  Sparkles,
  Zap,
  Shield,
  Users,
  Award
} from 'lucide-react';

// Typing Animation Component
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  // Split text to handle different colors
  const renderText = () => {
    const words = displayText.split(' ');
    if (words.length >= 2) {
      const hello = words[0];
      const name = words.slice(1).join(' ');
      return (
        <>
          <span className="text-black">{hello} </span>
          <span className="text-gray-700">{name}</span>
        </>
      );
    }
    return <span className="text-black">{displayText}</span>;
  };

  return (
    <span className={className}>
      {renderText()}
    </span>
  );
};

// Phone Interface Component
const PhoneInterface = ({ currentFeature, onFeatureComplete, userName }: { currentFeature: string; onFeatureComplete: () => void; userName: string }) => {
  const [phoneText, setPhoneText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setPhoneText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setShowCursor(true);
  }, [currentFeature]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < currentFeature.length) {
        setPhoneText(prev => prev + currentFeature[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
        // Hide cursor after completion
        setTimeout(() => setShowCursor(false), 1000);
        setTimeout(() => onFeatureComplete(), 2000);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [currentIndex, currentFeature, onFeatureComplete]);

  useEffect(() => {
    if (!isComplete) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorTimer);
    }
  }, [isComplete]);

  return (
    <div className="relative w-80 h-[600px] mx-auto">
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-black rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Phone Screen Content */}
          <div className="p-6 h-full flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-black font-semibold">11:20</span>
              <img
                src="/images/even.png"
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-xl mb-2">
                  <span className="text-black font-bold">Hello, </span>
                  <span className="text-gray-700 font-bold">{userName}!</span>
                </h2>
                <p className="text-gray-600">How can I assist you right now?</p>
              </div>

              {/* Typing Area */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 min-h-[100px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-black font-bold text-lg mb-2">
                    {phoneText}
                    {showCursor && !isComplete && (
                      <span className="inline-block w-1 h-6 bg-black ml-1 animate-pulse"></span>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm">Analyzing your request...</div>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="space-y-3">
                <div className="bg-orange-100 rounded-xl p-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600">🎤</span>
                  </div>
                  <span className="text-orange-800 font-medium">Talk with AI Assistant</span>
                </div>
                
                <div className="bg-green-100 rounded-xl p-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">💬</span>
                  </div>
                  <span className="text-green-800 font-medium">Chat with AI Assistant</span>
                </div>
                
                <div className="bg-purple-100 rounded-xl p-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">📸</span>
                  </div>
                  <span className="text-purple-800 font-medium">Search by image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPhoneDemo, setShowPhoneDemo] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [showFeatureSelection, setShowFeatureSelection] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  
  // Progressive features to show in phone
  const progressiveFeatures = [
    "Career Path Analysis",
    "Skill Analysis", 
    "Resume Analysis"
  ];

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Main feature options for selection
  const mainFeatures = [
    {
      icon: "🎯",
      title: "Career Path",
      description: "Discover your ideal career trajectory",
      route: "/career-decision",
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-400/30"
    },
    {
      icon: "🧠",
      title: "Skill Analysis", 
      description: "Comprehensive skill assessment",
      route: "/skill-analysis",
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-400/30"
    },
    {
      icon: "📄",
      title: "Resume Scan",
      description: "AI-powered resume insights", 
      route: "/resume-analyzer",
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-400/30"
    }
  ];

  const handleFeatureComplete = () => {
    if (currentFeatureIndex < progressiveFeatures.length - 1) {
      setCurrentFeatureIndex(prev => prev + 1);
    } else {
      setShowPhoneDemo(false);
      setTimeout(() => setShowFeatureSelection(true), 500);
    }
  };

  const startPhoneDemo = () => {
    setShowWelcome(false);
    setTimeout(() => setShowPhoneDemo(true), 500);
  };

  const handleFeatureSelect = (route: string) => {
    router.push(route);
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Go to Home Button */}
      <motion.div 
        className="absolute top-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.button
          onClick={() => window.location.href = '/'}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 group bg-white/90 backdrop-blur-sm shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home className="w-5 h-5 group-hover:text-blue-600 transition-colors duration-300" />
          <span className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">Go to Home</span>
        </motion.button>
      </motion.div>

      <div className="flex">
        {/* Sidebar - Keep existing */}
        <motion.aside 
          className="w-64 bg-gray-900 text-white min-h-screen"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="p-6">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Logo 
                size="md" 
                showText={true} 
                variant="default"
                className="hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            {/* Navigation */}
            <motion.nav 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { href: "/dashboard", icon: Home, label: "Dashboard", isActive: true },
                { href: "/skill-analysis", icon: BarChart3, label: "Skill Analyzer", isActive: false },
                { href: "/career-decision", icon: Target, label: "Career Path", isActive: false },
                { href: "/resume-analyzer", icon: FileText, label: "Resume Scan", isActive: false },
                { href: "/insights", icon: Lightbulb, label: "Insights", isActive: false },
                { href: "/history", icon: Clock, label: "History", isActive: false },
                { href: "/debug", icon: Settings, label: "Debug", isActive: false }
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                      item.isActive ? 'bg-gray-800' : 'hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </div>
        </motion.aside>

        {/* Top Right User Icon */}
        <motion.div 
          className="absolute top-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.main 
          className="flex-1 relative overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <AnimatePresence mode="wait">
            {/* Welcome Section */}
            {showWelcome && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen flex items-center justify-center relative"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-100/30 to-pink-100/50"></div>
                
                {/* Glassmorphism Card */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-10 bg-gradient-to-br from-pink-50/90 via-white/90 to-pink-100/90 backdrop-blur-lg border border-pink-200/50 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-2xl"
                >
                  {/* Special Greeting */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-8"
                  >
                    <div className="text-6xl mb-4">👋</div>
                    <TypewriterText 
                      text={`Hello ${session?.user?.name?.split(' ')[0] || 'User'}!`}
                      className="text-black font-bold text-5xl md:text-6xl tracking-wide"
                    />
                  </motion.div>
                  
                  {/* Special Message */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2 }}
                    className="mb-8"
                  >
                    <p className="text-gray-600 text-xl font-medium mb-2">
                      Welcome to your personalized career journey! 🚀
                    </p>
                    <p className="text-gray-500 text-lg">
                      Let's unlock your potential together
                    </p>
                  </motion.div>

                  {/* Decorative Elements */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.5 }}
                    className="flex justify-center space-x-4 mb-8"
                  >
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                  </motion.div>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 3 }}
                    onClick={startPhoneDemo}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    ✨ Start Your Journey ✨
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Phone Demo Section */}
            {showPhoneDemo && (
              <motion.div
                key="phone-demo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen flex items-center justify-center relative p-8"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-100/30 to-pink-100/50"></div>
                
                <div className="relative z-10 max-w-6xl mx-auto">
                  {/* Header */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h1 className="text-gray-800 font-bold text-4xl mb-4">
                      Help you instantly with an AI driven <span className="bg-orange-500 text-white px-3 py-1 rounded-full">chatbot</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Unlock instant support and seamless communication with our AI driven chatbot. Designed to respond intelligently.
                    </p>
                  </motion.div>

                  {/* Phone and Cards Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Left Cards */}
                    <div className="space-y-6">
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-lg"
                      >
                        <div className="text-purple-600 font-bold text-3xl mb-2">95%</div>
                        <div className="text-gray-800 font-medium mb-1">Team member showed up</div>
                        <div className="text-green-600 text-sm">+12% from last week</div>
                      </motion.div>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-lg"
                      >
                        <div className="text-gray-800 font-bold mb-2">AI Detected</div>
                        <div className="text-gray-700 mb-3">Accent Localizations</div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            <div className="w-2 h-8 bg-orange-400 rounded"></div>
                            <div className="w-2 h-6 bg-gray-300 rounded"></div>
                            <div className="w-2 h-4 bg-gray-300 rounded"></div>
                          </div>
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Center Phone */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="flex justify-center"
                    >
                      <PhoneInterface 
                        currentFeature={progressiveFeatures[currentFeatureIndex]}
                        onFeatureComplete={handleFeatureComplete}
                        userName={session?.user?.name?.split(' ')[0] || 'User'}
                      />
                    </motion.div>

                    {/* Right Cards */}
                    <div className="space-y-6">
                      <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-lg"
                      >
                        <div className="text-gray-800 font-bold mb-2">Revenue</div>
                        <div className="text-gray-800 font-bold text-2xl mb-1">70%</div>
                        <div className="text-purple-600 text-sm">12%</div>
                      </motion.div>

                      <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-lg"
                      >
                        <div className="text-gray-800 font-bold mb-2">Voice Search</div>
                        <div className="text-gray-700 mb-2">Chatassist Said</div>
                        <div className="text-gray-600 text-sm mb-3">How to increase LTV?</div>
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                            <span className="text-purple-600">🎤</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Feature Selection Section */}
            {showFeatureSelection && (
              <motion.div
                key="feature-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen p-8"
              >
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <TypewriterText 
                        text="Which would you like to analyze?" 
                        className="text-gray-900 font-bold text-4xl mb-4"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                    >
                      <TypewriterText 
                        text="Choose your preferred analysis method" 
                        className="text-gray-600 text-lg"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Feature Selection Cards */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                    {mainFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ 
                          y: -10,
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFeatureSelect(feature.route)}
                        className={`bg-gradient-to-br ${feature.color} backdrop-blur-lg border ${feature.borderColor} rounded-2xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300`}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="text-6xl mb-6"
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-gray-800 font-bold text-2xl mb-3">{feature.title}</h3>
                        <p className="text-gray-600 mb-6">{feature.description}</p>
                        <div className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors font-medium">
                          Get Started <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                   {/* Skill Analysis Keywords */}
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.8, delay: 0.8 }}
                     className="text-center mt-16"
                   >
                     <h3 className="text-gray-800 font-bold text-2xl mb-8">Unlock Your Potential</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                       <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-4">
                         <div className="text-purple-800 font-bold text-lg">Analytical</div>
                         <div className="text-purple-600 text-sm">Critical Thinking</div>
                       </div>
                       <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-4">
                         <div className="text-blue-800 font-bold text-lg">Creative</div>
                         <div className="text-blue-600 text-sm">Innovation</div>
                       </div>
                       <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-4">
                         <div className="text-green-800 font-bold text-lg">Leadership</div>
                         <div className="text-green-600 text-sm">Team Building</div>
                       </div>
                       <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg p-4">
                         <div className="text-orange-800 font-bold text-lg">Strategic</div>
                         <div className="text-orange-600 text-sm">Planning</div>
                       </div>
                     </div>
                     <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                       <p className="text-gray-700 text-lg font-medium mb-2">
                         🚀 Transform your career with AI-powered insights
                       </p>
                       <p className="text-gray-600">
                         Discover hidden strengths • Identify growth opportunities • Accelerate your success
                       </p>
                     </div>
                   </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>
    </motion.div>
  );
}