import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const domainsData = [
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud & Infrastructure',
    summary: 'Cloud computing, DevOps, and infrastructure management',
    roles: JSON.stringify([
      'Cloud Architect',
      'DevOps Engineer',
      'Site Reliability Engineer',
      'Infrastructure Engineer',
      'Cloud Security Engineer',
      'Platform Engineer'
    ])
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    summary: 'Information security, ethical hacking, and risk management',
    roles: JSON.stringify([
      'Security Engineer',
      'Penetration Tester',
      'Security Analyst',
      'Cybersecurity Consultant',
      'Information Security Manager',
      'Security Architect'
    ])
  },
  {
    slug: 'data-ai',
    name: 'Data & AI',
    summary: 'Machine learning, data science, and artificial intelligence roles',
    roles: JSON.stringify([
      'Data Scientist',
      'Machine Learning Engineer', 
      'AI Research Scientist',
      'Data Engineer',
      'MLOps Engineer',
      'Business Intelligence Analyst'
    ])
  },
  {
    slug: 'software-web',
    name: 'Software & Web Development',
    summary: 'Full-stack development and modern web technologies',
    roles: JSON.stringify([
      'Full-Stack Developer',
      'Frontend Developer',
      'Backend Developer',
      'Web Developer',
      'Software Engineer',
      'API Developer'
    ])
  },
  {
    slug: 'programming',
    name: 'Programming',
    summary: 'Core computer science and programming languages',
    roles: JSON.stringify([
      'Software Engineer',
      'Systems Programmer',
      'Algorithm Engineer',
      'Compiler Engineer',
      'Performance Engineer',
      'Technical Lead'
    ])
  },
  {
    slug: 'mobile-development',
    name: 'Mobile App Development',
    summary: 'iOS, Android, and cross-platform mobile development',
    roles: JSON.stringify([
      'Mobile Developer',
      'iOS Developer',
      'Android Developer',
      'React Native Developer',
      'Flutter Developer',
      'Mobile Architect'
    ])
  },
  {
    slug: 'product-management',
    name: 'Product & Management',
    summary: 'Product management, project management, and business strategy',
    roles: JSON.stringify([
      'Product Manager',
      'Project Manager',
      'Product Owner',
      'Business Analyst',
      'Scrum Master',
      'Technical Program Manager'
    ])
  },
  {
    slug: 'blockchain-web3',
    name: 'Blockchain & Web3',
    summary: 'Blockchain technology, smart contracts, and decentralized applications',
    roles: JSON.stringify([
      'Blockchain Developer',
      'Smart Contract Developer',
      'DeFi Developer',
      'Web3 Developer',
      'Blockchain Architect',
      'Cryptocurrency Analyst'
    ])
  },
  {
    slug: 'devops-automation',
    name: 'DevOps & Automation',
    summary: 'DevOps practices, automation, and infrastructure management',
    roles: JSON.stringify([
      'DevOps Engineer',
      'Automation Engineer',
      'Release Manager',
      'Infrastructure Engineer',
      'CI/CD Engineer',
      'Site Reliability Engineer'
    ])
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX & Design',
    summary: 'User interface design, user experience, and visual design',
    roles: JSON.stringify([
      'UI Designer',
      'UX Designer',
      'Product Designer',
      'Visual Designer',
      'Interaction Designer',
      'Design System Designer'
    ])
  },
  {
    slug: 'networking-systems',
    name: 'Networking & Systems',
    summary: 'Computer networks, operating systems, and system administration',
    roles: JSON.stringify([
      'Network Engineer',
      'Systems Administrator',
      'Network Security Engineer',
      'Infrastructure Engineer',
      'Systems Engineer',
      'Network Architect'
    ])
  },
  {
    slug: 'business-analytics',
    name: 'Business & Analytics',
    summary: 'Business intelligence, data analytics, and business strategy',
    roles: JSON.stringify([
      'Business Analyst',
      'Data Analyst',
      'Business Intelligence Analyst',
      'Market Research Analyst',
      'Operations Analyst',
      'Strategy Consultant'
    ])
  },
  {
    slug: 'game-development',
    name: 'Game Development',
    summary: 'Game design, development, and interactive entertainment',
    roles: JSON.stringify([
      'Game Developer',
      'Game Designer',
      'Game Programmer',
      'Game Artist',
      'Game Producer',
      'Technical Game Designer'
    ])
  }
];

