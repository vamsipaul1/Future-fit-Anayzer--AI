import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface SkillAnalysis {
  skillId: string;
  skillName: string;
  questionsAttempted: number;
  correctAnswers: number;
  percentCorrect: number;
  avgResponseTimeMs: number;
  confidenceScore: number;
  recommendations: Array<{
    type: string;
    title: string;
    url?: string;
    priority: number;
  }>;
}

interface DomainAnalysis {
  domainId: string;
  domainName: string;
  percentCorrect: number;
  totalQuestions: number;
  correctAnswers: number;
}

interface OverallAnalysis {
  questionsAttempted: number;
  correctAnswers: number;
  percentCorrect: number;
  timeSpentMs: number;
}

interface AnalysisResponse {
  assessmentId: string;
  anonymizedUserLabel: string;
  overall: OverallAnalysis;
  perSkill: SkillAnalysis[];
  perDomain: DomainAnalysis[];
  generatedAt: string;
}

// Sigmoid function for confidence scoring
function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

// Generate anonymized user label
function generateAnonymizedLabel(userId?: string): string {
  if (!userId) {
    return `guest_${Math.random().toString(36).substr(2, 8)}`;
  }
  return `u_${userId.substr(0, 8)}`;
}

// Calculate confidence score based on performance and response time
function calculateConfidenceScore(
  percentCorrect: number,
  avgResponseTimeMs: number,
  difficulty: number,
  expectedTimeMs: number = 45000
): number {
  const correctnessFactor = percentCorrect / 100;
  const timeFactor = Math.max(0, 1 - (avgResponseTimeMs / expectedTimeMs));
  const difficultyFactor = difficulty / 5;
  
  // Weighted combination: w1=0.7, w2=0.2, w3=0.1
  const rawScore = 0.7 * correctnessFactor + 0.2 * timeFactor + 0.1 * difficultyFactor;
  
  // Apply sigmoid to keep in 0-1 range
  return sigmoid(2 * rawScore - 1);
}

// Generate recommendations based on performance
async function generateRecommendations(
  skillId: string,
  percentCorrect: number,
  skillName: string
): Promise<Array<{ type: string; title: string; url?: string; priority: number }>> {
  const recommendations = [];

  // Get existing recommendations for this skill
  const existingRecs = await prisma.recommendation.findMany({
    where: { skillId },
    orderBy: { priority: 'asc' }
  });

  if (percentCorrect < 70) {
    // Poor performance - focus on fundamentals
    recommendations.push(
      {
        type: 'course',
        title: `Fundamentals of ${skillName}`,
        url: `https://example.com/courses/${skillId}-fundamentals`,
        priority: 1
      },
      {
        type: 'video',
        title: `${skillName} Basics Tutorial`,
        url: `https://example.com/videos/${skillId}-basics`,
        priority: 2
      },
      {
        type: 'article',
        title: `Getting Started with ${skillName}`,
        url: `https://example.com/articles/${skillId}-getting-started`,
        priority: 3
      }
    );
  } else if (percentCorrect < 85) {
    // Moderate performance - practice and intermediate resources
    recommendations.push(
      {
        type: 'question',
        title: `Practice Questions: ${skillName}`,
        url: `https://example.com/practice/${skillId}`,
        priority: 1
      },
      {
        type: 'video',
        title: `Advanced ${skillName} Concepts`,
        url: `https://example.com/videos/${skillId}-advanced`,
        priority: 2
      }
    );
  } else {
    // Good performance - advanced challenges
    recommendations.push(
      {
        type: 'course',
        title: `Advanced ${skillName} Mastery`,
        url: `https://example.com/courses/${skillId}-advanced`,
        priority: 1
      },
      {
        type: 'question',
        title: `Challenge Problems: ${skillName}`,
        url: `https://example.com/challenges/${skillId}`,
        priority: 2
      }
    );
  }

  // Add existing recommendations from database
  existingRecs.forEach(rec => {
    recommendations.push({
      type: rec.type,
      title: rec.title,
      url: rec.url || undefined,
      priority: rec.priority
    });
  });

  return recommendations.slice(0, 5); // Limit to 5 recommendations
}

