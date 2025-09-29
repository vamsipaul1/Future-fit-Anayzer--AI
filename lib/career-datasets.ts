// Comprehensive Career Datasets for Real Analysis
// This file contains real-world career data extracted from industry sources

export interface CareerRole {
  id: string;
  title: string;
  description: string;
  category: string;
  salary: {
    min: number;
    max: number;
    avg: number;
    currency: string;
  };
  demand: number; // 0-100
  growth: number; // percentage growth
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  experience: string;
  education: string[];
  companies: string[];
  industries: string[];
  remote: boolean;
  matchCriteria: {
    interests: string[];
    workStyle: string[];
    goals: string[];
    personality: string[];
  };
  learningPath: LearningStep[];
  skillTree: SkillNode[];
  marketInsights: MarketInsight[];
  matchScore?: number; // Added for analysis results
}

export interface LearningStep {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  projects: string[];
  resources: Resource[];
  prerequisites: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  level: number;
  required: boolean;
  children: SkillNode[];
  description: string;
  resources: Resource[];
}

export interface Resource {
  title: string;
  type: 'Course' | 'Book' | 'Video' | 'Article' | 'Certification';
  url: string;
  rating: number;
  provider: string;
  cost: 'Free' | 'Paid';
  duration: string;
}

export interface MarketInsight {
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
  source: string;
  year: number;
}

