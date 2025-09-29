import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription, analysisType } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    let prompt = '';
    
    switch (analysisType) {
      case 'comprehensive':
        prompt = `
        Analyze this resume comprehensively and provide detailed insights based on the ACTUAL content:

        Resume Text: ${resumeText}
        ${jobDescription ? 'Target Job Description: ' + jobDescription : ''}

        IMPORTANT: 
        1. Analyze the ACTUAL resume content, not generic examples
        2. Extract REAL skills mentioned in the resume
        3. Provide REAL scores based on actual content
        4. Give SPECIFIC recommendations based on what's missing
        5. Respond with ONLY valid JSON, no additional text, no markdown, no code blocks
        6. Do NOT wrap the response in markdown code blocks or any other formatting

        Analyze the resume and provide:
        - overallScore: Rate 1-100 based on actual resume quality
        - strengths: Extract actual strengths from the resume
        - weaknesses: Identify real gaps and missing elements
        - skills: Extract actual technical and soft skills mentioned
        - missing: Identify skills that should be added for better opportunities
        - experience: Calculate actual years and determine level
        - recommendations: Give specific, actionable advice
        - atsScore: Rate ATS compatibility based on format and keywords
        - keywordMatch: Calculate match with job description if provided
        - summary: Write a real summary of the candidate

        Return JSON format:
        {
          "overallScore": [actual score 1-100],
          "strengths": ["actual strength 1", "actual strength 2"],
          "weaknesses": ["actual weakness 1", "actual weakness 2"],
          "skills": {
            "technical": ["actual tech skill 1", "actual tech skill 2"],
            "soft": ["actual soft skill 1", "actual soft skill 2"],
            "missing": ["recommended skill 1", "recommended skill 2"]
          },
          "experience": {
            "years": [actual years calculated],
            "level": "entry|mid|senior|executive",
            "industries": ["actual industry 1", "actual industry 2"]
          },
          "recommendations": [
            {
              "category": "specific category",
              "suggestion": "specific actionable advice",
              "priority": "high|medium|low"
            }
          ],
          "atsScore": [actual ATS score 1-100],
          "keywordMatch": [actual keyword match 1-100],
          "summary": "real summary of this specific candidate"
        }
        `;
        break;
        
      case 'skills':
        prompt = `
        Analyze the ACTUAL skills mentioned in this resume:

        Resume Text: ${resumeText}

        IMPORTANT: 
        1. Extract ONLY skills that are actually mentioned in the resume
        2. Do not add generic skills not found in the resume
        3. Analyze skill levels based on actual experience described
        4. Identify missing skills based on industry standards
        5. Respond with ONLY valid JSON, no additional text

        Extract and analyze:
        - technicalSkills: Only skills actually mentioned in the resume
        - softSkills: Only soft skills actually mentioned or implied
        - skillLevels: Assess level based on actual experience described
        - missingSkills: Industry-relevant skills not mentioned
        - skillGaps: Areas where skills could be improved
        - recommendations: Specific learning recommendations

        Return JSON format:
        {
          "technicalSkills": ["actual skill from resume 1", "actual skill from resume 2"],
          "softSkills": ["actual soft skill from resume 1", "actual soft skill from resume 2"],
          "skillLevels": {
            "actual skill 1": "beginner|intermediate|advanced|expert",
            "actual skill 2": "beginner|intermediate|advanced|expert"
          },
          "missingSkills": ["recommended skill 1", "recommended skill 2"],
          "skillGaps": ["specific gap 1", "specific gap 2"],
          "recommendations": ["specific learning recommendation 1", "specific learning recommendation 2"]
        }
        `;
        break;
        
      case 'career':
        prompt = `
        Analyze this resume for career progression and opportunities based on ACTUAL content:

        Resume Text: ${resumeText}

        IMPORTANT: 
        1. Analyze the ACTUAL experience and qualifications in the resume
        2. Determine career level based on real experience described
        3. Suggest career path based on actual background
        4. Identify growth areas based on current skills and experience
        5. Provide realistic salary range based on actual qualifications
        6. Respond with ONLY valid JSON, no additional text

        Analyze and provide:
        - careerLevel: Determine based on actual experience years and responsibilities
        - careerPath: Suggest realistic next steps based on current background
        - growthAreas: Identify areas for development based on current skills
        - nextSteps: Specific actionable steps for career advancement
        - salaryRange: Realistic range based on actual qualifications and experience
        - marketDemand: Assess demand for this profile in current market

        Return JSON format:
        {
          "careerLevel": "entry|mid|senior|executive",
          "careerPath": ["realistic next role 1", "realistic next role 2", "realistic next role 3"],
          "growthAreas": ["specific growth area 1", "specific growth area 2"],
          "nextSteps": ["specific actionable step 1", "specific actionable step 2"],
          "salaryRange": "realistic salary range based on actual qualifications",
          "marketDemand": "high|medium|low"
        }
        `;
        break;
        
      default:
        prompt = `
        Provide a general analysis of this resume:

        Resume Text: ${resumeText}

        Return a JSON response with key insights and recommendations.
        `;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log('Gemini Response:', text); // Debug log

    // Clean the response text - remove markdown formatting
    const codeBlockPattern = new RegExp('```json\\s*', 'g');
    const backtickPattern = new RegExp('```\\s*', 'g');
    text = text.replace(codeBlockPattern, '').replace(backtickPattern, '').trim();

    // Try to parse JSON response
    try {
      const jsonResponse = JSON.parse(text);
      console.log('Parsed JSON:', jsonResponse); // Debug log
      
      // Validate that we have the expected structure
      if (!jsonResponse.overallScore && !jsonResponse.technicalSkills && !jsonResponse.careerLevel) {
        console.log('Invalid JSON structure, treating as text');
        return NextResponse.json({ 
          analysis: text,
          type: 'text',
          error: 'AI response not in expected format'
        });
      }
      
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      console.log('JSON Parse Error:', parseError); // Debug log
      // If JSON parsing fails, return the raw text
      return NextResponse.json({ 
        analysis: text,
        type: 'text',
        error: 'Failed to parse JSON response'
      });
    }

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' }, 
      { status: 500 }
    );
  }
}
