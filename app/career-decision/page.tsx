'use client';

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import BackButton from '../../components/ui/BackButton'
import AIChatbot from '../../components/ui/AIChatbot'
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

import AuthGuard from '../../components/AuthGuard';

export default function CareerDecisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-40">
        <BackButton />
      </div>

      {/* AI Chatbot */}
      <AIChatbot context="career" autoMinimize={true} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <Link href="/dashboard" className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Career Path</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Decide how you want to explore your career journey: through AI-powered analysis or a guided roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Career Path Analysis */}
          <Link href="/career" passHref>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-200/50 cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-200 transition-colors">
                <Brain className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Career Path Analysis</h2>
              <p className="text-gray-600 mb-6">
                Take an AI-powered quiz to discover your ideal career matches based on your interests and skills.
              </p>
              <button className="mt-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300">
                Start Assessment
              </button>
            </div>
          </Link>

          {/* Career Path Roadmap */}
          <Link href="/career-roadmap" passHref>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Map className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Career Path Roadmap</h2>
              <p className="text-gray-600 mb-6">
                Explore detailed, step-by-step learning roadmaps for specific career domains.
              </p>
              <button className="mt-auto px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300">
                Explore Roadmaps
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
