import { 
  computeRoleFit, 
  getRoleFitBadge, 
  getSkillLevel, 
  calculateQuizScore,
  calculatePerSkillScores,
  findMissingSkills,
  generateSkillRecommendations
} from '@/lib/scoring'

describe('Scoring Functions', () => {
  const mockRole = {
    id: 'r1',
    name: 'Frontend Developer',
    roleSkills: [
      { skillId: 'react', weight: 8 },
      { skillId: 'css', weight: 6 },
      { skillId: 'js', weight: 7 }
    ]
  }

  const mockUserSkills = [
    { skillId: 'react', level: 80 },
    { skillId: 'css', level: 60 },
    { skillId: 'js', level: 70 }
  ]

  describe('computeRoleFit', () => {
    it('should calculate role fit percentage correctly', () => {
      const result = computeRoleFit(mockRole, mockUserSkills)
      expect(result).toBe(70) // (80*8 + 60*6 + 70*7) / (8+6+7) = 70
    })

    it('should return 0 for empty user skills', () => {
      const result = computeRoleFit(mockRole, [])
      expect(result).toBe(0)
    })

    it('should handle partial skill matches', () => {
      const partialSkills = [{ skillId: 'react', level: 100 }]
      const result = computeRoleFit(mockRole, partialSkills)
      expect(result).toBe(38) // (100*8) / (8+6+7) = 38
    })
  })

  describe('getRoleFitBadge', () => {
    it('should return "Highly Matched" for 85%+', () => {
      expect(getRoleFitBadge(90)).toBe('Highly Matched')
      expect(getRoleFitBadge(85)).toBe('Highly Matched')
    })

    it('should return "Good Match" for 60-84%', () => {
      expect(getRoleFitBadge(70)).toBe('Good Match')
      expect(getRoleFitBadge(60)).toBe('Good Match')
    })

    it('should return "Needs Work" for <60%', () => {
      expect(getRoleFitBadge(50)).toBe('Needs Work')
      expect(getRoleFitBadge(0)).toBe('Needs Work')
    })
  })

  describe('getSkillLevel', () => {
    it('should return "Beginner" for <40', () => {
      expect(getSkillLevel(30)).toBe('Beginner')
      expect(getSkillLevel(0)).toBe('Beginner')
    })

    it('should return "Intermediate" for 40-75', () => {
      expect(getSkillLevel(50)).toBe('Intermediate')
      expect(getSkillLevel(75)).toBe('Intermediate')
    })

    it('should return "Advanced" for >75', () => {
      expect(getSkillLevel(80)).toBe('Advanced')
      expect(getSkillLevel(100)).toBe('Advanced')
    })
  })

  describe('calculateQuizScore', () => {
    it('should calculate average score correctly', () => {
      const scores = [80, 90, 70, 85]
      const result = calculateQuizScore(scores)
      expect(result).toBe(81) // (80+90+70+85)/4 = 81.25, rounded to 81
    })

    it('should return 0 for empty array', () => {
      const result = calculateQuizScore([])
      expect(result).toBe(0)
    })

    it('should handle single score', () => {
      const result = calculateQuizScore([85])
      expect(result).toBe(85)
    })
  })

  describe('calculatePerSkillScores', () => {
    const mockAnswers = [
      { questionId: 'q1', answer: 'correct', timeTaken: 30 },
      { questionId: 'q2', answer: 'correct', timeTaken: 45 }
    ]

    const mockQuestions = [
      {
        id: 'q1',
        skills: [{ skillId: 'react', impact: 8 }],
        difficulty: 5
      },
      {
        id: 'q2',
        skills: [{ skillId: 'react', impact: 6 }, { skillId: 'css', impact: 4 }],
        difficulty: 6
      }
    ]

    it('should calculate per-skill scores', () => {
      const result = calculatePerSkillScores(mockAnswers, mockQuestions)
      expect(result).toHaveLength(2)
      expect(result[0].skillId).toBe('react')
      expect(result[1].skillId).toBe('css')
      expect(result[0].score).toBeGreaterThan(0)
      expect(result[1].score).toBeGreaterThan(0)
    })
  })

  describe('findMissingSkills', () => {
    it('should identify missing skills below threshold', () => {
      const result = findMissingSkills(mockRole, mockUserSkills, 70)
      expect(result).toHaveLength(2) // css and js below 70
      expect(result[0].skillId).toBe('css')
      expect(result[1].skillId).toBe('js')
    })

    it('should return empty array when all skills meet threshold', () => {
      const result = findMissingSkills(mockRole, mockUserSkills, 50)
      expect(result).toHaveLength(0)
    })
  })

  describe('generateSkillRecommendations', () => {
    const mockRoleFits = [
      { roleId: 'r1', roleName: 'Frontend Developer', matchPercent: 70 }
    ]

    const mockMissingSkills = [
      { skillId: 'css', reason: 'Required for Frontend Developer' }
    ]

    it('should generate recommendations based on role fits and missing skills', () => {
      const result = generateSkillRecommendations(mockRoleFits, mockMissingSkills)
      expect(result).toContain('Learn: css')
      expect(result).toContain('Take practice quizzes to improve')
      expect(result).toContain('Build portfolio projects')
    })

    it('should handle low match percentage', () => {
      const lowMatchFits = [
        { roleId: 'r1', roleName: 'Frontend Developer', matchPercent: 50 }
      ]
      const result = generateSkillRecommendations(lowMatchFits, [])
      expect(result).toContain('Focus on skills for Frontend Developer role')
    })
  })
})
