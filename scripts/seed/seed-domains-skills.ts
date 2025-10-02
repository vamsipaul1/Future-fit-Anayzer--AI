import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.userQuizHistory.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.assessmentItem.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.question.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.domain.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleared existing data');

  // Create Domains
  const domains = [
    {
      slug: 'cloud-infrastructure',
      name: 'Cloud & Infrastructure',
      summary: 'Master cloud platforms, containerization, and infrastructure automation',
      roles: JSON.stringify(['Cloud Engineer', 'DevOps Engineer', 'Site Reliability Engineer', 'Infrastructure Architect'])
    },
    {
      slug: 'cybersecurity',
      name: 'Cybersecurity',
      summary: 'Protect systems and data from cyber threats',
      roles: JSON.stringify(['Security Analyst', 'Penetration Tester', 'Security Architect', 'Incident Responder'])
    },
    {
      slug: 'data-ai',
      name: 'Data & AI',
      summary: 'Extract insights from data and build intelligent systems',
      roles: JSON.stringify(['Data Scientist', 'ML Engineer', 'Data Analyst', 'AI Researcher'])
    },
    {
      slug: 'software-web',
      name: 'Software & Web Development',
      summary: 'Build web applications and software solutions',
      roles: JSON.stringify(['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Software Engineer'])
    },
    {
      slug: 'programming',
      name: 'Programming',
      summary: 'Core programming languages and algorithms',
      roles: JSON.stringify(['Software Developer', 'Algorithm Engineer', 'Systems Programmer', 'Technical Lead'])
    },
    {
      slug: 'mobile-app',
      name: 'Mobile App Development',
      summary: 'Create mobile applications for iOS and Android',
      roles: JSON.stringify(['Mobile Developer', 'iOS Developer', 'Android Developer', 'Cross-platform Developer'])
    },
    {
      slug: 'product-management',
      name: 'Product & Management',
      summary: 'Lead product development and team management',
      roles: JSON.stringify(['Product Manager', 'Project Manager', 'Technical Lead', 'Scrum Master'])
    },
    {
      slug: 'blockchain-web3',
      name: 'Blockchain & Web3',
      summary: 'Build decentralized applications and blockchain solutions',
      roles: JSON.stringify(['Blockchain Developer', 'Smart Contract Developer', 'DeFi Engineer', 'Web3 Developer'])
    },
    {
      slug: 'devops-automation',
      name: 'DevOps & Automation',
      summary: 'Automate deployment and infrastructure management',
      roles: JSON.stringify(['DevOps Engineer', 'Automation Engineer', 'Release Manager', 'Infrastructure Engineer'])
    },
    {
      slug: 'ui-ux-design',
      name: 'UI/UX & Design',
      summary: 'Design user interfaces and user experiences',
      roles: JSON.stringify(['UI Designer', 'UX Designer', 'Product Designer', 'Design System Manager'])
    },
    {
      slug: 'networking-systems',
      name: 'Networking & Systems',
      summary: 'Manage networks and system infrastructure',
      roles: JSON.stringify(['Network Engineer', 'Systems Administrator', 'Network Security Engineer', 'Infrastructure Manager'])
    },
    {
      slug: 'business-analytics',
      name: 'Business & Analytics',
      summary: 'Analyze business data and drive strategic decisions',
      roles: JSON.stringify(['Business Analyst', 'Data Analyst', 'Business Intelligence Analyst', 'Strategy Consultant'])
    },
    {
      slug: 'game-development',
      name: 'Game Development',
      summary: 'Create interactive games and entertainment software',
      roles: JSON.stringify(['Game Developer', 'Game Designer', 'Unity Developer', 'Game Programmer'])
    }
  ];

  const createdDomains = await Promise.all(
    domains.map(domain => prisma.domain.create({ data: domain }))
  );

  console.log(`✅ Created ${createdDomains.length} domains`);

  // Create Skills for each domain
  const skillsData = [
    // Cloud & Infrastructure
    {
      domainSlug: 'cloud-infrastructure',
      skills: [
        { key: 'aws', name: 'AWS', description: 'Amazon Web Services cloud platform', level: 'INTERMEDIATE' },
        { key: 'azure', name: 'Azure', description: 'Microsoft Azure cloud platform', level: 'INTERMEDIATE' },
        { key: 'gcp', name: 'Google Cloud Platform', description: 'Google Cloud Platform services', level: 'INTERMEDIATE' },
        { key: 'docker', name: 'Docker', description: 'Containerization platform', level: 'INTERMEDIATE' },
        { key: 'kubernetes', name: 'Kubernetes', description: 'Container orchestration', level: 'ADVANCED' },
        { key: 'terraform', name: 'Terraform', description: 'Infrastructure as Code', level: 'ADVANCED' },
        { key: 'cicd', name: 'CI/CD Pipelines', description: 'Continuous Integration and Deployment', level: 'INTERMEDIATE' },
        { key: 'sre', name: 'Site Reliability Engineering', description: 'SRE practices and monitoring', level: 'ADVANCED' }
      ]
    },
    // Cybersecurity
    {
      domainSlug: 'cybersecurity',
      skills: [
        { key: 'network-security', name: 'Network Security', description: 'Network security protocols and practices', level: 'INTERMEDIATE' },
        { key: 'penetration-testing', name: 'Penetration Testing', description: 'Ethical hacking and vulnerability assessment', level: 'ADVANCED' },
        { key: 'cryptography', name: 'Cryptography', description: 'Encryption and cryptographic protocols', level: 'ADVANCED' },
        { key: 'ethical-hacking', name: 'Ethical Hacking', description: 'Authorized security testing', level: 'ADVANCED' },
        { key: 'siem', name: 'Security Information & Event Management', description: 'SIEM tools and practices', level: 'INTERMEDIATE' },
        { key: 'cloud-security', name: 'Cloud Security', description: 'Security in cloud environments', level: 'INTERMEDIATE' },
        { key: 'iam', name: 'Identity & Access Management', description: 'IAM systems and policies', level: 'INTERMEDIATE' },
        { key: 'threat-modeling', name: 'Threat Modeling', description: 'Threat assessment and modeling', level: 'ADVANCED' }
      ]
    },
    // Data & AI
    {
      domainSlug: 'data-ai',
      skills: [
        { key: 'python-data-science', name: 'Python for Data Science', description: 'Python libraries for data analysis', level: 'INTERMEDIATE' },
        { key: 'machine-learning', name: 'Machine Learning', description: 'ML algorithms and model training', level: 'ADVANCED' },
        { key: 'deep-learning', name: 'Deep Learning', description: 'Neural networks and deep learning', level: 'ADVANCED' },
        { key: 'nlp', name: 'Natural Language Processing', description: 'NLP techniques and applications', level: 'ADVANCED' },
        { key: 'data-visualization', name: 'Data Visualization', description: 'Creating visual representations of data', level: 'INTERMEDIATE' },
        { key: 'sql-nosql', name: 'SQL & NoSQL Databases', description: 'Database design and querying', level: 'INTERMEDIATE' },
        { key: 'big-data', name: 'Big Data', description: 'Processing large datasets', level: 'ADVANCED' },
        { key: 'mlops', name: 'MLOps', description: 'ML operations and deployment', level: 'ADVANCED' }
      ]
    },
    // Software & Web Development
    {
      domainSlug: 'software-web',
      skills: [
        { key: 'html-css-js', name: 'HTML / CSS / JavaScript', description: 'Frontend web development fundamentals', level: 'BEGINNER' },
        { key: 'react-js', name: 'React.js', description: 'React library for building user interfaces', level: 'INTERMEDIATE' },
        { key: 'next-js', name: 'Next.js', description: 'React framework for production', level: 'INTERMEDIATE' },
        { key: 'node-js', name: 'Node.js', description: 'JavaScript runtime for backend development', level: 'INTERMEDIATE' },
        { key: 'express-js', name: 'Express.js', description: 'Web application framework for Node.js', level: 'INTERMEDIATE' },
        { key: 'rest-graphql', name: 'REST & GraphQL APIs', description: 'API design and development', level: 'INTERMEDIATE' },
        { key: 'prisma-orms', name: 'Prisma / ORMs', description: 'Object-Relational Mapping tools', level: 'INTERMEDIATE' },
        { key: 'git-version-control', name: 'Git & Version Control', description: 'Version control and collaboration', level: 'BEGINNER' }
      ]
    },
    // Programming
    {
      domainSlug: 'programming',
      skills: [
        { key: 'c-programming', name: 'C Programming', description: 'C programming language fundamentals', level: 'INTERMEDIATE' },
        { key: 'cpp-programming', name: 'C++ Programming', description: 'C++ programming language', level: 'INTERMEDIATE' },
        { key: 'java', name: 'Java', description: 'Java programming language', level: 'INTERMEDIATE' },
        { key: 'python-core', name: 'Python (Core & OOP)', description: 'Python programming fundamentals', level: 'INTERMEDIATE' },
        { key: 'javascript-es6', name: 'JavaScript (ES6+)', description: 'Modern JavaScript features', level: 'INTERMEDIATE' },
        { key: 'go', name: 'Go', description: 'Go programming language', level: 'INTERMEDIATE' },
        { key: 'rust', name: 'Rust', description: 'Rust programming language', level: 'ADVANCED' },
        { key: 'data-structures-algorithms', name: 'Data Structures & Algorithms', description: 'Computer science fundamentals', level: 'ADVANCED' }
      ]
    },
    // Mobile App Development
    {
      domainSlug: 'mobile-app',
      skills: [
        { key: 'react-native', name: 'React Native', description: 'Cross-platform mobile development', level: 'INTERMEDIATE' },
        { key: 'flutter', name: 'Flutter', description: 'Google\'s UI toolkit for mobile apps', level: 'INTERMEDIATE' },
        { key: 'swift-ios', name: 'Swift (iOS)', description: 'iOS app development with Swift', level: 'INTERMEDIATE' },
        { key: 'kotlin-android', name: 'Kotlin (Android)', description: 'Android app development with Kotlin', level: 'INTERMEDIATE' },
        { key: 'firebase-integration', name: 'Firebase Integration', description: 'Firebase services for mobile apps', level: 'INTERMEDIATE' },
        { key: 'mobile-ui-ux', name: 'Mobile UI/UX Design', description: 'Mobile interface design principles', level: 'INTERMEDIATE' },
        { key: 'push-notifications', name: 'Push Notifications', description: 'Mobile push notification systems', level: 'INTERMEDIATE' },
        { key: 'app-deployment', name: 'App Deployment', description: 'Mobile app deployment and distribution', level: 'INTERMEDIATE' }
      ]
    },
    // UI/UX & Design
    {
      domainSlug: 'ui-ux-design',
      skills: [
        { key: 'figma-adobe-xd', name: 'Figma / Adobe XD', description: 'UI/UX design tools', level: 'INTERMEDIATE' },
        { key: 'wireframing-prototyping', name: 'Wireframing & Prototyping', description: 'Design prototyping techniques', level: 'INTERMEDIATE' },
        { key: 'design-systems', name: 'Design Systems', description: 'Creating and maintaining design systems', level: 'ADVANCED' },
        { key: 'user-research', name: 'User Research', description: 'User research methods and analysis', level: 'INTERMEDIATE' },
        { key: 'accessibility', name: 'Accessibility (WCAG)', description: 'Web accessibility guidelines', level: 'INTERMEDIATE' },
        { key: 'motion-ui', name: 'Motion UI', description: 'Animation and motion design', level: 'INTERMEDIATE' },
        { key: 'usability-testing', name: 'Usability Testing', description: 'Testing user experience', level: 'INTERMEDIATE' },
        { key: 'interaction-design', name: 'Interaction Design', description: 'Designing user interactions', level: 'ADVANCED' }
      ]
    }
  ];

  let totalSkills = 0;
  for (const domainData of skillsData) {
    const domain = createdDomains.find(d => d.slug === domainData.domainSlug);
    if (!domain) continue;

    const skills = await Promise.all(
      domainData.skills.map(skill => 
        prisma.skill.create({
          data: {
            ...skill,
            domainId: domain.id
          }
        })
      )
    );

    totalSkills += skills.length;
    console.log(`✅ Created ${skills.length} skills for ${domain.name}`);
  }

  console.log(`🎉 Database seeding completed!`);
  console.log(`📊 Total domains: ${createdDomains.length}`);
  console.log(`📊 Total skills: ${totalSkills}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
