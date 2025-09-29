'use client';

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import BackButton from '../../components/BackButton'
import AIChatbot from '../../components/AIChatbot'
import { 
  ArrowLeft,
  Brain,
  Map,
  Target,
  TrendingUp,
  BookOpen,
  Zap,
  BarChart3
} from 'lucide-react'

export default function CareerDecisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-40">
        <BackButton />
      </div>

      {/* AI Chatbot */}
      <AIChatbot context="career" />
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            opacity: 0.6
          }}
        />
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full opacity-20 blur-xl"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <Link href="/dashboard" className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Career Path</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Decide how you want to explore your career journey: through AI-powered analysis or a guided roadmap.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Career Path Analysis */}
          <Link href="/career" passHref>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Career Path Analysis</h2>
              <p className="text-gray-600 mb-6">
                Take an AI-powered quiz to discover your ideal career matches based on your interests and skills.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Start Assessment
              </motion.button>
            </motion.div>
          </Link>

          {/* Career Path Roadmap */}
          <Link href="/career-roadmap" passHref>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Map className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Career Path Roadmap</h2>
              <p className="text-gray-600 mb-6">
                Explore detailed, step-by-step learning roadmaps for specific career domains.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explore Roadmaps
              </motion.button>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}
