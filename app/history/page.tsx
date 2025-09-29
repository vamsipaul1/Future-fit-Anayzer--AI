'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle,
  Target,
  Brain,
  FileText,
  Award,
  Home,
  BarChart3,
  User,
  Lightbulb
} from 'lucide-react';

export default function HistoryPage() {
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

  const activities = [
    {
      id: 1,
      type: 'skill_assessment',
      title: 'Python Developer Assessment',
      description: 'Completed advanced Python skills test',
      date: '2024-09-29',
      time: '10:30 AM',
      status: 'completed',
      score: 85,
      icon: <Brain className="w-5 h-5 text-blue-500" />
    },
    {
      id: 2,
      type: 'career_analysis',
      title: 'Career Path Analysis',
      description: 'Analyzed career alignment for Full Stack Developer',
      date: '2024-09-28',
      time: '2:15 PM',
      status: 'completed',
      score: 92,
      icon: <Target className="w-5 h-5 text-green-500" />
    },
    {
      id: 3,
      type: 'resume_scan',
      title: 'Resume Analysis',
      description: 'AI-powered resume analysis completed',
      date: '2024-09-27',
      time: '4:45 PM',
      status: 'completed',
      score: 78,
      icon: <FileText className="w-5 h-5 text-purple-500" />
    },
    {
      id: 4,
      type: 'skill_assessment',
      title: 'React Mastery Quiz',
      description: 'Completed React fundamentals assessment',
      date: '2024-09-26',
      time: '9:20 AM',
      status: 'completed',
      score: 88,
      icon: <Brain className="w-5 h-5 text-blue-500" />
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Skill Milestone Reached',
      description: 'Reached 1000+ skill points milestone',
      date: '2024-09-25',
      time: '6:30 PM',
      status: 'completed',
      score: null,
      icon: <Award className="w-5 h-5 text-yellow-500" />
    }
  ];

  const stats = [
    {
      title: 'Total Assessments',
      value: '12',
      change: '+3 this week',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Average Score',
      value: '87%',
      change: '+5% improvement',
      icon: <Target className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Skills Analyzed',
      value: '25',
      change: '+8 new skills',
      icon: <Brain className="w-6 h-6 text-purple-500" />
    },
    {
      title: 'Days Active',
      value: '15',
      change: '7-day streak',
      icon: <Calendar className="w-6 h-6 text-orange-500" />
    }
  ];

  return (
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
              <Link href="/insights" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <Lightbulb className="w-5 h-5" />
                <span>Insights</span>
              </Link>
              <Link href="/history" className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity History</h1>
              <p className="text-gray-600">Track your learning progress and achievements over time</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{stat.title}</h3>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </motion.div>
              ))}
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{activity.date}</span>
                          <Clock className="w-4 h-4 ml-2" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{activity.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {activity.status}
                        </span>
                        {activity.score && (
                          <span className="text-sm font-medium text-gray-700">
                            Score: {activity.score}%
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}