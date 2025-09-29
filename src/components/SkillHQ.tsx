import React from "react";
import { Users, Layers, Upload, Target, Calendar } from "lucide-react";
import Link from "next/link";

export const SkillHQ = () => {
  return (
    <div className="p-6">
      {/* Greeting */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Welcome Back, <span className="text-indigo-600">Alex Johnson</span>!
      </h1>
      <p className="text-gray-500 mb-8">
        Your personalized skill intelligence dashboard.
      </p>

      {/* Top Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 flex flex-col items-center">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-2xl shadow-lg">
              85%
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">Resilience Score</h3>
            <p className="text-sm text-gray-500">Your adaptability level</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-100 flex flex-col items-center justify-center">
          <Users className="w-10 h-10 text-green-500 mb-2 p-1 bg-green-100 rounded-full" />
          <span className="text-4xl font-extrabold text-gray-800">+25%</span>
          <h3 className="mt-2 text-lg font-semibold text-gray-700">Avg. Growth Rate</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-yellow-100 flex flex-col items-center justify-center">
          <Layers className="w-10 h-10 text-yellow-600 mb-2 p-1 bg-yellow-100 rounded-full" />
          <span className="text-4xl font-extrabold text-gray-800">50</span>
          <h3 className="mt-2 text-lg font-semibold text-gray-700">Skills Analyzed</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-yellow-100 flex flex-col items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">Mastering Async JS</h3>
            <p className="text-sm text-gray-500 mt-1">Quick dive into Promises/Async/Await.</p>
            <button className="mt-3 px-4 py-2 bg-yellow-500 text-white text-sm font-bold rounded-lg shadow hover:bg-yellow-600 transition">
              Start 10-min Lesson
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <Link
          href="/analyze"
          className="p-6 text-white rounded-xl shadow-lg transition hover:opacity-90 flex flex-col items-center gradient-indigo"
        >
          <Target className="w-8 h-8 mb-2" />
          <span className="font-semibold">Analyze Skills Now</span>
        </Link>

        <Link
          href="/career"
          className="p-6 text-white rounded-xl shadow-lg transition hover:opacity-90 flex flex-col items-center gradient-green"
        >
          <Target className="w-8 h-8 mb-2" />
          <span className="font-semibold">Career Path Quiz</span>
        </Link>

        <Link
          href="/resume"
          className="p-6 text-white rounded-xl shadow-lg transition hover:opacity-90 flex flex-col items-center gradient-pink"
        >
          <Upload className="w-8 h-8 mb-2" />
          <span className="font-semibold">Resume Skill Scan</span>
        </Link>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-pink-100 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Milestones</h3>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 text-white p-2 rounded-full bg-blue-500">✓</div>
              <span className="text-xs mt-2 text-gray-600">React Novice</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 text-white p-2 rounded-full bg-green-500">✓</div>
              <span className="text-xs mt-2 text-gray-600">Node.js Starter</span>
            </div>
            <div className="flex flex-col items-center opacity-50">
              <div className="w-8 h-8 text-white p-2 rounded-full bg-gray-400">○</div>
              <span className="text-xs mt-2 text-gray-600">Python Intermediate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Goal */}
      <div className="p-6 bg-gray-100 rounded-xl border border-gray-200">
        <p className="text-sm text-gray-600 flex items-center">
          <Calendar className="w-4 h-4 mr-2" /> Weekly Goal: Complete one
          module in Node.js Scalability. Time remaining: 5 days.
        </p>
      </div>
    </div>
  );
};
