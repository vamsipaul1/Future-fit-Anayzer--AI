'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);
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
          name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
          email, 
          password: 'temp-password-123'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const signInResult = await signIn('credentials', {
          email,
          password: 'temp-password-123',
          callbackUrl: '/dashboard',
          redirect: false
        });

        if (signInResult?.ok) {
          router.push('/dashboard');
        } else {
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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="mb-6"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-16 h-16 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center shadow-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300"
          >
            <Image
              src="/images/even.png"
              alt="FutureFit Logo"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-gray-300 mb-3"
        >
          Welcome to FutureFit
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-400 text-base mb-6"
        >
          Start publishing now.
        </motion.p>

        {/* Error Display */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
          >
            <p className="text-red-200 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Google Sign In Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-4 shadow-lg"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </motion.button>

        {/* OR Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center mb-4"
        >
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </motion.div>

        {/* Email Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          onSubmit={handleEmailSignUp} 
          className="space-y-3"
        >
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
              placeholder="First name"
            />
            <motion.input
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
              placeholder="Last name"
            />
          </div>

          {/* Email Field */}
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
            placeholder="Enter your work email..."
          />

          {/* Subscribe Checkbox */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center justify-start"
          >
            <button
              type="button"
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-colors ${
                isSubscribed 
                  ? 'bg-white border-white' 
                  : 'bg-transparent border-gray-400'
              }`}
            >
              {isSubscribed && (
                <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <span className="text-gray-400 text-sm">Subscribe to our email updates</span>
          </motion.div>

          {/* Continue Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                Creating Account...
              </>
            ) : (
              'Continue'
            )}
          </motion.button>
        </motion.form>

        {/* Legal Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-6 text-sm text-gray-400"
        >
          By signing up you agree to our{' '}
          <button className="text-white hover:text-gray-300 underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-white hover:text-gray-300 underline">Privacy Policy</button>
        </motion.div>

        {/* Sign In Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-4"
        >
          <p className="text-gray-400">
            Already have an account?{' '}
            <button 
              onClick={() => router.push('/auth/signin')}
              className="text-white hover:text-gray-300 underline"
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
