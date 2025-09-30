'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Zap, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Resume Analyzer', href: '/resume-analyzer' },
    { name: 'Career Discovery', href: '/career' },
    { name: 'Skill Analysis', href: '/skill-analysis' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-50/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left Side - Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Image
                src="/images/even.png"
                alt="FutureFit Logo"
                width={48}
                height={48}
                className="rounded-xl shadow-lg object-contain border-2 border-white/20 hover:border-white/40 transition-all duration-300"
                priority
                unoptimized
              />
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-700 group-hover:text-gray-600 transition-colors duration-300">
                FutureFit
              </span>
              <span className="text-xs text-gray-500 -mt-1">AI-Powered Learning</span>
            </div>
          </Link>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Link
                  href={link.href}
                  className="font-medium text-sm transition-all duration-500 text-gray-600 hover:text-gray-900 hover:scale-105 relative group"
                >
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-800" />
                  <span className="text-sm text-gray-600">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-800 hover:text-gray-900 font-medium text-sm transition-colors duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-gray-800 hover:text-gray-900 font-medium text-sm transition-colors duration-300"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-black text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg border border-gray-200"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block font-medium text-sm transition-all duration-500 py-2 text-gray-600 hover:text-gray-900 hover:translate-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {session ? (
                    <>
                      <div className="flex items-center space-x-2 py-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {session.user?.name || session.user?.email}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-300 py-2"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/signin"
                        className="block text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/signup"
                        className="block w-full bg-black text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all duration-300 text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;