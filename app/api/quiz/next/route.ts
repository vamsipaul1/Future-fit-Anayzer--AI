import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Mock questions for the adaptive quiz
const mockQuestions = [
  {
    id: 1,
    question: "What type of work environment do you prefer?",
    options: [
      "Collaborative team settings",
      "Independent work",
      "Client-facing roles",
      "Research-focused environments"
    ],
    category: "work_style",
    difficulty: 1
  },
  {
    id: 2,
    question: "Which of these activities interests you most?",
    options: [
      "Building and creating things",
      "Analyzing data and patterns",
      "Helping and teaching others",
      "Leading and organizing projects"
    ],
    category: "interests",
    difficulty: 1
  },
  {
    id: 3,
    question: "How do you prefer to solve problems?",
    options: [
      "Through systematic analysis",
      "Creative brainstorming",
      "Collaborative discussion",
      "Trial and error experimentation"
    ],
    category: "problem_solving",
    difficulty: 2
  },
  {
    id: 4,
    question: "What motivates you most in your work?",
    options: [
      "Making a positive impact",
      "Continuous learning",
      "Financial success",
      "Recognition and achievement"
    ],
    category: "motivation",
    difficulty: 2
  },
  {
    id: 5,
    question: "Which technology area excites you most?",
    options: [
      "Artificial Intelligence",
      "Web Development",
      "Data Science",
      "Mobile Applications"
    ],
    category: "technology",
    difficulty: 3
  }
]

export async function POST(request: NextRequest) {
  try {
    const { sessionId, currentAnswer, questionIndex = 0 } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Get current session
    const session = await prisma.analysisSession.findUnique({
      where: { id: sessionId }
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Update session with current answer if provided
    if (currentAnswer !== undefined) {
      const responses = session.responses as any || {}
      responses[questionIndex] = currentAnswer
      
      await prisma.analysisSession.update({
        where: { id: sessionId },
        data: {
          responses,
          currentStep: questionIndex + 1
        }
      })
    }

    // Get next question
    const nextQuestionIndex = currentAnswer !== undefined ? questionIndex + 1 : questionIndex
    
    if (nextQuestionIndex >= mockQuestions.length) {
      // Quiz completed
      await prisma.analysisSession.update({
        where: { id: sessionId },
        data: { status: 'completed' }
      })

      return NextResponse.json({
        completed: true,
        message: 'Quiz completed successfully'
      })
    }

    const nextQuestion = mockQuestions[nextQuestionIndex]

    return NextResponse.json({
      question: {
        id: nextQuestion.id,
        text: nextQuestion.question,
        options: nextQuestion.options,
        questionIndex: nextQuestionIndex,
        totalQuestions: mockQuestions.length
      },
      progress: ((nextQuestionIndex + 1) / mockQuestions.length) * 100
    })

  } catch (error) {
    console.error('Quiz next error:', error)
    return NextResponse.json(
      { error: 'Failed to get next question' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
