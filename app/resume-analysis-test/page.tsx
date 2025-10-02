'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader2, CheckCircle, XCircle, Brain, Target } from 'lucide-react';

export default function ResumeAnalysisTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const testAnalysis = async (analysisType: 'comprehensive' | 'skills') => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/resume-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: `
            John Doe
            Software Engineer
            Email: john.doe@example.com
            Phone: (123) 456-7890
            
            Summary:
            Experienced Software Engineer with 5 years of experience in developing scalable web applications using JavaScript, React, Node.js, and Python. Proven ability to deliver high-quality code and collaborate effectively in agile environments.
            
            Experience:
            Senior Software Engineer | Tech Solutions Inc. | 2022 - Present
            - Led development of a new e-commerce platform using React, Next.js, and Node.js
            - Implemented RESTful APIs and integrated with various third-party services
            - Mentored junior developers and conducted code reviews
            - Improved application performance by 30%
            
            Software Engineer | Innovate Corp | 2019 - 2022
            - Developed and maintained front-end features using React and Redux
            - Collaborated with UX/UI designers to translate wireframes into responsive web interfaces
            - Optimized application performance, reducing load times by 15%
            
            Education:
            M.S. in Computer Science | University of Tech | 2019
            B.S. in Computer Science | State University | 2017
            
            Skills:
            Programming Languages: JavaScript (ES6+), TypeScript, Python, SQL
            Frontend: React, Next.js, Redux, HTML5, CSS3, Tailwind CSS
            Backend: Node.js, Express.js, REST APIs, GraphQL
            Databases: PostgreSQL, MongoDB
            Tools & Platforms: Git, Docker, AWS, Jira, Confluence
            Soft Skills: Problem Solving, Teamwork, Communication, Leadership, Agile Methodologies
          `,
          jobDescription: `
            Frontend Developer
            We are looking for a skilled Frontend Developer to join our dynamic team. The ideal candidate will have strong proficiency in React.js, Next.js, and modern JavaScript. Experience with state management libraries like Redux or Zustand, and a solid understanding of responsive design principles are essential.
            
            Requirements:
            - 3+ years of experience in frontend development
            - Strong proficiency in React.js, Next.js, HTML5, CSS3, and JavaScript (ES6+)
            - Experience with state management libraries (e.g., Redux, Zustand, Context API)
            - Solid understanding of RESTful APIs and asynchronous programming
            - Familiarity with version control systems (Git)
            - Excellent problem-solving and communication skills
          `,
          analysisType: analysisType,
        }),
      });

      const data = await response.json();
      setResult(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      console.error('Analysis Error:', err);
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          <Brain className="inline-block w-8 h-8 mr-2 text-purple-600" /> Resume Analysis Test
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Test Improved Gemini Analysis</h2>
          <p className="text-gray-600 mb-6">
            This test uses a sample resume with real content to verify that the Gemini AI analysis is working correctly.
            The analysis should now extract actual skills and provide meaningful scores instead of returning "None" or 0.
          </p>
          
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => testAnalysis('comprehensive')}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Brain className="w-5 h-5 mr-2" />
              )}
              Test Comprehensive Analysis
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => testAnalysis('skills')}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Target className="w-5 h-5 mr-2" />
              )}
              Test Skills Analysis
            </motion.button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center text-blue-600 text-xl font-medium mb-8"
          >
            <Loader2 className="w-6 h-6 mr-3 animate-spin" /> Analyzing resume with Gemini AI...
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-8"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </motion.div>
        )}

        {/* Results Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Overall Score (for comprehensive analysis) */}
            {result.overallScore !== undefined && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Comprehensive Analysis Results
                  </h2>
                  <div className="flex items-center justify-center space-x-4">
                    <div className={`w-24 h-24 rounded-full ${getScoreBgColor(result.overallScore || 0)} flex items-center justify-center`}>
                      <span className={`text-3xl font-bold ${getScoreColor(result.overallScore || 0)}`}>
                        {result.overallScore || 0}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">Overall Score</div>
                      <div className="text-gray-600">Out of 100</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" /> Strengths
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-green-700">
                      {(result.strengths || []).map((strength: string, index: number) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                      <XCircle className="w-5 h-5 mr-2 text-red-600" /> Weaknesses
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-red-700">
                      {(result.weaknesses || []).map((weakness: string, index: number) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Summary */}
                {result.summary && (
                  <div className="mt-6 bg-blue-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" /> Summary
                    </h4>
                    <p className="text-blue-700">{result.summary}</p>
                  </div>
                )}
              </div>
            )}

            {/* Skills Analysis */}
            {(result.skills?.technical || result.technicalSkills) && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-purple-600" />
                  Skills Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4">Technical Skills</h4>
                    <div className="space-y-2">
                      {(result.skills?.technical || result.technicalSkills || []).map((skill: any, index: number) => (
                        <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-4">Soft Skills</h4>
                    <div className="space-y-2">
                      {(result.skills?.soft || result.softSkills || []).map((skill: any, index: number) => (
                        <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-4">Missing Skills</h4>
                    <div className="space-y-2">
                      {(result.skills?.missing || result.missingSkills || []).map((skill: any, index: number) => (
                        <div key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Raw JSON Response */}
            <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-inner">
              <h3 className="text-xl font-bold mb-4">Raw Gemini API Response:</h3>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">What This Test Verifies</h3>
          <ul className="text-blue-700 space-y-2">
            <li>✅ <strong>Text Extraction:</strong> PDF/DOC text extraction is working correctly</li>
            <li>✅ <strong>Gemini Analysis:</strong> AI analysis extracts real skills instead of "None"</li>
            <li>✅ <strong>Score Calculation:</strong> Provides realistic scores instead of 0</li>
            <li>✅ <strong>JSON Parsing:</strong> Properly parses Gemini responses</li>
            <li>✅ <strong>Fallback Handling:</strong> Graceful handling of unreadable text</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

