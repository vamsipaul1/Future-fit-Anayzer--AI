import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Mock career analysis based on responses
function analyzeCareerPath(responses: any) {
  const careers = [
    {
      title: "Full Stack Developer",
      match: 85,
      description: "Build complete web applications using modern technologies",
      skills: ["JavaScript", "React", "Node.js", "Databases"],
      salary: "$70,000 - $120,000",
      growth: "High demand, 13% growth expected"
    },
    {
      title: "Data Scientist",
      match: 78,
      description: "Extract insights from data to drive business decisions",
      skills: ["Python", "Machine Learning", "Statistics", "SQL"],
      salary: "$80,000 - $140,000", 
      growth: "Very high demand, 22% growth expected"
    },
    {
      title: "UX Designer",
      match: 72,
      description: "Design user-friendly interfaces and experiences",
      skills: ["Design Thinking", "Prototyping", "User Research", "Figma"],
      salary: "$60,000 - $110,000",
      growth: "Good demand, 8% growth expected"
    }
  ]

  return {
    topCareer: careers[0],
    allMatches: careers,
    personalityType: "Analytical Builder",
    strengths: ["Problem Solving", "Technical Skills", "Attention to Detail"],
    recommendations: [
      "Consider taking online courses in your top career areas",
      "Build portfolio projects to demonstrate your skills",
      "Network with professionals in your field of interest"
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, finalAnswers } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Get session
    const session = await prisma.analysisSession.findUnique({
      where: { id: sessionId }
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Analyze responses
    const analysis = analyzeCareerPath(finalAnswers || session.responses)

    // Update session with results
    await prisma.analysisSession.update({
      where: { id: sessionId },
      data: {
        status: 'completed',
        results: analysis,
        completedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      sessionId,
      analysis
    })

  } catch (error) {
    console.error('Quiz submit error:', error)
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
