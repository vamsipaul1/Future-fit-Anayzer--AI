'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home,
  Settings,
  Target,
  Brain,
  BarChart3,
  FileText,
  RefreshCw
} from 'lucide-react';

export default function PageDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(false);

  const testPages = [
    { name: 'Skill Analysis', href: '/skill-analysis', icon: BarChart3 },
    { name: 'Resume Analyzer', href: '/resume-analyzer', icon: FileText },
    { name: 'Career Decision', href: '/career-decision', icon: Target },
    { name: 'Dashboard', href: '/dashboard', icon: Home }
  ];

  const runDiagnostics = async () => {
    setIsLoading(true);
    const results: { [key: string]: any } = {};
    
    for (const page of testPages) {
      try {
        const response = await fetch(page.href);
        const content = await response.text();
        
        results[page.href] = {
          ...page,
          status: response.status,
          ok: response.ok,
          contentLength: content.length,
          hasReactContent: content.includes('react') || content.includes('useState'),
          hasTailwindCSS: content.includes('tailwind') || content.includes('className'),
          hasFramerMotion: content.includes('framer-motion') || content.includes('motion'),
          hasContent: content.length > 1000,
          error: null
        };
      } catch (error) {
        results[page.href] = {
          ...page,
          status: 'Error',
          ok: false,
          contentLength: 0,
          hasReactContent: false,
          hasTailwindCSS: false,
          hasFramerMotion: false,
          hasContent: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
    
    setDiagnostics(results);
    setIsLoading(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Page Diagnostic Tool
            </h1>
            <p className="text-gray-600 mb-8">
              Diagnosing skill analysis and resume scan page issues
            </p>
          </div>

          {/* Test Button */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <button
              onClick={runDiagnostics}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Running Diagnostics...
                </>
              ) : (
                <>
                  <Settings className="w-5 h-5 mr-2" />
                  Run Diagnostics
                </>
              )}
            </button>
          </div>

          {/* Diagnostic Results */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Diagnostic Results</h2>
            
            <div className="space-y-6">
              {testPages.map((page) => {
                const result = diagnostics[page.href];
                if (!result) return null;
                
                return (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <page.icon className="w-6 h-6 text-gray-600" />
                        <h3 className="text-xl font-semibold text-gray-900">{page.name}</h3>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {result.ok ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="text-sm font-medium">
                          Status: {result.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">{result.contentLength}</div>
                        <div className="text-sm text-gray-600">Content Length</div>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {result.hasContent ? '✅' : '❌'}
                        </div>
                        <div className="text-sm text-gray-600">Has Content</div>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {result.hasReactContent ? '✅' : '❌'}
                        </div>
                        <div className="text-sm text-gray-600">React Content</div>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {result.hasTailwindCSS ? '✅' : '❌'}
                        </div>
                        <div className="text-sm text-gray-600">Tailwind CSS</div>
                      </div>
                    </div>
                    
                    {result.error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="text-red-800 font-medium">Error:</div>
                        <div className="text-red-700 text-sm">{result.error}</div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex space-x-3">
                      <Link
                        href={page.href}
                        className="flex-1 text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Visit Page
                      </Link>
                      
                      <button
                        onClick={() => window.open(page.href, '_blank')}
                        className="flex-1 text-center py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Open in New Tab
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={refreshPage}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <RefreshCw className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <div className="font-medium">Refresh Page</div>
                <div className="text-sm text-gray-600">Reload this page</div>
              </button>
              
              <Link
                href="/dashboard"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <Home className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <div className="font-medium">Dashboard</div>
                <div className="text-sm text-gray-600">Go to dashboard</div>
              </Link>
              
              <Link
                href="/debug"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <Settings className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <div className="font-medium">Debug Page</div>
                <div className="text-sm text-gray-600">Comprehensive diagnostics</div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
