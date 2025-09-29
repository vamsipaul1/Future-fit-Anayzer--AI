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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4"
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Job Scan Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Upload your resume, input job requirements, and get AI-powered skill analysis with personalized recommendations
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Resume Upload Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Resume Upload</h2>
              </div>

              {/* File Upload */}
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Upload resume file"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full p-6 border-2 border-dashed border-blue-400/50 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <motion.div
                      animate={isUploading ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: isUploading ? Infinity : 0 }}
                    >
                      <FileText className="h-12 w-12 text-blue-400 group-hover:text-blue-300" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-white mb-1">
                        {file ? file.name : 'Click to upload resume'}
                      </p>
                      <p className="text-sm text-gray-400">
                        PDF, DOC, DOCX, or TXT files
                      </p>
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Resume Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Or paste resume text directly
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full h-32 p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Job Description Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Job Requirements</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Software Engineer"
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Domain
                  </label>
                  <input
                    type="text"
                    value={jobDomain}
                    onChange={(e) => setJobDomain(e.target.value)}
                    placeholder="e.g., Technology"
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-32 p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!resumeText || !jobDescription || isAnalyzing}
            className="w-full mt-8 py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3"
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
                <span>Analyze Skills</span>
                <ArrowRight className="h-6 w-6" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center space-x-3">
                <XCircle className="h-6 w-6 text-red-400" />
                <div>
                  <h3 className="text-lg font-semibold text-red-300">Analysis Error</h3>
                  <p className="text-red-200">{error}</p>
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
              className="space-y-8"
            >
              {/* Summary Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="backdrop-blur-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-3xl p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="h-8 w-8 text-green-400" />
                  <h2 className="text-3xl font-bold text-white">Analysis Complete!</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">{analysis.matched.length}</div>
                    <div className="text-gray-300">Matched Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400 mb-2">{analysis.missing.length}</div>
                    <div className="text-gray-300">Missing Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">{analysis.overallScore}%</div>
                    <div className="text-gray-300">Overall Score</div>
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
                  className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-blue-400" />
                    <span>Skill Coverage Analysis</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: '#E5E7EB' }} />
                      <PolarRadiusAxis tick={{ fill: '#E5E7EB' }} />
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
                  className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                    <span>Skills Breakdown</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" tick={{ fill: '#E5E7EB' }} />
                      <YAxis tick={{ fill: '#E5E7EB' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: 'white'
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
                  className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-3xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                    <h3 className="text-2xl font-bold text-white">✅ Matched Skills</h3>
                  </div>
                  <div className="space-y-3">
                    {analysis.matched.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                        className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 backdrop-blur-sm"
                      >
                        <span className="text-green-300 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Missing Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-3xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <XCircle className="h-8 w-8 text-red-400" />
                    <h3 className="text-2xl font-bold text-white">❌ Missing Skills</h3>
                  </div>
                  <div className="space-y-3">
                    {analysis.missing.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                        className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 backdrop-blur-sm"
                      >
                        <span className="text-red-300 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="backdrop-blur-xl bg-purple-500/10 border border-purple-500/20 rounded-3xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <Lightbulb className="h-8 w-8 text-purple-400" />
                    <h3 className="text-2xl font-bold text-white">💡 Recommendations</h3>
                  </div>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                        className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm"
                      >
                        <h4 className="text-purple-300 font-bold mb-2">{rec.name}</h4>
                        <p className="text-purple-200 text-sm mb-3">{rec.why}</p>
                        <div className="space-y-1">
                          {rec.learningPath.map((step, stepIndex) => (
                            <div key={stepIndex} className="text-purple-100 text-xs flex items-center space-x-2">
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
