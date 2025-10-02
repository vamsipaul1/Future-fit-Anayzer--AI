import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface SkillAnalysisResult {
  matched: string[];
  missing: string[];
  recommendations: {
    name: string;
    why: string;
    learningPath: string[];
  }[];
}

export async function extractSkills(resumeText: string, jobDescription: string): Promise<SkillAnalysisResult> {
  try {
    console.log("Gemini: Starting REAL AI analysis...");
    console.log("Gemini: Resume text length:", resumeText.length);
    console.log("Gemini: Job description length:", jobDescription.length);
    
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
      console.log("Gemini: API key not configured, using intelligent analysis");
      return generateIntelligentFallbackAnalysis(resumeText, jobDescription);
    }
    
    // Always try to use Gemini API first
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
You are FutureFit AI, an elite resume analysis system with advanced pattern recognition capabilities. Your mission is to conduct a comprehensive, multi-dimensional analysis of this resume against the target job requirements.

ANALYSIS FRAMEWORK - Execute these 5 critical analysis dimensions:

1. SKILL EXTRACTION & MATCHING ENGINE
   - Perform deep semantic analysis of resume content using NLP techniques
   - Extract both explicit and implicit skills (technologies, methodologies, soft skills)
   - Cross-reference against job requirements with intelligent fuzzy matching
   - Identify skill variations, synonyms, and related technologies

2. COMPETENCY GAP ANALYSIS
   - Calculate precise skill coverage percentage for each job requirement
   - Identify critical missing competencies that would impact job performance
   - Assess skill depth levels (beginner/intermediate/advanced) where possible
   - Highlight transferable skills that could bridge gaps

3. MARKET ALIGNMENT ASSESSMENT
   - Evaluate resume alignment with current industry standards and trends
   - Identify emerging technologies or methodologies mentioned in job description
   - Assess competitive positioning against typical candidates for this role
   - Flag outdated technologies or practices that may need updating

4. STRATEGIC RECOMMENDATION ENGINE
   - Generate prioritized learning paths based on job impact and learning curve
   - Provide specific, actionable recommendations with realistic timelines
   - Suggest complementary skills that would enhance overall profile
   - Include both technical and soft skill development recommendations

5. CAREER TRAJECTORY OPTIMIZATION
   - Analyze career progression patterns and suggest next-level competencies
   - Identify skills that would unlock higher-level opportunities
   - Recommend certifications, projects, or experiences that would strengthen candidacy
   - Provide strategic advice for long-term career development

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Execute comprehensive analysis and return ONLY valid JSON in this exact format:
{
  "matched": ["Specific Skill 1", "Specific Skill 2"],
  "missing": ["Critical Missing Skill A", "Important Missing Skill B"],
  "recommendations": [
    {
      "name": "Skill Name",
      "why": "Detailed explanation of why this skill is crucial for this specific role and how it impacts job performance",
      "learningPath": ["Concrete Step 1 with timeline", "Concrete Step 2 with resources", "Concrete Step 3 with validation method"]
    }
  ]
}

CRITICAL REQUIREMENTS:
- Use only skills explicitly mentioned or clearly implied in the resume for "matched"
- Be surgical in identifying truly missing skills that are job-critical
- Provide specific, actionable recommendations with clear learning paths
- Base all analysis on actual content - no generic assumptions
- Return only the JSON object, no additional text`;

    console.log("Gemini: Sending request to Gemini API...");
    console.log("Gemini: Prompt length:", prompt.length);
    console.log("Gemini: Resume text sample:", resumeText.substring(0, 300));
    console.log("Gemini: Job description sample:", jobDescription.substring(0, 300));

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini: Received response from API");
    console.log("Gemini: Response length:", text.length);
    console.log("Gemini: Full response text:", text);
    
    // Clean the response text to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log("Gemini: No JSON found in response, trying alternative parsing");
      // Try to find JSON in different formats
      const alternativeMatch = text.match(/```json\s*(\{[\s\S]*?\})\s*```/) || 
                             text.match(/```\s*(\{[\s\S]*?\})\s*```/) ||
                             text.match(/(\{[\s\S]*?\})/);
      
      if (!alternativeMatch) {
      throw new Error("No JSON found in response");
      }
      
      const jsonString = alternativeMatch[1] || alternativeMatch[0];
      console.log("Gemini: Extracted JSON:", jsonString.substring(0, 200) + "...");
      const parsed = JSON.parse(jsonString);
      
      // Validate the structure
      if (!parsed.matched || !parsed.missing || !parsed.recommendations) {
        throw new Error("Invalid response structure");
      }
      
      console.log("Gemini: Analysis completed successfully");
      return parsed as SkillAnalysisResult;
    }
    
    const jsonString = jsonMatch[0];
    console.log("Gemini: Extracted JSON:", jsonString.substring(0, 200) + "...");
    const parsed = JSON.parse(jsonString);
    
    // Validate the structure
    if (!parsed.matched || !parsed.missing || !parsed.recommendations) {
      console.log("Gemini: Invalid response structure");
      throw new Error("Invalid response structure");
    }
    
    console.log("Gemini: Analysis completed successfully");
    return parsed as SkillAnalysisResult;
  } catch (error) {
    console.error("Gemini: Error in API call:", error);
    
    // If API fails, try a more intelligent fallback analysis
    console.log("Gemini: API failed, using intelligent fallback analysis");
    return generateIntelligentFallbackAnalysis(resumeText, jobDescription);
  }
}


// Mock analysis function for testing when API is not available
function generateMockAnalysis(resumeText: string, jobDescription: string): SkillAnalysisResult {
  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobDescription.toLowerCase();
  
  // Extended skill list for better matching
  const commonSkills = [
    'javascript', 'python', 'react', 'node.js', 'sql', 'html', 'css', 'git', 'aws', 'docker',
    'java', 'typescript', 'angular', 'vue', 'mongodb', 'postgresql', 'mysql', 'redis',
    'kubernetes', 'jenkins', 'ci/cd', 'agile', 'scrum', 'rest api', 'graphql', 'microservices',
    'machine learning', 'ai', 'data science', 'pandas', 'numpy', 'tensorflow', 'pytorch',
    'frontend', 'backend', 'full stack', 'web development', 'mobile development', 'ios', 'android',
    'cloud computing', 'azure', 'gcp', 'linux', 'bash', 'shell scripting', 'devops'
  ];
  
  const matched: string[] = [];
  const missing: string[] = [];
  
  commonSkills.forEach(skill => {
    if (resumeLower.includes(skill) && jobLower.includes(skill)) {
      matched.push(skill.toUpperCase());
    } else if (jobLower.includes(skill) && !resumeLower.includes(skill)) {
      missing.push(skill.toUpperCase());
    }
  });
  
  // If no matches found, provide some default analysis
  if (matched.length === 0 && missing.length === 0) {
    matched.push('RESUME ANALYSIS');
    missing.push('JOB REQUIREMENTS');
  }
  
  return {
    matched: matched.length > 0 ? matched : ['ANALYSIS COMPLETED'],
    missing: missing.length > 0 ? missing : ['SKILLS TO DEVELOP'],
    recommendations: missing.slice(0, 3).map(skill => ({
      name: skill,
      why: `This skill is commonly required for this type of role and would strengthen your profile.`,
      learningPath: [
        `Learn ${skill} fundamentals`,
        `Practice with ${skill} projects`,
        `Build a portfolio project using ${skill}`
      ]
    }))
  };
}

// Intelligent fallback analysis when Gemini API is not available
export function generateIntelligentFallbackAnalysis(resumeText: string, jobDescription: string): SkillAnalysisResult {
  console.log("Gemini: Using intelligent fallback analysis");
  
  // Comprehensive skill database
  const allSkills = [
    // Programming Languages
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Ruby', 'Scala', 'R', 'MATLAB',
    // Web Technologies
    'HTML', 'CSS', 'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Next.js', 'Nuxt.js', 'Svelte', 'jQuery', 'Bootstrap', 'Tailwind CSS',
    // Databases
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'DynamoDB', 'Cassandra', 'Elasticsearch',
    // Cloud & DevOps
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Terraform', 'Ansible',
    // Mobile Development
    'React Native', 'Flutter', 'Ionic', 'Xamarin', 'Cordova', 'PhoneGap',
    // Data Science & AI
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter', 'R Studio',
    // Soft Skills
    'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Project Management', 'Agile', 'Scrum', 'Time Management'
  ];
  
  // Extract skills from resume text
  const resumeLower = resumeText.toLowerCase();
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  
  // Check for skills in resume
  allSkills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    if (resumeLower.includes(skillLower) || resumeLower.includes(skillLower.replace(/\s+/g, ''))) {
      matchedSkills.push(skill);
    }
  });
  
  // Extract skills from job description
  const jobLower = jobDescription.toLowerCase();
  const jobSkills: string[] = [];
  
  allSkills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    if (jobLower.includes(skillLower) || jobLower.includes(skillLower.replace(/\s+/g, ''))) {
      jobSkills.push(skill);
    }
  });
  
  // Find missing skills
  jobSkills.forEach(skill => {
    if (!matchedSkills.includes(skill)) {
      missingSkills.push(skill);
    }
  });
  
  // Generate recommendations
  const recommendations = missingSkills.slice(0, 3).map(skill => ({
    name: skill,
    why: `This skill is essential for the role and will significantly improve your candidacy.`,
    learningPath: [
      `Start with online tutorials and documentation (1-2 weeks)`,
      `Build a practical project using ${skill} (2-4 weeks)`,
      `Get certified or create a portfolio piece (1-2 months)`
    ]
  }));
  
  return {
    matched: matchedSkills.slice(0, 10), // Limit to top 10
    missing: missingSkills.slice(0, 5), // Limit to top 5
    recommendations
  };
}

// Intelligent career insights when Gemini API is not available
export function generateIntelligentCareerInsights(resumeText: string, jobDescription: string): string {
  console.log("Gemini: Using intelligent career insights");
  
  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobDescription.toLowerCase();
  
  let insights = "Based on your resume analysis:\n\n";
  
  // Analyze experience level
  if (resumeLower.includes('senior') || resumeLower.includes('lead') || resumeLower.includes('manager')) {
    insights += "• You have senior-level experience that positions you well for leadership roles.\n";
  } else if (resumeLower.includes('junior') || resumeLower.includes('entry')) {
    insights += "• You're in the early stages of your career with strong growth potential.\n";
  } else {
    insights += "• You have solid mid-level experience with room for advancement.\n";
  }
  
  // Analyze technical skills
  const techSkills = ['javascript', 'python', 'react', 'node.js', 'aws', 'docker'];
  const foundSkills = techSkills.filter(skill => resumeLower.includes(skill));
  
  if (foundSkills.length > 0) {
    insights += `• Strong technical foundation in ${foundSkills.join(', ')}.\n`;
  }
  
  // Analyze education
  if (resumeLower.includes('bachelor') || resumeLower.includes('master') || resumeLower.includes('phd')) {
    insights += "• Solid educational background that supports your career growth.\n";
  }
  
  // Job-specific insights
  if (jobLower.includes('senior') || jobLower.includes('lead')) {
    insights += "• Focus on developing leadership and mentoring skills for senior roles.\n";
  } else if (jobLower.includes('junior') || jobLower.includes('entry')) {
    insights += "• Emphasize learning and growth mindset for entry-level positions.\n";
  }
  
  insights += "\nRecommendations:\n";
  insights += "• Continue building practical projects to showcase your skills.\n";
  insights += "• Consider obtaining relevant certifications in your field.\n";
  insights += "• Network with professionals in your target industry.\n";
  insights += "• Stay updated with latest technologies and trends.\n";
  
  return insights;
}

export async function generateCareerInsights(resumeText: string, jobDescription: string): Promise<string> {
  try {
    console.log("Gemini: Generating career insights...");
    console.log("Gemini: Resume text length:", resumeText.length);
    console.log("Gemini: Job description length:", jobDescription.length);
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
You are FutureFit AI's Career Intelligence Engine, specializing in personalized career trajectory analysis and strategic development planning.

CAREER ANALYSIS PROTOCOL - Execute comprehensive career assessment:

1. PROFESSIONAL PROFILE DECONSTRUCTION
   - Analyze career progression patterns, role transitions, and growth trajectory
   - Identify core competencies, technical expertise, and domain knowledge
   - Assess leadership experience, project complexity, and impact metrics
   - Evaluate industry experience and sector-specific knowledge

2. MARKET POSITIONING ANALYSIS
   - Compare profile against industry benchmarks and role requirements
   - Identify competitive advantages and unique value propositions
   - Assess market demand alignment for current skill set
   - Evaluate salary progression potential and career ceiling

3. STRATEGIC GAP IDENTIFICATION
   - Identify critical skills gaps that limit career advancement
   - Assess soft skills development needs (leadership, communication, strategic thinking)
   - Evaluate technical skills evolution requirements
   - Identify industry-specific knowledge gaps

4. GROWTH TRAJECTORY OPTIMIZATION
   - Recommend specific career moves and role transitions
   - Suggest skill development priorities with ROI analysis
   - Identify networking and mentorship opportunities
   - Recommend certifications, projects, or experiences for career acceleration

5. FUTURE-PROOFING STRATEGY
   - Analyze emerging trends and technologies relevant to career path
   - Recommend skills that will remain valuable long-term
   - Suggest ways to build resilience against industry changes
   - Identify opportunities to become a thought leader in the field

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Generate a comprehensive career analysis providing 4-5 specific, actionable insights. Focus on:
- Specific strengths and competitive advantages (mention actual technologies/skills)
- Critical development areas with concrete improvement strategies
- Strategic career moves and role progression opportunities
- Specific next steps with timelines and success metrics
- Long-term career vision and positioning strategy

Requirements:
- Base analysis ONLY on actual resume content provided
- Mention specific technologies, skills, or experiences from the resume
- Provide actionable recommendations with clear timelines
- Avoid generic advice - be specific and personalized
- Include both immediate and long-term strategic advice

Deliver insights in a clear, professional format suitable for career development planning.`;

    console.log("Gemini: Sending career insights request...");
    console.log("Gemini: Career insights prompt length:", prompt.length);
    console.log("Gemini: Resume text sample for insights:", resumeText.substring(0, 300));
    console.log("Gemini: Job description sample for insights:", jobDescription.substring(0, 300));

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini: Career insights generated");
    console.log("Gemini: Career insights length:", text.length);
    console.log("Gemini: Full career insights:", text);
    return text;
  } catch (error) {
    console.error("Gemini: Error generating career insights:", error);
    
    // Generate intelligent fallback insights based on resume content
    return generateIntelligentCareerInsights(resumeText, jobDescription);
  }
}

