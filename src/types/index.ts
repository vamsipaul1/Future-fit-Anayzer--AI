// Types
export interface Skill {
  name: string;
  difficulty: string;
}

export interface FinalAnalysisResult {
  score: number;
  skillComparison: {
    name: string;
    userScore: number;
    industryAvg: number;
    marketDemand: number;
    skillDecay: number;
    status: string;
  }[];
  lackSkills: string[];
  futureSkills: string[];
  recommendedPath: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer_index: number;
}

export interface CareerResult {
  career: string;
  domain: string;
  skills: string[];
  gap: string;
  rationale: string;
}

export interface ResumeAnalysisResult {
  matchPercentage: number;
  topSkillsFound: string[];
  criticalSkillsMissing: string[];
  recommendation: string;
}

export interface DailyFocus {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  actionText: string;
}

export interface Milestone {
  title: string;
  achieved: boolean;
  color: string;
  icon: any; // LucideIcon type
}

export interface UserData {
  userName: string;
  lastAnalyzed: string;
  resilienceScore: number;
  growthRate: number;
  skillsAnalyzed: number;
}
