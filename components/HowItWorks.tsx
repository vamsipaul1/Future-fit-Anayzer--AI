'use client';

import React, { useEffect, useRef } from 'react';
import { Search, Target, BookOpen, Trophy, ArrowRight, Sparkles, Zap } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      icon: Search,
      title: 'Skill Assessment',
      description: 'Take our AI-powered assessment to identify your current skill levels and knowledge gaps.',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:from-blue-600 hover:to-purple-700',
      iconBg: 'bg-blue-100',
      number: '01',
    },
    {
      icon: Target,
      title: 'Personalized Path',
      description: 'Get a customized learning roadmap tailored to your career goals and skill gaps.',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      iconBg: 'bg-green-100',
      number: '02',
    },
    {
      icon: BookOpen,
      title: 'Learn & Practice',
      description: 'Access curated content, hands-on projects, and interactive exercises to master new skills.',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:from-orange-600 hover:to-red-700',
      iconBg: 'bg-orange-100',
      number: '03',
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Monitor your advancement with real-time analytics and earn certificates for completed milestones.',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:from-purple-600 hover:to-pink-700',
      iconBg: 'bg-purple-100',
      number: '04',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(0);
            // Animate steps sequentially
            steps.forEach((_, index) => {
              setTimeout(() => {
                setActiveStep(index);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl animate-pulse animation-delay-1s"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-200/10 rounded-full blur-2xl animate-pulse animation-delay-2s"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-blue-600 font-medium mb-6 shadow-lg border border-blue-200">
            <Sparkles className="w-4 h-4 mr-2" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Journey to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Success
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-driven platform makes skill development simple, personalized, and effective. Here's how we help you succeed.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Step Card */}
              <div className={`${step.bgColor} rounded-2xl p-6 h-full hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group-hover:-translate-y-2 border border-gray-100 relative overflow-hidden`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors duration-300">
                  {step.number}
                </div>

                <div className="text-center relative z-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 ${step.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative`}>
                    <step.icon className="h-10 w-10 text-gray-700 group-hover:text-gray-800 transition-colors duration-300" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" />
                  </div>
                </div>
              )}

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse animation-delay-1s"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border border-gray-200 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-yellow-500 mr-3 animate-pulse" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Ready to Start Your Journey?
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Join thousands of professionals who have accelerated their careers with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </a>
                <a
                  href="/signup"
                  className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Take Assessment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
