import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get all career questions
    const allQuestions = await prisma.careerQuestion.findMany({
      orderBy: { createdAt: 'asc' }
    });

    // Get user's previously answered questions
    const answeredQuestions = await prisma.userCareerQuiz.findMany({
      where: { userId },
      select: { questionId: true }
    });

    const answeredQuestionIds = new Set(answeredQuestions.map(aq => aq.questionId));

    // Filter out answered questions
    const availableQuestions = allQuestions.filter(q => !answeredQuestionIds.has(q.id));

    // If all questions have been answered, reset the user's quiz history
    if (availableQuestions.length === 0) {
      await prisma.userCareerQuiz.deleteMany({ where: { userId } });
      const resetQuestions = allQuestions;
      
      // Select 20 random questions
      const shuffled = resetQuestions.sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, 20);

      return NextResponse.json({
        quizId: `quiz_${Date.now()}`,
        questions: selectedQuestions.map(q => ({
          id: q.id,
          category: q.category,
          question: q.question,
          type: q.type,
          options: q.options ? JSON.parse(q.options) : null
        }))
      });
    }

    // Select 20 random questions from available ones
    const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Math.min(20, availableQuestions.length));

    return NextResponse.json({
      quizId: `quiz_${Date.now()}`,
      questions: selectedQuestions.map(q => ({
        id: q.id,
        category: q.category,
        question: q.question,
        type: q.type,
        options: q.options ? JSON.parse(q.options) : null
      }))
    });

  } catch (error) {
    console.error('Error starting career quiz:', error);
    return NextResponse.json({ error: 'Failed to start quiz' }, { status: 500 });
  }
}