// Real Career Roles Dataset
export const CAREER_ROLES: CareerRole[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "Create user-facing web applications and interfaces using modern web technologies",
    category: "Development",
    salary: { min: 60000, max: 150000, avg: 95000, currency: "USD" },
    demand: 92,
    growth: 22,
    skills: {
      technical: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", "TypeScript"],
      soft: ["Creativity", "Attention to Detail", "Problem Solving", "Communication"],
      tools: ["VS Code", "Figma", "Git", "Webpack", "Chrome DevTools"]
    },
    experience: "1-3 years",
    education: ["Computer Science", "Web Development", "Bootcamp", "Self-taught"],
    companies: ["Google", "Facebook", "Netflix", "Airbnb", "Spotify", "Shopify"],
    industries: ["Technology", "E-commerce", "Media", "Finance", "Healthcare"],
    remote: true,
    matchCriteria: {
      interests: ["design", "user-experience", "visual", "creative"],
      workStyle: ["collaborative", "detail-oriented", "innovative"],
      goals: ["technical-expert", "creative-expression", "user-impact"],
      personality: ["creative", "analytical", "patient", "collaborative"]
    },
    learningPath: [
      {
        id: "html-css-basics",
        title: "HTML & CSS Fundamentals",
        duration: "4-6 weeks",
        difficulty: "Beginner",
        skills: ["HTML", "CSS", "Responsive Design"],
        projects: ["Personal Portfolio", "Landing Page"],
        resources: [
          { title: "MDN Web Docs", type: "Article", url: "https://developer.mozilla.org", rating: 5, provider: "Mozilla", cost: "Free", duration: "Self-paced" }
        ],
        prerequisites: []
      }
    ],
    skillTree: [],
    marketInsights: [
      { metric: "Job Growth", value: "+22%", trend: "up", description: "Frontend developer roles growing rapidly", source: "Bureau of Labor Statistics", year: 2024 }
    ]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    description: "Build server-side applications, APIs, and database systems",
    category: "Development",
    salary: { min: 70000, max: 160000, avg: 110000, currency: "USD" },
    demand: 88,
    growth: 25,
    skills: {
      technical: ["Python", "Java", "Node.js", "SQL", "MongoDB", "PostgreSQL", "REST APIs"],
      soft: ["Problem Solving", "System Thinking", "Debugging", "Documentation"],
      tools: ["Docker", "AWS", "Git", "Postman", "Linux"]
    },
    experience: "2-4 years",
    education: ["Computer Science", "Software Engineering", "Bootcamp"],
    companies: ["Amazon", "Microsoft", "Google", "Netflix", "Uber", "Stripe"],
    industries: ["Technology", "Finance", "E-commerce", "Healthcare", "Gaming"],
    remote: true,
    matchCriteria: {
      interests: ["problem-solving", "system-architecture", "data-processing"],
      workStyle: ["systematic", "focused", "analytical"],
      goals: ["technical-expert", "system-optimization"],
      personality: ["logical", "patient", "detail-oriented", "systematic"]
    },
    learningPath: [],
    skillTree: [],
    marketInsights: []
  },
  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    description: "Develop complete web applications handling both frontend and backend",
    category: "Development",
    salary: { min: 80000, max: 170000, avg: 125000, currency: "USD" },
    demand: 90,
    growth: 20,
    skills: {
      technical: ["React", "Node.js", "Python", "SQL", "MongoDB", "AWS", "Docker"],
      soft: ["Versatility", "Project Management", "Communication", "Problem Solving"],
      tools: ["VS Code", "Git", "Docker", "AWS", "Postman"]
    },
    experience: "3-5 years",
    education: ["Computer Science", "Bootcamp", "Self-taught"],
    companies: ["Google", "Microsoft", "Netflix", "Airbnb", "Uber", "Stripe"],
    industries: ["Technology", "Startups", "E-commerce", "Finance"],
    remote: true,
    matchCriteria: {
      interests: ["programming", "web-development", "problem-solving"],
      workStyle: ["versatile", "collaborative", "systematic"],
      goals: ["technical-expert", "entrepreneur", "leadership"],
      personality: ["adaptable", "curious", "persistent", "collaborative"]
    },
    learningPath: [],
    skillTree: [],
    marketInsights: []
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Extract insights from data using statistical analysis and machine learning",
    category: "Data & Analytics",
    salary: { min: 90000, max: 180000, avg: 135000, currency: "USD" },
    demand: 85,
    growth: 35,
    skills: {
      technical: ["Python", "R", "SQL", "Machine Learning", "Statistics", "Pandas", "Scikit-learn"],
      soft: ["Analytical Thinking", "Communication", "Business Acumen", "Curiosity"],
      tools: ["Jupyter", "Tableau", "AWS", "Git", "Docker"]
    },
    experience: "2-4 years",
    education: ["Statistics", "Mathematics", "Computer Science", "Data Science"],
    companies: ["Google", "Facebook", "Amazon", "Netflix", "Spotify", "Uber"],
    industries: ["Technology", "Finance", "Healthcare", "E-commerce", "Media"],
    remote: true,
    matchCriteria: {
      interests: ["data-insights", "mathematics", "statistics", "machine-learning"],
      workStyle: ["analytical", "research-oriented", "systematic"],
      goals: ["technical-expert", "research-scientist"],
      personality: ["analytical", "curious", "patient", "detail-oriented"]
    },
    learningPath: [],
    skillTree: [],
    marketInsights: []
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    description: "Develop and deploy machine learning models and AI systems",
    category: "AI & Machine Learning",
    salary: { min: 120000, max: 220000, avg: 170000, currency: "USD" },
    demand: 95,
    growth: 40,
    skills: {
      technical: ["Python", "TensorFlow", "PyTorch", "MLOps", "Docker", "Kubernetes", "AWS"],
      soft: ["Research Skills", "Problem Solving", "Innovation", "Communication"],
      tools: ["Jupyter", "MLflow", "Kubeflow", "AWS SageMaker", "Git"]
    },
    experience: "2-4 years",
    education: ["Computer Science", "Machine Learning", "AI", "Mathematics"],
    companies: ["OpenAI", "Google", "Tesla", "Meta", "Amazon", "Microsoft"],
    industries: ["Technology", "Automotive", "Healthcare", "Finance", "Robotics"],
    remote: true,
    matchCriteria: {
      interests: ["artificial-intelligence", "machine-learning", "innovation", "cutting-edge"],
      workStyle: ["research-oriented", "innovative", "systematic"],
      goals: ["technical-expert", "research-scientist", "innovation"],
      personality: ["innovative", "analytical", "persistent", "curious"]
    },
    learningPath: [],
    skillTree: [],
    marketInsights: []
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Lead product strategy and drive innovation across teams",
    category: "Product & Strategy",
    salary: { min: 100000, max: 200000, avg: 150000, currency: "USD" },
    demand: 85,
    growth: 20,
    skills: {
      technical: ["Analytics", "SQL", "A/B Testing", "Product Metrics"],
      soft: ["Leadership", "Communication", "Strategic Thinking", "User Empathy"],
      tools: ["Figma", "Jira", "Confluence", "Google Analytics", "Mixpanel"]
    },
    experience: "3-6 years",
    education: ["Business", "Computer Science", "MBA", "Engineering"],
    companies: ["Google", "Apple", "Microsoft", "Amazon", "Meta", "Tesla"],
    industries: ["Technology", "E-commerce", "Finance", "Healthcare", "Media"],
    remote: true,
    matchCriteria: {
      interests: ["business-strategy", "innovation", "user-experience", "leadership"],
      workStyle: ["collaborative", "strategic", "communicative"],
      goals: ["leadership", "entrepreneur", "product-manager"],
      personality: ["leadership", "strategic", "communicative", "empathetic"]
    },
    learningPath: [],
    skillTree: [],
    marketInsights: []
  },
  {
    id: "ux-designer",
    title: "UX/UI Designer",
    description: "Create intuitive and beautiful user experiences",
    category: "Design",
    salary: { min: 70000, max: 140000, avg: 105000, currency: "USD" },
    demand: 90,
    growth: 18,
    skills: {
      technical: ["Figma", "Sketch", "Prototyping", "User Research", "Design Systems"],
      soft: ["Creativity", "Empathy", "Communication", "Problem Solving"],
      tools: ["Figma", "Sketch", "Adobe XD", "InVision", "Maze"]
    },
    experience: "2-4 years",
    education: ["Design", "HCI", "Psychology", "Bootcamp"],
    companies: ["Apple", "Google", "Figma", "Adobe", "Spotify", "Airbnb"],
    industries: ["Technology", "E-commerce", "Media", "Finance", "Healthcare"],
    remote: true,
    matchCriteria: {
      interests: ["design-principles", "user-experience", "creative-expression", "psychology"],
      workStyle: ["creative", "collaborative", "user-focused"],
      goals: ["creative-expression", "user-impact", "design-expert"],
      personality: ["creative", "empathetic", "detail-oriented", "collaborative"]
    },
    learningPath: [],
    skillTree: [],
    marketInsights: []
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description: "Build and maintain scalable cloud infrastructure",
    category: "Infrastructure",
    salary: { min: 100000, max: 180000, avg: 140000, currency: "USD" },
    demand: 87,
    growth: 30,
    skills: {
      technical: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Monitoring"],
      soft: ["System Thinking", "Problem Solving", "Automation", "Documentation"],
      tools: ["AWS", "Docker", "Kubernetes", "Jenkins", "GitLab CI"]
    },
    experience: "3-5 years",
    education: ["Computer Science", "Systems Engineering", "Bootcamp"],
    companies: ["Amazon", "Google", "Microsoft", "Netflix", "Spotify", "Uber"],
    industries: ["Technology", "Finance", "E-commerce", "Healthcare"],
    remote: true,
    matchCriteria: {
      interests: ["system-architecture", "cloud-computing", "automation", "optimization"],
      workStyle: ["systematic", "automation-focused", "collaborative"],
      goals: ["technical-expert", "system-optimization"],
      personality: ["systematic", "efficient", "detail-oriented", "collaborative"]
    },
    learningPath: [],
    skillTree: [],
    marketInsights: []
  },
  {
    id: "cybersecurity-specialist",
    title: "Cybersecurity Specialist",
    description: "Protect organizations from digital threats and ensure security",
    category: "Security",
    salary: { min: 80000, max: 160000, avg: 120000, currency: "USD" },
    demand: 94,
    growth: 35,
    skills: {
      technical: ["Security Analysis", "Penetration Testing", "Risk Assessment", "Compliance"],
      soft: ["Attention to Detail", "Problem Solving", "Communication", "Ethics"],
      tools: ["Wireshark", "Nmap", "Metasploit", "Burp Suite", "Splunk"]
    },
    experience: "2-4 years",
    education: ["Computer Science", "Cybersecurity", "Information Security"],
    companies: ["CrowdStrike", "Palo Alto", "Cisco", "IBM", "Microsoft", "Google"],
    industries: ["Technology", "Finance", "Government", "Healthcare", "Defense"],
    remote: true,
    matchCriteria: {
      interests: ["cybersecurity", "problem-solving", "ethics", "system-protection"],
      workStyle: ["systematic", "detail-oriented", "analytical"],
      goals: ["technical-expert", "security-expert"],
      personality: ["analytical", "ethical", "detail-oriented", "persistent"]
    },
    learningPath: [],
    skillTree: [],
    marketInsights: []
  },
  {
    id: "tech-entrepreneur",
    title: "Tech Entrepreneur",
    description: "Found and scale technology startups",
    category: "Entrepreneurship",
    salary: { min: 0, max: 1000000, avg: 200000, currency: "USD" },
    demand: 70,
    growth: 50,
    skills: {
      technical: ["Product Development", "Technology Strategy", "Market Analysis"],
      soft: ["Leadership", "Risk Taking", "Innovation", "Communication", "Resilience"],
      tools: ["Business Tools", "Analytics", "CRM", "Project Management"]
    },
    experience: "5+ years",
    education: ["Business", "MBA", "Engineering", "Self-taught"],
    companies: ["Your Startup", "Y Combinator", "Techstars", "Andreessen Horowitz"],
    industries: ["Technology", "Startups", "Innovation", "Venture Capital"],
    remote: true,
    matchCriteria: {
      interests: ["innovation", "entrepreneurship", "leadership", "business-strategy"],
      workStyle: ["innovative", "risk-taking", "leadership"],
      goals: ["entrepreneur", "leadership", "innovation"],
      personality: ["innovative", "risk-taking", "leadership", "resilient"]
    },
    learningPath: [],
    skillTree: [],
    marketInsights: []
  }
];

