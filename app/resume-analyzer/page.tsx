'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  TrendingUp,
  Target,
  Sparkles,
  Zap,
  ArrowRight,
  Download,
  Eye,
  BarChart3
} from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface SkillAnalysis {
  matched: string[];
  missing: string[];
  recommendations: {
    name: string;
    why: string;
    learningPath: string[];
  }[];
}

interface AnalysisResult {
  matched: string[];
  missing: string[];
  recommendations: {
    name: string;
    why: string;
    learningPath: string[];
  }[];
  skillCoverage: number;
  overallScore: number;
}

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDomain, setJobDomain] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [displayText, setDisplayText] = useState('');
  const [currentSection, setCurrentSection] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setExtractedText(data.text);
        setResumeText(data.text);
      } else {
        setError('Failed to extract text from file. Please try again.');
      }
    } catch (error) {
      console.error('File upload error:', error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const typewriterEffect = (text: string, section: string, delay = 0) => {
    setTimeout(() => {
      setCurrentSection(section);
      setDisplayText('');
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 20);
    }, delay);
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide both resume text and job description.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);
    setError('');

    try {
      const response = await fetch('/api/skill-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          resumeText, 
          jobDescription,
          jobTitle,
          jobDomain 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.analysis);
        
        // Display analysis with typewriter effect
        typewriterEffect(`Analysis Complete! Found ${data.analysis.matched.length} matched skills and ${data.analysis.missing.length} missing skills.`, 'summary', 500);
      } else {
        setError(data.error || 'Analysis failed. Please try again.');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Prepare data for charts
  const radarData = analysis ? [
    { skill: 'Technical', value: analysis.skillCoverage },
    { skill: 'Soft Skills', value: Math.min(100, analysis.skillCoverage + 10) },
    { skill: 'Experience', value: Math.min(100, analysis.skillCoverage - 5) },
    { skill: 'Education', value: Math.min(100, analysis.skillCoverage + 15) },
    { skill: 'Certifications', value: Math.min(100, analysis.skillCoverage - 10) }
  ] : [];

  const barData = analysis ? [
    { name: 'Matched', value: analysis.matched.length, color: '#10B981' },
    { name: 'Missing', value: analysis.missing.length, color: '#EF4444' },
    { name: 'Recommended', value: analysis.recommendations.length, color: '#8B5CF6' }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Dashboard Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              AI Resume Analysis
            </h1>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <Sparkles className="h-4 w-4" />
              <span>Premium Feature</span>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume for comprehensive AI-powered analysis
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* File Upload Area */}
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Upload resume file"
                />
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Upload className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Drop your resume here
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Or click to browse files. Supports PDF, DOC, DOCX formats up to 10MB.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                      >
                        Choose Files
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* File Type Icons */}
              <div className="flex items-center justify-center space-x-6 mt-6">
                <div className="flex items-center space-x-2 text-gray-500">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">PDF</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">DOC</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">DOCX</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">TXT</span>
                </div>
              </div>

              {/* Resume Text Input */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Or paste resume text directly
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Job Description Input */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Job Description (Optional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here for targeted analysis..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Analyze Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={!resumeText || isAnalyzing}
                className="w-full mt-8 py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-3"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Brain className="h-6 w-6" />
                    </motion.div>
                    <span>AI Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-6 w-6" />
                    <span>Analyze Resume</span>
                    <ArrowRight className="h-6 w-6" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Analysis Features Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Analysis Features</h3>
              
              <div className="space-y-6">
                {/* ATS Optimization */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">ATS Optimization</h4>
                    <p className="text-sm text-gray-600">Improve compatibility with Applicant Tracking Systems.</p>
                  </div>
                </div>

                {/* Skill Gap Analysis */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Skill Gap Analysis</h4>
                    <p className="text-sm text-gray-600">Identify missing skills and get learning recommendations.</p>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">AI Recommendations</h4>
                    <p className="text-sm text-gray-600">Get specific suggestions to improve your resume.</p>
                  </div>
                </div>

                {/* Market Insights */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Market Insights</h4>
                    <p className="text-sm text-gray-600">Industry trends and salary benchmarks.</p>
                  </div>
                </div>

                {/* Premium Analysis */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Premium Analysis</h4>
                    <p className="text-sm text-gray-600">Advanced AI-powered insights and personalized recommendations.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3">
                <XCircle className="h-6 w-6 text-red-500" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800">Analysis Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 space-y-8"
            >
              {/* Summary Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="h-8 w-8 text-green-500" />
                  <h2 className="text-3xl font-bold text-gray-900">Analysis Complete!</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-500 mb-2">{analysis.matched.length}</div>
                    <div className="text-gray-600">Matched Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-500 mb-2">{analysis.missing.length}</div>
                    <div className="text-gray-600">Missing Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-500 mb-2">{analysis.overallScore}%</div>
                    <div className="text-gray-600">Overall Score</div>
                  </div>
                </div>
              </motion.div>

              {/* Skills Visualization */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Radar Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                    <span>Skill Coverage Analysis</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: '#6B7280' }} />
                      <PolarRadiusAxis tick={{ fill: '#6B7280' }} />
                      <Radar
                        name="Skills"
                        dataKey="value"
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Bar Chart */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <span>Skills Breakdown</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                      <YAxis tick={{ fill: '#6B7280' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          color: '#374151'
                        }}
                      />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* Skills Sections */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Matched Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <h3 className="text-2xl font-bold text-gray-900">✅ Matched Skills</h3>
                  </div>
                  <div className="space-y-3">
                    {analysis.matched.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                        className="bg-green-50 border border-green-200 rounded-xl p-3"
                      >
                        <span className="text-green-700 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Missing Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <XCircle className="h-8 w-8 text-red-500" />
                    <h3 className="text-2xl font-bold text-gray-900">❌ Missing Skills</h3>
                  </div>
                  <div className="space-y-3">
                    {analysis.missing.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-3"
                      >
                        <span className="text-red-700 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <Lightbulb className="h-8 w-8 text-purple-500" />
                    <h3 className="text-2xl font-bold text-gray-900">💡 Recommendations</h3>
                  </div>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                        className="bg-purple-50 border border-purple-200 rounded-xl p-4"
                      >
                        <h4 className="text-purple-800 font-bold mb-2">{rec.name}</h4>
                        <p className="text-purple-700 text-sm mb-3">{rec.why}</p>
                        <div className="space-y-1">
                          {rec.learningPath.map((step, stepIndex) => (
                            <div key={stepIndex} className="text-purple-600 text-xs flex items-center space-x-2">
                              <ArrowRight className="h-3 w-3" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
