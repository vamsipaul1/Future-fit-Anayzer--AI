import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { careerAnalysisEngine, CareerMatch } from '../../../lib/career-analysis-engine';
import { 
  Brain, 
  Target, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Star,
  BarChart3,
  TrendingUp,
  Zap,
  Crown,
  Sparkles,
  Users,
  Briefcase,
  Lightbulb,
  Award,
  Rocket,
  Shield,
  Eye
} from 'lucide-react';

// Enhanced Career Questions with Rating System (20+ questions)
const careerQuestions = [
  {
    id: 'tech_interest',
    category: 'Technology',
    question: 'How much do you enjoy working with technology and software?',
    type: 'rating',
    answers: [
      { id: 'tech_1', text: 'Not at all interested', rating: 1 },
      { id: 'tech_2', text: 'Slightly interested', rating: 2 },
      { id: 'tech_3', text: 'Moderately interested', rating: 3 },
      { id: 'tech_4', text: 'Very interested', rating: 4 },
      { id: 'tech_5', text: 'Extremely passionate', rating: 5 },
      { id: 'tech_6', text: 'It\'s my life passion', rating: 6 }
    ]
  },
  {
    id: 'problem_solving',
    category: 'Problem Solving',
    question: 'Rate your passion for solving complex problems',
    type: 'rating',
    answers: [
      { id: 'ps_1', text: 'Avoid problems when possible', rating: 1 },
      { id: 'ps_2', text: 'Handle simple problems', rating: 2 },
      { id: 'ps_3', text: 'Enjoy moderate challenges', rating: 3 },
      { id: 'ps_4', text: 'Love solving puzzles', rating: 4 },
      { id: 'ps_5', text: 'Thrive on complex challenges', rating: 5 },
      { id: 'ps_6', text: 'Live for impossible problems', rating: 6 }
    ]
  },
  {
    id: 'creativity',
    category: 'Creativity',
    question: 'How creative and innovative are you?',
    type: 'rating',
    answers: [
      { id: 'cre_1', text: 'Prefer following established methods', rating: 1 },
      { id: 'cre_2', text: 'Occasionally think outside the box', rating: 2 },
      { id: 'cre_3', text: 'Regularly come up with new ideas', rating: 3 },
      { id: 'cre_4', text: 'Very creative and innovative', rating: 4 },
      { id: 'cre_5', text: 'Constantly innovating', rating: 5 },
      { id: 'cre_6', text: 'Revolutionary thinker', rating: 6 }
    ]
  },
  {
    id: 'leadership',
    category: 'Leadership',
    question: 'How comfortable are you leading and managing others?',
    type: 'rating',
    answers: [
      { id: 'lead_1', text: 'Prefer to work independently', rating: 1 },
      { id: 'lead_2', text: 'Occasionally guide others', rating: 2 },
      { id: 'lead_3', text: 'Comfortable leading small teams', rating: 3 },
      { id: 'lead_4', text: 'Natural team leader', rating: 4 },
      { id: 'lead_5', text: 'Excellent manager', rating: 5 },
      { id: 'lead_6', text: 'Born leader and visionary', rating: 6 }
    ]
  },
  {
    id: 'communication',
    category: 'Communication',
    question: 'Rate your communication and interpersonal skills',
    type: 'rating',
    answers: [
      { id: 'comm_1', text: 'Prefer written communication', rating: 1 },
      { id: 'comm_2', text: 'Basic social skills', rating: 2 },
      { id: 'comm_3', text: 'Good at explaining ideas', rating: 3 },
      { id: 'comm_4', text: 'Excellent communicator', rating: 4 },
      { id: 'comm_5', text: 'Persuasive and influential', rating: 5 },
      { id: 'comm_6', text: 'Master of communication', rating: 6 }
    ]
  },
  {
    id: 'analytical',
    category: 'Analytical',
    question: 'How strong are your analytical and data skills?',
    type: 'rating',
    answers: [
      { id: 'ana_1', text: 'Avoid numbers and data', rating: 1 },
      { id: 'ana_2', text: 'Basic analytical skills', rating: 2 },
      { id: 'ana_3', text: 'Good with data analysis', rating: 3 },
      { id: 'ana_4', text: 'Strong analytical thinker', rating: 4 },
      { id: 'ana_5', text: 'Data analysis expert', rating: 5 },
      { id: 'ana_6', text: 'Statistical genius', rating: 6 }
    ]
  },
  {
    id: 'work_environment',
    category: 'Work Environment',
    question: 'What work environment suits you best?',
    type: 'rating',
    answers: [
      { id: 'env_1', text: 'Quiet, isolated office', rating: 1 },
      { id: 'env_2', text: 'Small, intimate team', rating: 2 },
      { id: 'env_3', text: 'Collaborative open space', rating: 3 },
      { id: 'env_4', text: 'Dynamic, fast-paced', rating: 4 },
      { id: 'env_5', text: 'High-energy startup', rating: 5 },
      { id: 'env_6', text: 'Global, diverse teams', rating: 6 }
    ]
  },
  {
    id: 'learning_style',
    category: 'Learning',
    question: 'How do you prefer to learn new skills?',
    type: 'rating',
    answers: [
      { id: 'learn_1', text: 'Reading books and manuals', rating: 1 },
      { id: 'learn_2', text: 'Online courses and tutorials', rating: 2 },
      { id: 'learn_3', text: 'Hands-on practice', rating: 3 },
      { id: 'learn_4', text: 'Mentorship and guidance', rating: 4 },
      { id: 'learn_5', text: 'Trial and error', rating: 5 },
      { id: 'learn_6', text: 'Immersive experiences', rating: 6 }
    ]
  },
  {
    id: 'stress_management',
    category: 'Stress Management',
    question: 'How well do you handle high-pressure situations?',
    type: 'rating',
    answers: [
      { id: 'stress_1', text: 'Prefer low-pressure environments', rating: 1 },
      { id: 'stress_2', text: 'Handle moderate pressure', rating: 2 },
      { id: 'stress_3', text: 'Stay calm under pressure', rating: 3 },
      { id: 'stress_4', text: 'Thrive in high-pressure', rating: 4 },
      { id: 'stress_5', text: 'Excel under extreme pressure', rating: 5 },
      { id: 'stress_6', text: 'Pressure energizes me', rating: 6 }
    ]
  },
  {
    id: 'innovation',
    category: 'Innovation',
    question: 'How important is innovation in your ideal role?',
    type: 'rating',
    answers: [
      { id: 'inn_1', text: 'Prefer established processes', rating: 1 },
      { id: 'inn_2', text: 'Occasional improvements', rating: 2 },
      { id: 'inn_3', text: 'Regular innovation needed', rating: 3 },
      { id: 'inn_4', text: 'Constant innovation', rating: 4 },
      { id: 'inn_5', text: 'Breakthrough innovations', rating: 5 },
      { id: 'inn_6', text: 'Revolutionary changes', rating: 6 }
    ]
  },
  {
    id: 'teamwork',
    category: 'Teamwork',
    question: 'How much do you enjoy working in teams?',
    type: 'rating',
    answers: [
      { id: 'team_1', text: 'Prefer working alone', rating: 1 },
      { id: 'team_2', text: 'Small team collaboration', rating: 2 },
      { id: 'team_3', text: 'Regular team projects', rating: 3 },
      { id: 'team_4', text: 'Love team dynamics', rating: 4 },
      { id: 'team_5', text: 'Team building expert', rating: 5 },
      { id: 'team_6', text: 'Teamwork is everything', rating: 6 }
    ]
  },
  {
    id: 'detail_oriented',
    category: 'Attention to Detail',
    question: 'How detail-oriented are you?',
    type: 'rating',
    answers: [
      { id: 'detail_1', text: 'Focus on big picture', rating: 1 },
      { id: 'detail_2', text: 'Basic attention to details', rating: 2 },
      { id: 'detail_3', text: 'Good eye for details', rating: 3 },
      { id: 'detail_4', text: 'Very detail-oriented', rating: 4 },
      { id: 'detail_5', text: 'Perfectionist', rating: 5 },
      { id: 'detail_6', text: 'Obsessed with precision', rating: 6 }
    ]
  },
  {
    id: 'customer_focus',
    category: 'Customer Focus',
    question: 'How important is customer interaction to you?',
    type: 'rating',
    answers: [
      { id: 'cust_1', text: 'Avoid customer contact', rating: 1 },
      { id: 'cust_2', text: 'Minimal customer interaction', rating: 2 },
      { id: 'cust_3', text: 'Regular customer contact', rating: 3 },
      { id: 'cust_4', text: 'Customer-focused role', rating: 4 },
      { id: 'cust_5', text: 'Customer relationship expert', rating: 5 },
      { id: 'cust_6', text: 'Customer success champion', rating: 6 }
    ]
  },
  {
    id: 'risk_taking',
    category: 'Risk Taking',
    question: 'How comfortable are you with taking risks?',
    type: 'rating',
    answers: [
      { id: 'risk_1', text: 'Prefer safe, stable options', rating: 1 },
      { id: 'risk_2', text: 'Occasional calculated risks', rating: 2 },
      { id: 'risk_3', text: 'Comfortable with moderate risks', rating: 3 },
      { id: 'risk_4', text: 'Willing to take big risks', rating: 4 },
      { id: 'risk_5', text: 'Risk-taking entrepreneur', rating: 5 },
      { id: 'risk_6', text: 'High-risk, high-reward', rating: 6 }
    ]
  },
  {
    id: 'work_life_balance',
    category: 'Work-Life Balance',
    question: 'How important is work-life balance to you?',
    type: 'rating',
    answers: [
      { id: 'balance_1', text: 'Work is everything', rating: 1 },
      { id: 'balance_2', text: 'Work-focused with some balance', rating: 2 },
      { id: 'balance_3', text: 'Moderate work-life balance', rating: 3 },
      { id: 'balance_4', text: 'Strong work-life balance', rating: 4 },
      { id: 'balance_5', text: 'Family and personal time priority', rating: 5 },
      { id: 'balance_6', text: 'Life balance is everything', rating: 6 }
    ]
  },
  {
    id: 'travel_preference',
    category: 'Travel',
    question: 'How much travel are you willing to do for work?',
    type: 'rating',
    answers: [
      { id: 'travel_1', text: 'No travel preferred', rating: 1 },
      { id: 'travel_2', text: 'Occasional local travel', rating: 2 },
      { id: 'travel_3', text: 'Regular regional travel', rating: 3 },
      { id: 'travel_4', text: 'Frequent domestic travel', rating: 4 },
      { id: 'travel_5', text: 'International travel', rating: 5 },
      { id: 'travel_6', text: 'Global nomad lifestyle', rating: 6 }
    ]
  },
  {
    id: 'deadline_pressure',
    category: 'Deadlines',
    question: 'How do you perform under tight deadlines?',
    type: 'rating',
    answers: [
      { id: 'dead_1', text: 'Need plenty of time', rating: 1 },
      { id: 'dead_2', text: 'Comfortable with reasonable deadlines', rating: 2 },
      { id: 'dead_3', text: 'Good under time pressure', rating: 3 },
      { id: 'dead_4', text: 'Thrive on tight deadlines', rating: 4 },
      { id: 'dead_5', text: 'Deadline pressure energizes me', rating: 5 },
      { id: 'dead_6', text: 'Impossible deadlines are my specialty', rating: 6 }
    ]
  },
  {
    id: 'mentoring',
    category: 'Mentoring',
    question: 'How much do you enjoy teaching and mentoring others?',
    type: 'rating',
    answers: [
      { id: 'mentor_1', text: 'Prefer to work independently', rating: 1 },
      { id: 'mentor_2', text: 'Occasionally help colleagues', rating: 2 },
      { id: 'mentor_3', text: 'Enjoy sharing knowledge', rating: 3 },
      { id: 'mentor_4', text: 'Natural teacher', rating: 4 },
      { id: 'mentor_5', text: 'Passionate mentor', rating: 5 },
      { id: 'mentor_6', text: 'Born educator', rating: 6 }
    ]
  },
  {
    id: 'industry_interest',
    category: 'Industry',
    question: 'Which industry interests you most?',
    type: 'rating',
    answers: [
      { id: 'ind_1', text: 'Healthcare and Medical', rating: 1 },
      { id: 'ind_2', text: 'Finance and Banking', rating: 2 },
      { id: 'ind_3', text: 'Technology and Software', rating: 3 },
      { id: 'ind_4', text: 'Education and Training', rating: 4 },
      { id: 'ind_5', text: 'Entertainment and Media', rating: 5 },
      { id: 'ind_6', text: 'Manufacturing and Production', rating: 6 }
    ]
  },
  {
    id: 'salary_expectation',
    category: 'Compensation',
    question: 'How important is salary to your career satisfaction?',
    type: 'rating',
    answers: [
      { id: 'sal_1', text: 'Money is not important', rating: 1 },
      { id: 'sal_2', text: 'Basic financial security', rating: 2 },
      { id: 'sal_3', text: 'Competitive compensation', rating: 3 },
      { id: 'sal_4', text: 'High salary important', rating: 4 },
      { id: 'sal_5', text: 'Top-tier compensation', rating: 5 },
      { id: 'sal_6', text: 'Maximum earning potential', rating: 6 }
    ]
  }
];

const ComprehensiveCareerQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [careerResults, setCareerResults] = useState<CareerMatch[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);

  // Shuffle questions on component mount
  useEffect(() => {
    const shuffled = [...careerQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  // Timer effect
  useEffect(() => {
    if (isAnalyzing) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnalyzing]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, rating: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: rating }));
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const results = careerAnalysisEngine.analyzeCareerMatch(answers);
      setCareerResults(results);
      setIsAnalyzing(false);
    }, 3000);
  };

  if (shuffledQuestions.length === 0) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  // Show results if analysis is complete
  if (careerResults.length > 0) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Career Analysis Results</h2>
            
            {/* Top Recommended Career */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Your Top Match</h3>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between mb-4">
              <div>
                    <h4 className="text-xl font-bold text-blue-900 mb-2">{careerResults[0].title}</h4>
                    <p className="text-blue-700 mb-3">{careerResults[0].description}</p>
                    <div className="flex items-center space-x-4 text-sm text-blue-600">
                      <span>💰 ${careerResults[0].salary.avg.toLocaleString()}/year</span>
                      <span>📈 {careerResults[0].growth}% growth</span>
                      <span>🏢 {careerResults[0].demand}% demand</span>
                  </div>
              </div>
              <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{careerResults[0].matchScore}%</div>
                    <div className="text-sm text-blue-500">Match Score</div>
            </div>
          </div>

                <div className="mb-4">
                  <h5 className="font-semibold text-blue-800 mb-2">Why this role fits you:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {careerResults[0].matchReasons.map((reason: string, index: number) => (
                      <li key={index}>• {reason}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-blue-800 mb-2">Key Skills:</h5>
                  <div className="flex flex-wrap gap-2">
                    {careerResults[0].skills.technical.slice(0, 4).map((skill: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
            </div>
          </div>

          {/* Alternative Careers */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🔄 Alternative Career Paths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careerResults.slice(1, 5).map((career, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                    <div>
                        <h4 className="font-semibold text-gray-800">{career.title}</h4>
                        <p className="text-sm text-gray-600">{career.category}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-gray-700">{career.matchScore}%</div>
                        <div className="text-xs text-gray-500">Match</div>
                    </div>
                  </div>
                    <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                    <div className="text-xs text-gray-500">
                      💰 ${career.salary.avg.toLocaleString()}/year • 📈 {career.growth}% growth
                    </div>
                    </div>
              ))}
                  </div>
                </div>

            {/* Market Insights */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Market Insights</h3>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <ul className="text-sm text-green-700 space-y-1">
                  {careerResults[0].marketInsights.map((insight: string, index: number) => (
                    <li key={index}>• {insight}</li>
                  ))}
                </ul>
            </div>
          </div>

          {/* Next Steps */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🚀 Your Next Steps</h3>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <ul className="text-sm text-purple-700 space-y-1">
                  {careerResults[0].learningPath.map((step: string, index: number) => (
                    <li key={index}>• {step}</li>
                  ))}
                </ul>
            </div>
          </div>

            <div className="flex justify-center space-x-4">
            <button 
                onClick={() => {
                  setCareerResults([]);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setTimeRemaining(1800);
                  const shuffled = [...careerQuestions].sort(() => Math.random() - 0.5);
                  setShuffledQuestions(shuffled);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Retake Quiz
            </button>
          </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Compact Quiz Section */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white rounded-lg shadow-lg border border-gray-100 p-4"
          >
            {/* Progress Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <Target className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900 capitalize">
                      {currentQ.category}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Question {currentQuestion + 1} of {shuffledQuestions.length}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Time</div>
                    <div className={`text-xs font-semibold ${timeRemaining < 300 ? 'text-red-500' : 'text-gray-700'}`}>
                      {formatTime(timeRemaining)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Progress</div>
                    <div className="text-xs font-semibold text-gray-700">
                      {Math.round(((currentQuestion + 1) / shuffledQuestions.length) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1">
                <motion.div
                  className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="text-lg font-bold text-gray-900 mb-4 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-2 mb-4">
              {currentQ.answers.map((option: any, index: number) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(currentQ.id, option.rating)}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                    answers[currentQ.id] === option.rating
                      ? 'border-green-500 bg-green-50 text-green-900 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQ.id] === option.rating
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300 bg-white'
                    }`}>
                      {answers[currentQ.id] === option.rating && (
                        <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                    <span className="font-medium text-sm">{option.text}</span>
                    {answers[currentQ.id] === option.rating && (
                      <Sparkles className="w-4 h-4 text-green-400 ml-auto" />
                    )}
                  </div>
                </motion.button>
              ))}
          </div>

            {/* Navigation */}
          <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 text-xs"
              >
                <ArrowLeft className="w-3 h-3" />
                <span className="font-medium">Previous</span>
              </motion.button>

            <div className="flex items-center space-x-2">
                {answers[currentQ.id] ? (
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium text-sm text-green-600">Answered</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                    <span className="font-medium text-sm">Not answered</span>
                  </div>
                )}
            </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-xs"
              >
                <span className="font-medium">
                  {currentQuestion === shuffledQuestions.length - 1 ? 'Analyze' : 'Next'}
                </span>
                <ArrowRight className="w-3 h-3" />
              </motion.button>
          </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ComprehensiveCareerQuiz;
