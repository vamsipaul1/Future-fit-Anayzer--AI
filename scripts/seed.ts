import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.quizResult.deleteMany()
  await prisma.quizQuestion.deleteMany()
  await prisma.skillProgress.deleteMany()
  await prisma.skillAnalysis.deleteMany()
  await prisma.learningPath.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Cleared existing data')

  // Create Skills
  const skills = await Promise.all([
    prisma.skill.create({
      data: {
        name: 'React',
        category: 'Frontend',
        description: 'JavaScript library for building user interfaces',
        difficulty: 'Intermediate'
      }
    }),
    prisma.skill.create({
      data: {
        name: 'Node.js',
        category: 'Backend',
        description: 'JavaScript runtime for server-side development',
        difficulty: 'Intermediate'
      }
    }),
    prisma.skill.create({
      data: {
        name: 'TypeScript',
        category: 'Language',
        description: 'Typed superset of JavaScript',
        difficulty: 'Advanced'
      }
    }),
    prisma.skill.create({
      data: {
        name: 'Python',
        category: 'Language',
        description: 'High-level programming language',
        difficulty: 'Beginner'
      }
    }),
    prisma.skill.create({
      data: {
        name: 'JavaScript',
        category: 'Language',
        description: 'Programming language for web development',
        difficulty: 'Beginner'
      }
    }),
    prisma.skill.create({
      data: {
        name: 'CSS',
        category: 'Frontend',
        description: 'Styling language for web pages',
        difficulty: 'Beginner'
      }
    }),
    prisma.skill.create({
      data: {
        name: 'HTML',
        category: 'Frontend',
        description: 'Markup language for web pages',
        difficulty: 'Beginner'
      }
    }),
    prisma.skill.create({
      data: {
        name: 'SQL',
        category: 'Database',
        description: 'Structured Query Language',
        difficulty: 'Intermediate'
      }
    })
  ])

  console.log('🎯 Created skills')

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'demo@example.com',
        name: 'Demo User'
      }
    }),
    prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User'
      }
    })
  ])

  console.log('👥 Created users')

  // Create Skill Progress
  const skillProgress = await Promise.all([
    prisma.skillProgress.create({
      data: {
        userId: users[0].id,
        skillId: skills[0].id, // React
        currentLevel: 80,
        targetLevel: 90,
        progress: 80.0
      }
    }),
    prisma.skillProgress.create({
      data: {
        userId: users[0].id,
        skillId: skills[1].id, // Node.js
        currentLevel: 65,
        targetLevel: 80,
        progress: 65.0
      }
    }),
    prisma.skillProgress.create({
      data: {
        userId: users[0].id,
        skillId: skills[2].id, // TypeScript
        currentLevel: 70,
        targetLevel: 85,
        progress: 70.0
      }
    }),
    prisma.skillProgress.create({
      data: {
        userId: users[1].id,
        skillId: skills[0].id, // React
        currentLevel: 60,
        targetLevel: 80,
        progress: 60.0
      }
    }),
    prisma.skillProgress.create({
      data: {
        userId: users[1].id,
        skillId: skills[4].id, // JavaScript
        currentLevel: 75,
        targetLevel: 90,
        progress: 75.0
      }
    })
  ])

  console.log('🔗 Created skill progress')

  // Create Quiz Questions
  const questions = await Promise.all([
    prisma.quizQuestion.create({
      data: {
        skillId: skills[0].id, // React
        question: 'What is the purpose of the useEffect hook in React?',
        type: 'multiple_choice',
        options: JSON.stringify(['A) To manage component state', 'B) To perform side effects', 'C) To handle events', 'D) To render components']),
        correctAnswer: JSON.stringify('B'),
        difficulty: 'Intermediate'
      }
    }),
    prisma.quizQuestion.create({
      data: {
        skillId: skills[1].id, // Node.js
        question: 'What is the event loop in Node.js?',
        type: 'multiple_choice',
        options: JSON.stringify(['A) A loop that handles events', 'B) A mechanism for handling asynchronous operations', 'C) A way to loop through arrays', 'D) A debugging tool']),
        correctAnswer: JSON.stringify('B'),
        difficulty: 'Advanced'
      }
    }),
    prisma.quizQuestion.create({
      data: {
        skillId: skills[2].id, // TypeScript
        question: 'What is the difference between interface and type in TypeScript?',
        type: 'multiple_choice',
        options: JSON.stringify(['A) No difference', 'B) Interface can be extended, type cannot', 'C) Type can use union types, interface cannot', 'D) Both B and C']),
        correctAnswer: JSON.stringify('D'),
        difficulty: 'Intermediate'
      }
    })
  ])

  console.log('❓ Created quiz questions')

  // Create Skill Analyses
  const skillAnalyses = await Promise.all([
    prisma.skillAnalysis.create({
      data: {
        userId: users[0].id,
        skillId: skills[0].id, // React
        level: 80,
        confidence: 75,
        experience: '2-3 years',
        notes: 'Strong in component composition and hooks usage. Need to improve performance optimization and testing.'
      }
    })
  ])

  console.log('📊 Created skill analyses')

  console.log('✅ Database seeding completed successfully!')
  console.log(`📊 Created:`)
  console.log(`   - ${skills.length} skills`)
  console.log(`   - ${users.length} users`)
  console.log(`   - ${skillProgress.length} skill progress records`)
  console.log(`   - ${questions.length} quiz questions`)
  console.log(`   - ${skillAnalyses.length} skill analyses`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })