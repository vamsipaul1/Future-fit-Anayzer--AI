import { Layers, Cpu, TrendingUp } from "lucide-react";

// Dummy User Data
export const DUMMY_USER_DATA = {
  userName: "Alex Johnson",
  lastAnalyzed: "2 days ago",
  resilienceScore: 85,
  growthRate: 25,
  skillsAnalyzed: 50,
};

// Dummy Assessment Report
export const DUMMY_ASSESSMENT_RESULT = {
  score: 65,
  skillComparison: [
    { name: "ReactJS", userScore: 85, industryAvg: 70, marketDemand: 95, skillDecay: 1.5, status: "Mastered" },
    { name: "Node.js", userScore: 60, industryAvg: 80, marketDemand: 80, skillDecay: 2.5, status: "Developing" },
  ],
  lackSkills: ["Microservices Deployment", "Cloud Security"],
  futureSkills: ["Generative AI", "Web3 Fundamentals"],
  recommendedPath: "Focus on Microservices and WebAssembly...",
};

// Dummy Quiz Questions
export const DUMMY_QUIZ_QUESTIONS = [
  { question: "What is WebAssembly used for?", options: ["CSS", "3D graphics", "Near-native speed", "DOM"], answer_index: 2 },
  { question: "What defines Microservices?", options: ["Monolith", "Tight coupling", "Independent scaling", "Shared DB"], answer_index: 2 },
];

// Career Quiz Questions
export const MOCK_CAREER_QUESTIONS = [
  { id: 1, text: "Where do you see yourself?", options: ["AI/LLM", "Cloud Infra", "Both"] },
];

// Dummy Career Path Result
export const DUMMY_CAREER_RESULT = {
  career: "Agentic Engineering Specialist",
  domain: "AI/ML Engineer",
  skills: ["Prompt Engineering 90%", "Vector DBs 85%", "LLM Deployment 70%", "Python 95%", "Multi-Agent 50%"],
  gap: "Multi-Agent Systems",
  rationale: "Strong Python & LLM background; improve orchestration.",
};

// Daily Focus
export const MOCK_DAILY_FOCUS = {
  title: "Mastering Async JS",
  subtitle: "Quick dive into Promises/Async/Await.",
  icon: "Zap",
  color: "bg-yellow-500",
  actionText: "Start 10-min Lesson",
};

// Gamified Milestones
export const MOCK_MILESTONES = [
  { title: "React Novice", achieved: true, color: "bg-blue-500", icon: Layers },
  { title: "Node.js Starter", achieved: true, color: "bg-green-500", icon: Cpu },
  { title: "Python Intermediate", achieved: false, color: "bg-gray-400", icon: TrendingUp },
];

// Domain Skills Mapping
export const DOMAIN_SKILLS_MAP: Record<string, { name: string; difficulty: string }[]> = {
  "Frontend Developer": [
    { name: "HTML5/CSS3", difficulty: "Beginner" },
    { name: "JavaScript/ES6+", difficulty: "Intermediate" },
    { name: "ReactJS/Vue/Angular", difficulty: "Advanced" },
  ],
  "Backend Developer": [
    { name: "Node.js/Express", difficulty: "Intermediate" },
    { name: "SQL (Postgres/MySQL)", difficulty: "Intermediate" },
  ],
};
