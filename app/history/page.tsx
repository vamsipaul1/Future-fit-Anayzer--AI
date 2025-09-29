'use client';

import { useState } from 'react';

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('activities');

  const tabs = [
    { id: 'activities', label: 'Activities' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'progress', label: 'Progress' },
    { id: 'downloads', label: 'Downloads' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            History & Records
          </h1>
          <p className="text-xl text-gray-600">
            Track your learning journey and achievements
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
            {activeTab === 'activities' && <ActivitiesTab />}
            {activeTab === 'achievements' && <AchievementsTab />}
            {activeTab === 'progress' && <ProgressTab />}
            {activeTab === 'downloads' && <DownloadsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivitiesTab() {
  const activities = [
    { date: '2024-09-29', activity: 'Completed React Hooks tutorial', type: 'learning', duration: '2h 30m' },
    { date: '2024-09-28', activity: 'Built portfolio website', type: 'project', duration: '4h 15m' },
    { date: '2024-09-27', activity: 'Attended JavaScript meetup', type: 'event', duration: '1h 30m' },
    { date: '2024-09-26', activity: 'Solved 5 coding challenges', type: 'practice', duration: '1h 45m' },
    { date: '2024-09-25', activity: 'Read TypeScript documentation', type: 'learning', duration: '1h 20m' }
  ];

  const [filter, setFilter] = useState('all');

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type === filter
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Activities</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Activities</option>
          <option value="learning">Learning</option>
          <option value="project">Projects</option>
          <option value="practice">Practice</option>
          <option value="event">Events</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredActivities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${
              activity.type === 'learning' ? 'bg-blue-500' :
              activity.type === 'project' ? 'bg-green-500' :
              activity.type === 'practice' ? 'bg-yellow-500' : 'bg-purple-500'
            }`}></div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{activity.activity}</h3>
              <p className="text-sm text-gray-600">{activity.date}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-900">{activity.duration}</span>
              <p className="text-xs text-gray-500 capitalize">{activity.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsTab() {
  const achievements = [
    { title: 'JavaScript Master', date: '2024-09-20', badge: '🏆', description: 'Completed advanced JavaScript course' },
    { title: 'React Developer', date: '2024-09-15', badge: '⭐', description: 'Built 3 React applications' },
    { title: 'Code Warrior', date: '2024-09-10', badge: '⚔️', description: 'Solved 100 coding challenges' },
    { title: 'Team Player', date: '2024-09-05', badge: '🤝', description: 'Collaborated on open source project' },
    { title: 'Speed Learner', date: '2024-08-30', badge: '🚀', description: 'Completed course in record time' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Achievements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
            <div className="text-center">
              <div className="text-4xl mb-3">{achievement.badge}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
              <p className="text-xs text-gray-500">{achievement.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressTab() {
  const progressData = [
    { skill: 'JavaScript', startLevel: 60, currentLevel: 85, targetLevel: 90 },
    { skill: 'React', startLevel: 40, currentLevel: 75, targetLevel: 85 },
    { skill: 'Node.js', startLevel: 30, currentLevel: 65, targetLevel: 80 },
    { skill: 'TypeScript', startLevel: 20, currentLevel: 50, targetLevel: 75 },
    { skill: 'Python', startLevel: 70, currentLevel: 80, targetLevel: 90 }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skill Progress</h2>
      
      <div className="space-y-6">
        {progressData.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.skill}</h3>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-600">{item.currentLevel}%</span>
                <p className="text-sm text-gray-500">Target: {item.targetLevel}%</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Start: {item.startLevel}%</span>
                <span>Current: {item.currentLevel}%</span>
                <span>Target: {item.targetLevel}%</span>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.currentLevel}%` }}
                  ></div>
                </div>
                <div 
                  className="absolute top-0 h-3 w-1 bg-red-500"
                  style={{ left: `${item.targetLevel}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>+{item.currentLevel - item.startLevel}% improvement</span>
                <span>{item.targetLevel - item.currentLevel}% to go</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DownloadsTab() {
  const downloads = [
    { name: 'JavaScript Cheat Sheet', date: '2024-09-29', type: 'PDF', size: '2.3 MB' },
    { name: 'React Best Practices', date: '2024-09-28', type: 'PDF', size: '1.8 MB' },
    { name: 'Portfolio Template', date: '2024-09-27', type: 'ZIP', size: '15.2 MB' },
    { name: 'Code Snippets Collection', date: '2024-09-26', type: 'ZIP', size: '5.7 MB' },
    { name: 'Learning Roadmap', date: '2024-09-25', type: 'PDF', size: '3.1 MB' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Downloads</h2>
      
      <div className="space-y-4">
        {downloads.map((download, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                download.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                <span className={`text-sm font-semibold ${
                  download.type === 'PDF' ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {download.type}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{download.name}</h3>
                <p className="text-sm text-gray-600">{download.date}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-900">{download.size}</span>
              <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
