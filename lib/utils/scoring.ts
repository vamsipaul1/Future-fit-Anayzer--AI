/**
 * Role-fit scoring and skill assessment utilities
 */

export interface UserSkill {
  skillId: string
  level: number // 0-100
}

export interface RoleSkill {
  skillId: string
  weight: number // 1-10
}

export interface Role {
  id: string
  name: string
  roleSkills: RoleSkill[]
}

/**
 * Calculate role-fit percentage based on user skills and role requirements
 * Formula: SUM(userLevel/100 * roleWeight) / SUM(roleWeight) * 100
 */
export function computeRoleFit(role: Role, userSkills: UserSkill[]): number {
  const userSkillMap = new Map(userSkills.map(skill => [skill.skillId, skill.level]))
  
  let weightedSum = 0
  let totalWeight = 0

  for (const roleSkill of role.roleSkills) {
    const userLevel = userSkillMap.get(roleSkill.skillId) || 0
    const normalizedUserLevel = userLevel / 100 // Convert to 0-1 scale
    const weight = roleSkill.weight

    weightedSum += normalizedUserLevel * weight
    totalWeight += weight
  }

  if (totalWeight === 0) return 0

  const matchPercentage = (weightedSum / totalWeight) * 100
  return Math.round(matchPercentage)
}

/**
 * Get role-fit badge based on percentage
 */
export function getRoleFitBadge(percentage: number): string {
  if (percentage >= 85) return 'Highly Matched'
  if (percentage >= 60) return 'Good Match'
  return 'Needs Work'
}

/**
 * Calculate skill proficiency level based on score
 */
export function getSkillLevel(score: number): 'Beginner' | 'Intermediate' | 'Advanced' {
  if (score < 40) return 'Beginner'
  if (score <= 75) return 'Intermediate'
  return 'Advanced'
}

/**
 * Calculate overall quiz score from individual question scores
 */
export function calculateQuizScore(questionScores: number[]): number {
  if (questionScores.length === 0) return 0
  
  const sum = questionScores.reduce((acc, score) => acc + score, 0)
  return Math.round(sum / questionScores.length)
}

/**
 * Calculate per-skill scores from quiz answers
 */
export function calculatePerSkillScores(
  answers: Array<{ questionId: string; answer: string; timeTaken: number }>,
  questions: Array<{
    id: string
    skills: Array<{ skillId: string; impact: number }>
    difficulty: number
  }>
): Array<{ skillId: string; score: number }> {
  const skillScores = new Map<string, { total: number; count: number }>()

  for (const answer of answers) {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question) continue

    // Simple scoring: assume correct answer for now
    // In real implementation, you'd check the actual answer
    const isCorrect = true // This should be determined by question type and answer
    const baseScore = isCorrect ? 100 : 0
    
    // Adjust score based on difficulty and time taken
    const difficultyMultiplier = question.difficulty / 10
    const timePenalty = Math.max(0, 1 - (answer.timeTaken / 60)) // Penalty for slow answers
    const adjustedScore = baseScore * difficultyMultiplier * timePenalty

    for (const questionSkill of question.skills) {
      const impact = questionSkill.impact / 10 // Normalize impact to 0-1
      const skillScore = adjustedScore * impact

      if (!skillScores.has(questionSkill.skillId)) {
        skillScores.set(questionSkill.skillId, { total: 0, count: 0 })
      }

      const current = skillScores.get(questionSkill.skillId)!
      current.total += skillScore
      current.count += 1
    }
  }

  return Array.from(skillScores.entries()).map(([skillId, { total, count }]) => ({
    skillId,
    score: Math.round(total / count),
  }))
}

/**
 * Find missing skills for a role
 */
export function findMissingSkills(
  role: Role,
  userSkills: UserSkill[],
  threshold: number = 40
): Array<{ skillId: string; reason: string }> {
  const userSkillMap = new Map(userSkills.map(skill => [skill.skillId, skill.level]))
  const missingSkills: Array<{ skillId: string; reason: string }> = []

  for (const roleSkill of role.roleSkills) {
    const userLevel = userSkillMap.get(roleSkill.skillId) || 0
    
    if (userLevel < threshold) {
      missingSkills.push({
        skillId: roleSkill.skillId,
        reason: `Required for ${role.name}, current level ${userLevel}/100, recommended ${threshold}+`
      })
    }
  }

  return missingSkills
}

/**
 * Generate skill recommendations based on role fit
 */
export function generateSkillRecommendations(
  roleFits: Array<{ roleId: string; roleName: string; matchPercent: number }>,
  missingSkills: Array<{ skillId: string; reason: string }>
): string[] {
  const recommendations: string[] = []

  if (roleFits.length > 0) {
    const topRole = roleFits[0]
    if (topRole.matchPercent < 60) {
      recommendations.push(`Focus on skills for ${topRole.roleName} role`)
    }
  }

  if (missingSkills.length > 0) {
    recommendations.push(`Learn: ${missingSkills.slice(0, 3).map(s => s.skillId).join(', ')}`)
  }

  recommendations.push('Take practice quizzes to improve')
  recommendations.push('Build portfolio projects')

  return recommendations
}

// Unit tests for scoring functions
export const scoringTests = {
  testComputeRoleFit: () => {
    const role: Role = {
      id: 'r1',
      name: 'Frontend Developer',
      roleSkills: [
        { skillId: 'react', weight: 8 },
        { skillId: 'css', weight: 6 },
        { skillId: 'js', weight: 7 }
      ]
    }

    const userSkills: UserSkill[] = [
      { skillId: 'react', level: 80 },
      { skillId: 'css', level: 60 },
      { skillId: 'js', level: 70 }
    ]

    const result = computeRoleFit(role, userSkills)
    console.assert(result === 70, `Expected 70, got ${result}`)
  },

  testGetSkillLevel: () => {
    console.assert(getSkillLevel(30) === 'Beginner')
    console.assert(getSkillLevel(50) === 'Intermediate')
    console.assert(getSkillLevel(80) === 'Advanced')
  },

  testGetRoleFitBadge: () => {
    console.assert(getRoleFitBadge(90) === 'Highly Matched')
    console.assert(getRoleFitBadge(70) === 'Good Match')
    console.assert(getRoleFitBadge(50) === 'Needs Work')
  }
}
