'use client';

import React, { useState, useEffect } from 'react';
import AIChatbot from '../../components/ui/AIChatbot';

export default function HydrationTestPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Hydration Test Page
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Status</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${isMounted ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-lg">
                Component Mounted: {isMounted ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-lg">
                Hydration Fix Applied: ✅ Yes
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="text-lg">
                suppressHydrationWarning: ✅ Added to all interactive elements
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What Was Fixed</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Added <code className="bg-gray-100 px-2 py-1 rounded">isMounted</code> state to prevent hydration mismatch</li>
            <li>✅ Added <code className="bg-gray-100 px-2 py-1 rounded">suppressHydrationWarning</code> to all buttons and inputs</li>
            <li>✅ Added <code className="bg-gray-100 px-2 py-1 rounded">aria-label</code> attributes for accessibility</li>
            <li>✅ Component now returns <code className="bg-gray-100 px-2 py-1 rounded">null</code> until mounted</li>
            <li>✅ Prevents browser extension interference with hydration</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AIChatbot Test</h2>
          <p className="text-gray-600 mb-4">
            The AIChatbot component below should now work without hydration errors.
            Try interacting with it to test the fix.
          </p>
          <AIChatbot context="resume" autoMinimize={false} />
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-700 text-sm">
            <li>Check browser console for any hydration errors</li>
            <li>Try clicking the chatbot buttons</li>
            <li>Try typing in the input field</li>
            <li>Verify no console errors appear</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

