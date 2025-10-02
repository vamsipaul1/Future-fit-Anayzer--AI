import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMobileAppQuestions() {
  try {
    console.log('🌱 Seeding Mobile App Development questions...');

    // Get Mobile App Development skills specifically
    const mobileSkills = await prisma.skill.findMany({
      where: {
        domain: {
          slug: 'mobile-development'
        }
      },
      include: { domain: true }
    });

    console.log(`📚 Found ${mobileSkills.length} mobile development skills`);

    for (const skill of mobileSkills) {
      console.log(`📝 Adding questions for: ${skill.name} (${skill.domain?.name})`);

      // Add 15 questions per skill
      const questions = [
        // MCQ Questions (3)
        {
          skillId: skill.id,
          type: 'MCQ',
          level: 'Beginner',
          question: `What is the primary purpose of ${skill.name} in mobile development?`,
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
          question: `Which approach is most efficient for ${skill.name} in mobile apps?`,
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
          question: `What is the most scalable approach for ${skill.name} in enterprise mobile apps?`,
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
          question: `Rate your ability to work with ${skill.name} in mobile development on a scale of 1-10`,
          responseType: 'scale'
        },

        // Practical Questions (11 more)
        {
          skillId: skill.id,
          type: 'ShortAnswer',
          level: 'Beginner',
          question: `Explain what ${skill.name} is in mobile app development.`,
          expectedAnswer: `${skill.name} is a mobile development technology/skill used for...`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Code',
          level: 'Intermediate',
          question: `Write pseudocode for a basic ${skill.name} implementation in a mobile app.`,
          expectedAnswer: `// Basic ${skill.name} mobile implementation pseudocode`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Scenario',
          level: 'Advanced',
          question: `Design a ${skill.name} solution for handling high user traffic in a mobile app.`,
          expectedAnswer: `Use load balancing, caching, and mobile optimization techniques`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'FillInBlank',
          level: 'Beginner',
          question: `Complete this mobile ${skill.name} workflow: Initialize → ___ → Process → ___`,
          expectedAnswer: 'Configure, Deploy',
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'ShortAnswer',
          level: 'Intermediate',
          question: `What are the key benefits of using ${skill.name} in mobile development?`,
          expectedAnswer: `Performance, user experience, scalability`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Code',
          level: 'Advanced',
          question: `Write pseudocode for an optimized ${skill.name} algorithm for mobile devices.`,
          expectedAnswer: `// Optimized ${skill.name} mobile algorithm`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Scenario',
          level: 'Beginner',
          question: `Describe a simple use case for ${skill.name} in mobile app development.`,
          expectedAnswer: `A basic mobile app feature that demonstrates ${skill.name} functionality`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'ShortAnswer',
          level: 'Intermediate',
          question: `What are the common challenges when working with ${skill.name} in mobile apps?`,
          expectedAnswer: `Performance, battery life, compatibility`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Code',
          level: 'Beginner',
          question: `Write a simple ${skill.name} example for mobile development.`,
          expectedAnswer: `// Simple ${skill.name} mobile example`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Scenario',
          level: 'Intermediate',
          question: `How would you troubleshoot a ${skill.name} issue in a mobile app?`,
          expectedAnswer: `Check logs, debug step by step, test on different devices`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'ShortAnswer',
          level: 'Advanced',
          question: `Explain the advanced concepts in ${skill.name} for mobile development.`,
          expectedAnswer: `Advanced patterns, mobile optimization techniques, best practices`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Code',
          level: 'Advanced',
          question: `Design a robust ${skill.name} system architecture for mobile apps.`,
          expectedAnswer: `// Robust ${skill.name} mobile architecture design`,
          responseType: 'text'
        },
        {
          skillId: skill.id,
          type: 'Scenario',
          level: 'Advanced',
          question: `How would you scale ${skill.name} for enterprise mobile applications?`,
          expectedAnswer: `Horizontal scaling, load balancing, mobile monitoring`,
          responseType: 'text'
        }
      ];

      await prisma.question.createMany({
        data: questions
      });

      console.log(`✅ Added ${questions.length} questions for ${skill.name}`);
    }

    console.log('🎉 Mobile App Development questions seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding mobile questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedMobileAppQuestions();
