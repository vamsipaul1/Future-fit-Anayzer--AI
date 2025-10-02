'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Loader2, CheckCircle } from 'lucide-react';

export default function SpeedTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [currentTest, setCurrentTest] = useState('');
  const [apiStatus, setApiStatus] = useState('Checking...');

  const testSpeed = async (testName: string) => {
    setIsLoading(true);
    setCurrentTest(testName);
    const startTime = Date.now();

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
            
            Summary:
            Experienced Software Engineer with 5 years of experience in developing scalable web applications using JavaScript, React, Node.js, and Python.
            
            Experience:
            Senior Software Engineer | Tech Solutions Inc. | 2022 - Present
            - Led development of a new e-commerce platform using React, Next.js, and Node.js
            - Implemented RESTful APIs and integrated with various third-party services
            - Mentored junior developers and conducted code reviews
            
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
            We are looking for a skilled Frontend Developer to join our dynamic team. The ideal candidate will have strong proficiency in React.js, Next.js, and modern JavaScript.
            
            Requirements:
            - 3+ years of experience in frontend development
            - Strong proficiency in React.js, Next.js, HTML5, CSS3, and JavaScript (ES6+)
            - Experience with state management libraries (e.g., Redux, Zustand, Context API)
            - Solid understanding of RESTful APIs and asynchronous programming
            - Familiarity with version control systems (Git)
            - Excellent problem-solving and communication skills
          `,
          analysisType: 'comprehensive',
        }),
      });

      const data = await response.json();
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Update API status based on response
      if (data.fallback) {
        setApiStatus('🟡 Fallback Mode - Add API key for real AI analysis');
      } else {
        setApiStatus('🟢 Real AI Analysis Active');
      }

      setResults(prev => [...prev, {
        test: testName,
        duration: duration,
        success: response.ok,
        score: data.overallScore || 0,
        timestamp: new Date().toLocaleTimeString(),
        analysisData: data // Store full analysis data
      }]);

    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      setResults(prev => [...prev, {
        test: testName,
        duration: duration,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsLoading(false);
      setCurrentTest('');
    }
  };

  const runMultipleTests = async () => {
    const tests = ['Test 1', 'Test 2', 'Test 3'];
    
    for (const test of tests) {
      await testSpeed(test);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const getSpeedColor = (duration: number) => {
    if (duration < 3000) return 'text-green-600';
    if (duration < 5000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSpeedLabel = (duration: number) => {
    if (duration < 3000) return '⚡ Very Fast';
    if (duration < 5000) return '🚀 Fast';
    if (duration < 8000) return '🐌 Slow';
    return '🐢 Very Slow';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          <Zap className="inline-block w-8 h-8 mr-2 text-yellow-600" /> Analysis Speed Test
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Test Gemini AI Analysis Speed</h2>
          <p className="text-gray-600 mb-4">
            This page tests how fast the optimized Gemini AI analysis is running. 
            The analysis should now be much faster with the new optimizations.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">🔑 API Configuration</h4>
            <p className="text-blue-700 text-sm">
              To use AI-powered analysis, add your Gemini API key to <code className="bg-blue-100 px-1 rounded">.env.local</code>:
            </p>
            <code className="block bg-blue-100 text-blue-800 p-2 rounded mt-2 text-xs">
              GEMINI_API_KEY=your_api_key_here
            </code>
            <p className="text-blue-600 text-xs mt-2">
              Get your free API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" className="underline">Google AI Studio</a>. 
              Without it, the system will use fallback analysis with realistic sample data.
            </p>
            <div className="mt-2 text-xs">
              <span className="font-semibold">Status: </span>
              <span className="text-blue-700">{apiStatus}</span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => testSpeed('Single Test')}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              {isLoading && currentTest === 'Single Test' ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Clock className="w-5 h-5 mr-2" />
              )}
              Single Speed Test
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={runMultipleTests}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Zap className="w-5 h-5 mr-2" />
              )}
              Multiple Tests
            </motion.button>
          </div>
        </div>

        {/* Current Test Status */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
          >
            <div className="flex items-center">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-3" />
              <span className="text-blue-800 font-medium">
                Running {currentTest}... Please wait
              </span>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Test Results</h3>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    result.success 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      ) : (
                        <div className="w-5 h-5 bg-red-600 rounded-full mr-3"></div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-800">{result.test}</div>
                        <div className="text-sm text-gray-600">
                          {result.timestamp} - Score: {result.score}/100
                        </div>
                        {result.analysisData && (
                          <div className="text-xs text-gray-500 mt-1">
                            ATS: {result.analysisData.atsScore || 0}/100 | 
                            Keywords: {result.analysisData.keywordMatch || 0}/100
                            {result.analysisData.fallback && (
                              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                                Fallback Mode
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getSpeedColor(result.duration)}`}>
                        {(result.duration / 1000).toFixed(1)}s
                      </div>
                      <div className="text-sm text-gray-600">
                        {getSpeedLabel(result.duration)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Analysis Details */}
                  {result.success && result.analysisData && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">Key Strengths</h5>
                          <ul className="text-gray-600 space-y-1">
                            {(result.analysisData.strengths || []).slice(0, 3).map((strength: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-green-500 mr-1">✓</span>
                                <span className="text-xs">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">Technical Skills</h5>
                          <div className="flex flex-wrap gap-1">
                            {(result.analysisData.skills?.technical || []).slice(0, 6).map((skill: string, idx: number) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {result.analysisData.summary && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <h5 className="font-semibold text-gray-700 mb-1">Summary</h5>
                          <p className="text-xs text-gray-600">{result.analysisData.summary}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {result.error && (
                    <div className="mt-2 text-sm text-red-600">
                      Error: {result.error}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Average Speed */}
            {results.length > 1 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Performance Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Average Speed</div>
                    <div className="text-xl font-bold text-gray-800">
                      {(results.reduce((sum, r) => sum + r.duration, 0) / results.length / 1000).toFixed(1)}s
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Fastest Test</div>
                    <div className="text-xl font-bold text-green-600">
                      {(Math.min(...results.map(r => r.duration)) / 1000).toFixed(1)}s
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Success Rate</div>
                    <div className="text-xl font-bold text-blue-600">
                      {Math.round((results.filter(r => r.success).length / results.length) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Optimizations Applied */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Speed Optimizations Applied</h3>
          <ul className="text-blue-700 space-y-2">
            <li>✅ <strong>Shorter Prompts:</strong> Reduced prompt length by 70% for faster processing</li>
            <li>✅ <strong>Optimized Model Config:</strong> Lower temperature and token limits for speed</li>
            <li>✅ <strong>15s Timeout:</strong> Prevents hanging requests</li>
            <li>✅ <strong>Text Truncation:</strong> Limits input text to 2000 chars for faster processing</li>
            <li>✅ <strong>Progress Indicators:</strong> Real-time feedback during analysis</li>
          </ul>
        </div>

        {/* Performance Targets */}
        <div className="mt-6 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Performance Targets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-green-800">⚡ Very Fast</div>
              <div className="text-gray-600">&lt; 3 seconds</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-yellow-800">🚀 Fast</div>
              <div className="text-gray-600">3-5 seconds</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-red-800">🐌 Slow</div>
              <div className="text-gray-600">&gt; 5 seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
