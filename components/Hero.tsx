'use client';

import { Play, TrendingUp, Code2, Palette, Database, Cpu, Zap, Brain, BarChart3, ArrowRight, Wallet, CreditCard, Users, Menu, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const skillAnalysisCards = [
  { 
    title: "AI Analysis Score", 
    icon: Brain, 
    metric: "95%", 
    label: "Accuracy",
    position: "top-10 right-20",
    delay: "0s",
    color: "from-purple-500 to-pink-500"
  },
  { 
    title: "Skill Growth Rate", 
    icon: TrendingUp, 
    metric: "30+", 
    label: "Increased",
    position: "bottom-32 right-16",
    delay: "1s",
    color: "from-green-500 to-emerald-500"
  },
];

const skillAnalysisFeatures = [
  { 
    icon: Brain, 
    title: "AI-Powered Analysis", 
    metric: "95%", 
    metricLabel: "Accuracy",
    description: "Advanced algorithms analyze your skills",
    color: "from-purple-500 to-pink-500",
    delay: "0s"
  },
  { 
    icon: TrendingUp, 
    title: "Skill Growth", 
    metric: "30+", 
    metricLabel: "Increased",
    description: "Track your skill development progress",
    color: "from-green-500 to-emerald-500",
    delay: "0.2s"
  },
  { 
    icon: BarChart3, 
    title: "Real-time Analytics", 
    metric: "24/7", 
    metricLabel: "Monitoring",
    description: "Continuous skill assessment and insights",
    color: "from-blue-500 to-cyan-500",
    delay: "0.4s"
  },
  { 
    icon: Zap, 
    title: "Instant Results", 
    metric: "<1s", 
    metricLabel: "Response",
    description: "Get personalized recommendations instantly",
    color: "from-orange-500 to-yellow-500",
    delay: "0.6s"
  },
  { 
    icon: Users, 
    title: "Expert Matching", 
    metric: "50K+", 
    metricLabel: "Professionals",
    description: "Connect with industry experts and mentors",
    color: "from-indigo-500 to-purple-500",
    delay: "0.8s"
  },
  { 
    icon: Database, 
    title: "Skill Database", 
    metric: "1000+", 
    metricLabel: "Skills",
    description: "Comprehensive skill library and assessments",
    color: "from-pink-500 to-rose-500",
    delay: "1s"
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gray-50 pt-16 pb-20 overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-purple-50 to-pink-100 opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center" style={{minHeight: 'calc(100vh - 120px)', paddingTop: '2rem'}}>
          {/* Left Content */}
          <div className="text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tight"
            >
              Bridge Your <span className="relative inline-block">Skill
                <motion.svg
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  className="absolute -bottom-2 left-0 w-full h-3 text-purple-500"
                  viewBox="0 0 100 20"
                  fill="none"
                >
                  <motion.path
                    d="M10,15 Q50,5 90,15"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </motion.svg>
              </span> Gaps
            </motion.h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed font-medium">
              Identify missing skills, get personalized learning paths, and Smarter recommendations
              with real time analytics.
            </p>

            {/* Simplified CTA Section */}
            <div className="flex items-center space-x-4">
              <Link
                href="/skill-analysis"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Skill Analysis</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/career-decision"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Career Discovery</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Content - Enhanced Responsive Glassmorphic Cards */}
          <div className="relative mt-8 lg:mt-0">
            {/* Enhanced Main Gradient Background with Royal Look */}
            <motion.div 
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-blue-600 rounded-3xl blur-3xl"
            ></motion.div>
            <motion.div 
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl"
            ></motion.div>
            
            {/* Main Skill Analysis Card with Royal Glassmorphism */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">AI Skill Analysis</p>
                    <p className="text-white text-xs opacity-80">Powered by AI</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href="/skill-analysis" className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-lg text-xs font-medium hover:bg-white transition-all duration-300 mt-1 inline-block shadow-lg">
                        Analyze Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-white/60 hover:text-white transition-colors" title="Analysis options" aria-label="Analysis options">
                    <BarChart3 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white transition-colors" title="More insights" aria-label="More insights">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                className="text-center mb-6"
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 20px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-3xl sm:text-4xl font-bold text-white mb-2"
                >
                  95%
                </motion.div>
                <div className="text-white text-sm opacity-80">Accuracy Score</div>
              </motion.div>
              
              <div className="mb-4">
                <div className="text-white text-sm opacity-80 mb-2">Skills Analyzed</div>
                <div className="text-white font-mono text-base sm:text-lg">1000+ Skills Database</div>
              </div>
              
              <div className="flex items-center justify-between">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                >
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded"></div>
                </motion.div>
                <div className="text-white text-xs opacity-60">Real-time</div>
              </div>
            </motion.div>

            {/* Floating Skill Analysis Cards */}
            {skillAnalysisCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                className={`absolute ${card.position} backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-3 sm:p-4 shadow-xl hidden sm:block`}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
                      <card.icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium text-xs sm:text-sm">{card.title}</p>
                      <p className="text-gray-600 text-xs">{card.label}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm sm:text-lg font-bold text-gray-900">{card.metric}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Side Skill Analysis Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute top-20 -right-4 sm:-right-8 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-3 sm:p-4 shadow-xl hidden sm:block"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <p className="text-white text-xs font-medium">Real-time Analytics</p>
                <p className="text-white text-xs opacity-80">24/7 Monitoring</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/skill-analysis" className="bg-white/90 backdrop-blur-sm text-blue-600 px-2 py-1 rounded text-xs font-medium hover:bg-white transition-all duration-300 inline-block shadow-lg">
                    View Insights
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom Skill Analysis Action Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-10 left-0 right-0 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-3 sm:p-4 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              animate={{
                x: [0, 10, 0],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                  </div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                  </div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/skill-analysis" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm sm:text-base inline-block shadow-lg backdrop-blur-sm">
                    Start Analysis
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

