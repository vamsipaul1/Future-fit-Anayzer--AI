'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('sfdigdfkv@gmail.com');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded mb-4"></div>
          <div className="h-4 bg-gray-800 rounded mb-8"></div>
        </div>
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Get callback URL from search params
      const urlParams = new URLSearchParams(window.location.search);
      const callbackUrl = urlParams.get('callbackUrl') || '/dashboard';
      
      await signIn('google', { callbackUrl });
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: email.split('@')[0], // Use email prefix as name
          email, 
          password: 'temp-password-123' // Temporary password for email-only signup
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // After successful signup, sign in the user
        const signInResult = await signIn('credentials', {
          email,
          password: 'temp-password-123',
          callbackUrl: '/dashboard',
          redirect: false
        });

        if (signInResult?.ok) {
          router.push('/dashboard');
        } else {
          // If credentials signin fails, redirect to signin page
          router.push('/auth/signin?message=Account created successfully. Please sign in.');
        }
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch (error) {
      setError('An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Back to Home */}
        <div className="absolute top-8 left-8">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-md w-full text-center">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/images/even.png"
              alt="FutureFit Logo"
              className="w-16 h-16 mx-auto mb-4 rounded-lg"
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to FutureFit
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Your AI-Powered skill analysis platform
          </p>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white text-black py-4 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-6 shadow-lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* OR Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
              placeholder="Enter your work email..."
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Creating Account...
                </>
              ) : (
                'Creating Account...'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button 
                onClick={() => router.push('/auth/signin')}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
