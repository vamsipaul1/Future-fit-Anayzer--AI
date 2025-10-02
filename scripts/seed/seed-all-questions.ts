import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAllDomainQuestions() {
  try {
    console.log('🌱 Seeding questions for ALL domains...');

    // Get all skills from all domains
    const allSkills = await prisma.skill.findMany({
      include: { domain: true }
    });

    console.log(`📚 Found ${allSkills.length} skills across all domains`);

    let totalQuestionsAdded = 0;
    let skillsProcessed = 0;

    for (const skill of allSkills) {
      console.log(`📝 Adding questions for: ${skill.name} (${skill.domain?.name})`);

      // Check if this skill already has questions
      const existingQuestions = await prisma.question.count({
        where: { skillId: skill.id }
      });

      if (existingQuestions >= 15) {
        console.log(`✅ ${skill.name} already has ${existingQuestions} questions, skipping...`);
        skillsProcessed++;
        continue;
      }

      // Add 15 questions per skill
      const questions = [
        // MCQ Questions (5)
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
          level: 'Beginner',
          question: `Which of the following best describes ${skill.name}?`,
          options: JSON.stringify([
            `A fundamental ${skill.name} concept`,
            `An advanced ${skill.name} technique`,
            `A specialized ${skill.name} tool`,
            `A complex ${skill.name} framework`
          ]),
          answer: `A fundamental ${skill.name} concept`,
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
          level: 'Intermediate',
          question: `What are the key benefits of using ${skill.name}?`,
          options: JSON.stringify([
            `Performance and efficiency`,
            `Scalability and reliability`,
            `Flexibility and maintainability`,
            `All of the above`
          ]),
          answer: `All of the above`,
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

        // Ability Questions (2)
        {
          skillId: skill.id,
          type: 'Ability',
          level: 'Intermediate',
          question: `Rate your ability to work with ${skill.name} on a scale of 1-10`,
          responseType: 'scale'
        },
        {
          skillId: skill.id,
          type: 'Ability',
          level: 'Advanced',
          question: `Rate your expertise level in ${skill.name} on a scale of 1-10`,
          responseType: 'scale'
        },

        // Short Answer Questions (3)
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
          type: 'ShortAnswer',
          level: 'Intermediate',
          question: `What are the common challenges when working with ${skill.name}?`,
          expectedAnswer: `Performance, compatibility, learning curve`,
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

        // Code Questions (2)
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
          type: 'Code',
          level: 'Advanced',
          question: `Write pseudocode for an optimized ${skill.name} algorithm.`,
          expectedAnswer: `// Optimized ${skill.name} algorithm`,
          responseType: 'text'
        },

        // Scenario Questions (2)
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
          type: 'Scenario',
          level: 'Advanced',
          question: `Design a ${skill.name} solution for handling high traffic.`,
          expectedAnswer: `Use load balancing, caching, and optimization techniques`,
          responseType: 'text'
        },

        // Fill in Blank Questions (1)
        {
          skillId: skill.id,
          type: 'FillInBlank',
          level: 'Beginner',
          question: `Complete this ${skill.name} workflow: Initialize → ___ → Process → ___`,
          expectedAnswer: 'Configure, Deploy',
          responseType: 'text'
        }
      ];

      await prisma.question.createMany({
        data: questions
      });

      totalQuestionsAdded += questions.length;
      skillsProcessed++;
      console.log(`✅ Added ${questions.length} questions for ${skill.name}`);
    }

    console.log('🎉 All domain questions seeding completed!');
    console.log(`📊 Summary:`);
    console.log(`   - Skills processed: ${skillsProcessed}`);
    console.log(`   - Total questions added: ${totalQuestionsAdded}`);
    
    // Get final count
    const finalCount = await prisma.question.count();
    console.log(`   - Total questions in database: ${finalCount}`);
    
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAllDomainQuestions();
