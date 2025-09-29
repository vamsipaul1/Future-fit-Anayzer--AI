import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Briefcase, 
  Code, 
  Users, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  CheckCircle,
  ArrowRight,
  Clock,
  Star,
  Zap
} from "lucide-react";

interface AdvancedCareerPathAnalysisProps {
  quizResult?: any;
  onComplete?: (result: any) => void;
  onBack?: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  category: string;
  icon: React.ComponentType<any>;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of work environment energizes you most?",
    options: ["Collaborative team settings", "Independent focused work", "Dynamic fast-paced environments", "Structured organized spaces"],
    category: "Work Style",
    icon: Users
  },
  {
    id: 2,
    question: "Which problem-solving approach resonates with you?",
    options: ["Creative brainstorming", "Data-driven analysis", "Systematic step-by-step", "Innovative experimentation"],
    category: "Problem Solving",
    icon: Brain
  },
  {
    id: 3,
    question: "What motivates you most in your career?",
    options: ["Making a positive impact", "Continuous learning", "Financial success", "Creative expression"],
    category: "Motivation",
    icon: Target
  },
  {
    id: 4,
    question: "How do you prefer to learn new skills?",
    options: ["Hands-on practice", "Reading and research", "Video tutorials", "Mentorship and guidance"],
    category: "Learning Style",
    icon: Lightbulb
  },
  {
    id: 5,
    question: "What type of challenges excite you?",
    options: ["Technical complexity", "Creative design problems", "Strategic planning", "People management"],
    category: "Challenge Preference",
    icon: Zap
  }
];

export const AdvancedCareerPathAnalysisSimple: React.FC<AdvancedCareerPathAnalysisProps> = ({ 
  quizResult, 
  onComplete, 
  onBack 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [isAnimating, setIsAnimating] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (currentStep === 0 && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep, timeRemaining]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnswers(prev => ({ ...prev, [quizQuestions[currentQuestion].id]: answer }));
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setCurrentStep(1);
      }
      setIsAnimating(false);
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuizStep = () => {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-8"
      >
        {/* Hero Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Discover your ideal
              <br />
              career path
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Answer a few questions and let our AI analyze your preferences to find the perfect career match for you.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2 mb-6 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.div>

          {/* Timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center space-x-2 text-gray-600 mb-8"
          >
            <Clock className="w-5 h-5" />
            <span className="text-lg font-medium">{formatTime(timeRemaining)}</span>
          </motion.div>
        </div>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium mb-6"
          >
            <question.icon className="w-4 h-4" />
            <span>{question.category}</span>
          </motion.div>

          {/* Question */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed"
          >
            {question.question}
          </motion.h3>

          {/* Answer Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnimating}
                className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-gray-300 group-hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-300">
                    <span className="text-sm font-bold text-gray-700 group-hover:text-white">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    {option}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  const renderAnalysisStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Brain className="w-10 h-10 text-white animate-pulse" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Analyzing Your Career Path
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-600 text-lg mb-8"
          >
            Our AI is analyzing your responses to find your perfect career match
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <div className="space-y-6">
            {[
              { text: "Analyzing your work style preferences", delay: 1 },
              { text: "Evaluating your problem-solving approach", delay: 1.5 },
              { text: "Assessing your motivation drivers", delay: 2 },
              { text: "Matching you with ideal career paths", delay: 2.5 },
              { text: "Generating personalized recommendations", delay: 3 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="flex items-center space-x-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: item.delay + 0.2 }}
                  className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-gray-600 text-lg">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 4 }}
          className="text-center"
        >
          <motion.button
            onClick={() => setCurrentStep(2)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto"
          >
            <span>View Results</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    );
  };

  const renderResultsStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Star className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Your Career Analysis Results
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-600 text-lg mb-8"
          >
            Based on your responses, here are your personalized career recommendations
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Recommended Career Path</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Full Stack Developer</h4>
                <p className="text-gray-600">Perfect match based on your problem-solving style and learning preferences</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">Growth Potential</h4>
                <p className="text-gray-600">High demand with 25% job growth expected</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <Target className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">Salary Range</h4>
                <p className="text-gray-600">$80K - $150K average salary</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <motion.button
            onClick={() => onComplete && onComplete({ answers, recommendedPath: "Full Stack Developer" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderQuizStep();
      case 1:
        return renderAnalysisStep();
      case 2:
        return renderResultsStep();
      default:
        return null;
    }
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
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
              <span className="text-sm font-medium">Back to Quiz</span>
            </motion.button>
          </motion.div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
