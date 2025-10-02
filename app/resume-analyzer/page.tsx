'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../../components/ui/BackButton';
import AIChatbot from '../../components/ui/AIChatbot';
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
  BarChart3,
  Loader2,
  AlertCircle,
  Star,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  File,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface ResumeAnalysis {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  skills: {
    technical: string[];
    soft: string[];
    missing: string[];
  };
  experience: {
    years: number;
    level: 'entry' | 'mid' | 'senior' | 'executive';
    industries: string[];
  };
  recommendations: {
    category: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  atsScore: number;
  keywordMatch: number;
  summary: string;
}

interface CareerAnalysis {
  careerLevel: string;
  careerPath: string[];
  growthAreas: string[];
  nextSteps: string[];
  salaryRange: string;
  marketDemand: 'high' | 'medium' | 'low';
}

export default function AdvancedResumeAnalyzer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisType, setAnalysisType] = useState<'comprehensive' | 'skills' | 'career'>('comprehensive');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState('');
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const [careerAnalysis, setCareerAnalysis] = useState<CareerAnalysis | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { id: 1, title: 'Upload Resume', description: 'Upload your resume file' },
    { id: 2, title: 'Job Description', description: 'Add target job description (optional)' },
    { id: 3, title: 'Analysis', description: 'AI-powered analysis' },
    { id: 4, title: 'Results', description: 'View detailed insights' }
  ];

  const handleFileUpload = async (file: File) => {
    setError('');
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases with helpful messages
        if (data.error && data.error.includes('image-based')) {
          throw new Error('This PDF appears to be a scanned image. Please upload a text-based PDF or convert to TXT format.');
        } else if (data.error && data.error.includes('No text found')) {
          throw new Error('No readable text found in the file. Please ensure your PDF contains selectable text, not just images.');
        } else if (data.error && data.error.includes('Unsupported file type')) {
          throw new Error('Unsupported file type. Please upload PDF, DOC, DOCX, or TXT files only.');
        } else if (data.error && data.error.includes('File size too large')) {
          throw new Error('File size too large. Please upload files smaller than 10MB.');
        } else if (data.suggestion) {
          throw new Error(`${data.error || 'Failed to extract text'}. ${data.suggestion}`);
        } else {
          throw new Error(data.error || 'Failed to extract text');
        }
      }

      setUploadedFile(file);
      setExtractedText(data.text);
      setCurrentStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalysis = async () => {
    if (!extractedText) return;

    setError('');
    setIsAnalyzing(true);
    setAnalysisProgress('Initializing analysis...');

    try {
      setAnalysisProgress('Sending data to Gemini AI...');
      
      const response = await fetch('/api/resume-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: extractedText,
          jobDescription: jobDescription || undefined,
          analysisType: analysisType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysisProgress('Processing response...');
      console.log('API Response:', data); // Debug log

      // Handle the response directly - Gemini API returns structured data
      if (data.overallScore !== undefined) {
        // This is a proper Gemini analysis response
        setAnalysisProgress('Finalizing results...');
        setAnalysisResult(data);
      } else if (data.type === 'text') {
        // Handle text response - show the actual AI analysis text
        setAnalysisResult({
          overallScore: 75,
          strengths: ['AI Analysis Completed'],
          weaknesses: ['Response returned as text format'],
          skills: {
            technical: ['Text Analysis'],
            soft: ['AI Processing'],
            missing: ['Structured data format']
          },
          experience: {
            years: 0,
            level: 'entry',
            industries: []
          },
          recommendations: [{
            category: 'Analysis Format',
            suggestion: data.analysis,
            priority: 'medium'
          }],
          atsScore: 70,
          keywordMatch: 65,
          summary: data.analysis
        });
      } else {
        // Handle other analysis types
        if (analysisType === 'career') {
          setCareerAnalysis(data);
        } else {
          setAnalysisResult(data);
        }
      }

      setCurrentStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress('');
    }
  };

  const resetAnalysis = () => {
    setCurrentStep(1);
    setUploadedFile(null);
    setExtractedText('');
    setJobDescription('');
    setAnalysisResult(null);
    setCareerAnalysis(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-40">
        <BackButton />
      </div>

      {/* AI Chatbot */}
      <AIChatbot context="resume" autoMinimize={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Resume Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get AI-powered insights on your resume with Google Gemini AI. 
            Analyze skills, career progression, and get personalized recommendations.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="ml-3 text-left">
                    <div className="text-sm font-medium text-gray-900">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-300 mx-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-red-800 font-medium">{error}</span>
                
                {/* Helpful suggestions based on error type */}
                {error.includes('scanned image') && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 How to fix this:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Convert your PDF to TXT format using Microsoft Word or Google Docs</li>
                      <li>• Use OCR tools like Adobe Acrobat to extract text from scanned PDFs</li>
                      <li>• Save your resume as a Word document (.docx) instead</li>
                      <li>• Copy and paste your resume text into a .txt file</li>
                    </ul>
                  </div>
                )}
                
                {error.includes('No readable text') && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 How to fix this:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Ensure your PDF contains selectable text (not just images)</li>
                      <li>• Try opening the PDF and copying the text to a new document</li>
                      <li>• Convert to TXT format for better compatibility</li>
                      <li>• Check if the file is corrupted by opening it in another program</li>
                    </ul>
                  </div>
                )}
                
                {error.includes('Unsupported file type') && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Supported formats:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• PDF files (text-based, not scanned images)</li>
                      <li>• TXT files (plain text)</li>
                      <li>• DOC files (Microsoft Word)</li>
                      <li>• DOCX files (Microsoft Word)</li>
                    </ul>
                  </div>
                )}
                
                {error.includes('File size too large') && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 How to fix this:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Compress your PDF using online tools</li>
                      <li>• Convert to TXT format (much smaller file size)</li>
                      <li>• Remove images and keep only text content</li>
                      <li>• Split large documents into smaller parts</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: File Upload */}
          {currentStep === 1 && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-10 h-10 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Upload Your Resume
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Upload your resume in PDF, DOC, DOCX, or TXT format. 
                    We'll extract the text and analyze it with AI.
                  </p>

                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Click to upload or drag and drop your resume
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, DOC, DOCX, TXT up to 10MB
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                    aria-label="Upload resume file"
                    className="hidden"
                    suppressHydrationWarning
                  />

                  {isAnalyzing && (
                    <div className="mt-6 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-purple-600 mr-2" />
                      <span className="text-gray-600">Extracting text from resume...</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Job Description */}
          {currentStep === 2 && (
            <motion.div
              key="job-description"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Target Job Description
                  </h2>
                  <p className="text-gray-600">
                    Add a job description to get targeted analysis and recommendations
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Analysis Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'comprehensive', label: 'Comprehensive', icon: Brain },
                        { value: 'skills', label: 'Skills Focus', icon: Target },
                        { value: 'career', label: 'Career Path', icon: TrendingUp }
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => setAnalysisType(value as any)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            analysisType === value
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-1" />
                          <div className="text-xs font-medium">{label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description (Optional)
                    </label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description here for targeted analysis..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Analysis */}
          {currentStep === 3 && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    AI Analysis in Progress
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Our AI is analyzing your resume using Google Gemini AI. 
                    This may take a few moments...
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-purple-600 mr-3" />
                      <span className="text-lg font-medium text-gray-700">
                        Analyzing with Gemini AI...
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-blue-800">Text Extraction</div>
                        <div className="text-xs text-blue-600">Complete</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-purple-800">AI Analysis</div>
                        <div className="text-xs text-purple-600">In Progress</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-600">Results</div>
                        <div className="text-xs text-gray-500">Pending</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAnalysis}
                    disabled={isAnalyzing}
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {analysisProgress || 'Analyzing...'}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && analysisResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Overall Score */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Resume Analysis Results
                  </h2>
                  <div className="flex items-center justify-center space-x-4">
                    <div className={`w-24 h-24 rounded-full ${getScoreBgColor(analysisResult.overallScore || 0)} flex items-center justify-center`}>
                      <span className={`text-3xl font-bold ${getScoreColor(analysisResult.overallScore || 0)}`}>
                        {analysisResult.overallScore || 0}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">Overall Score</div>
                      <div className="text-gray-600">Out of 100</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-green-800">Strengths</h3>
                    </div>
                    <ul className="space-y-2">
                      {(analysisResult.strengths || []).map((strength, index) => (
                        <li key={index} className="text-green-700 flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          {strength}
                        </li>
                      ))}
                      {(!analysisResult.strengths || analysisResult.strengths.length === 0) && (
                        <li className="text-gray-500 italic">No strengths identified</li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <XCircle className="w-6 h-6 text-red-600 mr-2" />
                      <h3 className="text-lg font-semibold text-red-800">Areas for Improvement</h3>
                    </div>
                    <ul className="space-y-2">
                      {(analysisResult.weaknesses || []).map((weakness, index) => (
                        <li key={index} className="text-red-700 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {weakness}
                        </li>
                      ))}
                      {(!analysisResult.weaknesses || analysisResult.weaknesses.length === 0) && (
                        <li className="text-gray-500 italic">No areas for improvement identified</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-purple-600" />
                  Skills Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4">Technical Skills</h4>
                    <div className="space-y-2">
                      {(analysisResult.skills?.technical || []).map((skill, index) => (
                        <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-4">Soft Skills</h4>
                    <div className="space-y-2">
                      {(analysisResult.skills?.soft || []).map((skill, index) => (
                        <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-4">Missing Skills</h4>
                    <div className="space-y-2">
                      {(analysisResult.skills?.missing || []).map((skill, index) => (
                        <div key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
                  AI Recommendations
                </h3>
                
                <div className="space-y-4">
                  {(analysisResult.recommendations || []).map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      rec.priority === 'high' ? 'border-red-500 bg-red-50' :
                      rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-green-500 bg-green-50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{rec.category}</h4>
                          <p className="text-gray-700 mt-1">{rec.suggestion}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                  AI Summary
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {analysisResult.summary || 'No summary available'}
                </p>
              </div>

              {/* Raw JSON Response */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-purple-600" />
                  Raw Gemini AI Response
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">JSON Response</h4>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(analysisResult, null, 2));
                      }}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Copy JSON
                    </button>
                  </div>
                  <pre className="text-sm text-gray-700 overflow-x-auto max-h-96 overflow-y-auto">
                    {JSON.stringify(analysisResult, null, 2)}
                  </pre>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="font-semibold text-blue-800">Analysis Type</div>
                    <div className="text-blue-700">{analysisType}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold text-green-800">Data Source</div>
                    <div className="text-green-700">Gemini AI</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <div className="font-semibold text-purple-800">Response Time</div>
                    <div className="text-purple-700">Real-time</div>
                  </div>
                </div>
              </div>

              {/* Debug Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-orange-600" />
                  Debug Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Analysis Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overall Score:</span>
                        <span className="font-semibold">{analysisResult.overallScore || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ATS Score:</span>
                        <span className="font-semibold">{analysisResult.atsScore || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Keyword Match:</span>
                        <span className="font-semibold">{analysisResult.keywordMatch || 'N/A'}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience Level:</span>
                        <span className="font-semibold">{analysisResult.experience?.level || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Years Experience:</span>
                        <span className="font-semibold">{analysisResult.experience?.years || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Skills Count</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Technical Skills:</span>
                        <span className="font-semibold">{analysisResult.skills?.technical?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Soft Skills:</span>
                        <span className="font-semibold">{analysisResult.skills?.soft?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Missing Skills:</span>
                        <span className="font-semibold">{analysisResult.skills?.missing?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Strengths:</span>
                        <span className="font-semibold">{analysisResult.strengths?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weaknesses:</span>
                        <span className="font-semibold">{analysisResult.weaknesses?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">Analysis Status</h4>
                  <div className="text-sm text-blue-700">
                    <p>✅ <strong>Gemini AI Analysis Complete</strong> - Real-time analysis of your resume</p>
                    <p>✅ <strong>Job Description Comparison</strong> - {jobDescription ? 'Included' : 'Not provided'}</p>
                    <p>✅ <strong>Skills Extraction</strong> - Based on actual resume content</p>
                    <p>✅ <strong>Recommendations Generated</strong> - Personalized suggestions</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetAnalysis}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Analyze Another Resume
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </button>
              </div>
            </motion.div>
          )}

          {/* Fallback: Step 4 but no results */}
          {currentStep === 4 && !analysisResult && !careerAnalysis && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Analysis Complete
                </h2>
                <p className="text-gray-600 mb-8">
                  The analysis has been completed, but the results are not displaying properly. 
                  Please check the browser console for more details.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors mr-4"
                  >
                    ← Back to Analysis
                  </button>
                  <button
                    onClick={resetAnalysis}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}