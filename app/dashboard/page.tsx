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
  LogOut
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <h1 className="text-xl font-bold text-gray-900">FutureFit</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Welcome, {session.user?.name || session.user?.email}
            </div>
            <button 
              onClick={handleSignOut}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors" 
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white min-h-[calc(100vh-73px)]">
          <nav className="p-6">
            <div className="space-y-2">
              <Link href="/dashboard" className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/career-decision" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <Target className="w-5 h-5" />
                <span>Career Path</span>
              </Link>
              <Link href="/analyze" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <Brain className="w-5 h-5" />
                <span>Skill Analysis</span>
              </Link>
              <Link href="/resume-analyzer" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                <FileText className="w-5 h-5" />
                <span>Resume Analysis</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
              <p className="text-gray-600">Let's continue building your future career path.</p>
            </motion.div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link href="/career-decision" className="block">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Career Path</h3>
                    <p className="text-gray-600 mb-4">Discover your ideal career through AI analysis or explore structured roadmaps.</p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link href="/analyze" className="block">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <Brain className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Skill Analysis</h3>
                    <p className="text-gray-600 mb-4">Analyze your current skills and get personalized improvement recommendations.</p>
                    <div className="flex items-center text-green-600 font-medium">
                      <span>Analyze Skills</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link href="/resume-analyzer" className="block">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Resume Analysis</h3>
                    <p className="text-gray-600 mb-4">Get AI-powered feedback on your resume and improvement suggestions.</p>
                    <div className="flex items-center text-purple-600 font-medium">
                      <span>Upload Resume</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Welcome to FutureFit! Start your career journey.</span>
                  <span className="text-gray-500 text-sm ml-auto">Just now</span>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}