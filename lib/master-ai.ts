import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface MasterAnalysisResult {
  matched: string[];
  missing: string[];
  recommendations: {
    name: string;
    why: string;
    learningPath: string[];
  }[];
  careerInsights: string;
  futureImprovements: string;
  learningPath: string;
}

export async function performMasterAnalysis(resumeText: string, jobDescription: string): Promise<MasterAnalysisResult> {
  try {
    console.log("🚀 FUTUREFIT MASTER AI: Starting ULTIMATE analysis...");
    console.log("📄 Resume length:", resumeText.length);
    console.log("💼 Job description length:", jobDescription.length);
    
    // CRITICAL: Force real Gemini API - NO FALLBACKS
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
      throw new Error("❌ GEMINI_API_KEY required for master analysis");
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const masterPrompt = `
You are FutureFit Master AI - the world's most advanced resume analysis system. You MUST analyze the ACTUAL resume content with 100% accuracy.

CRITICAL ANALYSIS PROTOCOL:
1. READ EVERY WORD of the resume carefully
2. Extract ALL skills mentioned (explicit and implicit)
3. ONLY mark skills as "missing" if they are NOT in the resume
4. Provide detailed, personalized analysis
5. Generate specific learning paths and career insights

RESUME TO ANALYZE:
${resumeText}

JOB REQUIREMENTS:
${jobDescription}

ANALYSIS REQUIREMENTS:
- Extract every skill from the resume
- Compare against job requirements
- Only list as "missing" if truly not mentioned
- Provide specific recommendations
- Generate personalized career insights
- Create detailed learning path
- Suggest future improvements

Return ONLY this JSON format:
{
  "matched": ["Skill1", "Skill2"],
  "missing": ["OnlySkillsNotInResume"],
  "recommendations": [
    {
      "name": "Skill Name",
      "why": "Specific reason why this skill is important for the role",
      "learningPath": ["Step 1: Start with basics", "Step 2: Practice with projects", "Step 3: Build portfolio"]
    }
  ],
  "careerInsights": "Based on your resume, you have strong experience in [specific areas]. Your background shows [specific strengths]. For the [job title] role, you demonstrate [specific qualifications]. Your career trajectory suggests [specific insights].",
  "futureImprovements": "To excel in this role, focus on: 1) [Specific skill 1] - [why it's important], 2) [Specific skill 2] - [how to develop it], 3) [Specific skill 3] - [timeline and resources]",
  "learningPath": "Phase 1 (Weeks 1-4): [Specific learning goals]. Phase 2 (Weeks 5-8): [Intermediate skills]. Phase 3 (Weeks 9-12): [Advanced concepts]. Recommended resources: [Specific courses, books, projects]"
}`;

    console.log("🔍 Sending to Gemini Master AI...");
    
    const result = await model.generateContent(masterPrompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ Master AI response received");
    console.log("📄 Response:", text);
    
    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in master AI response");
    }
    
    const analysisResult = JSON.parse(jsonMatch[0]);
    
    // Validate structure
    if (!analysisResult.matched || !analysisResult.missing || !analysisResult.recommendations) {
      throw new Error("Invalid master AI response structure");
    }
    
    console.log("🎯 Master analysis completed successfully");
    return analysisResult as MasterAnalysisResult;
    
  } catch (error) {
    console.error("❌ Master AI analysis failed:", error);
    throw error;
  }
}

// Typewriter effect for displaying analysis results
export async function typewriterEffect(
  text: string, 
  callback: (text: string) => void, 
  speed: number = 30
): Promise<void> {
  let currentText = '';
  for (let i = 0; i <= text.length; i++) {
    currentText = text.substring(0, i);
    callback(currentText);
    await new Promise(resolve => setTimeout(resolve, speed));
  }
}

// Animated analysis display
export function createAnimatedAnalysis(analysis: MasterAnalysisResult) {
  return {
    matched: analysis.matched,
    missing: analysis.missing,
    recommendations: analysis.recommendations,
    careerInsights: analysis.careerInsights,
    futureImprovements: analysis.futureImprovements,
    learningPath: analysis.learningPath
  };
}
