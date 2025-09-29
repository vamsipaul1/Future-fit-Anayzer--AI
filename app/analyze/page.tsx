'use client';

import { useState } from 'react';

export default function AnalyzePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  const steps = [
    { id: 1, title: 'Skill Selection', description: 'Choose your current skills' },
    { id: 2, title: 'Assessment', description: 'Complete the skill assessment' },
    { id: 3, title: 'Results', description: 'View your analysis results' }
  ];

  const allSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'HTML/CSS',
    'SQL', 'MongoDB', 'Git', 'Docker', 'AWS', 'GraphQL', 'REST APIs',
    'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Project Management'
  ];

  const quizQuestions = [
    {
      question: "How would you rate your JavaScript proficiency?",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"]
    },
    {
      question: "How comfortable are you with React hooks?",
      options: ["Not familiar", "Basic understanding", "Comfortable", "Very experienced"]
    },
    {
      question: "How often do you practice coding?",
      options: ["Rarely", "Weekly", "Daily", "Multiple times daily"]
    }
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Skill Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Assess your current skills and get personalized recommendations
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <SkillSelectionStep 
              skills={allSkills}
              selectedSkills={selectedSkills}
              onSkillToggle={handleSkillToggle}
              onNext={nextStep}
            />
          )}
          
          {currentStep === 2 && (
            <QuizStep 
              questions={quizQuestions}
              answers={quizAnswers}
              onAnswer={handleQuizAnswer}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          
          {currentStep === 3 && (
            <ResultsStep 
              selectedSkills={selectedSkills}
              quizAnswers={quizAnswers}
              onPrev={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SkillSelectionStep({ 
  skills, 
  selectedSkills, 
  onSkillToggle, 
  onNext 
}: {
  skills: string[];
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Select Your Current Skills
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {skills.map((skill) => (
          <button
            key={skill}
            onClick={() => onSkillToggle(skill)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedSkills.includes(skill)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Selected: {selectedSkills.length} skills
        </p>
        <button
          onClick={onNext}
          disabled={selectedSkills.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function QuizStep({ 
  questions, 
  answers, 
  onAnswer, 
  onNext, 
  onPrev 
}: {
  questions: any[];
  answers: number[];
  onAnswer: (questionIndex: number, answerIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    onAnswer(currentQuestion, answerIndex);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onNext();
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {questions[currentQuestion].question}
      </h2>

      <div className="space-y-3 mb-8">
        {questions[currentQuestion].options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
              answers[currentQuestion] === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={answers.length !== questions.length}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          View Results
        </button>
      </div>
    </div>
  );
}

function ResultsStep({ 
  selectedSkills, 
  quizAnswers, 
  onPrev 
}: {
  selectedSkills: string[];
  quizAnswers: number[];
  onPrev: () => void;
}) {
  const skillLevel = quizAnswers[0] || 0;
  const comfortLevel = quizAnswers[1] || 0;
  const practiceFrequency = quizAnswers[2] || 0;

  const recommendations = [
    "Focus on building projects to apply your skills",
    "Consider learning TypeScript for better code quality",
    "Practice coding challenges daily to improve problem-solving",
    "Explore advanced React patterns and state management",
    "Learn about testing frameworks like Jest and React Testing Library"
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Your Skill Analysis Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Selected Skills</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Assessment Summary</h3>
          <div className="space-y-2">
            <p className="text-green-800">Skill Level: {['Beginner', 'Intermediate', 'Advanced', 'Expert'][skillLevel]}</p>
            <p className="text-green-800">Comfort Level: {['Low', 'Medium', 'High', 'Very High'][comfortLevel]}</p>
            <p className="text-green-800">Practice Frequency: {['Low', 'Medium', 'High', 'Very High'][practiceFrequency]}</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">Personalized Recommendations</h3>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-yellow-800 flex items-start">
              <span className="mr-2">•</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
