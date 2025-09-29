import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ 
        success: false,
        error: 'Resume text is required' 
      }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        success: false,
        error: 'API key not configured. Please contact support.' 
      }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    CRITICAL ANALYSIS PROTOCOL - Resume Analysis
    
    Analyze this resume and provide comprehensive insights:
    
    RESUME TEXT:
    ${resumeText}
    
    ${jobDescription ? `JOB DESCRIPTION: ${jobDescription}` : ''}
    
    Provide analysis in this EXACT JSON format:
    {
      "careerInsights": "Detailed career insights and strengths analysis",
      "futureImprovements": "Specific recommendations for improvement",
      "learningPath": "Personalized learning path and skill development plan"
    }
    
    Be specific, actionable, and professional in your recommendations.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON response
    let analysis;
    try {
      analysis = JSON.parse(text);
    } catch {
      // If not JSON, create structured response
      analysis = {
        careerInsights: text,
        futureImprovements: "Please review the analysis above for specific recommendations.",
        learningPath: "Based on the analysis, develop skills in the mentioned areas."
      };
    }

    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Master analysis error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Analysis failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