export async function GET(
  request: NextRequest,
  { params }: { params: { assessmentId: string } }
) {
  try {
    const { assessmentId } = params;

    // Get assessment with all related data
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true
          }
        },
        domain: true,
        items: {
          include: {
            assessment: true
          }
        }
      }
    });

    if (!assessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    if (!assessment.submittedAt) {
      return NextResponse.json(
        { error: 'Assessment not yet submitted' },
        { status: 400 }
      );
    }

    // Generate anonymized user label (privacy protection)
    const anonymizedUserLabel = generateAnonymizedLabel(assessment.userId);

    // Get all questions for this assessment
    const questionIds = assessment.items.map(item => item.questionId);
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: { skill: true }
    });

    // Group by skill for analysis
    const skillGroups = new Map<string, {
      skill: any;
      items: any[];
      questions: any[];
    }>();

    for (const item of assessment.items) {
      const question = questions.find(q => q.id === item.questionId);
      if (!question) continue;

      const skillId = question.skillId;
      if (!skillGroups.has(skillId)) {
        skillGroups.set(skillId, {
          skill: question.skill,
          items: [],
          questions: []
        });
      }

      skillGroups.get(skillId)!.items.push(item);
      skillGroups.get(skillId)!.questions.push(question);
    }

    // Calculate per-skill analysis
    const perSkill: SkillAnalysis[] = [];
    let totalCorrect = 0;
    let totalQuestions = 0;
    let totalTimeSpent = 0;

    for (const [skillId, group] of skillGroups) {
      const { skill, items, questions } = group;
      
      const questionsAttempted = items.length;
      const correctAnswers = items.filter(item => item.isCorrect).length;
      const percentCorrect = questionsAttempted > 0 ? (correctAnswers / questionsAttempted) * 100 : 0;
      
      const avgResponseTimeMs = questionsAttempted > 0 
        ? items.reduce((sum, item) => sum + (item.responseTimeMs || 0), 0) / questionsAttempted
        : 0;
      
      const avgDifficulty = questions.length > 0
        ? questions.reduce((sum, q) => sum + (q.difficulty || 1), 0) / questions.length
        : 1;

      const confidenceScore = calculateConfidenceScore(
        percentCorrect,
        avgResponseTimeMs,
        avgDifficulty
      );

      const recommendations = await generateRecommendations(
        skillId,
        percentCorrect,
        skill.name
      );

      perSkill.push({
        skillId,
        skillName: skill.name,
        questionsAttempted,
        correctAnswers,
        percentCorrect: Math.round(percentCorrect * 100) / 100,
        avgResponseTimeMs: Math.round(avgResponseTimeMs),
        confidenceScore: Math.round(confidenceScore * 100) / 100,
        recommendations
      });

      totalCorrect += correctAnswers;
      totalQuestions += questionsAttempted;
      totalTimeSpent += items.reduce((sum, item) => sum + (item.responseTimeMs || 0), 0);
    }

    // Calculate per-domain analysis
    const perDomain: DomainAnalysis[] = [];
    const domainGroups = new Map<string, {
      domain: any;
      totalQuestions: number;
      correctAnswers: number;
    }>();

    for (const skillAnalysis of perSkill) {
      const skill = await prisma.skill.findUnique({
        where: { id: skillAnalysis.skillId },
        include: { domain: true }
      });

      if (!skill) continue;

      const domainId = skill.domainId!;
      if (!domainGroups.has(domainId)) {
        domainGroups.set(domainId, {
          domain: skill.domain,
          totalQuestions: 0,
          correctAnswers: 0
        });
      }

      const group = domainGroups.get(domainId)!;
      group.totalQuestions += skillAnalysis.questionsAttempted;
      group.correctAnswers += skillAnalysis.correctAnswers;
    }

    for (const [domainId, group] of domainGroups) {
      const percentCorrect = group.totalQuestions > 0 
        ? (group.correctAnswers / group.totalQuestions) * 100 
        : 0;

      perDomain.push({
        domainId,
        domainName: group.domain.name,
        percentCorrect: Math.round(percentCorrect * 100) / 100,
        totalQuestions: group.totalQuestions,
        correctAnswers: group.correctAnswers
      });
    }

    // Calculate overall analysis
    const overall: OverallAnalysis = {
      questionsAttempted: totalQuestions,
      correctAnswers: totalCorrect,
      percentCorrect: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100 * 100) / 100 : 0,
      timeSpentMs: totalTimeSpent
    };

    const response: AnalysisResponse = {
      assessmentId,
      anonymizedUserLabel,
      overall,
      perSkill,
      perDomain,
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error generating analysis:', error);
    return NextResponse.json(
      { error: 'Failed to generate analysis' },
      { status: 500 }
    );
  }
}
