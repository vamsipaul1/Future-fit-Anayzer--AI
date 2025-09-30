'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  Lightbulb,
  TrendingUp,
  Target,
  Brain,
  Award,
  Calendar,
  Clock,
  BarChart3,
  Home,
  FileText,
  User
} from 'lucide-react';

import AuthGuard from '../../components/AuthGuard';

export default function InsightsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const insights = [
    {
      id: 1,
      title: "Skill Growth Trend",
      description: "Your Python skills have improved by 25% this month",
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      color: "bg-green-100",
      trend: "+25%"
    },
    {
      id: 2,
      title: "Career Alignment",
      description: "Your current skills align 85% with Full Stack Developer role",
      icon: <Target className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-100",
      trend: "85%"
    },
    {
      id: 3,
      title: "Learning Efficiency",
      description: "You're learning 30% faster than average",
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-100",
      trend: "+30%"
    },
    {
      id: 4,
      title: "Achievement Unlocked",
      description: "Completed 5 skill assessments this week",
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      color: "bg-yellow-100",
      trend: "5"
    }
  ];

  const recommendations = [
    {
      title: "Focus on React Advanced Concepts",
      description: "Based on your current progress, you should focus on React hooks and state management",
      priority: "High",
      category: "Skills"
    },
    {
      title: "Consider AI/ML Specialization",
      description: "Your analytical skills suggest you'd excel in AI/ML roles",
      priority: "Medium",
      category: "Career"
    },
    {
      title: "Build Portfolio Projects",
      description: "Create 2-3 projects to showcase your Full Stack skills",
      priority: "High",
      category: "Portfolio"
    }
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-4 py-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{session.user?.name || 'User'}</div>
                <div className="text-gray-500">{session.user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white min-h-[calc(100vh-73px)]">
          <div className="p-6">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <img
                src="/images/even.png"
                alt="FutureFit Logo"
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold">FutureFit</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/analyze" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>Skills</span>
              </Link>
              <Link href="/career-decision" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <Target className="w-5 h-5" />
                <span>Career Path</span>
              </Link>
              <Link href="/resume-analyzer" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <FileText className="w-5 h-5" />
                <span>Resume Scan</span>
              </Link>
              <Link href="/insights" className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <Lightbulb className="w-5 h-5" />
                <span>Insights</span>
              </Link>
              <Link href="/history" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <Clock className="w-5 h-5" />
                <span>History</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Insights & Analytics</h1>
              <p className="text-gray-600">Discover patterns in your learning journey and get personalized recommendations</p>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {insights.map((insight) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${insight.color} rounded-lg flex items-center justify-center`}>
                      {insight.icon}
                    </div>
                    <span className="text-lg font-bold text-gray-900">{insight.trend}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personalized Recommendations</h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      rec.priority === 'High' ? 'bg-red-500' : 
                      rec.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rec.priority === 'High' ? 'bg-red-100 text-red-800' : 
                          rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {rec.priority} Priority
                        </span>
                      </div>
                      <p className="text-gray-600">{rec.description}</p>
                      <span className="text-sm text-blue-600 font-medium">{rec.category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </AuthGuard>
  );
}