import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

interface QuizGenerateRequest {
  domainId: string;
  skills: Array<{
    key: string;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  }>;
  userId?: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Quiz generation request received');
    const body: QuizGenerateRequest = await request.json();
    console.log('Request body:', body);
    const { domainId, skills, userId } = body;

    // Validate input
    if (!domainId || !skills || skills.length === 0) {
      console.log('Validation failed: missing domainId or skills');
      return NextResponse.json(
        { status: 'error', code: 'INVALID_REQUEST', message: 'Domain ID and skills are required' },
        { status: 400 }
      );
    }

    // Verify domain exists
    console.log('Looking for domain with ID:', domainId);
    const domain = await prisma.domain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      console.log('Domain not found:', domainId);
      return NextResponse.json(
        { status: 'error', code: 'DOMAIN_NOT_FOUND', message: 'Domain not found' },
        { status: 404 }
      );
    }

    console.log('Domain found:', domain.name);

    // Get skill IDs from skill keys
    const skillKeys = skills.map(s => s.key);
    const skillRecords = await prisma.skill.findMany({
      where: { key: { in: skillKeys } }
    });

    if (skillRecords.length !== skillKeys.length) {
      console.log('Some skills not found');
      return NextResponse.json(
        { status: 'error', code: 'SKILLS_NOT_FOUND', message: 'Some selected skills were not found' },
        { status: 404 }
      );
    }

    // Check if skills have questions
    const questionsCount = await prisma.question.count({
      where: { skillId: { in: skillRecords.map(s => s.id) } }
    });

    if (questionsCount < 5) {
      console.log('Not enough questions available');
      return NextResponse.json(
        { 
          status: 'error', 
          code: 'INSUFFICIENT_QUESTIONS', 
          message: 'Not enough questions available yet. Please try again later.',
          details: { availableQuestions: questionsCount, required: 5 }
        },
        { status: 400 }
      );
    }

    // Generate quiz using the proper algorithm (3 MCQs + 1 Ability + 1 Practical per skill)
    console.log('Generating quiz with proper algorithm...');
    
    const allQuestions = [];
    
    for (const skill of skillRecords) {
      console.log(`Processing skill: ${skill.name}`);
      
      // Get all questions for this skill
      const skillQuestions = await prisma.question.findMany({
        where: { skillId: skill.id }
      });
      
      console.log(`Found ${skillQuestions.length} questions for ${skill.name}`);
      
      if (skillQuestions.length < 15) {
        console.log(`Not enough questions for ${skill.name}: ${skillQuestions.length} < 15`);
        return NextResponse.json(
          { 
            status: 'error', 
            code: 'INSUFFICIENT_QUESTIONS', 
            message: `Not enough questions for ${skill.name} yet. Need at least 15, found ${skillQuestions.length}.`,
            details: { skill: skill.name, availableQuestions: skillQuestions.length, required: 15 }
          },
          { status: 400 }
        );
      }
      
      // Shuffle questions using Fisher-Yates algorithm
      for (let i = skillQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [skillQuestions[i], skillQuestions[j]] = [skillQuestions[j], skillQuestions[i]];
      }
      
      // Select 3 MCQs (mixed levels)
      const mcqs = skillQuestions
        .filter(q => q.type === 'MCQ')
        .slice(0, 3);
      
      // Select 1 Ability
      const ability = skillQuestions
        .filter(q => q.type === 'Ability')
        .slice(0, 1);
      
      // Select 1 Practical (ShortAnswer / Code / FillInBlank / Scenario)
      const practical = skillQuestions
        .filter(q => q.type && ['ShortAnswer', 'Code', 'FillInBlank', 'Scenario'].includes(q.type))
        .slice(0, 1);
      
      const skillQuiz = [...mcqs, ...ability, ...practical];
      console.log(`Generated ${skillQuiz.length} questions for ${skill.name}: ${mcqs.length} MCQs, ${ability.length} Ability, ${practical.length} Practical`);
      
      allQuestions.push(...skillQuiz);
    }

    console.log('Generated questions count:', allQuestions.length);

    // Create assessment record (simplified)
    const assessmentId = `assessment_${Date.now()}`;
    console.log('Assessment ID:', assessmentId);

    // Record attempted questions in user history (with better error handling)
    if (userId && allQuestions.length > 0) {
      try {
        // Check which questions the user hasn't attempted yet
        const existingHistory = await prisma.userQuizHistory.findMany({
          where: {
            userId,
            questionId: { in: allQuestions.map(q => q.id) }
          },
          select: { questionId: true }
        });
        
        const attemptedQuestionIds = new Set(existingHistory.map(h => h.questionId));
        const newQuestions = allQuestions.filter(q => !attemptedQuestionIds.has(q.id));
        
        if (newQuestions.length > 0) {
          await prisma.userQuizHistory.createMany({
            data: newQuestions.map(q => ({
              userId,
              questionId: q.id
            }))
          });
        }
      } catch (historyError) {
        console.log('Warning: Could not record user quiz history:', historyError);
        // Continue without failing the entire request
      }
    }

    const quizData = {
      assessmentId: assessmentId,
      domain: {
        id: domain.id,
        name: domain.name,
        slug: domain.slug
      },
      questions: allQuestions.map(q => ({
        id: q.id,
        skillId: q.skillId,
        type: q.type,
        level: q.level,
        question: q.question,
        options: q.options ? JSON.parse(q.options) : undefined,
        answer: q.answer,
        expectedAnswer: q.expectedAnswer,
        responseType: q.responseType
      })),
      totalQuestions: allQuestions.length,
      estimatedTime: allQuestions.length * 2, // 2 minutes per question
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      status: 'success',
      data: quizData
    });
  } catch (error) {
    console.error('Error generating quiz:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    
    return NextResponse.json(
      { 
        status: 'error', 
        code: 'QUIZ_GENERATION_FAILED', 
        message: `Failed to generate quiz: ${errorMessage}`,
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
