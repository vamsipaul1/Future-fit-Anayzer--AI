import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const domain = await prisma.domain.findUnique({
      where: { slug },
      include: {
        skills: {
          orderBy: [
            { level: 'asc' },
            { name: 'asc' }
          ]
        }
      }
    });

    if (!domain) {
      return NextResponse.json(
        { status: 'error', code: 'DOMAIN_NOT_FOUND', message: 'Domain not found' },
        { status: 404 }
      );
    }

    // Group skills by level
    const skillsByLevel = {
      BEGINNER: domain.skills.filter(skill => skill.level === 'BEGINNER'),
      INTERMEDIATE: domain.skills.filter(skill => skill.level === 'INTERMEDIATE'),
      ADVANCED: domain.skills.filter(skill => skill.level === 'ADVANCED')
    };

    const domainData = {
      id: domain.id,
      slug: domain.slug,
      name: domain.name,
      summary: domain.summary,
      roles: JSON.parse(domain.roles),
      skills: skillsByLevel,
      allSkills: domain.skills // Add flat array for compatibility
    };

    return NextResponse.json({
      status: 'success',
      data: domainData
    });
  } catch (error) {
    console.error('Error fetching domain:', error);
    return NextResponse.json(
      { status: 'error', code: 'FETCH_DOMAIN_FAILED', message: 'Failed to fetch domain' },
      { status: 500 }
    );
  }
}
