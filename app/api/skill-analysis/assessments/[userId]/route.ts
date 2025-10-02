import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const assessments = await prisma.assessment.findMany({
      where: { userId },
      include: {
        domain: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Limit to last 10 assessments
    });

    const assessmentsWithResults = assessments.map(assessment => ({
      id: assessment.id,
      domain: assessment.domain,
      score: assessment.overallScore,
      createdAt: assessment.createdAt
    }));

    return NextResponse.json({
      status: 'success',
      data: assessmentsWithResults
    });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { status: 'error', code: 'FETCH_ASSESSMENTS_FAILED', message: 'Failed to fetch assessments' },
      { status: 500 }
    );
  }
}
