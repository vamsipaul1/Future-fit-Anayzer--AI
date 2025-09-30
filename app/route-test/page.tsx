'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home,
  Settings,
  Target,
  Brain,
  BarChart3
} from 'lucide-react';

export default function RouteTestPage() {
  const router = useRouter();
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const testRoutes = [
    { name: 'Skill Analysis', href: '/skill-analysis', icon: BarChart3 },
    { name: 'Career Decision', href: '/career-decision', icon: Target },
    { name: 'Career Page', href: '/career', icon: Brain },
    { name: 'Resume Analyzer', href: '/resume-analyzer', icon: Settings },
    { name: 'Dashboard', href: '/dashboard', icon: Home }
  ];

  const testRouteAccess = async (href) => {
    try {
      const response = await fetch(href);
      return {
        status: response.status,
        ok: response.ok,
        url: href,
        contentType: response.headers.get('content-type'),
        size: response.headers.get('content-length') || 'unknown'
      };
    } catch (error) {
      return {
        status: 'Error',
        ok: false,
        url: href,
        error: error.message
      };
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    const results = {};
    
    for (const route of testRoutes) {
      const result = await testRouteAccess(route.href);
      results[route.href] = { ...route, ...result };
    }
    
    setTestResults(results);
    setIsLoading(false);
  };

  const navigateToRoute = (href) => {
    router.push(href);
  };

  useEffect(() => {
    runAllTests();
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
              Route Connection Test
            </h1>
            <p className="text-gray-600 mb-8">
              Testing all page routes and navigation connections
            </p>
          </div>

          {/* Test Button */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <button
              onClick={runAllTests}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Testing Routes...
                </>
              ) : (
                <>
                  <Settings className="w-5 h-5 mr-2" />
                  Run Route Tests
                </>
              )}
            </button>
          </div>

          {/* Route Test Results */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Route Test Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testRoutes.map((route) => {
                const result = testResults[route.href];
                return (
                  <motion.div
                    key={route.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <route.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{route.name}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <strong>URL:</strong> {route.href}
                      </div>
                      
                      {result && (
                        <>
                          <div className="flex items-center space-x-2">
                            {result.ok ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <span className="text-sm">
                              Status: {result.status}
                            </span>
                          </div>
                          
                          {result.contentType && (
                            <div className="text-sm text-gray-600">
                              <strong>Content-Type:</strong> {result.contentType}
                            </div>
                          )}
                          
                          {result.size && (
                            <div className="text-sm text-gray-600">
                              <strong>Size:</strong> {result.size}
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => navigateToRoute(route.href)}
                          className="flex-1 text-blue-600 hover:text-blue-800 text-sm font-medium py-1 px-2 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                        >
                          Navigate →
                        </button>
                        
                        <Link
                          href={route.href}
                          className="flex-1 text-green-600 hover:text-green-800 text-sm font-medium py-1 px-2 border border-green-200 rounded hover:bg-green-50 transition-colors text-center"
                        >
                          Link →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation Test */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Navigation Test</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center group"
                >
                  <route.icon className="w-8 h-8 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  <div className="font-medium">{route.name}</div>
                  <div className="text-sm text-gray-600">{route.href}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/dashboard"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="font-medium">Dashboard</div>
                <div className="text-sm text-gray-600">Go to dashboard</div>
              </Link>
              
              <Link
                href="/debug"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="font-medium">Debug Page</div>
                <div className="text-sm text-gray-600">Comprehensive diagnostics</div>
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
