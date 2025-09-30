// Sample question data structure for seeding
// This file shows the format for adding 15+ questions per skill

export interface QuestionData {
  skillKey: string;
  questions: Array<{
    type: 'MCQ' | 'ShortAnswer' | 'FillInBlank' | 'Ability' | 'Scenario' | 'Code';
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    question: string;
    options?: string[]; // For MCQ questions
    answer?: string; // Correct answer for MCQ
    expectedAnswer?: string; // For short answer/fill-in questions
    responseType?: 'choice' | 'scale' | 'text';
  }>;
}

// Example: Python skill questions
export const pythonQuestions: QuestionData = {
  skillKey: 'python',
  questions: [
    // MCQ Questions (3 per skill)
    {
      type: 'MCQ',
      level: 'Beginner',
      question: 'What is the correct way to create a list in Python?',
      options: [
        'list = []',
        'list = new List()',
        'list = Array()',
        'list = List()'
      ],
      answer: 'list = []',
      responseType: 'choice'
    },
    {
      type: 'MCQ',
      level: 'Intermediate',
      question: 'Which of the following is the most Pythonic way to iterate over a dictionary?',
      options: [
        'for key in dict.keys():',
        'for key, value in dict.items():',
        'for i in range(len(dict)):',
        'for key in dict:'
      ],
      answer: 'for key, value in dict.items():',
      responseType: 'choice'
    },
    {
      type: 'MCQ',
      level: 'Advanced',
      question: 'What is the time complexity of list comprehension in Python?',
      options: [
        'O(n)',
        'O(n log n)',
        'O(n²)',
        'O(1)'
      ],
      answer: 'O(n)',
      responseType: 'choice'
    },

    // Ability Questions (1 per skill)
    {
      type: 'Ability',
      level: 'Intermediate',
      question: 'Rate your ability to debug Python code on a scale of 1-10',
      responseType: 'scale'
    },

    // Practical Questions (1 per skill)
    {
      type: 'ShortAnswer',
      level: 'Beginner',
      question: 'Explain the difference between a list and a tuple in Python.',
      expectedAnswer: 'Lists are mutable, tuples are immutable',
      responseType: 'text'
    },
    {
      type: 'Code',
      level: 'Intermediate',
      question: 'Write a Python function that finds the factorial of a number using recursion.',
      expectedAnswer: 'def factorial(n): return 1 if n <= 1 else n * factorial(n-1)',
      responseType: 'text'
    },
    {
      type: 'Scenario',
      level: 'Advanced',
      question: 'You need to process a large CSV file with 1 million rows. How would you optimize memory usage in Python?',
      expectedAnswer: 'Use pandas chunking, generators, or streaming processing',
      responseType: 'text'
    },

    // Additional questions to reach 15+ per skill
    {
      type: 'MCQ',
      level: 'Beginner',
      question: 'What does the "self" parameter represent in Python class methods?',
      options: [
        'The class itself',
        'The instance of the class',
        'A reference to the parent class',
        'A static method indicator'
      ],
      answer: 'The instance of the class',
      responseType: 'choice'
    },
    {
      type: 'ShortAnswer',
      level: 'Intermediate',
      question: 'What is the difference between __init__ and __new__ in Python?',
      expectedAnswer: '__new__ creates the instance, __init__ initializes it',
      responseType: 'text'
    },
    {
      type: 'FillInBlank',
      level: 'Beginner',
      question: 'Complete this Python code: def greet(name): return f"Hello, {___}"',
      expectedAnswer: 'name',
      responseType: 'text'
    },
    {
      type: 'Scenario',
      level: 'Advanced',
      question: 'Design a Python class hierarchy for a banking system with Account, SavingsAccount, and CheckingAccount.',
      expectedAnswer: 'Use inheritance with Account as base class',
      responseType: 'text'
    },
    {
      type: 'Code',
      level: 'Intermediate',
      question: 'Write a Python decorator that measures the execution time of a function.',
      expectedAnswer: 'import time; def timer(func): def wrapper(*args, **kwargs): start = time.time(); result = func(*args, **kwargs); print(time.time() - start); return result; return wrapper',
      responseType: 'text'
    },
    {
      type: 'MCQ',
      level: 'Advanced',
      question: 'Which Python data structure is most efficient for checking membership?',
      options: [
        'List',
        'Set',
        'Tuple',
        'Dictionary'
      ],
      answer: 'Set',
      responseType: 'choice'
    },
    {
      type: 'ShortAnswer',
      level: 'Intermediate',
      question: 'Explain the Global Interpreter Lock (GIL) in Python.',
      expectedAnswer: 'GIL prevents multiple threads from executing Python bytecode simultaneously',
      responseType: 'text'
    },
    {
      type: 'Ability',
      level: 'Advanced',
      question: 'Rate your ability to optimize Python code performance on a scale of 1-10',
      responseType: 'scale'
    },
    {
      type: 'Scenario',
      level: 'Beginner',
      question: 'You need to read a JSON file in Python. Which library would you use and why?',
      expectedAnswer: 'json library - built-in, simple, efficient',
      responseType: 'text'
    }
  ]
};

// Template for adding questions to database
export async function seedQuestionsForSkill(questionData: QuestionData) {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  try {
    // Find the skill
    const skill = await prisma.skill.findUnique({
      where: { key: questionData.skillKey }
    });

    if (!skill) {
      throw new Error(`Skill with key "${questionData.skillKey}" not found`);
    }

    // Create questions
    const questions = questionData.questions.map(q => ({
      skillId: skill.id,
      type: q.type,
      level: q.level,
      question: q.question,
      options: q.options ? JSON.stringify(q.options) : null,
      answer: q.answer,
      expectedAnswer: q.expectedAnswer,
      responseType: q.responseType
    }));

    await prisma.question.createMany({
      data: questions,
      skipDuplicates: true
    });

    console.log(`✅ Added ${questions.length} questions for skill: ${skill.name}`);
  } catch (error) {
    console.error(`❌ Error seeding questions for ${questionData.skillKey}:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

// Usage example:
// await seedQuestionsForSkill(pythonQuestions);
