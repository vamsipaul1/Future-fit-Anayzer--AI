import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription, jobTitle, jobDomain } = await request.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ 
        success: false,
        error: 'Resume text and job description are required' 
      }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        success: false,
        error: 'Gemini API key not configured. Please contact support.' 
      }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    You are an expert resume and job analysis AI. Analyze the resume against the job description and provide a comprehensive skill analysis.

    RESUME TEXT:
    ${resumeText}

    JOB REQUIREMENTS:
    Job Title: ${jobTitle || 'Not specified'}
    Domain: ${jobDomain || 'Not specified'}
    Job Description: ${jobDescription}

    Please analyze and return ONLY a valid JSON response in this exact format:
    {
      "matched": ["Skill1", "Skill2", "Skill3"],
      "missing": ["MissingSkill1", "MissingSkill2", "MissingSkill3"],
      "recommendations": [
        {
          "name": "Skill Name",
          "why": "Detailed explanation of why this skill is important for the role",
          "learningPath": ["Step 1", "Step 2", "Step 3", "Step 4"]
        }
      ],
      "skillCoverage": 75,
      "overallScore": 78
    }

    Instructions:
    1. Extract technical skills, soft skills, tools, frameworks, and technologies from both resume and job description
    2. Identify exact matches between resume skills and job requirements
    3. Identify missing skills that are required for the job but not found in the resume
    4. Provide 3-5 specific recommendations with detailed learning paths
    5. Calculate skill coverage percentage (matched skills / total required skills * 100)
    6. Calculate overall score based on skill match, experience relevance, and potential
    7. Be specific and actionable in recommendations
    8. Focus on skills that are most critical for the role
    9. Provide realistic learning paths with concrete steps

    Return ONLY the JSON object, no additional text or explanations.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response text to extract JSON
    let cleanText = text.trim();
    
    // Remove any markdown formatting
    cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Find JSON object boundaries
    const jsonStart = cleanText.indexOf('{');
    const jsonEnd = cleanText.lastIndexOf('}') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error('No valid JSON found in response');
    }
    
    const jsonText = cleanText.substring(jsonStart, jsonEnd);

    let analysis;
    try {
      analysis = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response:', text);
      
      // Fallback analysis if JSON parsing fails
      analysis = {
        matched: ['Analysis completed', 'Skills identified'],
        missing: ['Unable to parse detailed results', 'Please try again'],
        recommendations: [
          {
            name: 'Retry Analysis',
            why: 'The AI response could not be parsed properly. Please try uploading your resume again.',
            learningPath: ['Check your resume format', 'Ensure job description is clear', 'Try again with different content']
          }
        ],
        skillCoverage: 50,
        overallScore: 50
      };
    }

    // Validate and enhance the analysis
    if (!analysis.matched || !Array.isArray(analysis.matched)) {
      analysis.matched = [];
    }
    if (!analysis.missing || !Array.isArray(analysis.missing)) {
      analysis.missing = [];
    }
    if (!analysis.recommendations || !Array.isArray(analysis.recommendations)) {
      analysis.recommendations = [];
    }
    if (typeof analysis.skillCoverage !== 'number') {
      analysis.skillCoverage = Math.round((analysis.matched.length / (analysis.matched.length + analysis.missing.length)) * 100) || 0;
    }
    if (typeof analysis.overallScore !== 'number') {
      analysis.overallScore = Math.min(100, analysis.skillCoverage + Math.floor(Math.random() * 20));
    }

    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Skill analysis error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Analysis failed. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}