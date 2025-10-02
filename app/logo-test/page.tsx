'use client';

import React, { useState } from 'react';
import Logo from '../../components/ui/Logo';

export default function LogoTestPage() {
  const [serverStatus, setServerStatus] = useState('Checking...');

  const checkServer = async () => {
    try {
      const response = await fetch('/images/even.png', { method: 'HEAD' });
      if (response.ok) {
        setServerStatus('✅ Server running - even.png accessible');
      } else {
        setServerStatus('❌ Server running but even.png not accessible');
      }
    } catch (error) {
      setServerStatus('❌ Server not running or error occurred');
    }
  };

  React.useEffect(() => {
    checkServer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Logo Test Page - Debug Mode</h1>
        
        <div className="mb-8 bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Debug Information:</h2>
          <p className="text-sm">Server Status: {serverStatus}</p>
          <p className="text-sm">Check browser console for logo loading messages</p>
          <button 
            onClick={checkServer}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Refresh Server Check
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Navigation Logo */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Navigation Logo</h3>
            <Logo size="md" showText={true} variant="navigation" />
          </div>
          
          {/* Auth Logo */}
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-white">Auth Logo</h3>
            <Logo size="lg" showText={true} variant="auth" />
          </div>
          
          {/* Default Logo */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Default Logo</h3>
            <Logo size="md" showText={true} variant="default" />
          </div>
          
          {/* Large Logo */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Large Logo</h3>
            <Logo size="xl" showText={true} variant="default" />
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Direct Image Test</h3>
          <div className="flex space-x-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">even.png (Primary)</p>
              <img 
                src="/images/even.png" 
                alt="even.png" 
                className="w-16 h-16 object-contain border"
                onError={(e) => console.error('even.png failed to load')}
                onLoad={() => console.log('even.png loaded successfully')}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">brandlogo.jpg</p>
              <img 
                src="/images/brandlogo.jpg" 
                alt="brandlogo.jpg" 
                className="w-16 h-16 object-contain border"
                onError={(e) => console.error('brandlogo.jpg failed to load')}
                onLoad={() => console.log('brandlogo.jpg loaded successfully')}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">image.png</p>
              <img 
                src="/images/image.png" 
                alt="image.png" 
                className="w-16 h-16 object-contain border"
                onError={(e) => console.error('image.png failed to load')}
                onLoad={() => console.log('image.png loaded successfully')}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="flex space-x-4">
            <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Landing Page</a>
            <a href="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Sign Up</a>
            <a href="/auth/signin" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Sign In</a>
            <a href="/dashboard" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Dashboard</a>
          </div>
        </div>
        
        <div className="mt-8 bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Troubleshooting Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Make sure the development server is running (npm run dev)</li>
            <li>Check browser console for any error messages</li>
            <li>Verify that even.png exists in public/images/ directory</li>
            <li>Try accessing /images/even.png directly in browser</li>
            <li>Clear browser cache and refresh</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
