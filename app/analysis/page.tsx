'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Star,
  BarChart3,
  Lightbulb,
  Users,
  Award,
  Clock,
  ChevronRight,
  ChevronLeft,
  Play,
  RotateCcw,
  Download,
  Home,
  BookOpen,
  Video,
  FileText,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';

// Types
interface SkillAnalysis {
  skillId: string;
  skillName: string;
  questionsAttempted: number;
  correctAnswers: number;
  percentCorrect: number;
  avgResponseTimeMs: number;
  confidenceScore: number;
  recommendations: Array<{
    type: string;
    title: string;
    url?: string;
    priority: number;
  }>;
}

interface DomainAnalysis {
  domainId: string;
  domainName: string;
  percentCorrect: number;
  totalQuestions: number;
  correctAnswers: number;
}

interface OverallAnalysis {
  questionsAttempted: number;
  correctAnswers: number;
  percentCorrect: number;
  timeSpentMs: number;
}

interface AnalysisResponse {
  assessmentId: string;
  anonymizedUserLabel: string;
  overall: OverallAnalysis;
  perSkill: SkillAnalysis[];
  perDomain: DomainAnalysis[];
  generatedAt: string;
}

// Recommendation type icons
const recommendationIcons = {
  course: GraduationCap,
  video: Video,
  article: FileText,
  question: BookOpen
};

// Color schemes for different performance levels
const getPerformanceColor = (percent: number) => {
  if (percent >= 85) return 'text-green-600 bg-green-50 border-green-200';
  if (percent >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const getPerformanceGradient = (percent: number) => {
  if (percent >= 85) return 'from-green-500 to-green-600';
  if (percent >= 70) return 'from-yellow-500 to-yellow-600';
  return 'from-red-500 to-red-600';
};

// Progress bar component
const ProgressBar = ({ percent, label, showPercentage = true }: { 
  percent: number; 
  label: string; 
  showPercentage?: boolean;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {showPercentage && (
        <span className="text-sm font-semibold text-gray-900">{Math.round(percent)}%</span>
      )}
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <motion.div
        className={`h-2 rounded-full bg-gradient-to-r ${getPerformanceGradient(percent)}`}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);

// Skill analysis card component
const SkillAnalysisCard = ({ skill }: { skill: SkillAnalysis }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl border-2 ${getPerformanceColor(skill.percentCorrect)}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{skill.skillName}</h3>
          <p className="text-sm opacity-75">
            {skill.correctAnswers} / {skill.questionsAttempted} correct
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{Math.round(skill.percentCorrect)}%</div>
          <div className="text-xs opacity-75">Confidence: {Math.round(skill.confidenceScore * 100)}%</div>
        </div>
      </div>

      <ProgressBar percent={skill.percentCorrect} label="Performance" />

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {Math.round(skill.avgResponseTimeMs / 1000)}s avg
          </div>
        </div>
        
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-sm font-medium hover:opacity-75 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{isExpanded ? 'Hide' : 'Show'} Recommendations</span>
          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-current border-opacity-20"
          >
            <h4 className="font-semibold mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              Learning Recommendations
            </h4>
            <div className="space-y-3">
              {skill.recommendations.map((rec, index) => {
                const IconComponent = recommendationIcons[rec.type as keyof typeof recommendationIcons] || FileText;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-white bg-opacity-50 rounded-lg"
                  >
                    <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h5 className="font-medium">{rec.title}</h5>
                      <p className="text-sm opacity-75 capitalize">{rec.type}</p>
                      {rec.url && (
                        <a
                          href={rec.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Learn more →
                        </a>
                      )}
                    </div>
                    <div className="text-xs opacity-75">#{rec.priority}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Domain analysis card component
const DomainAnalysisCard = ({ domain }: { domain: DomainAnalysis }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`p-4 rounded-lg border-2 ${getPerformanceColor(domain.percentCorrect)}`}
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{domain.domainName}</h3>
        <p className="text-sm opacity-75">
          {domain.correctAnswers} / {domain.totalQuestions} correct
        </p>
      </div>
      <div className="text-xl font-bold">{Math.round(domain.percentCorrect)}%</div>
    </div>
    <ProgressBar percent={domain.percentCorrect} label="Domain Performance" />
  </motion.div>
);

// Main analysis page component
export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get assessment ID from URL or localStorage
    const assessmentId = new URLSearchParams(window.location.search).get('assessmentId') ||
                        localStorage.getItem('currentAssessmentId');

    if (!assessmentId) {
      setError('No assessment ID found');
      setLoading(false);
      return;
    }

    // Fetch analysis
    fetchAnalysis(assessmentId);
  }, []);

  const fetchAnalysis = async (assessmentId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/assessments/${assessmentId}/analysis`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analysis: ${response.statusText}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Error fetching analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analysis');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-700">Generating Analysis...</h2>
          <p className="text-gray-500">Please wait while we process your results</p>
        </motion.div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Analysis Error</h2>
          <p className="text-gray-500 mb-6">{error || 'Failed to load analysis'}</p>
          <div className="space-x-4">
            <Link
              href="/skill-analysis"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Try Again
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Skill Analysis Results</h1>
              <p className="text-gray-600">Assessment completed by {analysis.anonymizedUserLabel}</p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/skill-analysis"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-6xl font-bold text-gray-900 mb-2"
            >
              {Math.round(analysis.overall.percentCorrect)}%
            </motion.div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overall Score</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{analysis.overall.correctAnswers}</div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{analysis.overall.questionsAttempted}</div>
                <div className="text-gray-600">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{formatTime(analysis.overall.timeSpentMs)}</div>
                <div className="text-gray-600">Time Spent</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Domain Performance */}
        {analysis.perDomain.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Domain Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.perDomain.map((domain, index) => (
                <DomainAnalysisCard key={domain.domainId} domain={domain} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Skill Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Skill Breakdown
          </h3>
          <div className="space-y-6">
            {analysis.perSkill.map((skill, index) => (
              <SkillAnalysisCard key={skill.skillId} skill={skill} />
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>Analysis generated on {new Date(analysis.generatedAt).toLocaleString()}</p>
          <p className="mt-1">Assessment ID: {analysis.assessmentId}</p>
        </motion.div>
      </div>
    </div>
  );
}
