import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Enhanced question templates with more interactive and realistic questions
const questionTemplates = {
  'MCQ': [
    {
      template: 'What is the primary purpose of {skill}?',
      options: [
        'To solve complex problems efficiently',
        'To improve system performance',
        'To enhance user experience',
        'To optimize resource utilization'
      ],
      answer: 'To solve complex problems efficiently'
    },
    {
      template: 'Which of the following is NOT a best practice in {skill}?',
      options: [
        'Following coding standards',
        'Writing comprehensive tests',
        'Ignoring error handling',
        'Documenting code properly'
      ],
      answer: 'Ignoring error handling'
    },
    {
      template: 'What is the most important factor when implementing {skill}?',
      options: [
        'Performance optimization',
        'Code readability',
        'Scalability',
        'All of the above'
      ],
      answer: 'All of the above'
    },
    {
      template: 'Which approach is most suitable for {skill} in production?',
      options: [
        'Quick prototyping',
        'Thorough planning and testing',
        'Copy-paste from tutorials',
        'Minimal documentation'
      ],
      answer: 'Thorough planning and testing'
    },
    {
      template: 'What is the biggest challenge in {skill}?',
      options: [
        'Learning curve',
        'Performance optimization',
        'Maintaining code quality',
        'All of the above'
      ],
      answer: 'All of the above'
    }
  ],
  'Ability': [
    {
      template: 'Rate your ability to work with {skill} on a scale of 1-10',
      responseType: 'scale'
    },
    {
      template: 'Rate your expertise level in {skill} on a scale of 1-10',
      responseType: 'scale'
    },
    {
      template: 'How confident are you in implementing {skill} solutions? (1-10)',
      responseType: 'scale'
    },
    {
      template: 'Rate your experience with {skill} debugging and troubleshooting (1-10)',
      responseType: 'scale'
    },
    {
      template: 'How well can you explain {skill} concepts to others? (1-10)',
      responseType: 'scale'
    }
  ],
  'ShortAnswer': [
    {
      template: 'Explain what {skill} is and its main benefits.',
      expectedAnswer: 'A technology/skill used for solving specific problems with benefits like efficiency, scalability, and maintainability.',
      responseType: 'text'
    },
    {
      template: 'What are the common challenges when working with {skill}?',
      expectedAnswer: 'Performance optimization, compatibility issues, learning curve, debugging complexity.',
      responseType: 'text'
    },
    {
      template: 'Describe a real-world scenario where {skill} would be beneficial.',
      expectedAnswer: 'In applications requiring high performance, scalability, or specific functionality.',
      responseType: 'text'
    },
    {
      template: 'What are the key principles to follow when using {skill}?',
      expectedAnswer: 'Best practices, proper documentation, testing, error handling, and performance optimization.',
      responseType: 'text'
    },
    {
      template: 'How would you troubleshoot common issues in {skill}?',
      expectedAnswer: 'Systematic debugging, logging, testing, and following established troubleshooting procedures.',
      responseType: 'text'
    }
  ],
  'Code': [
    {
      template: 'Write a simple {skill} implementation and explain your approach.',
      expectedAnswer: 'Basic implementation with proper structure, error handling, and documentation.',
      responseType: 'text'
    },
    {
      template: 'Explain how you would optimize a {skill} solution for better performance.',
      expectedAnswer: 'Performance optimization techniques, profiling, and best practices.',
      responseType: 'text'
    },
    {
      template: 'Describe the architecture of a {skill} application.',
      expectedAnswer: 'Component structure, data flow, and architectural patterns.',
      responseType: 'text'
    },
    {
      template: 'How would you implement error handling in {skill}?',
      expectedAnswer: 'Proper error handling strategies, logging, and user feedback mechanisms.',
      responseType: 'text'
    },
    {
      template: 'Explain the testing strategy for {skill} applications.',
      expectedAnswer: 'Unit testing, integration testing, and quality assurance practices.',
      responseType: 'text'
    }
  ]
};

async function seedEnhancedQuestions() {
  try {
    console.log('🌱 Seeding enhanced interactive questions...');

    // Get all skills
    const allSkills = await prisma.skill.findMany({
      include: { domain: true }
    });

    console.log(`📚 Found ${allSkills.length} skills across all domains`);

    let totalQuestionsAdded = 0;
    let skillsProcessed = 0;

    for (const skill of allSkills) {
      console.log(`📝 Adding enhanced questions for: ${skill.name} (${skill.domain?.name})`);

      // Clear existing questions for this skill
      await prisma.question.deleteMany({
        where: { skillId: skill.id }
      });

      const questions = [];

      // Add 9 MCQs (3 per level)
      for (let i = 0; i < 9; i++) {
        const template = questionTemplates.MCQ[i % questionTemplates.MCQ.length];
        const level = i < 3 ? 'Beginner' : i < 6 ? 'Intermediate' : 'Advanced';
        questions.push({
          skillId: skill.id,
          type: 'MCQ',
          level: level,
          question: template.template.replace('{skill}', skill.name),
          options: JSON.stringify(template.options),
          answer: template.answer,
          responseType: 'choice'
        });
      }

      // Add 3 Ability questions (rating scale) - one per level
      for (let i = 0; i < 3; i++) {
        const template = questionTemplates.Ability[i % questionTemplates.Ability.length];
        const level = i === 0 ? 'Beginner' : i === 1 ? 'Intermediate' : 'Advanced';
        questions.push({
          skillId: skill.id,
          type: 'Ability',
          level: level,
          question: template.template.replace('{skill}', skill.name),
          responseType: 'scale'
        });
      }

      // Add 3 Practical questions (ShortAnswer/Code) - one per level
      for (let i = 0; i < 3; i++) {
        const template = questionTemplates.ShortAnswer[i % questionTemplates.ShortAnswer.length];
        const level = i === 0 ? 'Beginner' : i === 1 ? 'Intermediate' : 'Advanced';
        questions.push({
          skillId: skill.id,
          type: 'ShortAnswer',
          level: level,
          question: template.template.replace('{skill}', skill.name),
          expectedAnswer: template.expectedAnswer,
          responseType: 'text'
        });
      }

      // Insert questions
      await prisma.question.createMany({
        data: questions
      });

      totalQuestionsAdded += questions.length;
      skillsProcessed++;

      console.log(`✅ Added ${questions.length} questions for ${skill.name}`);
    }

    console.log(`🎉 Enhanced seeding completed!`);
    console.log(`📊 Skills processed: ${skillsProcessed}`);
    console.log(`📝 Total questions added: ${totalQuestionsAdded}`);

  } catch (error) {
    console.error('❌ Error seeding enhanced questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedEnhancedQuestions();
