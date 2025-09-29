import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Target, 
  Brain, 
  TrendingUp, 
  Clock, 
  Star, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  BookOpen,
  Video,
  ExternalLink,
  Zap,
  Award,
  Users,
  BarChart3,
  Calendar,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  ChevronRight,
  ChevronDown,
  Bell,
  Settings,
  Download,
  Share2,
  FileText
} from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  progress: number;
  skills: string[];
  courses: Course[];
  projects: Project[];
  status: 'not-started' | 'in-progress' | 'completed';
  startDate?: string;
  estimatedCompletion?: string;
}

interface Course {
  id: string;
  title: string;
  provider: string;
  type: 'Free' | 'Paid' | 'YouTube' | 'Bootcamp';
  rating: number;
  duration: string;
  url: string;
  price?: string;
  completed: boolean;
  progress: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  skills: string[];
  githubUrl?: string;
  completed: boolean;
}

interface SkillProgress {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  lastPracticed: string;
}

interface DailyGoal {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'project' | 'practice' | 'assessment';
  duration: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([]);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  useEffect(() => {
    // Mock data initialization
    setLearningPaths([
      {
        id: 'fullstack-path',
        title: 'Full Stack Developer Path',
        description: 'Master complete web development with modern technologies',
        duration: '6-12 months',
        difficulty: 'Intermediate',
        progress: 35,
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
        courses: [
          {
            id: 'react-course',
            title: 'Complete React Developer Course',
            provider: 'Udemy',
            type: 'Paid',
            rating: 4.8,
            duration: '40 hours',
            url: '#',
            price: '$89',
            completed: false,
            progress: 60
          },
          {
            id: 'nodejs-course',
            title: 'Node.js Crash Course',
            provider: 'Traversy Media',
            type: 'YouTube',
            rating: 4.9,
            duration: '2 hours',
            url: '#',
            completed: true,
            progress: 100
          }
        ],
        projects: [
          {
            id: 'ecommerce-project',
            title: 'E-commerce Platform',
            description: 'Build a full-stack e-commerce application',
            difficulty: 'Advanced',
            skills: ['React', 'Node.js', 'MongoDB'],
            githubUrl: '#',
            completed: false
          }
        ],
        status: 'in-progress',
        startDate: '2024-01-15',
        estimatedCompletion: '2024-07-15'
      },
      {
        id: 'ai-path',
        title: 'AI/ML Engineer Path',
        description: 'Learn machine learning and AI development',
        duration: '8-12 months',
        difficulty: 'Advanced',
        progress: 0,
        skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'AWS'],
        courses: [],
        projects: [],
        status: 'not-started'
      }
    ]);

    setSkillProgress([
      {
        skill: 'React',
        currentLevel: 7,
        targetLevel: 10,
        progress: 70,
        lastPracticed: '2 days ago'
      },
      {
        skill: 'Node.js',
        currentLevel: 5,
        targetLevel: 9,
        progress: 55,
        lastPracticed: '1 week ago'
      },
      {
        skill: 'TypeScript',
        currentLevel: 6,
        targetLevel: 8,
        progress: 75,
        lastPracticed: '3 days ago'
      }
    ]);

    setDailyGoals([
      {
        id: 'daily-react',
        title: 'React Hooks Practice',
        description: 'Complete 30 minutes of React hooks exercises',
        type: 'practice',
        duration: '30 min',
        completed: false,
        priority: 'high'
      },
      {
        id: 'daily-course',
        title: 'Node.js Course',
        description: 'Watch 2 videos from Node.js course',
        type: 'course',
        duration: '45 min',
        completed: true,
        priority: 'medium'
      },
      {
        id: 'daily-project',
        title: 'E-commerce Project',
        description: 'Work on user authentication feature',
        type: 'project',
        duration: '2 hours',
        completed: false,
        priority: 'high'
      }
    ]);
  }, []);

  const handleStartPath = (pathId: string) => {
    setLearningPaths(prev => 
      prev.map(path => 
        path.id === pathId 
          ? { ...path, status: 'in-progress', startDate: new Date().toISOString().split('T')[0] }
          : path
      )
    );
  };

  const handleCompleteGoal = (goalId: string) => {
    setDailyGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const togglePathExpansion = (pathId: string) => {
    setExpandedPath(expandedPath === pathId ? null : pathId);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">2</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Learning Paths</h3>
          <p className="text-gray-600 text-sm">1 in progress</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">15</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Skills Tracked</h3>
          <p className="text-gray-600 text-sm">3 improving</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">7</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Day Streak</h3>
          <p className="text-gray-600 text-sm">Keep it up!</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">85%</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
          <p className="text-gray-600 text-sm">Great job!</p>
        </div>
      </div>

      {/* Daily Goals */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Today's Goals
          </h3>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Goal</span>
          </button>
        </div>

        <div className="space-y-4">
          {dailyGoals.map((goal) => (
            <div key={goal.id} className={`p-4 rounded-lg border-2 transition-all ${
              goal.completed 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleCompleteGoal(goal.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      goal.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {goal.completed && <CheckCircle className="w-3 h-3" />}
                  </button>
                  <div>
                    <h4 className={`font-semibold ${goal.completed ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                      {goal.title}
                    </h4>
                    <p className={`text-sm ${goal.completed ? 'text-green-600' : 'text-gray-600'}`}>
                      {goal.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                    goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {goal.priority}
                  </span>
                  <span className="text-sm text-gray-600">{goal.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-800">Start New Analysis</h4>
                <p className="text-blue-600 text-sm">Assess your skills</p>
              </div>
            </div>
          </button>
          <button className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-800">Take Career Quiz</h4>
                <p className="text-green-600 text-sm">Discover your path</p>
              </div>
            </div>
          </button>
          <Link href="/resume-analyzer">
            <button className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors text-left w-full">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-purple-800">Resume Scan</h4>
                  <p className="text-purple-600 text-sm">AI-powered analysis</p>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderLearningPaths = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Learning Paths</h3>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Path</span>
        </button>
      </div>

      <div className="space-y-4">
        {learningPaths.map((path) => (
          <div key={path.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-xl font-semibold text-gray-900">{path.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    path.status === 'completed' ? 'bg-green-100 text-green-800' :
                    path.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {path.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{path.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {path.duration}
                  </span>
                  <span className="flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    {path.difficulty}
                  </span>
                  <span className="flex items-center">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    {path.progress}% complete
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {path.status === 'not-started' && (
                  <button
                    onClick={() => handleStartPath(path.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Start Path
                  </button>
                )}
                <button
                  onClick={() => togglePathExpansion(path.id)}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {expandedPath === path.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${path.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedPath === path.id && (
              <div className="space-y-6 pt-4 border-t border-gray-200">
                {/* Skills */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Skills Covered</h5>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                {path.courses.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-3">Courses</h5>
                    <div className="space-y-3">
                      {path.courses.map((course) => (
                        <div key={course.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-900">{course.title}</h6>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span>{course.provider}</span>
                                <span className="flex items-center">
                                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                  {course.rating}
                                </span>
                                <span>{course.duration}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  course.type === 'Free' ? 'bg-green-100 text-green-800' :
                                  course.type === 'YouTube' ? 'bg-red-100 text-red-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {course.type}
                                </span>
                                {course.price && (
                                  <span className="font-medium text-green-600">{course.price}</span>
                                )}
                              </div>
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div 
                                    className={`h-1 rounded-full transition-all duration-300 ${
                                      course.completed ? 'bg-green-500' : 'bg-blue-500'
                                    }`}
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-600 mt-1">{course.progress}% complete</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              {course.completed && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                              <a
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                title={`View ${course.title} course`}
                                aria-label={`View ${course.title} course`}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {path.projects.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-3">Projects</h5>
                    <div className="space-y-3">
                      {path.projects.map((project) => (
                        <div key={project.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-900">{project.title}</h6>
                              <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                  {project.difficulty}
                                </span>
                                {project.skills.map((skill) => (
                                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              {project.completed && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                  title={`View ${project.title} on GitHub`}
                                  aria-label={`View ${project.title} on GitHub`}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillProgress = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Skill Progress</h3>
      
      <div className="space-y-4">
        {skillProgress.map((skill) => (
          <div key={skill.skill} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{skill.skill}</h4>
                <p className="text-gray-600 text-sm">Last practiced: {skill.lastPracticed}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{skill.progress}%</div>
                <div className="text-sm text-gray-600">Level {skill.currentLevel}/{skill.targetLevel}</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
              <span>Expert</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'learning-paths':
        return renderLearningPaths();
      case 'skill-progress':
        return renderSkillProgress();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Enhanced Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your learning journey and skill development</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Settings"
              aria-label="Open settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'learning-paths', label: 'Learning Paths', icon: BookOpen },
            { id: 'skill-progress', label: 'Skill Progress', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
