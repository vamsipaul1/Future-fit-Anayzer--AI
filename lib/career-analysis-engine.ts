// Comprehensive Career Analysis Engine
// This file contains the logic for matching user quiz responses to career roles

export interface CareerMatch {
  id: string;
  title: string;
  description: string;
  category: string;
  salary: { min: number; max: number; avg: number; currency: string };
  demand: number;
  growth: number;
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
  matchScore: number;
  matchReasons: string[];
  learningPath: string[];
  marketInsights: string[];
}

// Comprehensive Career Roles Database
const careerRolesDatabase: Record<string, any> = {
  'software_engineer': {
    id: 'software_engineer',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems',
    category: 'Technology',
    salary: { min: 70000, max: 150000, avg: 110000, currency: 'USD' },
    demand: 95,
    growth: 22,
    skills: {
      technical: ['Programming', 'System Design', 'Database Management', 'API Development'],
      soft: ['Problem Solving', 'Teamwork', 'Communication'],
      tools: ['Git', 'Docker', 'Cloud Platforms', 'IDEs']
    },
    experience: '2-5 years',
    education: ['Computer Science', 'Software Engineering', 'Related Field'],
    companies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
    industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce'],
    remote: true,
    matchCriteria: {
      tech_interest: 5,
      problem_solving: 5,
      analytical: 4,
      learning_style: 4,
      detail_oriented: 4,
      innovation: 4,
      teamwork: 4
    }
  },
  'data_scientist': {
    id: 'data_scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make informed decisions',
    category: 'Analytics',
    salary: { min: 80000, max: 160000, avg: 120000, currency: 'USD' },
    demand: 90,
    growth: 35,
    skills: {
      technical: ['Statistics', 'Machine Learning', 'Python/R', 'Data Visualization'],
      soft: ['Analytical Thinking', 'Communication', 'Problem Solving'],
      tools: ['SQL', 'TensorFlow', 'Tableau', 'Jupyter']
    },
    experience: '3-7 years',
    education: ['Data Science', 'Statistics', 'Computer Science', 'Mathematics'],
    companies: ['Netflix', 'Spotify', 'Uber', 'Airbnb', 'Tesla'],
    industries: ['Technology', 'Finance', 'Healthcare', 'Retail'],
    remote: true,
    matchCriteria: {
      analytical: 6,
      tech_interest: 4,
      problem_solving: 5,
      detail_oriented: 5,
      innovation: 4,
      learning_style: 4
    }
  },
  'product_manager': {
    id: 'product_manager',
    title: 'Product Manager',
    description: 'Lead product strategy and development from conception to launch',
    category: 'Management',
    salary: { min: 90000, max: 180000, avg: 135000, currency: 'USD' },
    demand: 85,
    growth: 18,
    skills: {
      technical: ['Product Strategy', 'Market Research', 'Analytics', 'User Research'],
      soft: ['Leadership', 'Communication', 'Strategic Thinking'],
      tools: ['Figma', 'Jira', 'Analytics Tools', 'CRM']
    },
    experience: '3-8 years',
    education: ['Business', 'Engineering', 'Design', 'Marketing'],
    companies: ['Apple', 'Google', 'Microsoft', 'Amazon', 'Meta'],
    industries: ['Technology', 'E-commerce', 'SaaS', 'Mobile'],
    remote: true,
    matchCriteria: {
      leadership: 5,
      communication: 5,
      innovation: 5,
      customer_focus: 5,
      analytical: 4,
      teamwork: 5
    }
  },
  'ux_designer': {
    id: 'ux_designer',
    title: 'UX Designer',
    description: 'Create user-centered designs for digital products and services',
    category: 'Design',
    salary: { min: 65000, max: 130000, avg: 95000, currency: 'USD' },
    demand: 88,
    growth: 25,
    skills: {
      technical: ['User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
      soft: ['Empathy', 'Creativity', 'Communication'],
      tools: ['Figma', 'Sketch', 'Adobe XD', 'InVision']
    },
    experience: '2-6 years',
    education: ['Design', 'Psychology', 'Human-Computer Interaction', 'Fine Arts'],
    companies: ['Apple', 'Google', 'Microsoft', 'Airbnb', 'Spotify'],
    industries: ['Technology', 'E-commerce', 'SaaS', 'Mobile'],
    remote: true,
    matchCriteria: {
      creativity: 6,
      customer_focus: 5,
      communication: 4,
      detail_oriented: 4,
      innovation: 5,
      teamwork: 4
    }
  },
  'marketing_manager': {
    id: 'marketing_manager',
    title: 'Marketing Manager',
    description: 'Develop and execute marketing strategies to promote products and services',
    category: 'Marketing',
    salary: { min: 60000, max: 120000, avg: 85000, currency: 'USD' },
    demand: 82,
    growth: 15,
    skills: {
      technical: ['Digital Marketing', 'Analytics', 'Content Creation', 'SEO/SEM'],
      soft: ['Creativity', 'Communication', 'Strategic Thinking'],
      tools: ['Google Analytics', 'HubSpot', 'Social Media', 'Email Marketing']
    },
    experience: '3-7 years',
    education: ['Marketing', 'Business', 'Communications', 'Advertising'],
    companies: ['Coca-Cola', 'Nike', 'Apple', 'Google', 'Amazon'],
    industries: ['Retail', 'Technology', 'Healthcare', 'Entertainment'],
    remote: true,
    matchCriteria: {
      communication: 5,
      creativity: 5,
      customer_focus: 5,
      innovation: 4,
      teamwork: 4,
      leadership: 4
    }
  },
  'financial_analyst': {
    id: 'financial_analyst',
    title: 'Financial Analyst',
    description: 'Analyze financial data to help organizations make investment decisions',
    category: 'Finance',
    salary: { min: 55000, max: 110000, avg: 80000, currency: 'USD' },
    demand: 78,
    growth: 12,
    skills: {
      technical: ['Financial Modeling', 'Excel', 'SQL', 'Risk Analysis'],
      soft: ['Analytical Thinking', 'Attention to Detail', 'Communication'],
      tools: ['Excel', 'Bloomberg', 'Tableau', 'Python']
    },
    experience: '2-5 years',
    education: ['Finance', 'Economics', 'Accounting', 'Business'],
    companies: ['Goldman Sachs', 'JPMorgan', 'Morgan Stanley', 'BlackRock', 'Vanguard'],
    industries: ['Banking', 'Investment', 'Insurance', 'Corporate'],
    remote: false,
    matchCriteria: {
      analytical: 6,
      detail_oriented: 5,
      stress_management: 4,
      learning_style: 3,
      risk_taking: 3,
      work_life_balance: 4
    }
  },
  'project_manager': {
    id: 'project_manager',
    title: 'Project Manager',
    description: 'Plan, execute, and oversee projects to ensure successful completion',
    category: 'Management',
    salary: { min: 70000, max: 140000, avg: 105000, currency: 'USD' },
    demand: 80,
    growth: 16,
    skills: {
      technical: ['Project Planning', 'Risk Management', 'Budgeting', 'Agile/Scrum'],
      soft: ['Leadership', 'Organization', 'Communication'],
      tools: ['Jira', 'Asana', 'Microsoft Project', 'Slack']
    },
    experience: '3-8 years',
    education: ['Business', 'Engineering', 'Management', 'Related Field'],
    companies: ['Microsoft', 'IBM', 'Accenture', 'Deloitte', 'PwC'],
    industries: ['Technology', 'Consulting', 'Construction', 'Healthcare'],
    remote: true,
    matchCriteria: {
      leadership: 5,
      communication: 5,
      stress_management: 4,
      teamwork: 5,
      detail_oriented: 4,
      deadline_pressure: 4
    }
  },
  'sales_manager': {
    id: 'sales_manager',
    title: 'Sales Manager',
    description: 'Lead sales teams and develop strategies to achieve revenue targets',
    category: 'Sales',
    salary: { min: 65000, max: 150000, avg: 100000, currency: 'USD' },
    demand: 75,
    growth: 14,
    skills: {
      technical: ['Sales Strategy', 'CRM Management', 'Market Analysis', 'Lead Generation'],
      soft: ['Persuasion', 'Leadership', 'Communication'],
      tools: ['Salesforce', 'HubSpot', 'LinkedIn', 'Email Tools']
    },
    experience: '3-8 years',
    education: ['Business', 'Marketing', 'Sales', 'Related Field'],
    companies: ['Salesforce', 'HubSpot', 'Microsoft', 'Oracle', 'SAP'],
    industries: ['Technology', 'SaaS', 'Enterprise', 'B2B'],
    remote: true,
    matchCriteria: {
      communication: 6,
      leadership: 5,
      customer_focus: 6,
      stress_management: 4,
      risk_taking: 4,
      teamwork: 5
    }
  },
  'devops_engineer': {
    id: 'devops_engineer',
    title: 'DevOps Engineer',
    description: 'Bridge development and operations to improve deployment and infrastructure',
    category: 'Technology',
    salary: { min: 80000, max: 160000, avg: 125000, currency: 'USD' },
    demand: 92,
    growth: 28,
    skills: {
      technical: ['CI/CD', 'Cloud Computing', 'Containerization', 'Infrastructure as Code'],
      soft: ['Problem Solving', 'Collaboration', 'Automation Mindset'],
      tools: ['Docker', 'Kubernetes', 'AWS/Azure', 'Jenkins']
    },
    experience: '3-7 years',
    education: ['Computer Science', 'Engineering', 'IT', 'Related Field'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Netflix', 'Spotify'],
    industries: ['Technology', 'Cloud', 'SaaS', 'E-commerce'],
    remote: true,
    matchCriteria: {
      tech_interest: 6,
      problem_solving: 5,
      analytical: 4,
      learning_style: 4,
      detail_oriented: 4,
      innovation: 4
    }
  },
  'business_analyst': {
    id: 'business_analyst',
    title: 'Business Analyst',
    description: 'Analyze business processes and recommend improvements',
    category: 'Business',
    salary: { min: 60000, max: 120000, avg: 85000, currency: 'USD' },
    demand: 85,
    growth: 20,
    skills: {
      technical: ['Process Analysis', 'Data Analysis', 'Requirements Gathering', 'Documentation'],
      soft: ['Communication', 'Problem Solving', 'Stakeholder Management'],
      tools: ['Excel', 'Visio', 'SQL', 'Power BI']
    },
    experience: '2-6 years',
    education: ['Business', 'Economics', 'Management', 'Related Field'],
    companies: ['McKinsey', 'BCG', 'Deloitte', 'Accenture', 'IBM'],
    industries: ['Consulting', 'Technology', 'Finance', 'Healthcare'],
    remote: true,
    matchCriteria: {
      analytical: 5,
      communication: 5,
      problem_solving: 5,
      detail_oriented: 4,
      customer_focus: 4,
      teamwork: 4
    }
  },
  'cybersecurity_analyst': {
    id: 'cybersecurity_analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats and security breaches',
    category: 'Security',
    salary: { min: 70000, max: 140000, avg: 105000, currency: 'USD' },
    demand: 88,
    growth: 32,
    skills: {
      technical: ['Security Analysis', 'Incident Response', 'Risk Assessment', 'Penetration Testing'],
      soft: ['Attention to Detail', 'Problem Solving', 'Communication'],
      tools: ['SIEM', 'Wireshark', 'Nmap', 'Metasploit']
    },
    experience: '2-6 years',
    education: ['Cybersecurity', 'Computer Science', 'IT', 'Related Field'],
    companies: ['CrowdStrike', 'Palo Alto Networks', 'FireEye', 'IBM', 'Microsoft'],
    industries: ['Technology', 'Finance', 'Healthcare', 'Government'],
    remote: true,
    matchCriteria: {
      tech_interest: 5,
      analytical: 5,
      detail_oriented: 6,
      problem_solving: 5,
      stress_management: 4,
      learning_style: 4
    }
  },
  'machine_learning_engineer': {
    id: 'machine_learning_engineer',
    title: 'Machine Learning Engineer',
    description: 'Design and implement machine learning systems and algorithms',
    category: 'AI/ML',
    salary: { min: 90000, max: 180000, avg: 135000, currency: 'USD' },
    demand: 95,
    growth: 40,
    skills: {
      technical: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow'],
      soft: ['Problem Solving', 'Research', 'Communication'],
      tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'AWS']
    },
    experience: '3-8 years',
    education: ['Computer Science', 'AI/ML', 'Mathematics', 'Statistics'],
    companies: ['Google', 'OpenAI', 'Tesla', 'NVIDIA', 'Meta'],
    industries: ['Technology', 'Automotive', 'Healthcare', 'Finance'],
    remote: true,
    matchCriteria: {
      tech_interest: 6,
      analytical: 6,
      problem_solving: 6,
      innovation: 6,
      learning_style: 5,
      detail_oriented: 5
    }
  },
  'cloud_architect': {
    id: 'cloud_architect',
    title: 'Cloud Architect',
    description: 'Design and implement cloud infrastructure and solutions',
    category: 'Cloud',
    salary: { min: 100000, max: 200000, avg: 150000, currency: 'USD' },
    demand: 90,
    growth: 25,
    skills: {
      technical: ['Cloud Architecture', 'AWS/Azure/GCP', 'DevOps', 'Infrastructure'],
      soft: ['Strategic Thinking', 'Communication', 'Leadership'],
      tools: ['AWS', 'Azure', 'GCP', 'Terraform']
    },
    experience: '5-10 years',
    education: ['Computer Science', 'Engineering', 'IT', 'Related Field'],
    companies: ['Amazon', 'Microsoft', 'Google', 'IBM', 'Oracle'],
    industries: ['Technology', 'Cloud', 'Enterprise', 'SaaS'],
    remote: true,
    matchCriteria: {
      tech_interest: 6,
      leadership: 5,
      analytical: 5,
      innovation: 5,
      problem_solving: 5,
      learning_style: 4
    }
  },
  'digital_marketing_specialist': {
    id: 'digital_marketing_specialist',
    title: 'Digital Marketing Specialist',
    description: 'Execute digital marketing campaigns across various channels',
    category: 'Marketing',
    salary: { min: 50000, max: 100000, avg: 75000, currency: 'USD' },
    demand: 85,
    growth: 18,
    skills: {
      technical: ['SEO/SEM', 'Social Media', 'Email Marketing', 'Analytics'],
      soft: ['Creativity', 'Communication', 'Analytical Thinking'],
      tools: ['Google Analytics', 'Facebook Ads', 'HubSpot', 'Mailchimp']
    },
    experience: '2-5 years',
    education: ['Marketing', 'Communications', 'Business', 'Related Field'],
    companies: ['HubSpot', 'Mailchimp', 'Hootsuite', 'Buffer', 'Sprout Social'],
    industries: ['Technology', 'E-commerce', 'SaaS', 'Retail'],
    remote: true,
    matchCriteria: {
      communication: 5,
      creativity: 5,
      customer_focus: 5,
      analytical: 4,
      innovation: 4,
      teamwork: 4
    }
  },
  'content_manager': {
    id: 'content_manager',
    title: 'Content Manager',
    description: 'Create and manage content strategy across digital platforms',
    category: 'Content',
    salary: { min: 55000, max: 110000, avg: 80000, currency: 'USD' },
    demand: 80,
    growth: 16,
    skills: {
      technical: ['Content Strategy', 'SEO', 'CMS', 'Analytics'],
      soft: ['Creativity', 'Communication', 'Writing'],
      tools: ['WordPress', 'HubSpot', 'Google Analytics', 'Canva']
    },
    experience: '2-6 years',
    education: ['Communications', 'Journalism', 'Marketing', 'English'],
    companies: ['HubSpot', 'Contentful', 'WordPress', 'Squarespace', 'Wix'],
    industries: ['Technology', 'Media', 'E-commerce', 'SaaS'],
    remote: true,
    matchCriteria: {
      creativity: 6,
      communication: 6,
      customer_focus: 4,
      innovation: 4,
      teamwork: 4,
      learning_style: 4
    }
  },
  'hr_specialist': {
    id: 'hr_specialist',
    title: 'HR Specialist',
    description: 'Manage human resources functions including recruitment and employee relations',
    category: 'Human Resources',
    salary: { min: 50000, max: 95000, avg: 70000, currency: 'USD' },
    demand: 75,
    growth: 14,
    skills: {
      technical: ['HRIS', 'Recruitment', 'Employee Relations', 'Compliance'],
      soft: ['Communication', 'Empathy', 'Organization'],
      tools: ['Workday', 'BambooHR', 'LinkedIn', 'Indeed']
    },
    experience: '2-6 years',
    education: ['Human Resources', 'Psychology', 'Business', 'Related Field'],
    companies: ['Workday', 'BambooHR', 'ADP', 'Paychex', 'Gusto'],
    industries: ['Technology', 'Healthcare', 'Finance', 'Retail'],
    remote: true,
    matchCriteria: {
      communication: 6,
      teamwork: 5,
      mentoring: 5,
      work_life_balance: 5,
      customer_focus: 4,
      leadership: 4
    }
  },
  'operations_manager': {
    id: 'operations_manager',
    title: 'Operations Manager',
    description: 'Oversee daily operations and improve business processes',
    category: 'Operations',
    salary: { min: 65000, max: 130000, avg: 95000, currency: 'USD' },
    demand: 78,
    growth: 15,
    skills: {
      technical: ['Process Improvement', 'Operations', 'Supply Chain', 'Analytics'],
      soft: ['Leadership', 'Organization', 'Problem Solving'],
      tools: ['ERP', 'Excel', 'Power BI', 'Tableau']
    },
    experience: '3-8 years',
    education: ['Business', 'Operations', 'Engineering', 'Management'],
    companies: ['Amazon', 'Walmart', 'FedEx', 'UPS', 'DHL'],
    industries: ['Manufacturing', 'Logistics', 'Retail', 'Technology'],
    remote: false,
    matchCriteria: {
      leadership: 5,
      analytical: 5,
      problem_solving: 5,
      detail_oriented: 4,
      teamwork: 5,
      stress_management: 4
    }
  },
  'consultant': {
    id: 'consultant',
    title: 'Management Consultant',
    description: 'Provide strategic advice to organizations on business challenges',
    category: 'Consulting',
    salary: { min: 80000, max: 200000, avg: 140000, currency: 'USD' },
    demand: 82,
    growth: 20,
    skills: {
      technical: ['Strategy', 'Analysis', 'Problem Solving', 'Presentation'],
      soft: ['Communication', 'Leadership', 'Strategic Thinking'],
      tools: ['PowerPoint', 'Excel', 'Tableau', 'Power BI']
    },
    experience: '2-8 years',
    education: ['Business', 'Economics', 'Engineering', 'MBA'],
    companies: ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'PwC'],
    industries: ['Consulting', 'Finance', 'Technology', 'Healthcare'],
    remote: false,
    matchCriteria: {
      analytical: 6,
      communication: 6,
      leadership: 5,
      problem_solving: 6,
      innovation: 5,
      travel_preference: 4
    }
  }
};

