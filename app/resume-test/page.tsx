'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Target,
  Star,
  Lightbulb,
  BarChart3,
  Loader2,
  Sparkles
} from 'lucide-react';

export default function ResumeAnalysisTest() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState('');

  const sampleResume = `John Doe
Software Engineer
Email: john@example.com
Phone: (555) 123-4567

EXPERIENCE:
Software Engineer at Tech Corp (2020-2024)
- Developed web applications using React and Node.js
- Implemented REST APIs and database design
- Collaborated with cross-functional teams

EDUCATION:
Bachelor of Science in Computer Science
University of Technology (2016-2020)

SKILLS:
- JavaScript, React, Node.js
- Python, SQL
- Git, Docker
- Problem solving, Teamwork`;

  const handleTestAnalysis = async () => {
    setIsAnalyzing(true);
    setError('');

    try {
      const response = await fetch('/api/resume-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: sampleResume,
          analysisType: 'comprehensive',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      console.log('API Response:', data);

      // Set the analysis result directly
      setAnalysisResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Resume Analysis Test
            </h1>
            <p className="text-gray-600 mb-8">
              Testing Gemini AI integration with sample resume
            </p>
          </div>

          {/* Test Button */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <button
              onClick={handleTestAnalysis}
              disabled={isAnalyzing}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Analyzing with Gemini AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Test Gemini Analysis
                </>
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-800 font-medium">Error:</span>
              </div>
              <p className="text-red-700 mt-2">{error}</p>
            </div>
          )}

          {/* Results Display */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                      {(analysisResult.strengths || []).map((strength: any, index: number) => (
                        <li key={index} className="text-green-700 flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <XCircle className="w-6 h-6 text-red-600 mr-2" />
                      <h3 className="text-lg font-semibold text-red-800">Areas for Improvement</h3>
                    </div>
                    <ul className="space-y-2">
                      {(analysisResult.weaknesses || []).map((weakness: any, index: number) => (
                        <li key={index} className="text-red-700 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {weakness}
                        </li>
                      ))}
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
                      {(analysisResult.skills?.technical || []).map((skill: any, index: number) => (
                        <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-4">Soft Skills</h4>
                    <div className="space-y-2">
                      {(analysisResult.skills?.soft || []).map((skill: any, index: number) => (
                        <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-4">Missing Skills</h4>
                    <div className="space-y-2">
                      {(analysisResult.skills?.missing || []).map((skill: any, index: number) => (
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
                  {(analysisResult.recommendations || []).map((rec: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.category}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-gray-700">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {analysisResult.summary && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Summary</h3>
                  <p className="text-gray-700 leading-relaxed">{analysisResult.summary}</p>
                </div>
              )}

              {/* Raw Data Debug */}
              <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Raw API Response</h3>
                <pre className="bg-gray-100 rounded-lg p-4 overflow-auto text-sm">
                  {JSON.stringify(analysisResult, null, 2)}
                </pre>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
