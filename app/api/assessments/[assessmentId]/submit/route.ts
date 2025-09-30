import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface SubmitAnswer {
  itemId: string;
  selectedChoice: string;
  responseTimeMs: number;
}

interface SubmitAssessmentRequest {
  userId?: string;
  answers: SubmitAnswer[];
}

export async function POST(
  request: NextRequest,
  { params }: { params: { assessmentId: string } }
) {
  try {
    const { assessmentId } = params;
    const body: SubmitAssessmentRequest = await request.json();
    const { userId, answers } = body;

    // Validate input
    if (!answers || answers.length === 0) {
      return NextResponse.json(
        { error: 'No answers provided' },
        { status: 400 }
      );
    }

    // Get assessment
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        items: {
          include: {
            assessment: true
          }
        },
        domain: true
      }
    });

    if (!assessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    // Check if assessment is already submitted
    if (assessment.submittedAt) {
      return NextResponse.json(
        { error: 'Assessment already submitted' },
        { status: 400 }
      );
    }

    // Verify user access (if userId provided)
    if (userId && assessment.userId && assessment.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized access to assessment' },
        { status: 403 }
      );
    }

    // Process answers and calculate scores
    let totalCorrect = 0;
    let totalQuestions = 0;
    const processedAnswers = [];

    for (const answer of answers) {
      // Find the assessment item
      const item = assessment.items.find(item => item.id === answer.itemId);
      if (!item) {
        console.warn(`Assessment item not found: ${answer.itemId}`);
        continue;
      }

      // Get the question to check correctness
      const question = await prisma.question.findUnique({
        where: { id: item.questionId }
      });

      if (!question) {
        console.warn(`Question not found: ${item.questionId}`);
        continue;
      }

      // Determine if answer is correct
      let isCorrect = false;
      
      if (question.type === 'MCQ') {
        // For MCQ, check if selected choice matches correct answer
        if (question.answer && answer.selectedChoice) {
          // Parse options to find correct choice
          try {
            const options = JSON.parse(question.options || '[]');
            const correctAnswerIndex = parseInt(question.answer) - 1;
            const correctChoiceId = `c${correctAnswerIndex + 1}`;
            isCorrect = answer.selectedChoice === correctChoiceId;
          } catch (error) {
            console.error('Error parsing MCQ options:', error);
            isCorrect = false;
          }
        }
      } else if (question.type === 'Ability' && question.responseType === 'scale') {
        // For rating questions, consider 7+ as correct
        const rating = parseInt(answer.selectedChoice);
        isCorrect = rating >= 7;
      } else {
        // For other question types, use basic scoring
        isCorrect = answer.selectedChoice && answer.selectedChoice.length > 0;
      }

      // Update assessment item
      await prisma.assessmentItem.update({
        where: { id: answer.itemId },
        data: {
          selectedChoice: answer.selectedChoice,
          isCorrect,
          responseTimeMs: answer.responseTimeMs
        }
      });

      processedAnswers.push({
        itemId: answer.itemId,
        isCorrect,
        responseTimeMs: answer.responseTimeMs
      });

      if (isCorrect) totalCorrect++;
      totalQuestions++;
    }

    // Calculate overall score
    const overallScore = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    // Update assessment
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        submittedAt: new Date(),
        overallScore
      }
    });

    return NextResponse.json({
      assessmentId,
      scored: true,
      overallPercent: Math.round(overallScore * 100) / 100,
      submittedAt: new Date().toISOString(),
      totalQuestions,
      correctAnswers: totalCorrect,
      processedAnswers: processedAnswers.length
    });

  } catch (error) {
    console.error('Error submitting assessment:', error);
    return NextResponse.json(
      { error: 'Failed to submit assessment' },
      { status: 500 }
    );
  }
}
