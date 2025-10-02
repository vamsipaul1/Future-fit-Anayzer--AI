'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, ArrowRight, Sparkles, Star, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      description: 'Perfect for getting started with AI-powered resume analysis',
      price: 0,
      yearlyPrice: 0,
      badge: 'Most Popular',
      badgeColor: 'bg-gradient-to-r from-green-400 to-blue-500',
      cardGradient: 'from-slate-900 via-purple-900 to-slate-900',
      buttonText: 'Launch Free',
      buttonStyle: 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600',
      features: [
        'AI Resume Analysis',
        'Basic Skills Assessment', 
        'ATS Score Check',
        'Career Recommendations',
        '3 Analysis per month',
        'Email Support',
        'Resume Templates',
        'Basic Job Matching'
      ],
      icon: Rocket,
      upcoming: false
    },
    {
      id: 'pro',
      name: 'Pro Access',
      description: 'Advanced features for serious career advancement',
      price: 5,
      yearlyPrice: 50,
      badge: 'Upcoming',
      badgeColor: 'bg-gradient-to-r from-orange-400 to-red-500',
      cardGradient: 'from-orange-900 via-red-900 to-purple-900',
      buttonText: 'Coming Soon',
      buttonStyle: 'bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600',
      features: [
        'Everything in Free',
        'Unlimited Analysis',
        'Advanced AI Insights',
        'Industry-Specific Tips',
        'Cover Letter Generator',
        'Interview Preparation',
        'Salary Insights',
        'Priority Support',
        'LinkedIn Optimization',
        'Career Path Planning'
      ],
      icon: Crown,
      upcoming: true
    }
  ];

  const futureFeatures = [
    {
      title: 'AI Interview Coach',
      description: 'Practice interviews with AI-powered feedback',
      icon: '🎯',
      status: 'Q2 2024'
    },
    {
      title: 'Job Application Tracker',
      description: 'Track and manage all your applications in one place',
      icon: '📊',
      status: 'Q2 2024'
    },
    {
      title: 'Networking Assistant',
      description: 'AI-powered networking recommendations and outreach',
      icon: '🤝',
      status: 'Q3 2024'
    },
    {
      title: 'Skill Gap Analysis',
      description: 'Detailed analysis of skills needed for your dream job',
      icon: '🎓',
      status: 'Q3 2024'
    },
    {
      title: 'Resume Builder 2.0',
      description: 'Advanced resume builder with AI suggestions',
      icon: '✨',
      status: 'Q4 2024'
    },
    {
      title: 'Career Mentorship',
      description: 'Connect with industry mentors and experts',
      icon: '👨‍🏫',
      status: 'Q4 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-2 mb-8"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">ENHANCE VISUALS, SAVE TIME, STAY AHEAD</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
          >
            Choose Your Plan
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Start your career transformation journey with our AI-powered resume analysis platform
          </motion.p>

          {/* Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <span className={`text-lg ${!isYearly ? 'text-white font-semibold' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-1 transition-all duration-300"
              aria-label="Toggle between monthly and yearly billing"
              title="Toggle billing period"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-lg ${isYearly ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Yearly 
              <span className="ml-2 text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Save 17%</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 * index }}
                  onHoverStart={() => setHoveredCard(plan.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative group"
                >
                  {/* Card Background with Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.cardGradient} rounded-3xl opacity-80 group-hover:opacity-100 transition-all duration-500`}></div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-green-500/50 p-[2px] group-hover:p-[3px] transition-all duration-500">
                    <div className={`h-full w-full rounded-3xl bg-gradient-to-br ${plan.cardGradient}`}></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 h-full">
                    {/* Badge */}
                    {plan.badge && (
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className={`inline-flex items-center gap-2 ${plan.badgeColor} text-white text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-lg`}
                      >
                        <Star className="w-4 h-4" />
                        {plan.badge}
                      </motion.div>
                    )}

                    {/* Plan Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-gray-300 text-sm">{plan.description}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">
                          ${isYearly ? plan.yearlyPrice : plan.price}
                        </span>
                        <span className="text-gray-300">
                          /{isYearly ? 'year' : 'month'}
                        </span>
                      </div>
                      {isYearly && plan.price > 0 && (
                        <p className="text-green-400 text-sm mt-2">
                          Save ${(plan.price * 12) - plan.yearlyPrice} per year
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 + featureIndex * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-200">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      {plan.upcoming ? (
                        <button
                          disabled
                          className="w-full py-4 px-6 bg-gray-600 text-gray-300 rounded-2xl font-bold text-lg transition-all duration-300 cursor-not-allowed"
                        >
                          {plan.buttonText}
                        </button>
                      ) : (
                        <Link href="/auth/signup">
                          <button className={`w-full py-4 px-6 ${plan.buttonStyle} text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group`}>
                            {plan.buttonText}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </button>
                        </Link>
                      )}
                    </motion.div>
                  </div>

                  {/* Hover Effects */}
                  {hoveredCard === plan.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 rounded-3xl"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Future Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-7xl mx-auto px-6 py-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're constantly innovating to bring you the most advanced career development tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                  {feature.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center py-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already upgraded their careers with our AI-powered platform
          </p>
          <Link href="/speed-test">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <Zap className="w-5 h-5" />
              Test AI Analysis Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
