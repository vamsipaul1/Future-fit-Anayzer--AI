import { NextRequest, NextResponse } from 'next/server'

// Career analysis API for advanced career path recommendations
interface CareerAnalysis {
  recommendedRoles: Array<{
    title: string;
    match: number;
    description: string;
    requirements: string[];
    salary: string;
    growth: string;
    skills: string[];
  }>;
  skillGaps: Array<{
    skill: string;
    importance: number;
    learningTime: string;
    resources: string[];
  }>;
  learningPath: Array<{
    phase: string;
    duration: string;
    skills: string[];
    projects: string[];
  }>;
  marketInsights: {
    demand: string;
    competition: string;
    trends: string[];
  };
}

function analyzeCareer(skills: string[], experience: string, interests: string[]): CareerAnalysis {
  const analysis: CareerAnalysis = {
    recommendedRoles: [],
    skillGaps: [],
    learningPath: [],
    marketInsights: {
      demand: 'High',
      competition: 'Medium',
      trends: []
    }
  }

  // Analyze skills and recommend roles
  const frontendSkills = skills.filter(s => 
    ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular'].some(fs => 
      s.toLowerCase().includes(fs.toLowerCase())
    )
  )

  const backendSkills = skills.filter(s => 
    ['Node.js', 'Python', 'Java', 'PHP', 'Express', 'Django'].some(bs => 
      s.toLowerCase().includes(bs.toLowerCase())
    )
  )

  const dataSkills = skills.filter(s => 
    ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Pandas'].some(ds => 
      s.toLowerCase().includes(ds.toLowerCase())
    )
  )

  // Generate role recommendations based on skills
  if (frontendSkills.length > 0 && backendSkills.length > 0) {
    analysis.recommendedRoles.push({
      title: "Full Stack Developer",
      match: 90,
      description: "Build complete web applications from frontend to backend",
      requirements: ["JavaScript", "React", "Node.js", "Database", "Git"],
      salary: "$75K - $120K",
      growth: "+15%",
      skills: ["React", "Node.js", "MongoDB", "AWS", "Docker"]
    })
  }

  if (frontendSkills.length > 0) {
    analysis.recommendedRoles.push({
      title: "Frontend Developer",
      match: 85,
      description: "Specialize in user interface and user experience",
      requirements: ["HTML", "CSS", "JavaScript", "React", "UI/UX"],
      salary: "$65K - $110K",
      growth: "+12%",
      skills: ["React", "TypeScript", "CSS", "Figma", "Testing"]
    })
  }

  if (dataSkills.length > 0) {
    analysis.recommendedRoles.push({
      title: "Data Scientist",
      match: 80,
      description: "Extract insights from data using machine learning",
      requirements: ["Python", "Statistics", "Machine Learning", "SQL"],
      salary: "$90K - $150K",
      growth: "+25%",
      skills: ["Python", "TensorFlow", "SQL", "Statistics", "Jupyter"]
    })
  }

  // Generate skill gaps
  analysis.skillGaps = [
    {
      skill: "TypeScript",
      importance: 85,
      learningTime: "2-3 months",
      resources: ["TypeScript Handbook", "React with TypeScript course", "Practice projects"]
    },
    {
      skill: "Docker",
      importance: 75,
      learningTime: "1-2 months",
      resources: ["Docker documentation", "Containerization course", "Deploy projects"]
    },
    {
      skill: "Testing",
      importance: 80,
      learningTime: "1-2 months",
      resources: ["Jest documentation", "Testing course", "Write tests for projects"]
    }
  ]

  // Generate learning path
  analysis.learningPath = [
    {
      phase: "Foundation",
      duration: "2-3 months",
      skills: ["TypeScript", "Testing", "Git"],
      projects: ["Portfolio website", "Todo app", "API integration"]
    },
    {
      phase: "Intermediate",
      duration: "3-4 months",
      skills: ["Docker", "CI/CD", "Database design"],
      projects: ["Full-stack application", "Microservices", "Deployment"]
    },
    {
      phase: "Advanced",
      duration: "4-6 months",
      skills: ["System design", "Performance optimization", "Security"],
      projects: ["Scalable application", "Open source contribution", "Technical blog"]
    }
  ]

  // Market insights
  analysis.marketInsights.trends = [
    "Remote work is becoming the standard",
    "AI and machine learning skills are in high demand",
    "Full-stack developers are preferred over specialists",
    "Soft skills are increasingly important",
    "Continuous learning is essential for career growth"
  ]

  return analysis
}

export async function POST(request: NextRequest) {
  try {
    const { skills, experience, interests = [], userId } = await request.json()

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json(
        { error: 'Skills array is required' },
        { status: 400 }
      )
    }

    // Perform career analysis
    const analysis = analyzeCareer(skills, experience, interests)

    return NextResponse.json({
      success: true,
      analysisId: `career_analysis_${Date.now()}`,
      userId: userId || 'anonymous',
      analysis,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Career analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze career path' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Career Analysis API',
    features: [
      'Role recommendations based on skills',
      'Skill gap analysis with learning paths',
      'Market insights and trends',
      'Salary and growth information',
      'Personalized learning roadmap'
    ],
    supportedRoles: [
      'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
      'Data Scientist', 'DevOps Engineer', 'UI/UX Designer',
      'Mobile Developer', 'Product Manager'
    ]
  })
}
