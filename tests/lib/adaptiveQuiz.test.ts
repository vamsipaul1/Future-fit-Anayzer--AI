import {
  initializeSkillEstimates,
  pickNextQuestion,
  updateSkillEstimates,
  shouldTerminateQuiz,
  generateQuizSummary
} from '@/lib/adaptiveQuiz'

describe('Adaptive Quiz Functions', () => {
  const mockUserSkills = [
    { skillId: 'react', level: 50 },
    { skillId: 'css', level: 30 },
    { skillId: 'js', level: 70 }
  ]

  const mockQuestionPool = [
    {
      id: 'q1',
      text: 'What is React?',
      type: 'mcq' as const,
      difficulty: 3,
      skills: [{ skillId: 'react', impact: 8 }]
    },
    {
      id: 'q2',
      text: 'Write a React component',
      type: 'code' as const,
      difficulty: 6,
      skills: [{ skillId: 'react', impact: 9 }]
    },
    {
      id: 'q3',
      text: 'What is CSS?',
      type: 'mcq' as const,
      difficulty: 2,
      skills: [{ skillId: 'css', impact: 7 }]
    },
    {
      id: 'q4',
      text: 'Advanced JavaScript concepts',
      type: 'scenario' as const,
      difficulty: 8,
      skills: [{ skillId: 'js', impact: 8 }]
    }
  ]

  describe('initializeSkillEstimates', () => {
    it('should initialize estimates from user skills', () => {
      const estimates = initializeSkillEstimates(mockUserSkills)
      expect(estimates.get('react')).toBe(50)
      expect(estimates.get('css')).toBe(30)
      expect(estimates.get('js')).toBe(70)
    })

    it('should adjust estimates based on prior attempts', () => {
      const priorAttempts = [
        { skillId: 'react', score: 60 },
        { skillId: 'css', score: 40 }
      ]
      const estimates = initializeSkillEstimates(mockUserSkills, priorAttempts)
      expect(estimates.get('react')).toBe(53) // (50*0.7) + (60*0.3) = 53
      expect(estimates.get('css')).toBe(33) // (30*0.7) + (40*0.3) = 33
    })
  })

  describe('pickNextQuestion', () => {
    it('should pick question for weakest skill', () => {
      const skillEstimates = new Map([
        ['react', 50],
        ['css', 30],
        ['js', 70]
      ])
      const quizState = {
        skillEstimates,
        attemptHistory: [],
        currentQuestionIndex: 0,
        totalQuestions: 10
      }

      const nextQuestion = pickNextQuestion(mockQuestionPool, quizState)
      expect(nextQuestion).toBeDefined()
      expect(nextQuestion?.skills.some(s => s.skillId === 'css')).toBe(true)
    })

    it('should avoid already attempted questions', () => {
      const skillEstimates = new Map([['react', 50]])
      const quizState = {
        skillEstimates,
        attemptHistory: ['q1'],
        currentQuestionIndex: 1,
        totalQuestions: 10
      }

      const nextQuestion = pickNextQuestion(mockQuestionPool, quizState)
      expect(nextQuestion?.id).not.toBe('q1')
    })

    it('should return null when no questions available', () => {
      const skillEstimates = new Map([['react', 50]])
      const quizState = {
        skillEstimates,
        attemptHistory: ['q1', 'q2', 'q3', 'q4'],
        currentQuestionIndex: 4,
        totalQuestions: 10
      }

      const nextQuestion = pickNextQuestion(mockQuestionPool, quizState)
      expect(nextQuestion).toBeNull()
    })

    it('should focus on target skills when specified', () => {
      const skillEstimates = new Map([
        ['react', 50],
        ['css', 30],
        ['js', 70]
      ])
      const quizState = {
        skillEstimates,
        attemptHistory: [],
        currentQuestionIndex: 0,
        totalQuestions: 10
      }

      const nextQuestion = pickNextQuestion(mockQuestionPool, quizState, ['react'])
      expect(nextQuestion?.skills.some(s => s.skillId === 'react')).toBe(true)
    })
  })

  describe('updateSkillEstimates', () => {
    it('should update skill estimates based on answer', () => {
      const skillEstimates = new Map([['react', 50]])
      const question = mockQuestionPool[0]
      const answer = {
        questionId: 'q1',
        answer: 'correct',
        timeTaken: 30
      }

      const updatedEstimates = updateSkillEstimates(skillEstimates, question, answer)
      const newLevel = updatedEstimates.get('react')
      expect(newLevel).toBeDefined()
      expect(newLevel).not.toBe(50) // Should have changed
    })

    it('should handle multiple skills in question', () => {
      const skillEstimates = new Map([
        ['react', 50],
        ['css', 30]
      ])
      const question = {
        id: 'q5',
        text: 'React with CSS',
        type: 'code' as const,
        difficulty: 5,
        skills: [
          { skillId: 'react', impact: 6 },
          { skillId: 'css', impact: 4 }
        ]
      }
      const answer = {
        questionId: 'q5',
        answer: 'correct',
        timeTaken: 45
      }

      const updatedEstimates = updateSkillEstimates(skillEstimates, question, answer)
      expect(updatedEstimates.get('react')).toBeDefined()
      expect(updatedEstimates.get('css')).toBeDefined()
    })
  })

  describe('shouldTerminateQuiz', () => {
    it('should terminate when max questions reached', () => {
      const quizState = {
        skillEstimates: new Map([['react', 50]]),
        attemptHistory: [],
        currentQuestionIndex: 20,
        totalQuestions: 10
      }

      const shouldTerminate = shouldTerminateQuiz(quizState, 20)
      expect(shouldTerminate).toBe(true)
    })

    it('should terminate when confidence is high', () => {
      const quizState = {
        skillEstimates: new Map([
          ['react', 80],
          ['css', 85],
          ['js', 90]
        ]),
        attemptHistory: [],
        currentQuestionIndex: 5,
        totalQuestions: 10
      }

      const shouldTerminate = shouldTerminateQuiz(quizState, 20, 0.8)
      expect(shouldTerminate).toBe(true)
    })

    it('should continue when confidence is low', () => {
      const quizState = {
        skillEstimates: new Map([
          ['react', 30],
          ['css', 25],
          ['js', 35]
        ]),
        attemptHistory: [],
        currentQuestionIndex: 5,
        totalQuestions: 10
      }

      const shouldTerminate = shouldTerminateQuiz(quizState, 20, 0.8)
      expect(shouldTerminate).toBe(false)
    })
  })

  describe('generateQuizSummary', () => {
    it('should generate comprehensive quiz summary', () => {
      const skillEstimates = new Map([
        ['react', 75],
        ['css', 45],
        ['js', 85]
      ])
      const questionsAnswered = 10

      const summary = generateQuizSummary(skillEstimates, questionsAnswered)
      
      expect(summary.overallScore).toBe(68) // (75+45+85)/3 = 68.33, rounded to 68
      expect(summary.skillLevels).toHaveLength(3)
      expect(summary.skillLevels[0].skillId).toBe('react')
      expect(summary.skillLevels[0].proficiency).toBe('Advanced')
      expect(summary.skillLevels[1].proficiency).toBe('Intermediate')
      expect(summary.skillLevels[2].proficiency).toBe('Advanced')
      expect(summary.recommendations).toContain('Focus on fundamentals: css')
      expect(summary.recommendations).toContain('Practice advanced concepts: react, js')
    })

    it('should handle empty skill estimates', () => {
      const skillEstimates = new Map()
      const summary = generateQuizSummary(skillEstimates, 5)
      
      expect(summary.overallScore).toBe(0)
      expect(summary.skillLevels).toHaveLength(0)
      expect(summary.recommendations).toContain('Take more practice quizzes to improve accuracy')
    })
  })
})
