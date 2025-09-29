'use client';

import { useState } from 'react';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [displayText, setDisplayText] = useState('');
  const [currentSection, setCurrentSection] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Simulate file reading
      setResumeText(`Sample resume text from ${uploadedFile.name}...`);
    }
  };

  const typewriterEffect = (text: string, section: string) => {
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
    }, 30);
  };

  const handleAnalyze = async () => {
    if (!resumeText) return;

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const response = await fetch('/api/master-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.analysis);
        
        // Display analysis with typewriter effect
        setTimeout(() => typewriterEffect(data.analysis.careerInsights, 'careerInsights'), 500);
        setTimeout(() => typewriterEffect(data.analysis.futureImprovements, 'futureImprovements'), 3000);
        setTimeout(() => typewriterEffect(data.analysis.learningPath, 'learningPath'), 6000);
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis({
        careerInsights: 'Analysis failed. Please check your API key and try again.',
        futureImprovements: 'Unable to generate recommendations.',
        learningPath: 'Please try again later.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Resume Analyzer
          </h1>
          <p className="text-xl text-gray-600">
            Get personalized insights and recommendations for your career development
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or paste resume text
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!resumeText || isAnalyzing}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>

        {isAnalyzing && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              AI Analyzing, Thinking...
            </h2>
            <p className="text-gray-600">
              Our AI is analyzing your resume and preparing personalized insights
            </p>
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Career Insights
              </h2>
              <div className="text-gray-700 leading-relaxed">
                {currentSection === 'careerInsights' ? displayText : analysis.careerInsights}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Future Improvements
              </h2>
              <div className="text-gray-700 leading-relaxed">
                {currentSection === 'futureImprovements' ? displayText : analysis.futureImprovements}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Learning Path
              </h2>
              <div className="text-gray-700 leading-relaxed">
                {currentSection === 'learningPath' ? displayText : analysis.learningPath}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
