import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Enhanced interactive rating question templates
const interactiveRatingTemplates = [
  {
    template: 'Rate your current expertise level in {skill} on a scale of 1-10',
    responseType: 'scale',
    level: 'Beginner'
  },
  {
    template: 'How confident are you in implementing {skill} solutions? (Rate 1-10)',
    responseType: 'scale',
    level: 'Intermediate'
  },
  {
    template: 'Rate your ability to troubleshoot and debug {skill} issues (1-10)',
    responseType: 'scale',
    level: 'Intermediate'
  },
  {
    template: 'How well can you explain {skill} concepts to others? (Rate 1-10)',
    responseType: 'scale',
    level: 'Advanced'
  },
  {
    template: 'Rate your experience with advanced {skill} techniques (1-10)',
    responseType: 'scale',
    level: 'Advanced'
  }
];

// Enhanced MCQ templates with better questions
const enhancedMCQTemplates = [
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
  },
  {
    template: 'Which tool is most commonly used with {skill}?',
    options: [
      'Standard development tools',
      'Specialized frameworks',
      'Integrated development environments',
      'All of the above'
    ],
    answer: 'All of the above'
  },
  {
    template: 'What is the best way to learn {skill}?',
    options: [
      'Reading documentation only',
      'Hands-on practice and projects',
      'Watching tutorials only',
      'Memorizing syntax'
    ],
    answer: 'Hands-on practice and projects'
  },
  {
    template: 'Which is most important for {skill} success?',
    options: [
      'Perfect syntax',
      'Understanding concepts',
      'Speed of development',
      'Code complexity'
    ],
    answer: 'Understanding concepts'
  },
  {
    template: 'What should you prioritize when working with {skill}?',
    options: [
      'Speed over quality',
      'Quality over speed',
      'Complexity over simplicity',
      'Individual work over collaboration'
    ],
    answer: 'Quality over speed'
  }
];

// Enhanced practical question templates
const enhancedPracticalTemplates = [
  {
    template: 'Explain what {skill} is and its main benefits in your own words.',
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
];

async function seedInteractiveRatingQuestions() {
  try {
    console.log('🌱 Seeding interactive rating questions for all skills...');

    // Get all skills
    const allSkills = await prisma.skill.findMany({
      include: { domain: true }
    });

    console.log(`📚 Found ${allSkills.length} skills across all domains`);

    let totalQuestionsAdded = 0;
    let skillsProcessed = 0;

    for (const skill of allSkills) {
      console.log(`📝 Adding interactive questions for: ${skill.name} (${skill.domain?.name})`);

      // Clear existing questions for this skill
      await prisma.question.deleteMany({
        where: { skillId: skill.id }
      });

      const questions = [];

      // Add 9 enhanced MCQs (3 per level)
      for (let i = 0; i < 9; i++) {
        const template = enhancedMCQTemplates[i % enhancedMCQTemplates.length];
        const level = i < 3 ? 'Beginner' : i < 6 ? 'Intermediate' : 'Advanced';
        questions.push({
          skillId: skill.id,
          text: template.template.replace('{skill}', skill.name),
          type: 'MCQ',
          level: level,
          question: template.template.replace('{skill}', skill.name),
          options: JSON.stringify(template.options),
          answer: template.answer,
          responseType: 'choice',
          choices: JSON.stringify(template.options.map((opt, idx) => ({ id: `c${idx + 1}`, text: opt, isCorrect: opt === template.answer }))),
          correctChoice: template.options.indexOf(template.answer) >= 0 ? `c${template.options.indexOf(template.answer) + 1}` : null
        });
      }

      // Add 5 interactive rating questions (one per level, with extras)
      for (let i = 0; i < 5; i++) {
        const template = interactiveRatingTemplates[i % interactiveRatingTemplates.length];
        questions.push({
          skillId: skill.id,
          text: template.template.replace('{skill}', skill.name),
          type: 'Ability',
          level: template.level,
          question: template.template.replace('{skill}', skill.name),
          responseType: 'scale'
        });
      }

      // Add 3 practical questions (one per level)
      for (let i = 0; i < 3; i++) {
        const template = enhancedPracticalTemplates[i % enhancedPracticalTemplates.length];
        const level = i === 0 ? 'Beginner' : i === 1 ? 'Intermediate' : 'Advanced';
        questions.push({
          skillId: skill.id,
          text: template.template.replace('{skill}', skill.name),
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

      console.log(`✅ Added ${questions.length} interactive questions for ${skill.name}`);
    }

    console.log(`🎉 Interactive rating questions seeding completed!`);
    console.log(`📊 Skills processed: ${skillsProcessed}`);
    console.log(`📝 Total questions added: ${totalQuestionsAdded}`);
    console.log(`🎯 Interactive rating questions: ${skillsProcessed * 5} (5 per skill)`);

  } catch (error) {
    console.error('❌ Error seeding interactive rating questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedInteractiveRatingQuestions();
