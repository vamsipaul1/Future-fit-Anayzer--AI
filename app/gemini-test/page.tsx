'use client';

import React, { useState } from 'react';

export default function GeminiTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const sampleResume = `
John Doe
Software Developer
john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software developer with 5+ years of experience in full-stack development. 
Skilled in JavaScript, Python, React, and Node.js. Strong problem-solving abilities 
and experience working in agile environments.

TECHNICAL SKILLS
• Programming Languages: JavaScript, Python, Java, C#
• Frontend: React, HTML5, CSS3, Bootstrap
• Backend: Node.js, Express.js, Django
• Databases: MySQL, MongoDB, PostgreSQL
• Tools: Git, Docker, AWS, Jenkins

EXPERIENCE
Senior Software Developer | TechCorp Inc. | 2020 - Present
• Developed and maintained web applications using React and Node.js
• Led a team of 3 developers on multiple projects
• Implemented CI/CD pipelines using Jenkins and Docker
• Collaborated with product managers to define requirements

Software Developer | StartupXYZ | 2018 - 2020
• Built responsive web applications using JavaScript and React
• Worked with RESTful APIs and microservices architecture
• Participated in code reviews and agile development processes
• Mentored junior developers

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2018
  `;

  const sampleJobDescription = `
Software Engineer - Full Stack Developer

We are looking for a talented Full Stack Developer to join our team. 
The ideal candidate will have experience with modern web technologies and 
be passionate about building scalable applications.

Requirements:
• 3+ years of experience in software development
• Proficiency in JavaScript, React, Node.js
• Experience with databases (SQL and NoSQL)
• Knowledge of cloud platforms (AWS preferred)
• Strong problem-solving and communication skills
• Experience with Git and agile methodologies

Nice to have:
• TypeScript experience
• Docker and Kubernetes knowledge
• Experience with microservices architecture
• Leadership experience
  `;

  const testGeminiAnalysis = async () => {
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
          resumeText: sampleResume,
          jobDescription: sampleJobDescription,
          analysisType: 'comprehensive',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      console.log('Gemini Analysis Result:', data);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsLoading(false);
    }
  };

  const testSkillsAnalysis = async () => {
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
          resumeText: sampleResume,
          jobDescription: sampleJobDescription,
          analysisType: 'skills',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      console.log('Skills Analysis Result:', data);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Gemini AI Analysis Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Gemini Analysis</h2>
            
            <div className="space-y-4">
              <button
                onClick={testGeminiAnalysis}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Analyzing...' : 'Test Comprehensive Analysis'}
              </button>
              
              <button
                onClick={testSkillsAnalysis}
                disabled={isLoading}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isLoading ? 'Analyzing...' : 'Test Skills Analysis'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Sample Data */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sample Data</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-gray-600 mb-2">Sample Resume:</h3>
                <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                  {sampleResume.substring(0, 200)}...
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm text-gray-600 mb-2">Sample Job Description:</h3>
                <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                  {sampleJobDescription.substring(0, 200)}...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Overall Score */}
              {result.overallScore && (
                <div className="bg-blue-50 p-4 rounded">
                  <h3 className="font-semibold text-blue-800">Overall Score</h3>
                  <p className="text-2xl font-bold text-blue-600">{result.overallScore}/100</p>
                </div>
              )}

              {/* Technical Skills */}
              {result.technicalSkills && (
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="font-semibold text-green-800">Technical Skills</h3>
                  <ul className="text-sm text-green-700">
                    {result.technicalSkills.map((skill: string, index: number) => (
                      <li key={index}>• {skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Soft Skills */}
              {result.softSkills && (
                <div className="bg-purple-50 p-4 rounded">
                  <h3 className="font-semibold text-purple-800">Soft Skills</h3>
                  <ul className="text-sm text-purple-700">
                    {result.softSkills.map((skill: string, index: number) => (
                      <li key={index}>• {skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Skills */}
              {result.missingSkills && (
                <div className="bg-orange-50 p-4 rounded">
                  <h3 className="font-semibold text-orange-800">Missing Skills</h3>
                  <ul className="text-sm text-orange-700">
                    {result.missingSkills.map((skill: string, index: number) => (
                      <li key={index}>• {skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations && (
                <div className="bg-yellow-50 p-4 rounded">
                  <h3 className="font-semibold text-yellow-800">Recommendations</h3>
                  <ul className="text-sm text-yellow-700">
                    {result.recommendations.map((rec: any, index: number) => (
                      <li key={index}>
                        • {typeof rec === 'string' ? rec : rec.suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Summary */}
              {result.summary && (
                <div className="bg-gray-50 p-4 rounded md:col-span-2 lg:col-span-3">
                  <h3 className="font-semibold text-gray-800">Summary</h3>
                  <p className="text-sm text-gray-700">{result.summary}</p>
                </div>
              )}
            </div>

            {/* Raw JSON */}
            <details className="mt-6">
              <summary className="cursor-pointer font-semibold text-gray-600">
                View Raw JSON Response
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

