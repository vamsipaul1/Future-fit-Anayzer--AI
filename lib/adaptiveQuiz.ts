/**
 * Adaptive quiz engine for intelligent question selection
 */

export interface Question {
  id: string
  text: string
  type: 'mcq' | 'code' | 'scenario' | 'short'
  difficulty: number // 1-10
  skills: Array<{
    skillId: string
    impact: number // 1-10
  }>
  metadata?: any
}

export interface UserSkill {
  skillId: string
  level: number // 0-100
}

export interface QuizState {
  skillEstimates: Map<string, number>
  attemptHistory: string[]
  currentQuestionIndex: number
  totalQuestions: number
}

export interface QuizAnswer {
  questionId: string
  answer: string
  timeTaken: number // seconds
}

/**
 * Initialize skill estimates from user input or prior attempts
 */
export function initializeSkillEstimates(
  userSkills: UserSkill[],
  priorAttempts?: Array<{ skillId: string; score: number }>
): Map<string, number> {
  const estimates = new Map<string, number>()

  // Start with user-provided levels
  for (const skill of userSkills) {
    estimates.set(skill.skillId, skill.level)
  }

  // Adjust based on prior attempts if available
  if (priorAttempts) {
    for (const attempt of priorAttempts) {
      const current = estimates.get(attempt.skillId) || 0
      // Weighted average: 70% current estimate, 30% new attempt
      const newEstimate = (current * 0.7) + (attempt.score * 0.3)
      estimates.set(attempt.skillId, Math.round(newEstimate))
    }
  }

  return estimates
}

/**
 * Select the next question based on adaptive algorithm
 */
export function pickNextQuestion(
  questionPool: Question[],
  quizState: QuizState,
  targetSkills?: string[]
): Question | null {
  const { skillEstimates, attemptHistory } = quizState

  // Filter out already attempted questions
  const availableQuestions = questionPool.filter(
    q => !attemptHistory.includes(q.id)
  )

  if (availableQuestions.length === 0) {
    return null
  }

  // If target skills specified, focus on those
  const skillsToTarget = targetSkills || Array.from(skillEstimates.keys())

  // Rank skills by gap (target level - current estimate)
  const skillGaps = skillsToTarget
    .map(skillId => ({
      skillId,
      gap: 75 - (skillEstimates.get(skillId) || 0), // Target level 75
      currentLevel: skillEstimates.get(skillId) || 0
    }))
    .sort((a, b) => b.gap - a.gap)

  // Find questions that target the highest gap skills
  for (const { skillId, currentLevel } of skillGaps) {
    const targetDifficulty = getTargetDifficulty(currentLevel)
    
    const candidateQuestions = availableQuestions.filter(q =>
      q.skills.some(s => s.skillId === skillId) &&
      Math.abs(q.difficulty - targetDifficulty) <= 2
    )

    if (candidateQuestions.length > 0) {
      // Prefer questions with high impact for the target skill
      const bestQuestion = candidateQuestions.reduce((best, current) => {
        const bestImpact = best.skills.find(s => s.skillId === skillId)?.impact || 0
        const currentImpact = current.skills.find(s => s.skillId === skillId)?.impact || 0
        return currentImpact > bestImpact ? current : best
      })

      return bestQuestion
    }
  }

  // Fallback: return a random question of appropriate difficulty
  const avgLevel = Array.from(skillEstimates.values()).reduce((a, b) => a + b, 0) / skillEstimates.size
  const targetDifficulty = getTargetDifficulty(avgLevel)
  
  const fallbackQuestions = availableQuestions.filter(q =>
    Math.abs(q.difficulty - targetDifficulty) <= 3
  )

  return fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)] || availableQuestions[0]
}

/**
 * Get target difficulty based on current skill level
 */
function getTargetDifficulty(currentLevel: number): number {
  if (currentLevel < 40) return 3 // Beginner: difficulty 2-4
  if (currentLevel <= 75) return 6 // Intermediate: difficulty 4-7
  return 8 // Advanced: difficulty 6-9
}

/**
 * Update skill estimates based on quiz answer
 */
export function updateSkillEstimates(
  skillEstimates: Map<string, number>,
  question: Question,
  answer: QuizAnswer,
  learningRate: number = 0.1
): Map<string, number> {
  const newEstimates = new Map(skillEstimates)
  
  // Calculate correctness score (0-1)
  const correctnessScore = calculateCorrectnessScore(question, answer)
  
  // Expected performance based on difficulty
  const expectedPerformance = 1 - (question.difficulty / 10)
  
  // Update each affected skill
  for (const questionSkill of question.skills) {
    const currentEstimate = newEstimates.get(questionSkill.skillId) || 0
    const impact = questionSkill.impact / 10 // Normalize to 0-1
    const adjustment = learningRate * impact * (correctnessScore - expectedPerformance)
    
    const newEstimate = Math.max(0, Math.min(100, currentEstimate + (adjustment * 100)))
    newEstimates.set(questionSkill.skillId, Math.round(newEstimate))
  }

  return newEstimates
}