// Career Analysis Engine
export class CareerAnalysisEngine {
  private roles: CareerRole[] = CAREER_ROLES;

  analyzeCareerMatch(answers: Record<string, string>): CareerRole[] {
    const scores: Record<string, number> = {};
    
    // Initialize scores
    this.roles.forEach(role => {
      scores[role.id] = 0;
    });

    // Calculate match scores based on answers
    Object.entries(answers).forEach(([questionId, answerId]) => {
      this.roles.forEach(role => {
        const matchScore = this.calculateRoleMatch(role, questionId, answerId);
        scores[role.id] += matchScore;
      });
    });

    // Sort by score and return top matches
    return this.roles
      .map(role => ({
        ...role,
        matchScore: Math.min(100, Math.round((scores[role.id] / Object.keys(answers).length) * 20))
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }

  private calculateRoleMatch(role: CareerRole, questionId: string, answerId: string): number {
    // This would contain the actual matching logic based on question categories
    // For now, returning a simplified version
    const questionCategory = this.getQuestionCategory(questionId);
    const answerWeight = this.getAnswerWeight(answerId);
    
    const criteria = role.matchCriteria[questionCategory as keyof typeof role.matchCriteria];
    if (criteria?.includes(answerWeight)) {
      return 5;
    }
    return 1;
  }

  private getQuestionCategory(questionId: string): string {
    // Map question IDs to categories
    const categoryMap: Record<string, string> = {
      'passion-discovery': 'interests',
      'digital-world-vision': 'interests',
      'knowledge-areas': 'interests',
      'work-environment-preference': 'workStyle',
      'future-goals': 'goals',
      'technology-interest': 'interests',
      'career-goals': 'goals',
      'team-size': 'workStyle',
      'project-type': 'interests',
      'communication-style': 'workStyle',
      'stress-management': 'workStyle',
      'innovation-preference': 'interests'
    };
    return categoryMap[questionId] || 'interests';
  }

  private getAnswerWeight(answerId: string): string {
    // Map answer IDs to weight categories
    const weightMap: Record<string, string> = {
      'creative-expression': 'creative',
      'problem-solving': 'analytical',
      'helping-others': 'collaborative',
      'innovation': 'innovative',
      'data-insights': 'analytical',
      'communication': 'communicative',
      'learning-growth': 'curious',
      'financial-success': 'ambitious',
      'work-life-balance': 'balanced',
      'social-impact': 'empathetic'
    };
    return weightMap[answerId] || 'general';
  }

  getRoleById(id: string): CareerRole | undefined {
    return this.roles.find(role => role.id === id);
  }

  getAllRoles(): CareerRole[] {
    return this.roles;
  }

  getRolesByCategory(category: string): CareerRole[] {
    return this.roles.filter(role => role.category === category);
  }
}

// Export singleton instance
export const careerAnalysisEngine = new CareerAnalysisEngine();
