'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home,
  User,
  Settings
} from 'lucide-react';

export default function DebugPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    setIsLoading(false);
    setDebugInfo({
      sessionStatus: status,
      hasSession: !!session,
      userEmail: session?.user?.email || 'No email',
      userName: session?.user?.name || 'No name',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      currentUrl: window.location.href
    });
  }, [session, status]);

  const testPages = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Skill Analysis', href: '/skill-analysis', icon: Settings },
    { name: 'Career Decision', href: '/career-decision', icon: User },
    { name: 'Resume Analyzer', href: '/resume-analyzer', icon: Settings },
    { name: 'Insights', href: '/insights', icon: Settings },
    { name: 'History', href: '/history', icon: Settings }
  ];

  const testPageAccess = async (href: string) => {
    try {
      const response = await fetch(href);
      return {
        status: response.status,
        ok: response.ok,
        url: href
      };
    } catch (error) {
      return {
        status: 'Error',
        ok: false,
        url: href,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  };

  const runAllTests = async () => {
    const results: any[] = [];
    for (const page of testPages) {
      const result = await testPageAccess(page.href);
      results.push({ ...page, ...result });
    }
    setDebugInfo((prev: any) => ({ ...prev, pageTests: results }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Debug Page</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Authentication Status */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-6 h-6 mr-3" />
              Authentication Status
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {status === 'authenticated' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : status === 'loading' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-medium">Status: {status}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {session ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-medium">Has Session: {session ? 'Yes' : 'No'}</span>
                </div>
                
                {session && (
                  <>
                    <div className="text-sm text-gray-600">
                      <strong>Email:</strong> {session.user?.email || 'No email'}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Name:</strong> {session.user?.name || 'No name'}
                    </div>
                  </>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <strong>Current URL:</strong> {debugInfo.currentUrl}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Timestamp:</strong> {debugInfo.timestamp}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>User Agent:</strong> {debugInfo.userAgent?.substring(0, 50)}...
                </div>
              </div>
            </div>
          </div>

          {/* Page Access Tests */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Settings className="w-6 h-6 mr-3" />
                Page Access Tests
              </h2>
              <button
                onClick={runAllTests}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Run Tests
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testPages.map((page) => (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <page.icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">{page.name}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <strong>URL:</strong> {page.href}
                    </div>
                    
                    {debugInfo.pageTests?.find((test: any) => test.href === page.href) && (
                      <div className="flex items-center space-x-2">
                        {debugInfo.pageTests.find((test: any) => test.href === page.href).ok ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm">
                          Status: {debugInfo.pageTests.find((test: any) => test.href === page.href).status}
                        </span>
                      </div>
                    )}
                    
                    <Link
                      href={page.href}
                      className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Test Link →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Debug Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Debug Information</h2>
            <pre className="bg-gray-100 rounded-lg p-4 overflow-auto text-sm">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/auth/signin"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="font-medium">Sign In</div>
                <div className="text-sm text-gray-600">Go to sign-in page</div>
              </Link>
              
              <Link
                href="/dashboard"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="font-medium">Dashboard</div>
                <div className="text-sm text-gray-600">Go to dashboard</div>
              </Link>
              
              <Link
                href="/resume-test"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="font-medium">Resume Test</div>
                <div className="text-sm text-gray-600">Test Gemini AI analysis</div>
              </Link>
              
              <Link
                href="/route-test"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="font-medium">Route Test</div>
                <div className="text-sm text-gray-600">Test page navigation</div>
              </Link>
              
              <Link
                href="/page-diagnostic"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="font-medium">Page Diagnostic</div>
                <div className="text-sm text-gray-600">Diagnose page issues</div>
              </Link>
              
              <button
                onClick={() => window.location.reload()}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="font-medium">Reload Page</div>
                <div className="text-sm text-gray-600">Refresh this page</div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
