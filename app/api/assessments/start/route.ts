import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';

interface StartAssessmentRequest {
  userId?: string;
  domainId: string;
  skillIds: string[];
  timeLimitSec?: number;
  seed?: string;
}

interface QuestionChoice {
  id: string;
  text: string;
}

interface AssessmentQuestion {
  itemId: string;
  questionId: string;
  text: string;
  choices: QuestionChoice[];
  skillId: string;
  difficulty: number;
  timeEstimateSec: number;
}

// Fisher-Yates shuffle algorithm for reproducible question selection
function shuffleArray<T>(array: T[], seed?: string): T[] {
  const shuffled = [...array];
  let random: () => number;
  
  if (seed) {
    // Use seeded random for reproducible results
    let seedValue = 0;
    for (let i = 0; i < seed.length; i++) {
      seedValue = ((seedValue << 5) - seedValue + seed.charCodeAt(i)) & 0xffffffff;
    }
    random = () => {
      seedValue = (seedValue * 1664525 + 1013904223) & 0xffffffff;
      return seedValue / 0xffffffff;
    };
  } else {
    random = Math.random;
  }
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

export async function POST(request: NextRequest) {
  try {
    const body: StartAssessmentRequest = await request.json();
    const { userId, domainId, skillIds, timeLimitSec = 1800, seed } = body;

    // Validate input
    if (!domainId || !skillIds || skillIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: domainId and skillIds' },
        { status: 400 }
      );
    }

    // Verify domain exists
    const domain = await prisma.domain.findUnique({
      where: { id: domainId },
      include: { skills: true }
    });

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain not found' },
        { status: 404 }
      );
    }

    // Verify skills exist and belong to domain
    const validSkills = await prisma.skill.findMany({
      where: {
        id: { in: skillIds },
        domainId: domainId
      }
    });

    if (validSkills.length !== skillIds.length) {
      return NextResponse.json(
        { error: 'One or more skills not found or do not belong to domain' },
        { status: 400 }
      );
    }

    // Create assessment
    const assessment = await prisma.assessment.create({
      data: {
        userId: userId || null,
        domainId,
        skillIds: JSON.stringify(skillIds),
        timeLimitSec,
        startedAt: new Date()
      }
    });

    // Generate questions for each skill
    const questions: AssessmentQuestion[] = [];
    const assessmentItems = [];

    for (const skill of validSkills) {
      // Get questions for this skill
      const skillQuestions = await prisma.question.findMany({
        where: {
          skillId: skill.id,
          isActive: true
        },
        orderBy: { createdAt: 'desc' }
      });

      if (skillQuestions.length < 3) {
        return NextResponse.json(
          { error: `Not enough questions for skill: ${skill.name}. Need at least 3, found ${skillQuestions.length}` },
          { status: 400 }
        );
      }

      // Select 5 questions per skill (3 MCQs, 1 Ability, 1 Practical)
      const shuffledQuestions = shuffleArray(skillQuestions, seed);
      
      // Categorize questions by type
      const mcqs = shuffledQuestions.filter(q => q.type === 'MCQ').slice(0, 3);
      const ability = shuffledQuestions.filter(q => q.type === 'Ability').slice(0, 1);
      const practical = shuffledQuestions.filter(q => 
        ['ShortAnswer', 'Code', 'FillInBlank', 'Scenario'].includes(q.type || '')
      ).slice(0, 1);

      const selectedQuestions = [...mcqs, ...ability, ...practical].slice(0, 5);

      // Create assessment items and questions
      for (const question of selectedQuestions) {
        const itemId = `item_${assessment.id}_${question.id}`;
        
        // Parse choices for MCQ questions
        let choices: QuestionChoice[] = [];
        if (question.type === 'MCQ' && question.options) {
          try {
            const options = JSON.parse(question.options);
            choices = options.map((option: string, index: number) => ({
              id: `c${index + 1}`,
              text: option
            }));
          } catch (error) {
            console.error('Error parsing MCQ options:', error);
            choices = [];
          }
        }

        // Create assessment item
        const assessmentItem = await prisma.assessmentItem.create({
          data: {
            assessmentId: assessment.id,
            questionId: question.id,
            questionVer: question.version || 1
          }
        });

        assessmentItems.push(assessmentItem);

        // Add to questions array (without correct answers)
        questions.push({
          itemId: assessmentItem.id,
          questionId: question.id,
          text: question.question || question.text,
          choices,
          skillId: skill.id,
          difficulty: question.difficulty || 1,
          timeEstimateSec: question.timeEstimateSec || 45
        });
      }
    }

    // Shuffle final questions
    const shuffledFinalQuestions = shuffleArray(questions, seed);

    return NextResponse.json({
      assessmentId: assessment.id,
      questions: shuffledFinalQuestions,
      startedAt: assessment.startedAt.toISOString(),
      timeLimitSec: assessment.timeLimitSec,
      totalQuestions: shuffledFinalQuestions.length
    }, { status: 201 });

  } catch (error) {
    console.error('Error starting assessment:', error);
    return NextResponse.json(
      { error: 'Failed to start assessment' },
      { status: 500 }
    );
  }
}
