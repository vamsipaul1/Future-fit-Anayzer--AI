import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const domains = await prisma.domain.findMany({
      include: {
        skills: {
          select: {
            id: true,
            key: true,
            name: true,
            level: true,
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    const domainsWithSkillCounts = domains.map(domain => ({
      id: domain.id,
      slug: domain.slug,
      name: domain.name,
      summary: domain.summary,
      roles: JSON.parse(domain.roles),
      skillCount: domain.skills.length,
      skills: domain.skills
    }));

    return NextResponse.json({
      status: 'success',
      data: domainsWithSkillCounts
    });
  } catch (error) {
    console.error('Error fetching domains:', error);
    return NextResponse.json(
      { status: 'error', code: 'FETCH_DOMAINS_FAILED', message: 'Failed to fetch domains' },
      { status: 500 }
    );
  }
}
