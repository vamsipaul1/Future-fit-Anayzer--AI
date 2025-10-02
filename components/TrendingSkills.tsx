'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, Palette, Shield, Cloud, Zap, TrendingUp, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

const TrendingSkills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const skills = [
    {
      icon: Code,
      name: 'Web Development',
      gap: 35,
      hours: 120,
      growth: '+15%',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:from-blue-600 hover:to-purple-700',
      iconBg: 'bg-blue-100',
      demand: 'High',
      salary: '$75K+',
    },
    {
      icon: Database,
      name: 'Data Science',
      gap: 45,
      hours: 150,
      growth: '+22%',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      iconBg: 'bg-green-100',
      demand: 'Very High',
      salary: '$95K+',
    },
    {
      icon: Palette,
      name: 'UI/UX Design',
      gap: 28,
      hours: 90,
      growth: '+18%',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      hoverColor: 'hover:from-pink-600 hover:to-rose-700',
      iconBg: 'bg-pink-100',
      demand: 'High',
      salary: '$65K+',
    },
    {
      icon: Cloud,
      name: 'Cloud Computing',
      gap: 52,
      hours: 180,
      growth: '+30%',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50',
      hoverColor: 'hover:from-cyan-600 hover:to-blue-700',
      iconBg: 'bg-cyan-100',
      demand: 'Very High',
      salary: '$85K+',
    },
    {
      icon: Shield,
      name: 'Cybersecurity',
      gap: 38,
      hours: 160,
      growth: '+25%',
      color: 'from-red-500 to-orange-600',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:from-red-600 hover:to-orange-700',
      iconBg: 'bg-red-100',
      demand: 'Very High',
      salary: '$90K+',
    },
    {
      icon: Zap,
      name: 'AI/ML',
      gap: 48,
      hours: 200,
      growth: '+35%',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:from-purple-600 hover:to-indigo-700',
      iconBg: 'bg-purple-100',
      demand: 'Very High',
      salary: '$100K+',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skills sequentially
            skills.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSkills(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="trending-skills" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-100/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-100/30 rounded-full blur-2xl animate-pulse animation-delay-1s"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-100/20 rounded-full blur-3xl animate-pulse animation-delay-2s"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium mb-6 shadow-lg border border-blue-200">
            <TrendingUp className="w-4 h-4 mr-2" />
            High-Demand Skills
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Master the Skills That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Matter Most
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the most sought-after skills in today's job market and get personalized learning paths to master them.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`${skill.bgColor} rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group border border-gray-100 relative overflow-hidden ${
                visibleSkills.includes(index) ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse animation-delay-1s"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${skill.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative`}>
                    <skill.icon className="h-7 w-7 text-gray-700 group-hover:text-gray-800 transition-colors duration-300" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      {skill.growth}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">{skill.demand}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                  {skill.name}
                </h3>

                {/* Salary Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-sm font-semibold text-gray-700 mb-4 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 mr-1" />
                  {skill.salary}
                </div>

                <div className="space-y-4">
                  {/* Skill Gap */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Skill Gap</span>
                      <span className="font-medium text-gray-900">{skill.gap}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div 
                        className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                          skill.gap === 35 ? 'w-35' : 
                          skill.gap === 45 ? 'w-45' : 
                          skill.gap === 28 ? 'w-28' : 
                          skill.gap === 52 ? 'w-52' : 
                          skill.gap === 38 ? 'w-38' : 
                          skill.gap === 48 ? 'w-48' : 'w-full'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Hours */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Suggested Learning</span>
                    <span className="font-semibold text-gray-900">{skill.hours}h</span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/signup"
                    className="w-full mt-4 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 text-gray-700 hover:text-gray-900 py-3 px-4 rounded-lg font-medium transition-all duration-300 group-hover:shadow-md block text-center relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Start Learning Path
                      <Sparkles className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center group">
            <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">500+</div>
            <div className="text-gray-600">Skills Tracked</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">10K+</div>
            <div className="text-gray-600">Learning Paths</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">24/7</div>
            <div className="text-gray-600">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSkills;