export class CareerAnalysisEngine {
  analyzeCareerMatch(answers: Record<string, number>): CareerMatch[] {
    const roleScores: Record<string, number> = {};
    const roleReasons: Record<string, string[]> = {};
    
    // Initialize scores
    Object.keys(careerRolesDatabase).forEach(roleId => {
      roleScores[roleId] = 0;
      roleReasons[roleId] = [];
    });
    
    // Calculate match scores
    Object.entries(answers).forEach(([questionId, rating]) => {
      Object.entries(careerRolesDatabase).forEach(([roleId, role]) => {
        const criteria = role.matchCriteria[questionId as keyof typeof role.matchCriteria];
        if (criteria) {
          // Calculate similarity score
          const difference = Math.abs(rating - criteria);
          let similarity = 0;
          
          if (difference === 0) {
            similarity = 1;
            roleReasons[roleId].push(`Perfect match for ${questionId.replace('_', ' ')}`);
          } else if (difference === 1) {
            similarity = 0.8;
            roleReasons[roleId].push(`Strong match for ${questionId.replace('_', ' ')}`);
          } else if (difference === 2) {
            similarity = 0.6;
            roleReasons[roleId].push(`Good match for ${questionId.replace('_', ' ')}`);
          } else if (difference <= 3) {
            similarity = 0.4;
          }
          
          roleScores[roleId] += similarity * (criteria / 6) * 10;
        }
      });
    });
    
    // Convert to percentage and sort
    const totalQuestions = Object.keys(answers).length;
    const results = Object.entries(roleScores).map(([roleId, score]) => {
      const role = careerRolesDatabase[roleId];
      const matchScore = Math.round((score / (totalQuestions * 10)) * 100);
      
      return {
        ...role,
        matchScore,
        matchReasons: roleReasons[roleId].slice(0, 3), // Top 3 reasons
        learningPath: [
          'Complete relevant certifications',
          'Build portfolio projects',
          'Network with industry professionals',
          'Apply for entry-level positions'
        ],
        marketInsights: [
          `${role.title} roles are in ${matchScore > 80 ? 'extremely high' : matchScore > 60 ? 'high' : 'moderate'} demand`,
          `Expected growth: ${role.growth}% annually`,
          `Average salary: $${role.salary.avg.toLocaleString()}`
        ]
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
    
    return results.filter(role => role.matchScore > 30); // Only return roles with >30% match
  }
}

export const careerAnalysisEngine = new CareerAnalysisEngine();
