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
  Home
} from 'lucide-react';
import AuthGuard from '../../components/AuthGuard';

// Types
interface Domain {
  id: string;
  slug: string;
  name: string;
  summary: string;
  roles: string[];
  skillCount: number;
}

interface Skill {
  id: string;
  key: string;
  name: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

interface DomainWithSkills extends Domain {
  skills: {
    BEGINNER: Skill[];
    INTERMEDIATE: Skill[];
    ADVANCED: Skill[];
  };
}

interface SelectedSkill {
  key: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  userLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

interface Question {
  id: string;
  skillKey: string;
  skillLevel: string;
  question: string;
  type: 'MCQ' | 'ShortAnswer' | 'FillInBlank' | 'Ability' | 'Scenario' | 'Code';
  options?: string[];
  correctAnswer?: string;
  difficulty: string;
  timeLimit: number;
  responseType?: string;
}

interface QuizData {
  assessmentId: string;
  domain: {
    id: string;
    name: string;
    slug: string;
  };
  questions: Question[];
  totalQuestions: number;
  estimatedTime: number;
  generatedAt: string;
}

interface AssessmentResult {
  assessmentId: string;
  overallScore: number;
  skillScores: Record<string, { scores: number[], average: number, level: string }>;
  recommendations: Array<{
    skill: string;
    currentLevel: string;
    score: number;
    recommendation: string;
  }>;
  completedAt: string;
}

// Components
// Domain icons mapping
const domainIcons = {
  'cloud-infrastructure': '☁️',
  'cybersecurity': '🔒',
  'data-ai': '🤖',
  'software-web': '💻',
  'programming': '⚡',
  'mobile-development': '📱',
  'product-management': '📊',
  'blockchain-web3': '⛓️',
  'devops-automation': '🔧',
  'ui-ux-design': '🎨',
  'networking-systems': '🌐',
  'business-analytics': '📈',
  'game-development': '🎮'
};

// Domain convenience info (simplified)
const domainConvenience = {
  'cloud-infrastructure': { skills: '8 skills' },
  'cybersecurity': { skills: '8 skills' },
  'data-ai': { skills: '8 skills' },
  'software-web': { skills: '8 skills' },
  'programming': { skills: '8 skills' },
  'mobile-development': { skills: '8 skills' },
  'product-management': { skills: '8 skills' },
  'blockchain-web3': { skills: '8 skills' },
  'devops-automation': { skills: '8 skills' },
  'ui-ux-design': { skills: '8 skills' },
  'networking-systems': { skills: '8 skills' },
  'business-analytics': { skills: '8 skills' },
  'game-development': { skills: '8 skills' }
};

const DomainCard = ({ domain, onSelect }: { domain: Domain; onSelect: (domain: Domain) => void }) => {
  const convenience = domainConvenience[domain.slug as keyof typeof domainConvenience] || { skills: '8 skills' };
  const domainIcon = domainIcons[domain.slug as keyof typeof domainIcons] || '💼';

  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-pink-200 hover:border-pink-300 overflow-hidden p-6"
      onClick={() => onSelect(domain)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="text-center relative z-10">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 text-3xl shadow-lg">
          {domainIcon}
        </div>
        
        <h3 className="font-bold text-black text-lg group-hover:text-pink-600 transition-colors duration-300 mb-2">
          {domain.name}
        </h3>
        
        <p className="text-sm text-gray-600 font-medium">
          {convenience.skills}
        </p>
      </div>
    </div>
  );
};

const SkillPill = ({ 
  skill, 
  isSelected, 
  userLevel, 
  onSelect, 
  onLevelChange 
}: {
  skill: Skill;
  isSelected: boolean;
  userLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  onSelect: (skill: Skill) => void;
  onLevelChange: (skill: Skill, level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED') => void;
}) => {
  const levelColors = {
    BEGINNER: 'bg-green-100 text-green-800 border-green-200',
    INTERMEDIATE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    ADVANCED: 'bg-red-100 text-red-800 border-red-200'
  };

  const userLevelColors = {
    BEGINNER: 'bg-green-500',
    INTERMEDIATE: 'bg-yellow-500',
    ADVANCED: 'bg-red-500'
  };

  return (
    <div
      className={`p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg'
          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
      }`}
      onClick={() => onSelect(skill)}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <motion.h4 
            className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {skill.name}
          </motion.h4>
          <div className="flex items-center space-x-2">
            <motion.span 
              className={`px-2 py-1 rounded-full text-xs font-bold ${levelColors[skill.level]} shadow-sm`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {skill.level.charAt(0)}
            </motion.span>
            {isSelected && (
              <motion.div 
                className={`w-2 h-2 rounded-full ${userLevelColors[userLevel]} shadow-sm`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              />
            )}
          </div>
        </div>

        <motion.p 
          className="text-xs text-gray-600 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {skill.description}
        </motion.p>

        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <motion.p 
              className="text-xs font-medium text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Your Level:
            </motion.p>
            <div className="flex space-x-1">
              {(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).map((level, index) => (
                <motion.button
                  key={level}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onLevelChange(skill, level);
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                    userLevel === level
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'
                  }`}
                >
                  {level.charAt(0)}
                </motion.button>
                ))}
              </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const QuestionCard = ({ 
  question, 
  currentIndex, 
  totalQuestions, 
  onAnswer, 
  onNext, 
  onPrevious 
}: {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [rating, setRating] = useState(5); // Default rating for scale questions

  const handleSubmit = () => {
    let finalAnswer;
    if (question.type === 'MCQ') {
      finalAnswer = selectedOption;
    } else if (question.type === 'Ability' && question.responseType === 'scale') {
      finalAnswer = rating.toString();
    } else {
      finalAnswer = answer;
    }
    
    onAnswer(finalAnswer);
    setAnswer('');
    setSelectedOption('');
    setRating(5); // Reset rating
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 font-medium">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500 font-medium">
            {question.difficulty}
          </span>
            </div>
        
        {/* Interactive Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="h-3 rounded-full relative transition-all duration-500"
            style={{ 
              width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
            }}
          />
        </div>

        {/* Progress percentage text */}
        <div className="text-center mt-2">
          <span className="text-xs text-gray-400 font-medium">
            {Math.round(((currentIndex + 1) / totalQuestions) * 100)}% Complete
          </span>
        </div>
      </div>

      {/* Question */}
        <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{question.question}</h3>
        
        {question.type === 'MCQ' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                  selectedOption === option
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === option
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedOption === option && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
                  <span className="text-gray-800 font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {(question.type === 'ShortAnswer' || question.type === 'FillInBlank' || question.type === 'Code') && (
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={
              question.type === 'Code' ? 'Write your code explanation or pseudocode...' : 
              question.type === 'FillInBlank' ? 'Fill in the blank...' :
              'Write your answer...'
            }
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300"
            rows={6}
          />
        )}

        {/* Rating Scale for Ability Questions */}
        {question.type === 'Ability' && question.responseType === 'scale' && (
              <div className="space-y-6">
            {/* Rating Display */}
            <div className="text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-6xl font-bold text-blue-600 mb-2"
              >
                {rating}
              </motion.div>
              <p className="text-lg text-gray-600">out of 10</p>
        </div>

            {/* Rating Slider */}
            <div className="px-4">
              <style jsx>{`
                .slider {
                  -webkit-appearance: none;
                  appearance: none;
                  height: 12px;
                  border-radius: 6px;
                  outline: none;
                }
                .slider::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #3b82f6;
                  cursor: pointer;
                  border: 3px solid white;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                }
                .slider::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #3b82f6;
                  cursor: pointer;
                  border: 3px solid white;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                }
              `}</style>
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${(rating - 1) * 11.11}%, #e5e7eb ${(rating - 1) * 11.11}%, #e5e7eb 100%)`
                }}
              />
              
              {/* Scale Labels */}
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
            </div>

            {/* Rating Buttons */}
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                    rating === value
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {value}
                </button>
              ))}
              </div>

