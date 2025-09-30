import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, quizId, answers } = await request.json();

    if (!userId || !quizId || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate scores by category
    const categoryScores: { [key: string]: number } = {};
    const categoryCounts: { [key: string]: number } = {};

    // Process answers and track user quiz history
    for (const answer of answers) {
      const { questionId, answer: userAnswer, category } = answer;

      // Record the answer in user quiz history
      await prisma.userCareerQuiz.create({
        data: {
          userId,
          questionId,
        }
      });

      // Calculate category scores
      if (!categoryScores[category]) {
        categoryScores[category] = 0;
        categoryCounts[category] = 0;
      }

      // For MCQ questions, check if answer is correct
      if (answer.type === 'MCQ') {
        const question = await prisma.careerQuestion.findUnique({
          where: { id: questionId }
        });

        if (question && question.answer && userAnswer === question.answer) {
          categoryScores[category] += 1;
        }
      } else if (answer.type === 'Ability') {
        // For rating questions, use the rating as score
        const rating = parseInt(userAnswer) || 0;
        categoryScores[category] += rating;
      } else {
        // For other types, give partial credit
        categoryScores[category] += 0.5;
      }

      categoryCounts[category] += 1;
    }

    // Calculate average scores per category
    const finalScores: { [key: string]: number } = {};
    for (const category in categoryScores) {
      finalScores[category] = categoryScores[category] / categoryCounts[category];
    }

    // Save the quiz results
    const quiz = await prisma.careerQuiz.create({
      data: {
        userId,
        questions: JSON.stringify(answers.map((a: any) => a.questionId)),
        answers: JSON.stringify(answers),
        scores: JSON.stringify(finalScores),
      }
    });

    // Generate career recommendations based on scores
    const recommendations = generateCareerRecommendations(finalScores);

    return NextResponse.json({
      quizId: quiz.id,
      scores: finalScores,
      recommendations,
      message: 'Quiz submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting career quiz:', error);
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 });
  }
}

function generateCareerRecommendations(scores: { [key: string]: number }) {
  const recommendations = [];

  // Analyze scores and provide recommendations
  if (scores.TechDomain > 3.5) {
    recommendations.push({
      domain: 'Technology',
      match: 'High',
      description: 'You show strong interest and aptitude in technology domains.',
      careers: ['Software Developer', 'Data Scientist', 'Cloud Engineer', 'AI/ML Engineer']
    });
  }

  if (scores.Ability > 3.5) {
    recommendations.push({
      domain: 'Problem Solving',
      match: 'High',
      description: 'You excel at analytical thinking and problem-solving.',
      careers: ['Consultant', 'Research Scientist', 'Systems Analyst', 'Technical Lead']
    });
  }

  if (scores.Interest > 3.5) {
    recommendations.push({
      domain: 'Innovation',
      match: 'High',
      description: 'You have strong interest in creative and innovative work.',
      careers: ['Product Manager', 'UX Designer', 'Entrepreneur', 'Innovation Manager']
    });
  }

  if (scores.WorkPreference > 3.5) {
    recommendations.push({
      domain: 'Leadership',
      match: 'High',
      description: 'You prefer collaborative and leadership-oriented roles.',
      careers: ['Team Lead', 'Project Manager', 'Engineering Manager', 'CTO']
    });
  }

  return recommendations;
}
