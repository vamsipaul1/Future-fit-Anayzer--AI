import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface QuizQuestion {
  id: string;
  skillId: string;
  type: string;
  level?: string;
  question: string;
  options?: string[];
  answer?: string;
  expectedAnswer?: string;
  responseType?: string;
}

export interface QuizGenerationRequest {
  skillIds: string[];
  userId?: string;
}

export interface QuizGenerationResponse {
  questions: QuizQuestion[];
  assessmentId: string;
}

/**
 * Fisher-Yates shuffle algorithm for randomizing questions
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get user's attempted question IDs to avoid repetition
 */
async function getUserAttemptedQuestions(userId: string): Promise<string[]> {
  if (!userId) return [];
  
  const history = await prisma.userQuizHistory.findMany({
    where: { userId },
    select: { questionId: true }
  });
  
  return history.map(h => h.questionId);
}

/**
 * Generate quiz questions for a single skill
 */
async function generateSkillQuiz(
  skillId: string, 
  userId?: string
): Promise<QuizQuestion[]> {
  // Get user's attempted questions
  const attemptedQuestionIds = userId ? await getUserAttemptedQuestions(userId) : [];
  
  // Get all questions for this skill, excluding already attempted ones
  const allQuestions = await prisma.question.findMany({
    where: {
      skillId,
      ...(attemptedQuestionIds.length > 0 && {
        id: { notIn: attemptedQuestionIds }
      })
    }
  });

  // Check if we have enough questions
  if (allQuestions.length < 5) {
    // If not enough new questions, reset and use all questions
    const allQuestionsReset = await prisma.question.findMany({
      where: { skillId }
    });
    
    if (allQuestionsReset.length < 15) {
      throw new Error(`Not enough questions for this skill yet. Need at least 15, found ${allQuestionsReset.length}.`);
    }
    
    // Use all questions and clear user history for this skill
    if (userId) {
      await prisma.userQuizHistory.deleteMany({
        where: {
          userId,
          question: { skillId }
        }
      });
    }
    
    return selectQuestionsFromPool(allQuestionsReset);
  }

  return selectQuestionsFromPool(allQuestions);
}

/**
 * Select 5 questions from a pool following the algorithm:
 * - 3 MCQs (mixed levels)
 * - 1 Ability question
 * - 1 Practical question (ShortAnswer/Code/FillInBlank/Scenario)
 */
function selectQuestionsFromPool(questions: any[]): QuizQuestion[] {
  const shuffled = shuffleArray(questions);
  
  // Select 3 MCQs
  const mcqs = shuffled
    .filter(q => q.type === 'MCQ')
    .slice(0, 3);
  
  // Select 1 Ability question
  const ability = shuffled
    .filter(q => q.type === 'Ability')
    .slice(0, 1);
  
  // Select 1 Practical question
  const practical = shuffled
    .filter(q => ['ShortAnswer', 'Code', 'FillInBlank', 'Scenario'].includes(q.type))
    .slice(0, 1);
  
  const selectedQuestions = [...mcqs, ...ability, ...practical];
  
  // If we don't have enough questions of specific types, fill with any remaining questions
  if (selectedQuestions.length < 5) {
    const remaining = shuffled.filter(q => !selectedQuestions.includes(q));
    selectedQuestions.push(...remaining.slice(0, 5 - selectedQuestions.length));
  }
  
  return selectedQuestions.map(q => ({
    id: q.id,
    skillId: q.skillId,
    type: q.type,
    level: q.level,
    question: q.question,
    options: q.options ? JSON.parse(q.options) : undefined,
    answer: q.answer,
    expectedAnswer: q.expectedAnswer,
    responseType: q.responseType
  }));
}

/**
 * Main quiz generation function
 */
export async function generateQuiz(request: QuizGenerationRequest): Promise<QuizGenerationResponse> {
  const { skillIds, userId } = request;
  
  if (!skillIds || skillIds.length === 0) {
    throw new Error('At least one skill must be selected');
  }
  
  // Generate questions for each skill
  const allQuestions: QuizQuestion[] = [];
  
  for (const skillId of skillIds) {
    try {
      const skillQuestions = await generateSkillQuiz(skillId, userId);
      allQuestions.push(...skillQuestions);
    } catch (error) {
      console.error(`Error generating questions for skill ${skillId}:`, error);
      throw error;
    }
  }
  
  // Create assessment record
  const assessment = await prisma.assessment.create({
    data: {
      userId: userId || null,
      domainId: 'temp', // We'll update this after getting domain info
      payload: JSON.stringify({
        skillIds,
        userId,
        questionCount: allQuestions.length,
        generatedAt: new Date().toISOString()
      })
    }
  });
  
  // Record attempted questions in user history
  if (userId && allQuestions.length > 0) {
    await prisma.userQuizHistory.createMany({
      data: allQuestions.map(q => ({
        userId,
        questionId: q.id
      })),
      skipDuplicates: true
    });
  }
  
  return {
    questions: allQuestions,
    assessmentId: assessment.id
  };
}

/**
 * Get question statistics for a skill
 */
export async function getSkillQuestionStats(skillId: string): Promise<{
  total: number;
  byType: Record<string, number>;
  byLevel: Record<string, number>;
}> {
  const questions = await prisma.question.findMany({
    where: { skillId }
  });
  
  const byType: Record<string, number> = {};
  const byLevel: Record<string, number> = {};
  
  questions.forEach(q => {
    byType[q.type] = (byType[q.type] || 0) + 1;
    if (q.level) {
      byLevel[q.level] = (byLevel[q.level] || 0) + 1;
    }
  });
  
  return {
    total: questions.length,
    byType,
    byLevel
  };
}

/**
 * Check if a skill has enough questions for quiz generation
 */
export async function checkSkillReadiness(skillId: string): Promise<{
  ready: boolean;
  questionCount: number;
  minimumRequired: number;
}> {
  const count = await prisma.question.count({
    where: { skillId }
  });
  
  const minimumRequired = 15;
  
  return {
    ready: count >= minimumRequired,
    questionCount: count,
    minimumRequired
  };
}
