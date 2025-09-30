const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting career questions seeding...');

  try {
    // Clear existing career questions
    console.log('🧹 Clearing existing career questions...');
    await prisma.careerQuestion.deleteMany({});
    await prisma.careerQuiz.deleteMany({});
    await prisma.userCareerQuiz.deleteMany({});

    // Read the JSON file
    const questionsPath = path.join(process.cwd(), 'prisma', 'career-questions.json');
    const questionsData = fs.readFileSync(questionsPath, 'utf8');
    const questions = JSON.parse(questionsData);

    console.log(`📝 Found ${questions.length} career questions to seed`);

    // Create career questions
    for (const question of questions) {
      await prisma.careerQuestion.create({
        data: {
          category: question.category,
          question: question.question,
          type: question.type,
          options: question.options ? JSON.stringify(question.options) : null,
          answer: question.answer || null,
        },
      });
    }

    console.log('✅ Successfully seeded career questions!');
    console.log(`📊 Categories: ${[...new Set(questions.map(q => q.category))].join(', ')}`);
    console.log(`📈 Total questions: ${questions.length}`);

  } catch (error) {
    console.error('❌ Error seeding career questions:', error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
