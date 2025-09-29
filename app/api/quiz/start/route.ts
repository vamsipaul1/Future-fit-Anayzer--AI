import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { userId, quizType = 'career' } = await request.json()

    // Create a new analysis session
    const session = await prisma.analysisSession.create({
      data: {
        userId: userId || 'anonymous',
        sessionType: quizType,
        status: 'active',
        data: JSON.stringify({ currentStep: 0, responses: {} })
      }
    })

    return NextResponse.json({
      sessionId: session.id,
      message: 'Quiz session started successfully'
    })

  } catch (error) {
    console.error('Quiz start error:', error)
    return NextResponse.json(
      { error: 'Failed to start quiz session' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Quiz API is working',
    availableQuizTypes: ['career', 'skill', 'personality']
  })
}