            {/* Rating Description */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                {rating <= 3 && "Beginner level"}
                {rating >= 4 && rating <= 6 && "Intermediate level"}
                {rating >= 7 && rating <= 8 && "Advanced level"}
                {rating >= 9 && "Expert level"}
              </p>
                </div>
          </div>
        )}
              </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-300 hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={
            question.type === 'MCQ' ? !selectedOption : 
            question.type === 'Ability' && question.responseType === 'scale' ? false :
            !answer.trim()
          }
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-300 hover:scale-105"
        >
          <span>{currentIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const ResultsPage = ({ 
  result, 
  onRetake, 
  onNewDomain 
}: {
  result: AssessmentResult;
  onRetake: () => void;
  onNewDomain: () => void;
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
                  <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-10 h-10 text-white" />
        </div>
        
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Assessment Complete!
              </h2>
        
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
          <span className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
            {result.overallScore}%
          </span>
          <span className="ml-2 text-gray-600">Overall Score</span>
        </div>
                </div>

      {/* Skill Scores */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
          Skill Breakdown
                      </h3>
        
                      <div className="space-y-4">
          {Object.entries(result.skillScores).map(([skill, data]) => (
            <motion.div
                    key={skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 capitalize">
                  {skill.replace('-', ' ')}
                </h4>
                <span className={`font-bold ${getScoreColor(data.average)}`}>
                  {data.average}%
                      </span>
                            </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.average}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className={`h-3 rounded-full ${getScoreBgColor(data.average)}`}
                />
                          </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Level: {data.level}</span>
                <span>{data.scores.length} questions</span>
              </div>
            </motion.div>
                        ))}
                </div>
              </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
            Learning Recommendations
                      </h3>
          
          <div className="space-y-4">
            {result.recommendations.map((rec, index) => (
            <motion.div
                key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-yellow-900 capitalize">
                      {rec.skill.replace('-', ' ')}
                    </h4>
                    <p className="text-yellow-800 mt-1">{rec.recommendation}</p>
                    <div className="mt-2 text-sm text-yellow-700">
                      Current Level: {rec.currentLevel} | Score: {rec.score}%
                </div>
                    </div>
                  </div>
              </motion.div>
                              ))}
                            </div>
                          </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRetake}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Retake Quiz</span>
        </button>
        
        <button
          onClick={onNewDomain}
          className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Target className="w-5 h-5" />
          <span>Try Another Domain</span>
        </button>
        
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-8 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Home className="w-5 h-5" />
          <span>Go to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

// Main Component
export default function SkillAnalysisPage() {
  const [currentStep, setCurrentStep] = useState<'domains' | 'skills' | 'quiz' | 'results'>('domains');
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<DomainWithSkills | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<{ questionId: string; answer: string; timeSpent: number }>>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load domains on mount
  useEffect(() => {
    const loadDomains = async () => {
      try {
        console.log('Loading domains...');
        const response = await fetch('/api/skill-analysis/domains');
        console.log('Domains response status:', response.status);
        
        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            console.error('Domains API Error:', {
              status: response.status,
              statusText: response.statusText,
              errorData: errorData,
              url: '/api/skill-analysis/domains'
            });
            errorMessage = errorData.message || errorData.code || errorMessage;
          } catch (parseError) {
            console.error('Failed to parse domains error response:', parseError);
          }
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        console.log('Domains data:', data);
        
        if (data.status === 'success') {
          setDomains(data.data);
          console.log('Domains loaded successfully:', data.data.length);
        } else {
          setError(`Failed to load domains: ${data.message || 'Unknown error'}`);
        }
      } catch (err) {
        console.error('Error loading domains:', err);
        setError(`Failed to load domains: ${err instanceof Error ? err.message : 'Network error'}`);
      }
    };
    loadDomains();
  }, []);

  const handleDomainSelect = async (domain: Domain) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Loading skills for domain:', domain.name);
      const response = await fetch(`/api/skill-analysis/domains/${domain.slug}`);
      console.log('Skills response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.error('Domain Skills API Error:', {
            status: response.status,
            statusText: response.statusText,
            errorData: errorData,
            url: `/api/skill-analysis/domains/${domain.slug}`
          });
          errorMessage = errorData.message || errorData.code || errorMessage;
        } catch (parseError) {
          console.error('Failed to parse domain skills error response:', parseError);
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Skills data:', data);
      
      if (data.status === 'success') {
        setSelectedDomain(data.data);
        setCurrentStep('skills');
        console.log('Skills loaded successfully:', Object.keys(data.data.skills).reduce((acc, level) => acc + data.data.skills[level].length, 0));
      } else {
        setError(`Failed to load domain skills: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error loading domain skills:', err);
      setError(`Failed to load domain skills: ${err instanceof Error ? err.message : 'Network error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillSelect = (skill: Skill) => {
    const existingIndex = selectedSkills.findIndex(s => s.key === skill.key);
    
    if (existingIndex >= 0) {
      // Remove skill
      setSelectedSkills(prev => prev.filter(s => s.key !== skill.key));
    } else {
      // Add skill with default user level
      setSelectedSkills(prev => [...prev, {
        key: skill.key,
        name: skill.name,
        level: skill.level,
        userLevel: 'BEGINNER'
      }]);
    }
  };

  const handleSkillLevelChange = (skill: Skill, level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED') => {
    setSelectedSkills(prev => prev.map(s => 
      s.key === skill.key ? { ...s, userLevel: level } : s
    ));
  };

  const handleStartQuiz = async () => {
    if (selectedSkills.length === 0) return;

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Starting quiz generation...');
      console.log('Selected domain:', selectedDomain?.name);
      console.log('Selected skills:', selectedSkills.map(s => ({ key: s.key, level: s.userLevel })));

      const response = await fetch('/api/skill-analysis/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domainId: selectedDomain!.id,
          skills: selectedSkills.map(s => ({ key: s.key, level: s.userLevel })),
          userId: 'user_' + Date.now() // In real app, get from auth
        })
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        let errorMessage = 'Server error';
        try {
          const errorData = await response.json();
          console.error('Quiz Generation API Error:', {
            status: response.status,
            statusText: response.statusText,
            errorData: errorData,
            url: '/api/skill-analysis/quiz/generate',
            method: 'POST'
          });
          errorMessage = errorData.message || errorData.code || `HTTP ${response.status}: ${response.statusText}`;
        } catch (parseError) {
          console.error('Failed to parse quiz generation error response:', {
            parseError: parseError,
            status: response.status,
            statusText: response.statusText,
            url: '/api/skill-analysis/quiz/generate'
          });
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        setError(`Failed to generate quiz: ${errorMessage}`);
        return;
      }

      const data = await response.json();
      console.log('Quiz data received:', data);

      if (data.status === 'success') {
        setQuizData(data.data);
        setCurrentStep('quiz');
      } else {
        console.error('Quiz generation failed:', data);
        setError(`Failed to generate quiz: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Quiz generation error:', err);
      setError(`Failed to generate quiz: ${err instanceof Error ? err.message : 'Network error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = quizData!.questions[currentQuestionIndex];
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      answer,
      timeSpent: 60 // In real app, track actual time
    }]);

    if (currentQuestionIndex < quizData!.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/skill-analysis/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId: quizData!.assessmentId,
          answers
        })
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setResult(data.data);
        setCurrentStep('results');
      } else {
        console.error('Quiz Submission API Error:', {
          status: response.status,
          statusText: response.statusText,
          errorData: data,
          url: '/api/skill-analysis/quiz/submit'
        });
        setError(`Failed to submit quiz: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Quiz Submission Network Error:', {
        error: err,
        url: '/api/skill-analysis/quiz/submit'
      });
      setError(`Failed to submit quiz: ${err instanceof Error ? err.message : 'Network error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setCurrentStep('quiz');
  };

  const handleNewDomain = () => {
    setSelectedDomain(null);
    setSelectedSkills([]);
    setQuizData(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setCurrentStep('domains');
  };

  if (error) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-600" />
                        </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6 break-words">{error}</p>
          <div className="space-y-3">
                <button
              onClick={() => {
                setError(null);
                window.location.reload();
              }}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
                </button>
                <button
              onClick={() => {
                setError(null);
                setCurrentStep('domains');
              }}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go Back
                </button>
                    </div>
                  </div>
                </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50">
      {/* Brand Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/images/even.png" 
                alt="Brand Logo" 
                className="w-12 h-12 rounded-lg object-cover shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Advanced Skill Analysis</h1>
                <p className="text-gray-600">Interactive assessment with personalized insights</p>
                    </div>
                    </div>

            <div className="flex items-center space-x-4">
              {/* Back to Dashboard Button */}
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300 group"
              >
                <BarChart3 className="w-5 h-5 group-hover:text-pink-600 transition-colors duration-300" />
                <span className="text-sm font-medium group-hover:text-pink-600 transition-colors duration-300">Back to Dashboard</span>
              </button>
              
              {/* Back to Home Button */}
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300 group"
              >
                <Home className="w-5 h-5 group-hover:text-pink-600 transition-colors duration-300" />
                <span className="text-sm font-medium group-hover:text-pink-600 transition-colors duration-300">Back to Home</span>
              </button>
              
              {/* Progress Indicator */}
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">
                  Step {currentStep === 'domains' ? '1' : currentStep === 'skills' ? '2' : currentStep === 'quiz' ? '3' : '4'} of 4
                </div>
                <div className="w-32 bg-pink-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                    style={{ 
                      width: `${currentStep === 'domains' ? 25 : currentStep === 'skills' ? 50 : currentStep === 'quiz' ? 75 : 100}%` 
                    }}
                  />
                </div>
              </div>
                      </div>
                    </div>
                  </div>

      <div className="max-w-7xl mx-auto p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100">
        {/* Domain Selection */}
        {currentStep === 'domains' && (
          <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-black text-black mb-6 tracking-tight hover:scale-105 transition-transform duration-300">
                  Choose Your Career Domain
                </h2>
                
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Choose any domain that interests you! Each path offers valuable skills and learning opportunities. 
                  Take your time to explore what feels right for you.
                </p>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {domains.map((domain) => (
                    <DomainCard
                      key={domain.id}
                      domain={domain}
                      onSelect={handleDomainSelect}
                    />
                        ))}
                      </div>
              )}
            </div>
          )}

          {/* Skills Selection */}
          {currentStep === 'skills' && selectedDomain && (
            <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Select Skills for {selectedDomain.name}
                    </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choose the skills you want to assess. You can select your proficiency level for each skill.
                  We'll generate {selectedSkills.length * 5} questions based on your selections.
                  </p>
                  </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="space-y-8">
                  {Object.entries(selectedDomain.skills).map(([level, skills]) => (
                    <div key={level}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                        {level} Skills ({skills.length})
                    </h3>
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                        {skills.map((skill) => (
                          <SkillPill
                            key={skill.id}
                            skill={skill}
                            isSelected={selectedSkills.some(s => s.key === skill.key)}
                            userLevel={selectedSkills.find(s => s.key === skill.key)?.userLevel || 'BEGINNER'}
                            onSelect={handleSkillSelect}
                            onLevelChange={handleSkillLevelChange}
                          />
                      ))}
                    </div>
                        </div>
                      ))}
                  </div>

                <div className="mt-8 flex items-center justify-between">
                    <button
                    onClick={() => setCurrentStep('domains')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Domains</span>
                    </button>

                  <div className="text-center">
                    <p className="text-gray-600 mb-2">
                      Selected: {selectedSkills.length} skills
                  </p>
                    <button
                      onClick={handleStartQuiz}
                      disabled={selectedSkills.length === 0 || isLoading}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span>Start Assessment</span>
                    </button>
                  </div>
                </div>
                </div>
                </div>
              )}

          {/* Quiz */}
          {currentStep === 'quiz' && quizData && (
              <QuestionCard
                question={quizData.questions[currentQuestionIndex]}
                currentIndex={currentQuestionIndex}
                totalQuestions={quizData.questions.length}
                onAnswer={handleAnswer}
                onNext={() => setCurrentQuestionIndex(prev => prev + 1)}
                onPrevious={() => setCurrentQuestionIndex(prev => prev - 1)}
              />
          )}

          {/* Results */}
          {currentStep === 'results' && result && (
            <div>
              <ResultsPage
                result={result}
                onRetake={handleRetake}
                onNewDomain={handleNewDomain}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