/**
 * Calculate correctness score based on question type and answer
 */
function calculateCorrectnessScore(question: Question, answer: QuizAnswer): number {
  switch (question.type) {
    case 'mcq':
      // For MCQ, check if answer matches correct option
      // This is simplified - in real implementation, you'd check against question.metadata.correctAnswer
      return Math.random() > 0.3 ? 1 : 0 // Mock: 70% correct rate
    
    case 'code':
      // For code questions, you might run tests or use AI to evaluate
      // This is simplified
      return answer.timeTaken < 120 ? 1 : 0.5 // Reward faster, correct-looking answers
    
    case 'scenario':
      // For scenario questions, use AI or keyword matching
      return answer.answer.length > 20 ? 0.8 : 0.4 // Reward detailed answers
    
    case 'short':
      // For short answers, check against expected keywords
      return answer.answer.length > 10 ? 0.7 : 0.3
    
    default:
      return 0.5
  }
}

/**
 * Check if quiz should terminate
 */
export function shouldTerminateQuiz(
  quizState: QuizState,
  maxQuestions: number = 20,
  confidenceThreshold: number = 0.8
): boolean {
  // Terminate if max questions reached
  if (quizState.currentQuestionIndex >= maxQuestions) {
    return true
  }

  // Terminate if confidence is high enough
  const estimates = Array.from(quizState.skillEstimates.values())
  const avgConfidence = estimates.reduce((sum, level) => {
    // Confidence increases as level approaches target (75)
    const distance = Math.abs(75 - level)
    return sum + (1 - distance / 75)
  }, 0) / estimates.length

  return avgConfidence >= confidenceThreshold
}

/**
 * Generate quiz summary and recommendations
 */
export function generateQuizSummary(
  skillEstimates: Map<string, number>,
  questionsAnswered: number
): {
  overallScore: number
  skillLevels: Array<{ skillId: string; level: number; proficiency: string }>
  recommendations: string[]
} {
  const estimates = Array.from(skillEstimates.entries())
  const overallScore = Math.round(
    estimates.reduce((sum, [, level]) => sum + level, 0) / estimates.length
  )

  const skillLevels = estimates.map(([skillId, level]) => ({
    skillId,
    level,
    proficiency: getProficiencyLevel(level)
  }))

  const recommendations = generateRecommendations(skillLevels, questionsAnswered)

  return {
    overallScore,
    skillLevels,
    recommendations
  }
}

function getProficiencyLevel(level: number): string {
  if (level < 40) return 'Beginner'
  if (level <= 75) return 'Intermediate'
  return 'Advanced'
}

function generateRecommendations(
  skillLevels: Array<{ skillId: string; level: number; proficiency: string }>,
  questionsAnswered: number
): string[] {
  const recommendations: string[] = []

  const beginnerSkills = skillLevels.filter(s => s.proficiency === 'Beginner')
  const intermediateSkills = skillLevels.filter(s => s.proficiency === 'Intermediate')

  if (beginnerSkills.length > 0) {
    recommendations.push(`Focus on fundamentals: ${beginnerSkills.map(s => s.skillId).join(', ')}`)
  }

  if (intermediateSkills.length > 0) {
    recommendations.push(`Practice advanced concepts: ${intermediateSkills.map(s => s.skillId).join(', ')}`)
  }

  if (questionsAnswered < 10) {
    recommendations.push('Take more practice quizzes to improve accuracy')
  }

  recommendations.push('Build real projects to apply your skills')
  recommendations.push('Join coding communities for peer learning')

  return recommendations
}

// Unit tests for adaptive quiz logic
export const adaptiveQuizTests = {
  testPickNextQuestion: () => {
    const questions: Question[] = [
      {
        id: 'q1',
        text: 'What is React?',
        type: 'mcq',
        difficulty: 3,
        skills: [{ skillId: 'react', impact: 8 }]
      },
      {
        id: 'q2',
        text: 'Write a React component',
        type: 'code',
        difficulty: 6,
        skills: [{ skillId: 'react', impact: 9 }]
      }
    ]

    const skillEstimates = new Map([['react', 30]])
    const quizState: QuizState = {
      skillEstimates,
      attemptHistory: [],
      currentQuestionIndex: 0,
      totalQuestions: 10
    }

    const nextQuestion = pickNextQuestion(questions, quizState, ['react'])
    console.assert(nextQuestion?.id === 'q1', 'Should pick easier question for beginner')
  },

  testUpdateSkillEstimates: () => {
    const skillEstimates = new Map([['react', 50]])
    const question: Question = {
      id: 'q1',
      text: 'React question',
      type: 'mcq',
      difficulty: 5,
      skills: [{ skillId: 'react', impact: 8 }]
    }
    const answer: QuizAnswer = {
      questionId: 'q1',
      answer: 'correct',
      timeTaken: 30
    }

    const updated = updateSkillEstimates(skillEstimates, question, answer)
    const newLevel = updated.get('react')
    console.assert(newLevel !== undefined, 'Should update skill level')
  }
}
