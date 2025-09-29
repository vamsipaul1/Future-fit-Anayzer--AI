'use client';

import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  const benefits = [
    'Free skill assessment',
    'Personalized learning paths',
    'Real-time progress tracking',
    'Industry benchmarking',
    '24/7 AI support',
    'Job scan analysis'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300 opacity-15 rounded-full animate-pulse animation-delay-1s"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white opacity-10 rounded-full animate-bounce animation-delay-2s"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Start Your Journey Today
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Close Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Skill Gap?
            </span>
          </h2>

          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join over 10,000 professionals who have accelerated their careers with our AI-powered skill development platform.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-white/90 text-sm">
                <CheckCircle className="w-4 h-4 text-green-300 mr-2 flex-shrink-0" />
                {benefit}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/signup"
              className="group bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span>100+ active users</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex text-yellow-300 mr-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <span>4.9/5 rating</span>
            </div>
            
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-300 mr-2" />
              <span> 100% free to use</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default CTA;
