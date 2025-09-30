'use client';

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft,
  Map,
  Target,
  TrendingUp,
  BookOpen,
  Clock,
  CheckCircle,
  Star,
  Code,
  Database,
  Cloud,
  Brain,
  Smartphone,
  Shield,
  Palette,
  BarChart3,
  Zap
} from 'lucide-react'

interface CareerDomain {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  skillsCount: number
  duration: string
  difficulty: string
  color: string
  roadmap: Milestone[]
}

interface Milestone {
  id: string
  title: string
  description: string
  durationWeeks: number
  skills: string[]
  resources: { title: string; url: string; type: string }[]
  projects: { title: string; description: string; skills: string[] }[]
}

const careerDomains: CareerDomain[] = [
  {
    id: 'fullstack',
    name: 'Full Stack Development',
    description: 'Master both frontend and backend technologies to build complete web applications.',
    icon: <Code className="w-8 h-8 text-blue-600" />,
    skillsCount: 25,
    duration: '6-12 months',
    difficulty: 'Intermediate',
    color: 'from-blue-500 to-purple-600',
    roadmap: [
      {
        id: 'fs-1',
        title: 'Frontend Fundamentals',
        description: 'Learn HTML, CSS, JavaScript, and a modern frontend framework like React.',
        durationWeeks: 8,
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
        resources: [{ title: 'React Docs', url: '#', type: 'documentation' }],
        projects: [{ title: 'Personal Portfolio', description: 'Build a responsive portfolio website.', skills: ['HTML', 'CSS', 'JavaScript'] }]
      },
      {
        id: 'fs-2',
        title: 'Backend Essentials',
        description: 'Dive into Node.js, Express, and RESTful API design.',
        durationWeeks: 10,
        skills: ['Node.js', 'Express.js', 'REST APIs', 'Database Integration'],
        resources: [{ title: 'Node.js Guide', url: '#', type: 'documentation' }],
        projects: [{ title: 'API for Blog App', description: 'Develop a backend API for a blog application.', skills: ['Node.js', 'Express.js'] }]
      },
      {
        id: 'fs-3',
        title: 'Database Management',
        description: 'Understand SQL and NoSQL databases, focusing on PostgreSQL and MongoDB.',
        durationWeeks: 6,
        skills: ['SQL', 'PostgreSQL', 'MongoDB', 'Database Design'],
        resources: [{ title: 'PostgreSQL Tutorial', url: '#', type: 'documentation' }],
        projects: [{ title: 'E-commerce Database', description: 'Design and implement a database for an e-commerce platform.', skills: ['SQL', 'PostgreSQL'] }]
      },
      {
        id: 'fs-4',
        title: 'Deployment & DevOps Basics',
        description: 'Learn to deploy applications using Docker and cloud platforms like Vercel/Netlify.',
        durationWeeks: 4,
        skills: ['Docker', 'CI/CD', 'Cloud Deployment', 'Git'],
        resources: [{ title: 'Docker Docs', url: '#', type: 'documentation' }],
        projects: [{ title: 'Deploy a Full Stack App', description: 'Deploy your blog application to a cloud platform.', skills: ['Docker', 'Cloud Deployment'] }]
      }
    ]
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Extract insights from data, build predictive models, and drive data-driven decisions.',
    icon: <BarChart3 className="w-8 h-8 text-green-600" />,
    skillsCount: 20,
    duration: '8-14 months',
    difficulty: 'Advanced',
    color: 'from-green-500 to-emerald-600',
    roadmap: [
      {
        id: 'ds-1',
        title: 'Python & Statistics Fundamentals',
        description: 'Master Python for data analysis and core statistical concepts.',
        durationWeeks: 10,
        skills: ['Python', 'Pandas', 'NumPy', 'Statistics', 'Probability'],
        resources: [{ title: 'Python for Data Science', url: '#', type: 'course' }],
        projects: [{ title: 'Data Cleaning Project', description: 'Clean and preprocess a messy dataset.', skills: ['Python', 'Pandas'] }]
      },
      {
        id: 'ds-2',
        title: 'Machine Learning Basics',
        description: 'Learn supervised and unsupervised learning algorithms with Scikit-learn.',
        durationWeeks: 12,
        skills: ['Machine Learning', 'Scikit-learn', 'Regression', 'Classification'],
        resources: [{ title: 'ML Crash Course', url: '#', type: 'course' }],
        projects: [{ title: 'Predictive Model', description: 'Build a model to predict house prices.', skills: ['Machine Learning', 'Python'] }]
      },
      {
        id: 'ds-3',
        title: 'Deep Learning & Neural Networks',
        description: 'Explore TensorFlow/PyTorch for building deep neural networks.',
        durationWeeks: 14,
        skills: ['Deep Learning', 'TensorFlow', 'PyTorch', 'Neural Networks'],
        resources: [{ title: 'Deep Learning Specialization', url: '#', type: 'course' }],
        projects: [{ title: 'Image Classifier', description: 'Develop a neural network to classify images.', skills: ['Deep Learning', 'TensorFlow'] }]
      }
    ]
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    description: 'Design, deploy, and manage scalable applications on cloud platforms like AWS, Azure, or GCP.',
    icon: <Cloud className="w-8 h-8 text-orange-600" />,
    skillsCount: 18,
    duration: '6-10 months',
    difficulty: 'Intermediate',
    color: 'from-orange-500 to-red-600',
    roadmap: [
      {
        id: 'cc-1',
        title: 'Cloud Fundamentals (AWS Focus)',
        description: 'Understand core AWS services: EC2, S3, VPC, IAM.',
        durationWeeks: 8,
        skills: ['AWS', 'EC2', 'S3', 'VPC', 'IAM'],
        resources: [{ title: 'AWS Certified Cloud Practitioner Course', url: '#', type: 'course' }],
        projects: [{ title: 'Host a Static Website on S3', description: 'Deploy a simple website using AWS S3.', skills: ['AWS', 'S3'] }]
      },
      {
        id: 'cc-2',
        title: 'Serverless & Containers',
        description: 'Explore AWS Lambda, Docker, and Kubernetes for modern application deployment.',
        durationWeeks: 10,
        skills: ['AWS Lambda', 'Docker', 'Kubernetes', 'Serverless'],
        resources: [{ title: 'AWS Serverless Course', url: '#', type: 'course' }],
        projects: [{ title: 'Serverless API', description: 'Build a serverless API using AWS Lambda and API Gateway.', skills: ['AWS Lambda'] }]
      },
      {
        id: 'cc-3',
        title: 'Cloud Security & Best Practices',
        description: 'Implement security best practices and monitor cloud environments.',
        durationWeeks: 6,
        skills: ['Cloud Security', 'Monitoring', 'Compliance'],
        resources: [{ title: 'AWS Security Best Practices', url: '#', type: 'documentation' }],
        projects: [{ title: 'Secure a Cloud Environment', description: 'Implement security measures for an AWS environment.', skills: ['Cloud Security'] }]
      }
    ]
  },
  {
    id: 'ai-ml-engineering',
    name: 'AI/ML Engineering',
    description: 'Develop and deploy intelligent systems, from machine learning models to AI applications.',
    icon: <Brain className="w-8 h-8 text-pink-600" />,
    skillsCount: 22,
    duration: '10-16 months',
    difficulty: 'Advanced',
    color: 'from-pink-500 to-purple-600',
    roadmap: [
      {
        id: 'aiml-1',
        title: 'MLOps Fundamentals',
        description: 'Learn to operationalize machine learning models: deployment, monitoring, and scaling.',
        durationWeeks: 12,
        skills: ['MLOps', 'Docker', 'Kubernetes', 'CI/CD for ML'],
        resources: [{ title: 'MLOps Course', url: '#', type: 'course' }],
        projects: [{ title: 'Deploy ML Model', description: 'Deploy a machine learning model to a production environment.', skills: ['MLOps', 'Docker'] }]
      },
      {
        id: 'aiml-2',
        title: 'Advanced Deep Learning',
        description: 'Explore advanced neural network architectures and frameworks.',
        durationWeeks: 14,
        skills: ['Deep Learning', 'Transformers', 'GANs', 'Reinforcement Learning'],
        resources: [{ title: 'Advanced DL Course', url: '#', type: 'course' }],
        projects: [{ title: 'Build a Chatbot', description: 'Develop an AI chatbot using a transformer model.', skills: ['Deep Learning', 'Transformers'] }]
      },
      {
        id: 'aiml-3',
        title: 'Responsible AI',
        description: 'Understand ethical considerations, fairness, and interpretability in AI systems.',
        durationWeeks: 8,
        skills: ['AI Ethics', 'Fairness', 'Interpretability'],
        resources: [{ title: 'Responsible AI Guidelines', url: '#', type: 'documentation' }],
        projects: [{ title: 'Bias Detection Tool', description: 'Create a tool to detect bias in a dataset.', skills: ['AI Ethics'] }]
      }
    ]
  },
  {
    id: 'mobile-development',
    name: 'Mobile Development',
    description: 'Build native and cross-platform mobile applications for iOS and Android.',
    icon: <Smartphone className="w-8 h-8 text-purple-600" />,
    skillsCount: 18,
    duration: '6-12 months',
    difficulty: 'Intermediate',
    color: 'from-purple-500 to-indigo-600',
    roadmap: [
      {
        id: 'mob-1',
        title: 'React Native Fundamentals',
        description: 'Learn the basics of React Native for cross-platform mobile development.',
        durationWeeks: 10,
        skills: ['React Native', 'JavaScript', 'Mobile UI/UX'],
        resources: [{ title: 'React Native Docs', url: '#', type: 'documentation' }],
        projects: [{ title: 'Simple To-Do App', description: 'Build a basic to-do list application for mobile.', skills: ['React Native'] }]
      },
      {
        id: 'mob-2',
        title: 'Native Features & APIs',
        description: 'Integrate native device features like camera, GPS, and push notifications.',
        durationWeeks: 12,
        skills: ['Native APIs', 'Geolocation', 'Push Notifications', 'Camera API'],
        resources: [{ title: 'React Native Community Modules', url: '#', type: 'documentation' }],
        projects: [{ title: 'Location-Based App', description: 'Develop an app that uses GPS to find nearby places.', skills: ['Geolocation', 'React Native'] }]
      },
      {
        id: 'mob-3',
        title: 'Performance & Deployment',
        description: 'Optimize mobile app performance and deploy to App Store/Google Play.',
        durationWeeks: 8,
        skills: ['Performance Optimization', 'App Store Deployment', 'Google Play Deployment'],
        resources: [{ title: 'React Native Performance Guide', url: '#', type: 'documentation' }],
        projects: [{ title: 'Publish Your App', description: 'Prepare and publish your mobile app to app stores.', skills: ['App Store Deployment'] }]
      }
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Protect systems, networks, and data from digital threats and attacks.',
    icon: <Shield className="w-8 h-8 text-red-600" />,
    skillsCount: 20,
    duration: '8-14 months',
    difficulty: 'Advanced',
    color: 'from-red-500 to-pink-600',
    roadmap: [
      {
        id: 'cs-1',
        title: 'Security Fundamentals',
        description: 'Understand network security, cryptography, and common vulnerabilities.',
        durationWeeks: 10,
        skills: ['Network Security', 'Cryptography', 'Vulnerability Assessment'],
        resources: [{ title: 'CompTIA Security+ Course', url: '#', type: 'course' }],
        projects: [{ title: 'Network Scan', description: 'Perform a basic network vulnerability scan.', skills: ['Network Security'] }]
      },
      {
        id: 'cs-2',
        title: 'Ethical Hacking & Penetration Testing',
        description: 'Learn techniques for ethical hacking and penetration testing.',
        durationWeeks: 12,
        skills: ['Ethical Hacking', 'Penetration Testing', 'Kali Linux', 'Metasploit'],
        resources: [{ title: 'Certified Ethical Hacker Course', url: '#', type: 'course' }],
        projects: [{ title: 'Web App Pentest', description: 'Conduct a penetration test on a web application.', skills: ['Penetration Testing'] }]
      },
      {
        id: 'cs-3',
        title: 'Incident Response & Forensics',
        description: 'Develop skills in incident response, digital forensics, and threat intelligence.',
        durationWeeks: 10,
        skills: ['Incident Response', 'Digital Forensics', 'Threat Intelligence'],
        resources: [{ title: 'Incident Response Handbook', url: '#', type: 'documentation' }],
        projects: [{ title: 'Forensic Analysis', description: 'Analyze a simulated security incident.', skills: ['Digital Forensics'] }]
      }
    ]
  }
]

export default function CareerRoadmapPage() {
  const [selectedDomain, setSelectedDomain] = useState<CareerDomain | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(236, 72, 153, 0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            opacity: 0.6
          }}
        />
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-pink-100 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full opacity-20 blur-xl"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <Link href="/career-decision" className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Decision</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Career Roadmaps</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a career domain to view a detailed, step-by-step learning roadmap.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedDomain ? (
            <motion.div
              key="domain-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full"
            >
              {careerDomains.map((domain) => (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * Math.random() }}
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDomain(domain)}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${domain.color} rounded-full flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300`}>
                    {domain.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{domain.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{domain.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-auto">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{domain.skillsCount} Skills</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{domain.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{domain.difficulty}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="roadmap-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50"
            >
              <button
                onClick={() => setSelectedDomain(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Domains</span>
              </button>

              <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedDomain.name} Roadmap</h2>
              <p className="text-lg text-gray-600 mb-8">{selectedDomain.description}</p>

              <div className="space-y-10">
                {selectedDomain.roadmap.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {index + 1}
                      </div>
                      {index < selectedDomain.roadmap.length - 1 && (
                        <div className="w-px h-16 bg-gray-300 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 bg-gray-50/50 rounded-xl p-6 border border-gray-200/50 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 mb-4">{milestone.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{milestone.durationWeeks} weeks</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-4 h-4" />
                          <span>{selectedDomain.difficulty}</span>
                        </div>
                      </div>

                      {milestone.skills.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Key Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {milestone.skills.map((skill, sIndex) => (
                              <span key={sIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {milestone.resources.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Resources:</h4>
                          <div className="space-y-2">
                            {milestone.resources.map((resource, rIndex) => (
                              <a 
                                key={rIndex} 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center space-x-2 text-blue-600 hover:underline text-sm"
                              >
                                <BookOpen className="w-4 h-4" />
                                <span>{resource.title} ({resource.type})</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {milestone.projects.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Projects:</h4>
                          <div className="space-y-2">
                            {milestone.projects.map((project, pIndex) => (
                              <div key={pIndex} className="bg-white rounded-lg p-3 border border-gray-100">
                                <h5 className="font-medium text-gray-800">{project.title}</h5>
                                <p className="text-xs text-gray-600">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.skills.map((skill, psIndex) => (
                                    <span key={psIndex} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
