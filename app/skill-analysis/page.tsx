'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Award
} from 'lucide-react';

interface SkillAnalysisResult {
  overallScore: number;
  strengths: Array<{
    category: string;
    skills: string[];
    score: number;
  }>;
  improvements: string[];
  recommendations: string[];
  careerPaths: Array<{
    title: string;
    match: number;
  }>;
}

export default function SkillAnalysisPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SkillAnalysisResult | null>(null);

  const steps = [
    { id: 1, title: 'Select Skills', description: 'Choose your current skills' },
    { id: 2, title: 'Add Experience', description: 'Tell us about your experience' },
    { id: 3, title: 'Analysis', description: 'Get your personalized results' }
  ];

  const allSkills = [
    // Frontend
    'HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'TypeScript', 'SASS',
    // Backend  
    'Node.js', 'Python', 'Java', 'PHP', 'Express', 'Django', 'Spring', 'Laravel',
    // Database
    'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
    // DevOps
    'Docker', 'AWS', 'Git', 'CI/CD', 'Kubernetes', 'Jenkins', 'Terraform',
    // Design
    'Figma', 'Photoshop', 'UI/UX', 'Wireframing', 'Sketch', 'Adobe XD',
    // Data Science
    'Machine Learning', 'Statistics', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch',
    // Mobile
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android',
    // Other
    'GraphQL', 'REST APIs', 'Microservices', 'Agile', 'Scrum', 'Project Management'
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSkills.length === 0) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/skill-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: selectedSkills,
          experience: experience,
          userId: 'user_' + Date.now()
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setAnalysisResult(data.analysis);
        setCurrentStep(3);
      } else {
        console.error('Analysis failed:', data.error);
      }
    } catch (error) {
      console.error('Error analyzing skills:', error);
    } finally {
      setIsAnalyzing(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Skill Analysis</h1>
              <p className="text-gray-600">Get personalized insights about your skills</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-6 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Select Your Skills
              </h2>
              <p className="text-gray-600 mb-8">
                Choose all the skills you currently have or are learning. This helps us provide accurate analysis.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedSkills.includes(skill)
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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
                  onClick={nextStep}
                  disabled={selectedSkills.length === 0}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tell Us About Your Experience
              </h2>
              <p className="text-gray-600 mb-8">
                Help us understand your background to provide more accurate recommendations.
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Select your experience level"
                  >
                    <option value="">Select your experience level</option>
                    <option value="0-1">0-1 years (Beginner)</option>
                    <option value="1-3">1-3 years (Junior)</option>
                    <option value="3-5">3-5 years (Mid-level)</option>
                    <option value="5-10">5-10 years (Senior)</option>
                    <option value="10+">10+ years (Expert)</option>
                  </select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Selected Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={!experience}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Brain className="w-4 h-4" />
                  <span>Analyze My Skills</span>
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Analyzing Your Skills...
                  </h3>
                  <p className="text-gray-600">
                    Our AI is processing your skills and generating personalized insights.
                  </p>
                </div>
              ) : analysisResult ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Your Skill Analysis Results
                    </h2>
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                      <Award className="w-6 h-6 text-blue-600 mr-2" />
                      <span className="text-2xl font-bold text-blue-600">
                        {analysisResult.overallScore}% Overall Score
                      </span>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Your Strengths
                      </h3>
                      <div className="space-y-4">
                        {analysisResult.strengths.map((strength, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold text-green-800">{strength.category}</h4>
                              <span className="text-sm font-bold text-green-600">{strength.score}%</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {strength.skills.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Paths */}
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Recommended Career Paths
                      </h3>
                      <div className="space-y-3">
                        {analysisResult.careerPaths.map((path, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-purple-800">{path.title}</h4>
                              <span className="text-sm font-bold text-purple-600">{path.match}% match</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${path.match}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Personalized Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisResult.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <p className="text-yellow-800">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => window.location.href = '/dashboard'}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <span>Go to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Analysis Results
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Something went wrong. Please try again.
                  </p>
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
