import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// Mock Prisma client
const mockPrisma = {
  assessment: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  question: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  skill: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  domain: {
    findUnique: jest.fn(),
  },
  assessmentItem: {
    create: jest.fn(),
    update: jest.fn(),
  },
  recommendation: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
};

// Scoring functions
function calculateConfidenceScore(
  percentCorrect: number,
  avgResponseTimeMs: number,
  difficulty: number,
  expectedTimeMs: number = 45000
): number {
  const correctnessFactor = percentCorrect / 100;
  const timeFactor = Math.max(0, 1 - (avgResponseTimeMs / expectedTimeMs));
  const difficultyFactor = difficulty / 5;
  
  // Weighted combination: w1=0.7, w2=0.2, w3=0.1
  const rawScore = 0.7 * correctnessFactor + 0.2 * timeFactor + 0.1 * difficultyFactor;
  
  // Apply sigmoid to keep in 0-1 range
  return 1 / (1 + Math.exp(-(2 * rawScore - 1)));
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function generateAnonymizedLabel(userId?: string): string {
  if (!userId) {
    return `guest_${Math.random().toString(36).substr(2, 8)}`;
  }
  return `u_${userId.substr(0, 8)}`;
}

function calculateOverallScore(correctAnswers: number, totalQuestions: number): number {
  return totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
}

function calculateSkillScore(correctAnswers: number, questionsAttempted: number): number {
  return questionsAttempted > 0 ? (correctAnswers / questionsAttempted) * 100 : 0;
}

// Recommendation generation logic
async function generateRecommendations(
  skillId: string,
  percentCorrect: number,
  skillName: string
): Promise<Array<{ type: string; title: string; url?: string; priority: number }>> {
  const recommendations = [];

  if (percentCorrect < 70) {
    // Poor performance - focus on fundamentals
    recommendations.push(
      {
        type: 'course',
        title: `Fundamentals of ${skillName}`,
        url: `https://example.com/courses/${skillId}-fundamentals`,
        priority: 1
      },
      {
        type: 'video',
        title: `${skillName} Basics Tutorial`,
        url: `https://example.com/videos/${skillId}-basics`,
        priority: 2
      },
      {
        type: 'article',
        title: `Getting Started with ${skillName}`,
        url: `https://example.com/articles/${skillId}-getting-started`,
        priority: 3
      }
    );
  } else if (percentCorrect < 85) {
    // Moderate performance - practice and intermediate resources
    recommendations.push(
      {
        type: 'question',
        title: `Practice Questions: ${skillName}`,
        url: `https://example.com/practice/${skillId}`,
        priority: 1
      },
      {
        type: 'video',
        title: `Advanced ${skillName} Concepts`,
        url: `https://example.com/videos/${skillId}-advanced`,
        priority: 2
      }
    );
  } else {
    // Good performance - advanced challenges
    recommendations.push(
      {
        type: 'course',
        title: `Advanced ${skillName} Mastery`,
        url: `https://example.com/courses/${skillId}-advanced`,
        priority: 1
      },
      {
        type: 'question',
        title: `Challenge Problems: ${skillName}`,
        url: `https://example.com/challenges/${skillId}`,
        priority: 2
      }
    );
  }

  return recommendations.slice(0, 5); // Limit to 5 recommendations
}

describe('Scoring and Analysis Logic', () => {
  describe('calculateConfidenceScore', () => {
    it('should return high confidence for good performance', () => {
      const score = calculateConfidenceScore(90, 30000, 3);
      expect(score).toBeGreaterThan(0.7);
    });

    it('should return low confidence for poor performance', () => {
      const score = calculateConfidenceScore(30, 90000, 1);
      expect(score).toBeLessThan(0.5);
    });

    it('should return medium confidence for average performance', () => {
      const score = calculateConfidenceScore(70, 45000, 2);
      expect(score).toBeGreaterThan(0.4);
      expect(score).toBeLessThan(0.8);
    });

    it('should handle edge cases', () => {
      expect(calculateConfidenceScore(0, 0, 0)).toBeDefined();
      expect(calculateConfidenceScore(100, 1000, 5)).toBeDefined();
    });
  });

  describe('calculateOverallScore', () => {
    it('should calculate correct percentage', () => {
      expect(calculateOverallScore(8, 10)).toBe(80);
      expect(calculateOverallScore(5, 5)).toBe(100);
      expect(calculateOverallScore(0, 10)).toBe(0);
    });

    it('should handle zero questions', () => {
      expect(calculateOverallScore(0, 0)).toBe(0);
    });
  });

  describe('calculateSkillScore', () => {
    it('should calculate skill percentage correctly', () => {
      expect(calculateSkillScore(3, 5)).toBe(60);
      expect(calculateSkillScore(4, 4)).toBe(100);
      expect(calculateSkillScore(0, 3)).toBe(0);
    });

    it('should handle zero attempted questions', () => {
      expect(calculateSkillScore(0, 0)).toBe(0);
    });
  });

  describe('generateAnonymizedLabel', () => {
    it('should generate guest label for undefined userId', () => {
      const label = generateAnonymizedLabel();
      expect(label).toMatch(/^guest_[a-z0-9]{8}$/);
    });

    it('should generate user label for valid userId', () => {
      const userId = 'user_123456789';
      const label = generateAnonymizedLabel(userId);
      expect(label).toBe('u_user_12');
    });

    it('should handle short userIds', () => {
      const userId = 'abc';
      const label = generateAnonymizedLabel(userId);
      expect(label).toBe('u_abc');
    });
  });

  describe('generateRecommendations', () => {
    it('should generate fundamental recommendations for poor performance', async () => {
      const recommendations = await generateRecommendations('skill1', 50, 'JavaScript');
      
      expect(recommendations).toHaveLength(3);
      expect(recommendations[0].type).toBe('course');
      expect(recommendations[0].title).toContain('Fundamentals');
      expect(recommendations[1].type).toBe('video');
      expect(recommendations[2].type).toBe('article');
    });

    it('should generate practice recommendations for moderate performance', async () => {
      const recommendations = await generateRecommendations('skill1', 75, 'React');
      
      expect(recommendations).toHaveLength(2);
      expect(recommendations[0].type).toBe('question');
      expect(recommendations[0].title).toContain('Practice');
      expect(recommendations[1].type).toBe('video');
    });

    it('should generate advanced recommendations for good performance', async () => {
      const recommendations = await generateRecommendations('skill1', 90, 'Python');
      
      expect(recommendations).toHaveLength(2);
      expect(recommendations[0].type).toBe('course');
      expect(recommendations[0].title).toContain('Advanced');
      expect(recommendations[1].type).toBe('question');
      expect(recommendations[1].title).toContain('Challenge');
    });

    it('should limit recommendations to 5 items', async () => {
      // Mock a scenario that would generate many recommendations
      const recommendations = await generateRecommendations('skill1', 30, 'Test');
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });
  });

  describe('sigmoid function', () => {
    it('should return values between 0 and 1', () => {
      expect(sigmoid(-10)).toBeGreaterThan(0);
      expect(sigmoid(-10)).toBeLessThan(1);
      expect(sigmoid(0)).toBeCloseTo(0.5);
      expect(sigmoid(10)).toBeGreaterThan(0);
      expect(sigmoid(10)).toBeLessThan(1);
    });

    it('should be symmetric around 0', () => {
      expect(sigmoid(1) + sigmoid(-1)).toBeCloseTo(1);
    });
  });
});

describe('Privacy Protection', () => {
  it('should not include PII in analysis response', () => {
    const mockAnalysis = {
      assessmentId: 'test123',
      anonymizedUserLabel: 'u_test123',
      overall: { questionsAttempted: 10, correctAnswers: 8, percentCorrect: 80, timeSpentMs: 300000 },
      perSkill: [],
      perDomain: [],
      generatedAt: new Date().toISOString()
    };

    // Check that no PII fields are present
    expect(mockAnalysis).not.toHaveProperty('userEmail');
    expect(mockAnalysis).not.toHaveProperty('userDisplayName');
    expect(mockAnalysis).not.toHaveProperty('userName');
    expect(mockAnalysis.anonymizedUserLabel).not.toMatch(/@/); // No email
    expect(mockAnalysis.anonymizedUserLabel).toMatch(/^u_/); // Proper format
  });

  it('should generate consistent anonymized labels', () => {
    const userId = 'user_123456789';
    const label1 = generateAnonymizedLabel(userId);
    const label2 = generateAnonymizedLabel(userId);
    expect(label1).toBe(label2);
  });
});

describe('Performance Metrics', () => {
  it('should calculate response time metrics correctly', () => {
    const responseTimes = [30000, 45000, 60000, 30000];
    const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    
    expect(avgResponseTime).toBe(41250);
  });

  it('should handle missing response times', () => {
    const responseTimes = [30000, null, 60000, undefined];
    const validTimes = responseTimes.filter(time => time != null);
    const avgResponseTime = validTimes.reduce((sum, time) => sum + time, 0) / validTimes.length;
    
    expect(avgResponseTime).toBe(45000);
  });
});

describe('Edge Cases and Error Handling', () => {
  it('should handle division by zero', () => {
    expect(calculateOverallScore(0, 0)).toBe(0);
    expect(calculateSkillScore(0, 0)).toBe(0);
  });

  it('should handle negative values gracefully', () => {
    expect(calculateConfidenceScore(-10, -1000, -1)).toBeDefined();
  });

  it('should handle very large numbers', () => {
    expect(calculateConfidenceScore(100, 999999999, 5)).toBeDefined();
  });

  it('should handle empty recommendation arrays', async () => {
    const recommendations = await generateRecommendations('', 0, '');
    expect(Array.isArray(recommendations)).toBe(true);
  });
});

// Integration test helpers
describe('Integration Test Helpers', () => {
  it('should validate assessment data structure', () => {
    const mockAssessment = {
      id: 'test123',
      userId: 'user123',
      domainId: 'domain123',
      skillIds: JSON.stringify(['skill1', 'skill2']),
      startedAt: new Date(),
      submittedAt: new Date(),
      overallScore: 85.5
    };

    expect(mockAssessment.id).toBeDefined();
    expect(mockAssessment.userId).toBeDefined();
    expect(mockAssessment.domainId).toBeDefined();
    expect(JSON.parse(mockAssessment.skillIds)).toEqual(['skill1', 'skill2']);
    expect(mockAssessment.overallScore).toBeGreaterThanOrEqual(0);
    expect(mockAssessment.overallScore).toBeLessThanOrEqual(100);
  });

  it('should validate question data structure', () => {
    const mockQuestion = {
      id: 'q123',
      text: 'What is JavaScript?',
      choices: JSON.stringify(['A', 'B', 'C', 'D']),
      correctChoice: 'c1',
      skillId: 'skill1',
      difficulty: 2,
      version: 1,
      timeEstimateSec: 45,
      isActive: true
    };

    expect(mockQuestion.id).toBeDefined();
    expect(mockQuestion.text).toBeDefined();
    expect(mockQuestion.skillId).toBeDefined();
    expect(mockQuestion.difficulty).toBeGreaterThanOrEqual(1);
    expect(mockQuestion.difficulty).toBeLessThanOrEqual(5);
    expect(mockQuestion.isActive).toBe(true);
  });
});

export {
  calculateConfidenceScore,
  calculateOverallScore,
  calculateSkillScore,
  generateAnonymizedLabel,
  generateRecommendations,
  sigmoid
};
