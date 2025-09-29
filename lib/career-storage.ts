// Career Data Storage System
// Simple file-based storage for career analysis results

import fs from 'fs';
import path from 'path';

export interface CareerAnalysisResult {
  id: string;
  userId: string;
  timestamp: Date;
  answers: Record<string, string>;
  recommendedRoles: Array<{
    id: string;
    title: string;
    matchScore: number;
    reasoning: string;
  }>;
  analysisData: {
    totalQuestions: number;
    completionTime: number;
    userPreferences: string[];
  };
}

export class CareerDataStorage {
  private dataDir: string;
  private resultsFile: string;

  constructor() {
    this.dataDir = path.join(process.cwd(), 'data', 'career-analysis');
    this.resultsFile = path.join(this.dataDir, 'career-results.json');
    this.ensureDataDirectory();
  }

  private ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private loadResults(): CareerAnalysisResult[] {
    try {
      if (fs.existsSync(this.resultsFile)) {
        const data = fs.readFileSync(this.resultsFile, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading career results:', error);
    }
    return [];
  }

  private saveResults(results: CareerAnalysisResult[]) {
    try {
      fs.writeFileSync(this.resultsFile, JSON.stringify(results, null, 2));
    } catch (error) {
      console.error('Error saving career results:', error);
    }
  }

  saveAnalysisResult(result: CareerAnalysisResult): void {
    const results = this.loadResults();
    results.push(result);
    this.saveResults(results);
  }

  getAnalysisResults(userId?: string): CareerAnalysisResult[] {
    const results = this.loadResults();
    if (userId) {
      return results.filter(result => result.userId === userId);
    }
    return results;
  }

  getAnalysisResult(id: string): CareerAnalysisResult | undefined {
    const results = this.loadResults();
    return results.find(result => result.id === id);
  }

  // Analytics methods
  getPopularRoles(): Array<{ role: string; count: number; avgScore: number }> {
    const results = this.loadResults();
    const roleStats: Record<string, { count: number; totalScore: number }> = {};

    results.forEach(result => {
      result.recommendedRoles.forEach(role => {
        if (!roleStats[role.title]) {
          roleStats[role.title] = { count: 0, totalScore: 0 };
        }
        roleStats[role.title].count++;
        roleStats[role.title].totalScore += role.matchScore;
      });
    });

    return Object.entries(roleStats)
      .map(([role, stats]) => ({
        role,
        count: stats.count,
        avgScore: Math.round(stats.totalScore / stats.count)
      }))
      .sort((a, b) => b.count - a.count);
  }

  getAnswerPatterns(): Record<string, Record<string, number>> {
    const results = this.loadResults();
    const patterns: Record<string, Record<string, number>> = {};

    results.forEach(result => {
      Object.entries(result.answers).forEach(([questionId, answerId]) => {
        if (!patterns[questionId]) {
          patterns[questionId] = {};
        }
        patterns[questionId][answerId] = (patterns[questionId][answerId] || 0) + 1;
      });
    });

    return patterns;
  }

  getCompletionStats(): {
    totalAnalyses: number;
    avgCompletionTime: number;
    avgQuestionsAnswered: number;
  } {
    const results = this.loadResults();
    
    if (results.length === 0) {
      return { totalAnalyses: 0, avgCompletionTime: 0, avgQuestionsAnswered: 0 };
    }

    const totalCompletionTime = results.reduce((sum, result) => sum + result.analysisData.completionTime, 0);
    const totalQuestionsAnswered = results.reduce((sum, result) => sum + result.analysisData.totalQuestions, 0);

    return {
      totalAnalyses: results.length,
      avgCompletionTime: Math.round(totalCompletionTime / results.length),
      avgQuestionsAnswered: Math.round(totalQuestionsAnswered / results.length)
    };
  }

  // Export data for external analysis
  exportData(format: 'json' | 'csv' = 'json'): string {
    const results = this.loadResults();
    
    if (format === 'csv') {
      const headers = ['ID', 'User ID', 'Timestamp', 'Recommended Roles', 'Match Scores', 'Completion Time'];
      const rows = results.map(result => [
        result.id,
        result.userId,
        result.timestamp.toISOString(),
        result.recommendedRoles.map(r => r.title).join(';'),
        result.recommendedRoles.map(r => r.matchScore).join(';'),
        result.analysisData.completionTime
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
    
    return JSON.stringify(results, null, 2);
  }

  // Clean up old data
  cleanupOldData(daysToKeep: number = 90): void {
    const results = this.loadResults();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const filteredResults = results.filter(result => 
      new Date(result.timestamp) > cutoffDate
    );
    
    this.saveResults(filteredResults);
  }
}

// Singleton instance
export const careerDataStorage = new CareerDataStorage();

// API endpoints for career data
export async function saveCareerAnalysis(
  userId: string,
  answers: Record<string, string>,
  recommendedRoles: Array<{ id: string; title: string; matchScore: number; reasoning: string }>,
  completionTime: number
): Promise<string> {
  const result: CareerAnalysisResult = {
    id: `career_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    timestamp: new Date(),
    answers,
    recommendedRoles,
    analysisData: {
      totalQuestions: Object.keys(answers).length,
      completionTime,
      userPreferences: Object.values(answers)
    }
  };

  careerDataStorage.saveAnalysisResult(result);
  return result.id;
}

export async function getCareerAnalytics() {
  return {
    popularRoles: careerDataStorage.getPopularRoles(),
    answerPatterns: careerDataStorage.getAnswerPatterns(),
    completionStats: careerDataStorage.getCompletionStats()
  };
}
