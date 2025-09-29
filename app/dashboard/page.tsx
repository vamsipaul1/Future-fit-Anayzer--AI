'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
  Star
} from 'lucide-react';

export default function DashboardPage() {
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

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const skills = [
    {
      id: 1,
      title: "Python Developer",
      instructor: "By Dr. Sarah Chen",
      level: "ADVANCED",
      levelColor: "bg-green-500",
      progress: 15,
      total: 27,
      progressColor: "bg-blue-500",
      country: "USA",
      icon: "🐍"
    },
    {
      id: 2,
      title: "React Mastery",
      instructor: "By Alex Johnson",
      level: "INTERMEDIATE",
      levelColor: "bg-yellow-500",
      progress: 18,
      total: 30,
      progressColor: "bg-purple-500",
      country: "Canada",
      icon: "⚛️"
    },
    {
      id: 3,
      title: "AI Fundamentals",
      instructor: "By Prof. Michael Lee",
      level: "BEGINNERS",
      levelColor: "bg-blue-500",
      progress: 5,
      total: 30,
      progressColor: "bg-pink-500",
      country: "UK",
      icon: "🤖"
    },
    {
      id: 4,
      title: "Data Science Pro",
      instructor: "By Dr. Emily Wang",
      level: "ADVANCED",
      levelColor: "bg-green-500",
      progress: 24,
      total: 30,
      progressColor: "bg-green-500",
      country: "Germany",
      icon: "📊"
    }
  ];

  const learningPaths = [
    {
      title: "Full Stack Development",
      progress: 80,
      icon: <Rocket className="w-6 h-6 text-orange-500" />,
      color: "bg-orange-500"
    },
    {
      title: "AI/ML Specialist",
      progress: 40,
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Back to Home
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors" title="Search">
              <Search className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-4 py-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{session.user?.name || 'User'}</div>
                <div className="text-gray-500">{session.user?.email}</div>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/analyze')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              + Analyze Now
            </button>
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
              <Link href="/dashboard" className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
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
              <Link href="/insights" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
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
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome, {session.user?.name?.split(' ')[0] || 'User'}!
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Skills */}
              <div className="lg:col-span-2">
                {/* Skills Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Skills</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">Filters</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                        <Bookmark className="w-4 h-4" />
                        <span className="text-sm">Saved</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Sort by</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                      PREMIUM 15 skills
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl">
                            {skill.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{skill.title}</h3>
                            <p className="text-sm text-gray-500">{skill.instructor}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${skill.levelColor}`}>
                            {skill.level}
                          </span>
                          <span className="text-sm text-gray-500">{skill.country}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{skill.progress}/{skill.total} tasks</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${skill.progressColor} transition-all duration-300`}
                            style={{ width: `${(skill.progress / skill.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Learning Plans */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Learning Plans</h3>
                  <div className="space-y-4">
                    {learningPaths.map((path, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {path.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-900">{path.title}</span>
                            <span className="text-sm text-gray-500">Learning Path</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${path.color} transition-all duration-300`}
                              style={{ width: `${path.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Portfolio */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Portfolio</h3>
                  <div className="relative bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg p-6 text-white">
                    <div className="absolute top-2 right-2">
                      <Crown className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">20% off Premium</h4>
                    <p className="text-sm opacity-90">Upgrade your learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}