const skillsData = [
  // Cloud & Infrastructure Skills
  { key: 'aws', name: 'AWS', description: 'Amazon Web Services cloud platform', level: 'INTERMEDIATE', domainSlug: 'cloud-infrastructure' },
  { key: 'azure', name: 'Azure', description: 'Microsoft cloud computing platform', level: 'INTERMEDIATE', domainSlug: 'cloud-infrastructure' },
  { key: 'gcp', name: 'Google Cloud Platform', description: 'Google cloud computing services', level: 'INTERMEDIATE', domainSlug: 'cloud-infrastructure' },
  { key: 'docker', name: 'Docker', description: 'Containerization platform', level: 'BEGINNER', domainSlug: 'cloud-infrastructure' },
  { key: 'kubernetes', name: 'Kubernetes', description: 'Container orchestration platform', level: 'ADVANCED', domainSlug: 'cloud-infrastructure' },
  { key: 'terraform', name: 'Terraform', description: 'Infrastructure as Code tool', level: 'INTERMEDIATE', domainSlug: 'cloud-infrastructure' },
  { key: 'ci-cd-pipelines', name: 'CI/CD Pipelines', description: 'Continuous Integration and Deployment', level: 'INTERMEDIATE', domainSlug: 'cloud-infrastructure' },
  { key: 'sre', name: 'Site Reliability Engineering', description: 'Ensuring system reliability and performance', level: 'ADVANCED', domainSlug: 'cloud-infrastructure' },

  // Cybersecurity Skills
  { key: 'network-security', name: 'Network Security', description: 'Protecting network infrastructure', level: 'INTERMEDIATE', domainSlug: 'cybersecurity' },
  { key: 'penetration-testing', name: 'Penetration Testing', description: 'Security testing and vulnerability assessment', level: 'ADVANCED', domainSlug: 'cybersecurity' },
  { key: 'cryptography', name: 'Cryptography', description: 'Encryption and security protocols', level: 'ADVANCED', domainSlug: 'cybersecurity' },
  { key: 'ethical-hacking', name: 'Ethical Hacking', description: 'Authorized security testing', level: 'ADVANCED', domainSlug: 'cybersecurity' },
  { key: 'siem', name: 'Security Information & Event Management', description: 'Security monitoring and incident response', level: 'INTERMEDIATE', domainSlug: 'cybersecurity' },
  { key: 'cloud-security', name: 'Cloud Security', description: 'Securing cloud infrastructure and applications', level: 'INTERMEDIATE', domainSlug: 'cybersecurity' },
  { key: 'iam', name: 'Identity & Access Management', description: 'Managing user identities and permissions', level: 'INTERMEDIATE', domainSlug: 'cybersecurity' },
  { key: 'threat-modeling', name: 'Threat Modeling', description: 'Identifying and analyzing security threats', level: 'ADVANCED', domainSlug: 'cybersecurity' },

  // Data & AI Skills
  { key: 'python-data-science', name: 'Python for Data Science', description: 'Python programming for data analysis', level: 'BEGINNER', domainSlug: 'data-ai' },
  { key: 'machine-learning', name: 'Machine Learning', description: 'Algorithms and models for predictive analytics', level: 'INTERMEDIATE', domainSlug: 'data-ai' },
  { key: 'deep-learning', name: 'Deep Learning', description: 'Neural networks and deep learning frameworks', level: 'ADVANCED', domainSlug: 'data-ai' },
  { key: 'nlp', name: 'Natural Language Processing', description: 'Processing and understanding human language', level: 'ADVANCED', domainSlug: 'data-ai' },
  { key: 'data-visualization', name: 'Data Visualization', description: 'Creating charts and dashboards', level: 'INTERMEDIATE', domainSlug: 'data-ai' },
  { key: 'sql-nosql', name: 'SQL & NoSQL Databases', description: 'Database querying and management', level: 'BEGINNER', domainSlug: 'data-ai' },
  { key: 'big-data', name: 'Big Data', description: 'Processing large datasets with Hadoop and Spark', level: 'ADVANCED', domainSlug: 'data-ai' },
  { key: 'mlops', name: 'MLOps', description: 'Machine Learning operations and deployment', level: 'ADVANCED', domainSlug: 'data-ai' },

  // Software & Web Development Skills
  { key: 'html-css-js', name: 'HTML / CSS / JavaScript', description: 'Web markup, styling, and scripting', level: 'BEGINNER', domainSlug: 'software-web' },
  { key: 'react', name: 'React.js', description: 'JavaScript library for building UIs', level: 'INTERMEDIATE', domainSlug: 'software-web' },
  { key: 'nextjs', name: 'Next.js', description: 'React framework for production', level: 'INTERMEDIATE', domainSlug: 'software-web' },
  { key: 'nodejs', name: 'Node.js', description: 'JavaScript runtime for backend development', level: 'INTERMEDIATE', domainSlug: 'software-web' },
  { key: 'express', name: 'Express.js', description: 'Web application framework for Node.js', level: 'INTERMEDIATE', domainSlug: 'software-web' },
  { key: 'rest-graphql', name: 'REST & GraphQL APIs', description: 'API design and development', level: 'INTERMEDIATE', domainSlug: 'software-web' },
  { key: 'prisma-orms', name: 'Prisma / ORMs', description: 'Database object-relational mapping', level: 'INTERMEDIATE', domainSlug: 'software-web' },
  { key: 'git-version-control', name: 'Git & Version Control', description: 'Source code management', level: 'BEGINNER', domainSlug: 'software-web' },

  // Programming Skills
  { key: 'c-programming', name: 'C Programming', description: 'System programming and low-level development', level: 'INTERMEDIATE', domainSlug: 'programming' },
  { key: 'cpp-programming', name: 'C++ Programming', description: 'Object-oriented system programming', level: 'INTERMEDIATE', domainSlug: 'programming' },
  { key: 'java', name: 'Java', description: 'Enterprise application development', level: 'INTERMEDIATE', domainSlug: 'programming' },
  { key: 'python-core', name: 'Python (Core & OOP)', description: 'General-purpose programming language', level: 'BEGINNER', domainSlug: 'programming' },
  { key: 'javascript-es6', name: 'JavaScript (ES6+)', description: 'Modern JavaScript features and syntax', level: 'INTERMEDIATE', domainSlug: 'programming' },
  { key: 'go', name: 'Go', description: 'Concurrent programming language', level: 'INTERMEDIATE', domainSlug: 'programming' },
  { key: 'rust', name: 'Rust', description: 'Memory-safe systems programming', level: 'ADVANCED', domainSlug: 'programming' },
  { key: 'dsa', name: 'Data Structures & Algorithms', description: 'Core computer science fundamentals', level: 'INTERMEDIATE', domainSlug: 'programming' },

  // Mobile App Development Skills
  { key: 'react-native', name: 'React Native', description: 'Cross-platform mobile development', level: 'INTERMEDIATE', domainSlug: 'mobile-development' },
  { key: 'flutter', name: 'Flutter', description: 'Google UI toolkit for mobile apps', level: 'INTERMEDIATE', domainSlug: 'mobile-development' },
  { key: 'swift', name: 'Swift (iOS)', description: 'iOS app development language', level: 'INTERMEDIATE', domainSlug: 'mobile-development' },
  { key: 'kotlin', name: 'Kotlin (Android)', description: 'Android app development language', level: 'INTERMEDIATE', domainSlug: 'mobile-development' },
  { key: 'firebase', name: 'Firebase Integration', description: 'Backend services for mobile apps', level: 'INTERMEDIATE', domainSlug: 'mobile-development' },
  { key: 'mobile-ui-ux', name: 'Mobile UI/UX Design', description: 'Designing mobile user interfaces', level: 'INTERMEDIATE', domainSlug: 'mobile-development' },
  { key: 'push-notifications', name: 'Push Notifications', description: 'Real-time messaging for mobile apps', level: 'INTERMEDIATE', domainSlug: 'mobile-development' },
  { key: 'app-deployment', name: 'App Deployment', description: 'Publishing apps to app stores', level: 'INTERMEDIATE', domainSlug: 'mobile-development' },

  // Product & Management Skills
  { key: 'agile-scrum', name: 'Agile & Scrum Methodologies', description: 'Iterative development frameworks', level: 'BEGINNER', domainSlug: 'product-management' },
  { key: 'jira-trello-asana', name: 'Jira / Trello / Asana', description: 'Project management tools', level: 'BEGINNER', domainSlug: 'product-management' },
  { key: 'stakeholder-management', name: 'Stakeholder Management', description: 'Managing relationships with stakeholders', level: 'INTERMEDIATE', domainSlug: 'product-management' },
  { key: 'product-roadmapping', name: 'Product Roadmapping', description: 'Planning product development timeline', level: 'INTERMEDIATE', domainSlug: 'product-management' },
  { key: 'requirement-analysis', name: 'Requirement Analysis', description: 'Analyzing and documenting requirements', level: 'INTERMEDIATE', domainSlug: 'product-management' },
  { key: 'business-analytics', name: 'Business Analytics', description: 'Using data for business decisions', level: 'INTERMEDIATE', domainSlug: 'product-management' },
  { key: 'risk-management', name: 'Risk Management', description: 'Identifying and mitigating project risks', level: 'INTERMEDIATE', domainSlug: 'product-management' },
  { key: 'technical-writing', name: 'Technical Writing', description: 'Documenting technical processes', level: 'INTERMEDIATE', domainSlug: 'product-management' },

  // Blockchain & Web3 Skills
  { key: 'solidity', name: 'Solidity', description: 'Smart contract programming language', level: 'ADVANCED', domainSlug: 'blockchain-web3' },
  { key: 'ethereum-polygon', name: 'Ethereum / Polygon', description: 'Blockchain platforms for dApps', level: 'ADVANCED', domainSlug: 'blockchain-web3' },
  { key: 'defi', name: 'DeFi Applications', description: 'Decentralized finance protocols', level: 'ADVANCED', domainSlug: 'blockchain-web3' },
  { key: 'nft-standards', name: 'NFT Standards', description: 'ERC-721, ERC-1155 token standards', level: 'ADVANCED', domainSlug: 'blockchain-web3' },
  { key: 'blockchain-security', name: 'Blockchain Security', description: 'Securing blockchain applications', level: 'ADVANCED', domainSlug: 'blockchain-web3' },
  { key: 'tokenomics', name: 'Tokenomics', description: 'Token economics and design', level: 'ADVANCED', domainSlug: 'blockchain-web3' },
  { key: 'hyperledger', name: 'Hyperledger Fabric', description: 'Enterprise blockchain platform', level: 'ADVANCED', domainSlug: 'blockchain-web3' },
  { key: 'web3-js', name: 'Web3.js / Ethers.js', description: 'JavaScript libraries for blockchain', level: 'ADVANCED', domainSlug: 'blockchain-web3' },

  // DevOps & Automation Skills
  { key: 'github-actions-jenkins', name: 'GitHub Actions / Jenkins', description: 'CI/CD automation tools', level: 'INTERMEDIATE', domainSlug: 'devops-automation' },
  { key: 'docker-swarm', name: 'Docker Swarm', description: 'Container orchestration', level: 'ADVANCED', domainSlug: 'devops-automation' },
  { key: 'ansible', name: 'Ansible', description: 'Configuration management tool', level: 'INTERMEDIATE', domainSlug: 'devops-automation' },
  { key: 'puppet-chef', name: 'Puppet / Chef', description: 'Infrastructure automation tools', level: 'ADVANCED', domainSlug: 'devops-automation' },
  { key: 'monitoring-prometheus', name: 'Monitoring (Prometheus, Grafana)', description: 'System monitoring and alerting', level: 'INTERMEDIATE', domainSlug: 'devops-automation' },
  { key: 'cloud-cost-optimization', name: 'Cloud Cost Optimization', description: 'Optimizing cloud spending', level: 'INTERMEDIATE', domainSlug: 'devops-automation' },
  { key: 'iac', name: 'Infrastructure as Code', description: 'Managing infrastructure with code', level: 'INTERMEDIATE', domainSlug: 'devops-automation' },
  { key: 'logging-observability', name: 'Logging & Observability', description: 'System observability and debugging', level: 'INTERMEDIATE', domainSlug: 'devops-automation' },

  // UI/UX & Design Skills
  { key: 'figma-adobe-xd', name: 'Figma / Adobe XD', description: 'UI/UX design tools', level: 'BEGINNER', domainSlug: 'ui-ux-design' },
  { key: 'wireframing-prototyping', name: 'Wireframing & Prototyping', description: 'Creating design mockups', level: 'BEGINNER', domainSlug: 'ui-ux-design' },
  { key: 'design-systems', name: 'Design Systems', description: 'Consistent design components', level: 'INTERMEDIATE', domainSlug: 'ui-ux-design' },
  { key: 'user-research', name: 'User Research', description: 'Understanding user needs', level: 'INTERMEDIATE', domainSlug: 'ui-ux-design' },
  { key: 'accessibility', name: 'Accessibility (WCAG)', description: 'Making designs accessible', level: 'INTERMEDIATE', domainSlug: 'ui-ux-design' },
  { key: 'motion-ui', name: 'Motion UI', description: 'Animation and micro-interactions', level: 'INTERMEDIATE', domainSlug: 'ui-ux-design' },
  { key: 'usability-testing', name: 'Usability Testing', description: 'Testing design effectiveness', level: 'INTERMEDIATE', domainSlug: 'ui-ux-design' },
  { key: 'interaction-design', name: 'Interaction Design', description: 'Designing user interactions', level: 'INTERMEDIATE', domainSlug: 'ui-ux-design' },

  // Networking & Systems Skills
  { key: 'computer-networks', name: 'Computer Networks', description: 'Network protocols and architecture', level: 'INTERMEDIATE', domainSlug: 'networking-systems' },
  { key: 'operating-systems', name: 'Operating Systems', description: 'Linux/Unix system administration', level: 'INTERMEDIATE', domainSlug: 'networking-systems' },
  { key: 'virtualization', name: 'Virtualization', description: 'VMware, Hyper-V virtualization', level: 'INTERMEDIATE', domainSlug: 'networking-systems' },
  { key: 'dns-dhcp-vpn', name: 'DNS, DHCP, VPN', description: 'Network services and protocols', level: 'INTERMEDIATE', domainSlug: 'networking-systems' },
  { key: 'firewalls-ids-ips', name: 'Firewalls & IDS/IPS', description: 'Network security devices', level: 'ADVANCED', domainSlug: 'networking-systems' },
  { key: 'load-balancers', name: 'Load Balancers', description: 'Distributing network traffic', level: 'ADVANCED', domainSlug: 'networking-systems' },
  { key: 'storage-management', name: 'Storage Management', description: 'Managing data storage systems', level: 'INTERMEDIATE', domainSlug: 'networking-systems' },
  { key: 'system-performance-tuning', name: 'System Performance Tuning', description: 'Optimizing system performance', level: 'ADVANCED', domainSlug: 'networking-systems' },

  // Business & Analytics Skills
  { key: 'sql-analytics', name: 'SQL for Analytics', description: 'Database querying for business insights', level: 'INTERMEDIATE', domainSlug: 'business-analytics' },
  { key: 'excel-advanced', name: 'Excel Advanced Functions', description: 'Advanced spreadsheet analysis', level: 'INTERMEDIATE', domainSlug: 'business-analytics' },
  { key: 'tableau-powerbi', name: 'Tableau / PowerBI', description: 'Business intelligence visualization', level: 'INTERMEDIATE', domainSlug: 'business-analytics' },
  { key: 'bi-tools', name: 'Business Intelligence Tools', description: 'BI platforms and dashboards', level: 'INTERMEDIATE', domainSlug: 'business-analytics' },
  { key: 'ab-testing', name: 'A/B Testing', description: 'Statistical testing for optimization', level: 'INTERMEDIATE', domainSlug: 'business-analytics' },
  { key: 'market-research', name: 'Market Research', description: 'Analyzing market trends and competition', level: 'INTERMEDIATE', domainSlug: 'business-analytics' },
  { key: 'data-storytelling', name: 'Data Storytelling', description: 'Communicating insights through data', level: 'INTERMEDIATE', domainSlug: 'business-analytics' },
  { key: 'kpis-metrics', name: 'KPIs & Metrics', description: 'Key performance indicators', level: 'INTERMEDIATE', domainSlug: 'business-analytics' },

  // Game Development Skills
  { key: 'unity', name: 'Unity (C#)', description: 'Game development engine', level: 'INTERMEDIATE', domainSlug: 'game-development' },
  { key: 'unreal-engine', name: 'Unreal Engine (C++)', description: 'Advanced game development platform', level: 'ADVANCED', domainSlug: 'game-development' },
  { key: 'game-physics', name: 'Game Physics', description: 'Physics simulation in games', level: 'ADVANCED', domainSlug: 'game-development' },
  { key: 'multiplayer-systems', name: 'Multiplayer Systems', description: 'Networking for multiplayer games', level: 'ADVANCED', domainSlug: 'game-development' },
  { key: 'game-monetization', name: 'Game Monetization', description: 'Revenue models for games', level: 'INTERMEDIATE', domainSlug: 'game-development' },
  { key: '3d-modeling', name: '3D Modeling', description: 'Creating 3D assets and environments', level: 'INTERMEDIATE', domainSlug: 'game-development' },
  { key: 'shader-programming', name: 'Shader Programming', description: 'Graphics programming and effects', level: 'ADVANCED', domainSlug: 'game-development' },
  { key: 'ar-vr-development', name: 'AR/VR Development', description: 'Augmented and virtual reality', level: 'ADVANCED', domainSlug: 'game-development' }
];

async function main() {
  console.log('🌱 Starting comprehensive skill analysis seed...');

  // Create domains
  console.log('📁 Creating 13 domains...');
  for (const domainData of domainsData) {
    await prisma.domain.upsert({
      where: { slug: domainData.slug },
      update: domainData,
      create: domainData,
    });
  }

  // Create skills
  console.log('🎯 Creating 100+ skills...');
  for (const skillData of skillsData) {
    const domain = await prisma.domain.findUnique({
      where: { slug: skillData.domainSlug }
    });

    if (domain) {
      await prisma.skill.upsert({
        where: { key: skillData.key },
        update: {
          name: skillData.name,
          description: skillData.description,
          level: skillData.level,
          domainId: domain.id,
        },
        create: {
          key: skillData.key,
          name: skillData.name,
          description: skillData.description,
          level: skillData.level,
          domainId: domain.id,
        },
      });
    }
  }

  console.log('✅ Comprehensive skill analysis seed completed!');
  console.log(`📊 Created ${domainsData.length} domains with ${skillsData.length} skills`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });