import { NextRequest, NextResponse } from 'next/server'

// Types for skill analysis
interface SkillStrength {
  category: string;
  skills: string[];
  score: number;
}

interface CareerPath {
  title: string;
  match: number;
}

interface SkillAnalysis {
  overallScore: number;
  strengths: SkillStrength[];
  improvements: string[];
  recommendations: string[];
  careerPaths: CareerPath[];
}

// Mock skill analysis
function analyzeSkills(skills: string[], experience: string): SkillAnalysis {
  const skillCategories = {
    'Frontend': ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular'],
    'Backend': ['Node.js', 'Python', 'Java', 'PHP', 'Express', 'Django'],
    'Database': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    'DevOps': ['Docker', 'AWS', 'Git', 'CI/CD', 'Kubernetes'],
    'Design': ['Figma', 'Photoshop', 'UI/UX', 'Wireframing'],
    'Data Science': ['Python', 'R', 'Machine Learning', 'Statistics', 'Pandas']
  }

  const analysis: SkillAnalysis = {
    overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
    strengths: [],
    improvements: [],
    recommendations: [],
    careerPaths: []
  }

  // Analyze based on selected skills
  Object.entries(skillCategories).forEach(([category, categorySkills]) => {
    const matchingSkills = skills.filter(skill => 
      categorySkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
    )
    
    if (matchingSkills.length > 0) {
      analysis.strengths.push({
        category,
        skills: matchingSkills,
        score: Math.floor(Math.random() * 20) + 80
      })
    }
  })

  // Add recommendations
  analysis.recommendations = [
    "Focus on building more projects to demonstrate your skills",
    "Consider learning complementary technologies in your domain",
    "Practice coding challenges to improve problem-solving",
    "Build a strong portfolio showcasing your best work"
  ]

  // Suggest career paths
  analysis.careerPaths = [
    { title: "Full Stack Developer", match: 85 },
    { title: "Frontend Developer", match: 78 },
    { title: "Software Engineer", match: 82 }
  ]

  return analysis
}

export async function POST(request: NextRequest) {
  try {
    const { skills, experience, userId = 'anonymous' } = await request.json()

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json(
        { error: 'Skills array is required' },
        { status: 400 }
      )
    }

    // Perform skill analysis
    const analysis = analyzeSkills(skills, experience)

    return NextResponse.json({
      success: true,
      analysisId: `analysis_${Date.now()}`,
      analysis
    })

  } catch (error) {
    console.error('Skill analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze skills' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Skill Analysis API is working',
    availableSkills: [
      'JavaScript', 'Python', 'React', 'Node.js', 'HTML', 'CSS',
      'SQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'Machine Learning'
    ]
  })
}
