'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, BookOpen, Code, CheckCircle, Circle, ArrowRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Milestone {
  id: string
  title: string
  description: string
  durationWeeks: number
  resources: Array<{
    title: string
    url: string
    type: 'course' | 'documentation' | 'video' | 'book' | 'project'
  }>
  skills: string[]
  completed?: boolean
  inProgress?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedHours: number
  skills: string[]
  githubUrl?: string
  liveUrl?: string
}

interface RoadmapTimelineProps {
  milestones: Milestone[]
  projects: Project[]
  title?: string
  className?: string
  showProgress?: boolean
  onMilestoneComplete?: (milestoneId: string) => void
}

export function RoadmapTimeline({
  milestones,
  projects,
  title = 'Learning Roadmap',
  className,
  showProgress = true,
  onMilestoneComplete
}: RoadmapTimelineProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'milestones' | 'projects'>('milestones')

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4" />
      case 'video':
        return <ExternalLink className="w-4 h-4" />
      case 'documentation':
        return <BookOpen className="w-4 h-4" />
      case 'book':
        return <BookOpen className="w-4 h-4" />
      case 'project':
        return <Code className="w-4 h-4" />
      default:
        return <ExternalLink className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const totalDuration = milestones.reduce((sum, milestone) => sum + milestone.durationWeeks, 0)
  const completedMilestones = milestones.filter(m => m.completed).length
  const progressPercentage = (completedMilestones / milestones.length) * 100

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        
        {showProgress && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-gray-800">
                {completedMilestones}/{milestones.length} milestones
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Estimated {totalDuration} weeks total
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200/50">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('milestones')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === 'milestones'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              )}
            >
              Milestones
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === 'projects'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              )}
            >
              Projects
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'milestones' ? (
          <motion.div
            key="milestones"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50"
              >
                <div className="flex items-start space-x-4">
                  {/* Timeline Icon */}
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      milestone.completed
                        ? 'bg-green-500 text-white'
                        : milestone.inProgress
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    )}>
                      {milestone.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px h-16 bg-gray-200 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {milestone.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{milestone.durationWeeks} weeks</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{milestone.description}</p>

                    {/* Skills */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Skills to learn:</p>
                      <div className="flex flex-wrap gap-2">
                        {milestone.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Resources:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {milestone.resources.map((resource, resourceIndex) => (
                          <a
                            key={resourceIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {getResourceIcon(resource.type)}
                            <span className="text-sm text-gray-700">{resource.title}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    {!milestone.completed && (
                      <div className="mt-4">
                        <button
                          onClick={() => onMilestoneComplete?.(milestone.id)}
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
                        >
                          {milestone.inProgress ? 'Continue Learning' : 'Start Learning'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.title}
                    </h3>
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getDifficultyColor(project.difficulty)
                    )}>
                      {project.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm">{project.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{project.estimatedHours}h</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Skills practiced:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm text-center"
                      >
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm text-center"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
