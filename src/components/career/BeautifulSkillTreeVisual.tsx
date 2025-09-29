import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Star, 
  CheckCircle, 
  Lock, 
  Crown, 
  Zap, 
  BookOpen, 
  Video, 
  ExternalLink,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  Award,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Sparkles
} from "lucide-react";

interface CareerResult {
  recommendedCareer: CareerPath;
  alternativeCareers: CareerPath[];
  skillGaps: string[];
  timeline: string;
  nextSteps: string[];
  marketInsights: MarketInsight[];
}

interface MarketInsight {
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface LearningStep {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  skills: string[];
  projects: string[];
  courses: Course[];
}

interface Course {
  title: string;
  provider: string;
  type: 'Free' | 'Paid' | 'YouTube' | 'Premium';
  rating: number;
  duration: string;
  url: string;
  price?: string;
}

interface Resource {
  title: string;
  type: 'Course' | 'Book' | 'Video' | 'Article';
  url: string;
  rating: number;
}

interface CareerPath {
  id: string;
  title: string;
  description: string;
  salary: {
    min: number;
    max: number;
    avg: number;
  };
  demand: number;
  growth: number;
  skills: string[];
  experience: string;
  companies: string[];
  skillTree: SkillNode[];
  learningPath: LearningStep[];
  matchScore: number;
  reasoning: string;
}

interface SkillNode {
  id: string;
  name: string;
  level: number;
  required: boolean;
  completed: boolean;
  locked: boolean;
  children: SkillNode[];
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedTime: string;
  marketValue: number;
  resources: Resource[];
}

interface SkillTreeData {
  title: string;
  description: string;
  totalSkills: number;
  completedSkills: number;
  estimatedDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  skills: SkillNode[];
}

interface Props {
  careerResult?: CareerResult;
  onBack?: () => void;
}

export const BeautifulSkillTreeVisual = ({ careerResult, onBack }: Props) => {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'tree' | 'grid' | 'timeline'>('tree');

  const skillTreeData: SkillTreeData = {
    title: "Full Stack Developer Path",
    description: "Master complete web development with modern technologies",
    totalSkills: 24,
    completedSkills: 8,
    estimatedDuration: "6-12 months",
    difficulty: "Intermediate",
    skills: [
      {
        id: "frontend-fundamentals",
        name: "Frontend Fundamentals",
        level: 1,
        required: true,
        completed: true,
        locked: false,
        description: "Core frontend development skills including HTML, CSS, and JavaScript",
        difficulty: "Beginner",
        estimatedTime: "2-3 weeks",
        marketValue: 45,
        resources: [
          { title: "HTML & CSS Basics", type: "Course", url: "#", rating: 4.8 },
          { title: "JavaScript Fundamentals", type: "Course", url: "#", rating: 4.9 }
        ],
        children: [
          {
            id: "html-css",
            name: "HTML & CSS",
            level: 2,
            required: true,
            completed: true,
            locked: false,
            description: "Structure and styling web pages",
            difficulty: "Beginner",
            estimatedTime: "1 week",
            marketValue: 30,
            resources: [],
            children: []
          },
          {
            id: "javascript-basics",
            name: "JavaScript Basics",
            level: 2,
            required: true,
            completed: true,
            locked: false,
            description: "Programming fundamentals with JavaScript",
            difficulty: "Beginner",
            estimatedTime: "2 weeks",
            marketValue: 40,
            resources: [],
            children: []
          }
        ]
      },
      {
        id: "react-development",
        name: "React Development",
        level: 1,
        required: true,
        completed: false,
        locked: false,
        description: "Modern React development with hooks and components",
        difficulty: "Intermediate",
        estimatedTime: "4-6 weeks",
        marketValue: 75,
        resources: [
          { title: "React Complete Guide", type: "Course", url: "#", rating: 4.9 },
          { title: "React Hooks Tutorial", type: "Video", url: "#", rating: 4.7 }
        ],
        children: [
          {
            id: "react-components",
            name: "React Components",
            level: 2,
            required: true,
            completed: false,
            locked: false,
            description: "Building reusable UI components",
            difficulty: "Intermediate",
            estimatedTime: "2 weeks",
            marketValue: 50,
            resources: [],
            children: []
          },
          {
            id: "react-hooks",
            name: "React Hooks",
            level: 2,
            required: true,
            completed: false,
            locked: true,
            description: "State management with hooks",
            difficulty: "Intermediate",
            estimatedTime: "2 weeks",
            marketValue: 60,
            resources: [],
            children: []
          }
        ]
      },
      {
        id: "backend-development",
        name: "Backend Development",
        level: 1,
        required: true,
        completed: false,
        locked: true,
        description: "Server-side development with Node.js and databases",
        difficulty: "Intermediate",
        estimatedTime: "6-8 weeks",
        marketValue: 80,
        resources: [
          { title: "Node.js Complete Guide", type: "Course", url: "#", rating: 4.8 },
          { title: "Database Design", type: "Book", url: "#", rating: 4.6 }
        ],
        children: [
          {
            id: "node-js",
            name: "Node.js",
            level: 2,
            required: true,
            completed: false,
            locked: true,
            description: "JavaScript runtime for server development",
            difficulty: "Intermediate",
            estimatedTime: "3 weeks",
            marketValue: 65,
            resources: [],
            children: []
          },
          {
            id: "database-design",
            name: "Database Design",
            level: 2,
            required: true,
            completed: false,
            locked: true,
            description: "Designing and managing databases",
            difficulty: "Intermediate",
            estimatedTime: "3 weeks",
            marketValue: 70,
            resources: [],
            children: []
          }
        ]
      }
    ]
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-orange-100 text-orange-800";
      case "Expert": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-gradient-to-r from-blue-500 to-purple-500";
      case 2: return "bg-gradient-to-r from-green-500 to-emerald-500";
      case 3: return "bg-gradient-to-r from-orange-500 to-yellow-500";
      case 4: return "bg-gradient-to-r from-red-500 to-pink-500";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getMarginClass = (depth: number) => {
    switch (depth) {
      case 1: return "ml-8";
      case 2: return "ml-16";
      case 3: return "ml-24";
      case 4: return "ml-32";
      default: return "ml-0";
    }
  };

  const renderSkillNode = (node: SkillNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="relative">
        <div 
          className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${getMarginClass(depth)} ${
            node.completed 
              ? 'border-green-500 bg-green-50' 
              : node.locked 
                ? 'border-gray-300 bg-gray-50 opacity-60' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          } ${selectedNode?.id === node.id ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedNode(node)}
        >
          {/* Status Icon */}
          <div className="flex-shrink-0">
            {node.completed ? (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            ) : node.locked ? (
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
            ) : (
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          {/* Skill Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{node.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(node.difficulty)}`}>
                {node.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate">{node.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {node.estimatedTime}
              </span>
              <span className="flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                ${node.marketValue}K
              </span>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
              className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
            </button>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-2">
            {node.children.map(child => renderSkillNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillTreeData.skills.map(skill => (
          <div
            key={skill.id}
            className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
              skill.completed 
                ? 'border-green-500 bg-green-50' 
                : skill.locked 
                  ? 'border-gray-300 bg-gray-50 opacity-60' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            } ${selectedNode?.id === skill.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedNode(skill)}
          >
            <div className="flex items-center space-x-3 mb-3">
              {skill.completed ? (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              ) : skill.locked ? (
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                <p className="text-sm text-gray-600">Level {skill.level}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{skill.estimatedTime}</span>
              <span>${skill.marketValue}K</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTimelineView = () => {
    return (
      <div className="space-y-6">
        {skillTreeData.skills.map((skill, index) => (
          <div key={skill.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className={`w-12 h-12 ${getLevelColor(skill.level)} rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold">{index + 1}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className={`p-4 rounded-xl border-2 ${
                skill.completed 
                  ? 'border-green-500 bg-green-50' 
                  : skill.locked 
                    ? 'border-gray-300 bg-gray-50 opacity-60' 
                    : 'border-gray-200'
              }`}>
                <h3 className="font-semibold text-gray-900 mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{skill.estimatedTime}</span>
                  <span>${skill.marketValue}K</span>
                  <span className={`px-2 py-1 rounded-full ${getDifficultyColor(skill.difficulty)}`}>
                    {skill.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diagonal shadow patterns */}
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.01) 0%, transparent 50%)',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Dotted grid pattern */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-0 right-0 w-80 h-80 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.2) 1px, transparent 0)',
            backgroundSize: '15px 15px',
            filter: 'blur(0.5px)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {onBack && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span className="text-sm font-medium">Back to Analysis</span>
            </motion.button>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Target className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{skillTreeData.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{skillTreeData.description}</p>
            
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{skillTreeData.completedSkills}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{skillTreeData.totalSkills}</div>
                <div className="text-sm text-gray-600">Total Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{skillTreeData.estimatedDuration}</div>
                <div className="text-sm text-gray-600">Est. Duration</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
            >
              {viewMode === 'tree' && (
                <div className="space-y-4">
                  {skillTreeData.skills.map(skill => renderSkillNode(skill))}
                </div>
              )}
              
              {viewMode === 'grid' && renderGridView()}
              
              {viewMode === 'timeline' && renderTimelineView()}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {selectedNode ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${getLevelColor(selectedNode.level)} rounded-xl flex items-center justify-center`}>
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedNode.name}</h3>
                    <p className="text-sm text-gray-600">Level {selectedNode.level}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{selectedNode.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Difficulty</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedNode.difficulty)}`}>
                      {selectedNode.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="font-semibold">{selectedNode.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Market Value</span>
                    <span className="font-semibold text-green-600">${selectedNode.marketValue}K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`flex items-center ${
                      selectedNode.completed ? 'text-green-600' :
                      selectedNode.locked ? 'text-gray-400' : 'text-blue-600'
                    }`}>
                      {selectedNode.completed ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed
                        </>
                      ) : selectedNode.locked ? (
                        <>
                          <Lock className="w-4 h-4 mr-1" />
                          Locked
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-1" />
                          Available
                        </>
                      )}
                    </span>
                  </div>
                </div>
                
                {selectedNode.resources && selectedNode.resources.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Learning Resources</h4>
                    <div className="space-y-2">
                      {selectedNode.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">{resource.title}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-center"
              >
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Skill</h3>
                <p className="text-gray-600 text-sm">Click on any skill to view details and resources</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};