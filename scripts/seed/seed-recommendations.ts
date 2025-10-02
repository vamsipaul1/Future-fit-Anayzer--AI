import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample recommendations for different skills
const recommendations = [
  // Software & Web Development
  {
    skillKey: 'html-css-js',
    recommendations: [
      { type: 'course', title: 'Complete HTML/CSS/JavaScript Bootcamp', url: 'https://example.com/courses/html-css-js-bootcamp', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Modern JavaScript ES6+ Features', url: 'https://example.com/videos/js-es6-features', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'CSS Grid vs Flexbox: When to Use What', url: 'https://example.com/articles/css-grid-flexbox', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'HTML/CSS/JS Practice Questions', url: 'https://example.com/practice/html-css-js', priority: 4, qualityScore: 0.8 }
    ]
  },
  {
    skillKey: 'react-js',
    recommendations: [
      { type: 'course', title: 'React.js Complete Guide', url: 'https://example.com/courses/react-complete', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'React Hooks Deep Dive', url: 'https://example.com/videos/react-hooks', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'React Performance Optimization', url: 'https://example.com/articles/react-performance', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'React.js Practice Problems', url: 'https://example.com/practice/react-js', priority: 4, qualityScore: 0.8 }
    ]
  },
  {
    skillKey: 'node-js',
    recommendations: [
      { type: 'course', title: 'Node.js Backend Development', url: 'https://example.com/courses/node-backend', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Express.js Framework Tutorial', url: 'https://example.com/videos/express-tutorial', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'Node.js Security Best Practices', url: 'https://example.com/articles/node-security', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'Node.js Practice Questions', url: 'https://example.com/practice/node-js', priority: 4, qualityScore: 0.8 }
    ]
  },

  // Data & AI
  {
    skillKey: 'python-data-science',
    recommendations: [
      { type: 'course', title: 'Python for Data Science Bootcamp', url: 'https://example.com/courses/python-data-science', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Pandas Data Manipulation', url: 'https://example.com/videos/pandas-tutorial', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'NumPy Arrays and Operations', url: 'https://example.com/articles/numpy-arrays', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'Python Data Science Practice', url: 'https://example.com/practice/python-data', priority: 4, qualityScore: 0.8 }
    ]
  },
  {
    skillKey: 'machine-learning',
    recommendations: [
      { type: 'course', title: 'Machine Learning Fundamentals', url: 'https://example.com/courses/ml-fundamentals', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Scikit-learn Tutorial Series', url: 'https://example.com/videos/scikit-learn', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'Feature Engineering Techniques', url: 'https://example.com/articles/feature-engineering', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'ML Algorithm Practice', url: 'https://example.com/practice/ml-algorithms', priority: 4, qualityScore: 0.8 }
    ]
  },

  // UI/UX & Design
  {
    skillKey: 'figma-adobe-xd',
    recommendations: [
      { type: 'course', title: 'Figma Design Mastery', url: 'https://example.com/courses/figma-mastery', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Adobe XD Prototyping', url: 'https://example.com/videos/adobe-xd-prototyping', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'Design System Creation', url: 'https://example.com/articles/design-systems', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'UI/UX Design Practice', url: 'https://example.com/practice/ui-ux-design', priority: 4, qualityScore: 0.8 }
    ]
  },
  {
    skillKey: 'motion-ui',
    recommendations: [
      { type: 'course', title: 'Motion UI Design Principles', url: 'https://example.com/courses/motion-ui', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Framer Motion Tutorial', url: 'https://example.com/videos/framer-motion', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'Animation Performance Tips', url: 'https://example.com/articles/animation-performance', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'Motion UI Practice Projects', url: 'https://example.com/practice/motion-ui', priority: 4, qualityScore: 0.8 }
    ]
  },

  // Cloud & Infrastructure
  {
    skillKey: 'aws',
    recommendations: [
      { type: 'course', title: 'AWS Solutions Architect', url: 'https://example.com/courses/aws-solutions-architect', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'AWS EC2 and S3 Basics', url: 'https://example.com/videos/aws-ec2-s3', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'AWS Security Best Practices', url: 'https://example.com/articles/aws-security', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'AWS Practice Labs', url: 'https://example.com/practice/aws-labs', priority: 4, qualityScore: 0.8 }
    ]
  },
  {
    skillKey: 'docker',
    recommendations: [
      { type: 'course', title: 'Docker Containerization', url: 'https://example.com/courses/docker-containerization', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Docker Compose Tutorial', url: 'https://example.com/videos/docker-compose', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'Docker Security Guidelines', url: 'https://example.com/articles/docker-security', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'Docker Practice Exercises', url: 'https://example.com/practice/docker-exercises', priority: 4, qualityScore: 0.8 }
    ]
  },

  // Cybersecurity
  {
    skillKey: 'network-security',
    recommendations: [
      { type: 'course', title: 'Network Security Fundamentals', url: 'https://example.com/courses/network-security', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Firewall Configuration', url: 'https://example.com/videos/firewall-config', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'Intrusion Detection Systems', url: 'https://example.com/articles/ids-systems', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'Network Security Scenarios', url: 'https://example.com/practice/network-security', priority: 4, qualityScore: 0.8 }
    ]
  },
  {
    skillKey: 'penetration-testing',
    recommendations: [
      { type: 'course', title: 'Ethical Hacking Course', url: 'https://example.com/courses/ethical-hacking', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Metasploit Framework', url: 'https://example.com/videos/metasploit', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'Penetration Testing Methodology', url: 'https://example.com/articles/pen-test-methodology', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'Pen Testing Practice Labs', url: 'https://example.com/practice/pen-testing', priority: 4, qualityScore: 0.8 }
    ]
  },

  // Mobile App Development
  {
    skillKey: 'react-native',
    recommendations: [
      { type: 'course', title: 'React Native Mobile Development', url: 'https://example.com/courses/react-native', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'React Native Navigation', url: 'https://example.com/videos/rn-navigation', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'Mobile App Performance', url: 'https://example.com/articles/mobile-performance', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'React Native Practice', url: 'https://example.com/practice/react-native', priority: 4, qualityScore: 0.8 }
    ]
  },
  {
    skillKey: 'flutter',
    recommendations: [
      { type: 'course', title: 'Flutter Development Bootcamp', url: 'https://example.com/courses/flutter-bootcamp', priority: 1, qualityScore: 0.9 },
      { type: 'video', title: 'Flutter State Management', url: 'https://example.com/videos/flutter-state', priority: 2, qualityScore: 0.8 },
      { type: 'article', title: 'Flutter Widget Architecture', url: 'https://example.com/articles/flutter-widgets', priority: 3, qualityScore: 0.7 },
      { type: 'question', title: 'Flutter Practice Projects', url: 'https://example.com/practice/flutter', priority: 4, qualityScore: 0.8 }
    ]
  }
];

async function seedRecommendations() {
  try {
    console.log('🌱 Seeding recommendations for all skills...');

    // Get all skills
    const allSkills = await prisma.skill.findMany();

    console.log(`📚 Found ${allSkills.length} skills`);

    let totalRecommendationsAdded = 0;

    for (const skill of allSkills) {
      // Find recommendations for this skill
      const skillRecommendations = recommendations.find(rec => rec.skillKey === skill.key);
      
      if (skillRecommendations) {
        console.log(`📝 Adding recommendations for: ${skill.name}`);

        // Clear existing recommendations for this skill
        await prisma.recommendation.deleteMany({
          where: { skillId: skill.id }
        });

        // Add new recommendations
        for (const rec of skillRecommendations.recommendations) {
          await prisma.recommendation.create({
            data: {
              skillId: skill.id,
              title: rec.title,
              type: rec.type,
              url: rec.url,
              priority: rec.priority,
              qualityScore: rec.qualityScore,
              meta: JSON.stringify({
                source: 'seed',
                createdAt: new Date().toISOString()
              })
            }
          });
          totalRecommendationsAdded++;
        }

        console.log(`✅ Added ${skillRecommendations.recommendations.length} recommendations for ${skill.name}`);
      } else {
        // Add generic recommendations for skills without specific ones
        const genericRecommendations = [
          { type: 'course', title: `${skill.name} Fundamentals`, url: `https://example.com/courses/${skill.key}-fundamentals`, priority: 1, qualityScore: 0.7 },
          { type: 'video', title: `${skill.name} Tutorial`, url: `https://example.com/videos/${skill.key}-tutorial`, priority: 2, qualityScore: 0.6 },
          { type: 'article', title: `Getting Started with ${skill.name}`, url: `https://example.com/articles/${skill.key}-getting-started`, priority: 3, qualityScore: 0.5 }
        ];

        for (const rec of genericRecommendations) {
          await prisma.recommendation.create({
            data: {
              skillId: skill.id,
              title: rec.title,
              type: rec.type,
              url: rec.url,
              priority: rec.priority,
              qualityScore: rec.qualityScore,
              meta: JSON.stringify({
                source: 'generic',
                createdAt: new Date().toISOString()
              })
            }
          });
          totalRecommendationsAdded++;
        }

        console.log(`✅ Added 3 generic recommendations for ${skill.name}`);
      }
    }

    console.log(`🎉 Recommendations seeding completed!`);
    console.log(`📊 Total recommendations added: ${totalRecommendationsAdded}`);

  } catch (error) {
    console.error('❌ Error seeding recommendations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRecommendations();
