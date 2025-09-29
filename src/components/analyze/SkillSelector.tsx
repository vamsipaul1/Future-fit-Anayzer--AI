'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, X, Check, Filter, Star, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  experience: string
  confidence: number
}

interface SkillSelectorProps {
  selectedSkills: Skill[]
  onChange: (skills: Skill[]) => void
}

const skillCategories = [
  'All',
  'Frontend Development',
  'Backend Development',
  'Mobile Development',
  'Data Science',
  'DevOps',
  'Design',
  'Soft Skills',
  'Database',
  'AI/ML'
]

// Comprehensive skill list with 50+ skills
const allSkills = [
  // Frontend Development
  { id: 'react', name: 'React', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'vue', name: 'Vue.js', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'angular', name: 'Angular', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'javascript', name: 'JavaScript', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'html', name: 'HTML', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'css', name: 'CSS', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'sass', name: 'SASS/SCSS', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'nuxtjs', name: 'Nuxt.js', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'gatsby', name: 'Gatsby', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'svelte', name: 'Svelte', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'webpack', name: 'Webpack', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  { id: 'vite', name: 'Vite', category: 'Frontend Development', level: 0, experience: '', confidence: 0 },
  
  // Backend Development
  { id: 'nodejs', name: 'Node.js', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'express', name: 'Express.js', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'python', name: 'Python', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'django', name: 'Django', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'flask', name: 'Flask', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'java', name: 'Java', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'spring', name: 'Spring Boot', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'csharp', name: 'C#', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'dotnet', name: '.NET', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'php', name: 'PHP', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'laravel', name: 'Laravel', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'ruby', name: 'Ruby', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'rails', name: 'Ruby on Rails', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'go', name: 'Go', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'rust', name: 'Rust', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'kotlin', name: 'Kotlin', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  { id: 'scala', name: 'Scala', category: 'Backend Development', level: 0, experience: '', confidence: 0 },
  
  // Database
  { id: 'sql', name: 'SQL', category: 'Database', level: 0, experience: '', confidence: 0 },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', level: 0, experience: '', confidence: 0 },
  { id: 'mysql', name: 'MySQL', category: 'Database', level: 0, experience: '', confidence: 0 },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', level: 0, experience: '', confidence: 0 },
  { id: 'redis', name: 'Redis', category: 'Database', level: 0, experience: '', confidence: 0 },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'Database', level: 0, experience: '', confidence: 0 },
  { id: 'firebase', name: 'Firebase', category: 'Database', level: 0, experience: '', confidence: 0 },
  { id: 'supabase', name: 'Supabase', category: 'Database', level: 0, experience: '', confidence: 0 },
  { id: 'cassandra', name: 'Cassandra', category: 'Database', level: 0, experience: '', confidence: 0 },
  { id: 'dynamodb', name: 'DynamoDB', category: 'Database', level: 0, experience: '', confidence: 0 },
  
  // DevOps
  { id: 'docker', name: 'Docker', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'aws', name: 'AWS', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'azure', name: 'Azure', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'gcp', name: 'Google Cloud', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'terraform', name: 'Terraform', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'jenkins', name: 'Jenkins', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'gitlab', name: 'GitLab CI', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'github', name: 'GitHub Actions', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'ansible', name: 'Ansible', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'prometheus', name: 'Prometheus', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  { id: 'grafana', name: 'Grafana', category: 'DevOps', level: 0, experience: '', confidence: 0 },
  
  // Mobile Development
  { id: 'reactnative', name: 'React Native', category: 'Mobile Development', level: 0, experience: '', confidence: 0 },
  { id: 'flutter', name: 'Flutter', category: 'Mobile Development', level: 0, experience: '', confidence: 0 },
  { id: 'swift', name: 'Swift', category: 'Mobile Development', level: 0, experience: '', confidence: 0 },
  { id: 'kotlin', name: 'Kotlin', category: 'Mobile Development', level: 0, experience: '', confidence: 0 },
  { id: 'ionic', name: 'Ionic', category: 'Mobile Development', level: 0, experience: '', confidence: 0 },
  { id: 'xamarin', name: 'Xamarin', category: 'Mobile Development', level: 0, experience: '', confidence: 0 },
  { id: 'cordova', name: 'Cordova', category: 'Mobile Development', level: 0, experience: '', confidence: 0 },
  
  // Data Science
  { id: 'pandas', name: 'Pandas', category: 'Data Science', level: 0, experience: '', confidence: 0 },
  { id: 'numpy', name: 'NumPy', category: 'Data Science', level: 0, experience: '', confidence: 0 },
  { id: 'jupyter', name: 'Jupyter', category: 'Data Science', level: 0, experience: '', confidence: 0 },
  { id: 'matplotlib', name: 'Matplotlib', category: 'Data Science', level: 0, experience: '', confidence: 0 },
  { id: 'seaborn', name: 'Seaborn', category: 'Data Science', level: 0, experience: '', confidence: 0 },
  { id: 'plotly', name: 'Plotly', category: 'Data Science', level: 0, experience: '', confidence: 0 },
  { id: 'r', name: 'R', category: 'Data Science', level: 0, experience: '', confidence: 0 },
  { id: 'spark', name: 'Apache Spark', category: 'Data Science', level: 0, experience: '', confidence: 0 },
  { id: 'hadoop', name: 'Hadoop', category: 'Data Science', level: 0, experience: '', confidence: 0 },
  
  // AI/ML
  { id: 'tensorflow', name: 'TensorFlow', category: 'AI/ML', level: 0, experience: '', confidence: 0 },
  { id: 'pytorch', name: 'PyTorch', category: 'AI/ML', level: 0, experience: '', confidence: 0 },
  { id: 'scikit', name: 'Scikit-learn', category: 'AI/ML', level: 0, experience: '', confidence: 0 },
  { id: 'keras', name: 'Keras', category: 'AI/ML', level: 0, experience: '', confidence: 0 },
  { id: 'opencv', name: 'OpenCV', category: 'AI/ML', level: 0, experience: '', confidence: 0 },
  { id: 'nlp', name: 'NLP', category: 'AI/ML', level: 0, experience: '', confidence: 0 },
  { id: 'computer-vision', name: 'Computer Vision', category: 'AI/ML', level: 0, experience: '', confidence: 0 },
  { id: 'deep-learning', name: 'Deep Learning', category: 'AI/ML', level: 0, experience: '', confidence: 0 },
  
  // Design
  { id: 'figma', name: 'Figma', category: 'Design', level: 0, experience: '', confidence: 0 },
  { id: 'adobexd', name: 'Adobe XD', category: 'Design', level: 0, experience: '', confidence: 0 },
  { id: 'sketch', name: 'Sketch', category: 'Design', level: 0, experience: '', confidence: 0 },
  { id: 'photoshop', name: 'Photoshop', category: 'Design', level: 0, experience: '', confidence: 0 },
  { id: 'illustrator', name: 'Illustrator', category: 'Design', level: 0, experience: '', confidence: 0 },
  { id: 'indesign', name: 'InDesign', category: 'Design', level: 0, experience: '', confidence: 0 },
  { id: 'after-effects', name: 'After Effects', category: 'Design', level: 0, experience: '', confidence: 0 },
  { id: 'premiere', name: 'Premiere Pro', category: 'Design', level: 0, experience: '', confidence: 0 },
  
  // Soft Skills
  { id: 'communication', name: 'Communication', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
  { id: 'leadership', name: 'Leadership', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
  { id: 'problemsolving', name: 'Problem Solving', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
  { id: 'teamwork', name: 'Teamwork', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
  { id: 'projectmanagement', name: 'Project Management', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
  { id: 'agile', name: 'Agile/Scrum', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
  { id: 'time-management', name: 'Time Management', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
  { id: 'critical-thinking', name: 'Critical Thinking', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
  { id: 'creativity', name: 'Creativity', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
  { id: 'adaptability', name: 'Adaptability', category: 'Soft Skills', level: 0, experience: '', confidence: 0 },
]

export function SkillSelector({ selectedSkills, onChange }: SkillSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAllSkills, setShowAllSkills] = useState(false)

  // Filter skills based on search term and category
  const filteredSkills = allSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory
    const notSelected = !selectedSkills.some(selected => selected.id === skill.id)
    
    return matchesSearch && matchesCategory && notSelected
  })

  const handleAddSkill = (skill: Skill) => {
    const newSkill = { ...skill, level: 50, confidence: 50 }
    onChange([...selectedSkills, newSkill])
  }

  const handleRemoveSkill = (skillId: string) => {
    onChange(selectedSkills.filter(skill => skill.id !== skillId))
  }

  const handleLevelChange = (skillId: string, level: number) => {
    onChange(selectedSkills.map(skill => 
      skill.id === skillId ? { ...skill, level } : skill
    ))
  }

  const getLevelColor = (level: number) => {
    if (level < 40) return 'bg-red-500'
    if (level < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getLevelText = (level: number) => {
    if (level < 40) return 'Beginner'
    if (level < 70) return 'Intermediate'
    return 'Advanced'
  }

  return (
    <div className="w-full space-y-8">
      {/* Selected Skills Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Your Skills</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {selectedSkills.length} selected
          </span>
        </div>
        
        <AnimatePresence>
          {selectedSkills.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No skills selected yet</p>
              <p className="text-gray-400 text-sm">Add skills to get started with your analysis</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedSkills.map((skill) => (
              <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                        {skill.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">{skill.name}</h4>
                        <p className="text-xs text-gray-500">{skill.category}</p>
                    </div>
                  </div>
                  <button
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    title="Remove skill"
                  >
                      <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Level</span>
                      <span className="text-xs font-medium text-gray-800">{getLevelText(skill.level)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getLevelColor(skill.level)}`}
                        style={{ width: `${skill.level}%` }}
                      />
                  </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => handleLevelChange(skill.id, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      title={`Adjust ${skill.name} skill level`}
                      aria-label={`Adjust ${skill.name} skill level`}
                    />
                </div>
              </motion.div>
              ))}
          </div>
        )}
        </AnimatePresence>
      </motion.div>

      {/* Add Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Add Skills</h3>
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>{showAllSkills ? 'Show Less' : 'Show All'}</span>
          </button>
      </div>

        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

          <div className="flex flex-wrap gap-2">
            {skillCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredSkills.slice(0, showAllSkills ? filteredSkills.length : 20).map((skill) => (
              <motion.button
                  key={skill.id}
                  onClick={() => handleAddSkill(skill)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-200">
                    <span className="text-xs font-bold text-gray-600 group-hover:text-blue-600">
                        {skill.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  <span className="text-xs text-gray-500 truncate">{skill.category}</span>
                  </div>
                <p className="text-sm font-medium text-gray-800 truncate">{skill.name}</p>
              </motion.button>
            ))}
      </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No skills found matching your search</p>
            </div>
          )}
        </div>
          </motion.div>
    </div>
  )
}
