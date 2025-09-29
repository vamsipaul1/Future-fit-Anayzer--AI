'use client';

import { useState } from 'react';

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'daily-focus', label: 'Daily Focus' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'resilience', label: 'Resilience' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Insights Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track your progress and gain valuable insights
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'daily-focus' && <DailyFocusTab />}
            {activeTab === 'milestones' && <MilestonesTab />}
            {activeTab === 'resilience' && <ResilienceTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  const stats = [
    { label: 'Skills Learned', value: '24', change: '+12%' },
    { label: 'Hours Studied', value: '156', change: '+8%' },
    { label: 'Projects Completed', value: '8', change: '+25%' },
    { label: 'Certifications', value: '3', change: '+50%' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-800">Completed React course</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-blue-800">Started Node.js project</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-blue-800">Updated portfolio</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Upcoming Goals</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-green-800">Complete JavaScript certification</span>
              <span className="text-sm text-green-600">2 weeks</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-800">Build 3 new projects</span>
              <span className="text-sm text-green-600">1 month</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-800">Learn TypeScript</span>
              <span className="text-sm text-green-600">3 weeks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>JavaScript</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>React</span>
                <span>70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Node.js</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Spent</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>This Week</span>
              <span className="font-semibold">24 hours</span>
            </div>
            <div className="flex justify-between">
              <span>This Month</span>
              <span className="font-semibold">96 hours</span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">456 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DailyFocusTab() {
  const todayTasks = [
    { task: 'Complete React hooks tutorial', completed: true },
    { task: 'Practice coding challenges', completed: false },
    { task: 'Update portfolio project', completed: false },
    { task: 'Read tech articles', completed: true }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Daily Focus</h2>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Tasks</h3>
        <div className="space-y-3">
          {todayTasks.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={item.completed}
                readOnly
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className={item.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                {item.task}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Focus Area</h3>
        <p className="text-blue-800">
          Today's focus is on mastering React hooks and state management. 
          Spend 2 hours on hands-on practice and 1 hour on theory.
        </p>
      </div>
    </div>
  );
}

function MilestonesTab() {
  const milestones = [
    { title: 'First Project', date: '2024-01-15', status: 'completed' },
    { title: 'JavaScript Certification', date: '2024-02-20', status: 'completed' },
    { title: 'React Portfolio', date: '2024-03-10', status: 'completed' },
    { title: 'Full-Stack App', date: '2024-04-05', status: 'in-progress' },
    { title: 'Open Source Contribution', date: '2024-05-01', status: 'pending' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Milestones</h2>
      
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${
              milestone.status === 'completed' ? 'bg-green-500' :
              milestone.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
            }`}></div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
              <p className="text-sm text-gray-600">{milestone.date}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
              milestone.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {milestone.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResilienceTab() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Resilience Score</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Score</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">8.5</div>
            <p className="text-gray-600">Out of 10</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Factors</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Problem Solving</span>
              <span className="font-semibold text-green-600">9/10</span>
            </div>
            <div className="flex justify-between">
              <span>Adaptability</span>
              <span className="font-semibold text-green-600">8/10</span>
            </div>
            <div className="flex justify-between">
              <span>Persistence</span>
              <span className="font-semibold text-yellow-600">7/10</span>
            </div>
            <div className="flex justify-between">
              <span>Learning Speed</span>
              <span className="font-semibold text-green-600">9/10</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Recommendations</h3>
        <ul className="text-blue-800 space-y-2">
          <li>• Focus on building persistence through consistent daily practice</li>
          <li>• Challenge yourself with more complex problems</li>
          <li>• Take breaks to maintain mental resilience</li>
        </ul>
      </div>
    </div>
  );
}
