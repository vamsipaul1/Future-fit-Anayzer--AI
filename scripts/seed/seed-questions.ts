import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSampleQuestions() {
  try {
    console.log('🌱 Seeding sample questions...');

    // Get more skills to add questions to (at least 20 skills)
    const skills = await prisma.skill.findMany({
      take: 20,
      include: { domain: true }
    });

    console.log(`📚 Found ${skills.length} skills to add questions to`);

    for (const skill of skills) {
      console.log(`📝 Adding questions for: ${skill.name} (${skill.domain?.name})`);

      // Add 15 questions per skill
      const questions = [
        // MCQ Questions (3)
        {
          skillId: skill.id,
          type: 'MCQ',
          level: 'Beginner',
          question: `What is the primary purpose of ${skill.name}?`,
          options: JSON.stringify([
            `Basic ${skill.name} implementation`,
            `Advanced ${skill.name} with optimization`,
            `Simple ${skill.name} approach`,
            `Complex ${skill.name} solution`
          ]),
          answer: `Basic ${skill.name} implementation`,
          responseType: 'choice'
        },
        {
          skillId: skill.id,
          type: 'MCQ',
          level: 'Intermediate',
          question: `Which approach is most efficient for ${skill.name}?`,
          options: JSON.stringify([
            `Traditional ${skill.name} method`,
            `Modern ${skill.name} framework`,
            `Hybrid ${skill.name} approach`,
            `Custom ${skill.name} solution`
          ]),
          answer: `Modern ${skill.name} framework`,
          responseType: 'choice'
        },
        {
          skillId: skill.id,
          type: 'MCQ',
          level: 'Advanced',
          question: `What is the most scalable approach for ${skill.name}?`,
          options: JSON.stringify([
            `Monolithic ${skill.name} system`,
            `Microservices ${skill.name} architecture`,
            `Serverless ${skill.name} implementation`,
            `Distributed ${skill.name} solution`
          ]),
          answer: `Microservices ${skill.name} architecture`,
          responseType: 'choice'
        },

        // Ability Questions (1)
        {
          skillId: skill.id,
          type: 'Ability',
          level: 'Intermediate',
          question: `Rate your ability to work with ${skill.name} on a scale of 1-10`,
          responseType: 'scale'
        },

        // Practical Questions (11 more)
        {
          skillId: skill.id,
          type: 'ShortAnswer',
          level: 'Beginner',
          question: `Explain what ${skill.name} is in your own words.`,
          expectedAnswer: `${skill.name} is a technology/skill used for...`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Code',
          level: 'Intermediate',
          question: `Write pseudocode for a basic ${skill.name} implementation.`,
          expectedAnswer: `// Basic ${skill.name} implementation pseudocode`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Scenario',
          level: 'Advanced',
          question: `Design a ${skill.name} solution for handling high traffic.`,
          expectedAnswer: `Use load balancing, caching, and optimization techniques`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'FillInBlank',
          level: 'Beginner',
          question: `Complete this ${skill.name} workflow: Initialize → ___ → Process → ___`,
          expectedAnswer: 'Configure, Deploy',
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'ShortAnswer',
          level: 'Intermediate',
          question: `What are the key benefits of using ${skill.name}?`,
          expectedAnswer: `Efficiency, scalability, maintainability`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Code',
          level: 'Advanced',
          question: `Write pseudocode for an optimized ${skill.name} algorithm.`,
          expectedAnswer: `// Optimized ${skill.name} algorithm`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Scenario',
          level: 'Beginner',
          question: `Describe a simple use case for ${skill.name}.`,
          expectedAnswer: `A basic application that demonstrates ${skill.name} functionality`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'ShortAnswer',
          level: 'Intermediate',
          question: `What are the common challenges when working with ${skill.name}?`,
          expectedAnswer: `Performance, compatibility, learning curve`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Code',
          level: 'Beginner',
          question: `Write a simple ${skill.name} example.`,
          expectedAnswer: `// Simple ${skill.name} example`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Scenario',
          level: 'Intermediate',
          question: `How would you troubleshoot a ${skill.name} issue?`,
          expectedAnswer: `Check logs, debug step by step, test components`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'ShortAnswer',
          level: 'Advanced',
          question: `Explain the advanced concepts in ${skill.name}.`,
          expectedAnswer: `Advanced patterns, optimization techniques, best practices`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Code',
          level: 'Advanced',
          question: `Design a robust ${skill.name} system architecture.`,
          expectedAnswer: `// Robust ${skill.name} architecture design`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Scenario',
          level: 'Advanced',
          question: `How would you scale ${skill.name} for enterprise use?`,
          expectedAnswer: `Horizontal scaling, load balancing, monitoring`,
          responseType: 'text'
        }
      ];

      await prisma.question.createMany({
        data: questions
      });

      console.log(`✅ Added ${questions.length} questions for ${skill.name}`);
    }

    console.log('🎉 Sample questions seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSampleQuestions();
