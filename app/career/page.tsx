'use client';

import { useState } from 'react';

export default function CareerPage() {
  const [activeComponent, setActiveComponent] = useState('quiz');

  const careerComponents = {
    quiz: {
      title: 'Career Quiz',
      description: 'Discover your ideal career path through our comprehensive assessment',
      component: <CareerQuiz />
    },
    skillTree: {
      title: 'Skill Tree Visual',
      description: 'Visualize your skill development journey',
      component: <SkillTreeVisual />
    },
    analysis: {
      title: 'Career Analysis',
      description: 'Get detailed insights about your career prospects',
      component: <CareerAnalysis />
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Career Development Tools
          </h1>
          <p className="text-xl text-gray-600">
            Explore your career path with our comprehensive tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(careerComponents).map(([key, component]) => (
            <button
              key={key}
              onClick={() => setActiveComponent(key)}
              className={`p-6 rounded-lg border-2 transition-all ${
                activeComponent === key
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 bg-white hover:border-pink-300'
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {component.title}
              </h3>
              <p className="text-gray-600">
                {component.description}
              </p>
            </button>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {careerComponents[activeComponent as keyof typeof careerComponents].title}
          </h2>
          {careerComponents[activeComponent as keyof typeof careerComponents].component}
        </div>
      </div>
    </div>
  );
}

function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "What type of work environment do you prefer?",
      options: ["Remote work", "Office environment", "Mixed/hybrid", "Field work"]
    },
    {
      question: "What motivates you most in your career?",
      options: ["Financial success", "Helping others", "Creative expression", "Problem solving"]
    },
    {
      question: "How do you prefer to learn new skills?",
      options: ["Hands-on practice", "Reading and research", "Video tutorials", "Mentorship"]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      alert('Quiz completed! Based on your answers, we recommend exploring careers in technology and innovation.');
    }
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold text-green-600 mb-4">
          Quiz Completed!
        </h3>
        <p className="text-gray-600">
          Based on your answers, we recommend exploring careers in technology and innovation.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {questions[currentQuestion].question}
      </h3>

      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function SkillTreeVisual() {
  const skills = [
    { name: 'JavaScript', level: 80, category: 'Programming' },
    { name: 'React', level: 70, category: 'Frontend' },
    { name: 'Node.js', level: 60, category: 'Backend' },
    { name: 'Python', level: 50, category: 'Programming' },
    { name: 'SQL', level: 65, category: 'Database' }
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Your Skill Development Tree
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-900">{skill.name}</h4>
              <span className="text-sm text-gray-500">{skill.category}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{skill.level}% proficiency</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerAnalysis() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Career Analysis Report
      </h3>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Strengths</h4>
          <ul className="text-blue-800 space-y-1">
            <li>• Strong technical foundation</li>
            <li>• Good problem-solving skills</li>
            <li>• Adaptable to new technologies</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">Areas for Growth</h4>
          <ul className="text-yellow-800 space-y-1">
            <li>• Leadership and management skills</li>
            <li>• Advanced data analysis</li>
            <li>• Cloud architecture knowledge</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Recommended Path</h4>
          <p className="text-green-800">
            Focus on developing full-stack capabilities and consider pursuing a senior developer role 
            with opportunities for team leadership and architectural decision-making.
          </p>
        </div>
      </div>
    </div>
  );
}
