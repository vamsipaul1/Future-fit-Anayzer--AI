'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Resume Analyzer', href: '/resume-analyzer' },
    { name: 'Career Discovery', href: '/career' },
    { name: 'Skill Analysis', href: '/analyze' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-50/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left Side - Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img
              src="/images/even.png"
              alt="FutureFit Logo"
              width={40}
              height={40}
              className="rounded-lg shadow-sm object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-700 group-hover:text-gray-600 transition-colors duration-300">
                FutureFit
              </span>
              <span className="text-xs text-gray-500 -mt-1">AI-Powered Learning</span>
            </div>
          </Link>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-sm transition-colors duration-300 text-gray-600 hover:text-gray-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-300"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-black text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </Link>
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
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block font-medium text-sm transition-colors duration-300 py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
