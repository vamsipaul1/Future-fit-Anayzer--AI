'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Code, FileText, MessageSquare, Edit3, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Question {
  id: string
  text: string
  type: 'mcq' | 'code' | 'scenario' | 'short'
  difficulty: number
  skills: Array<{
    skillId: string
    impact: number
  }>
  metadata?: any
}

interface QuestionCardProps {
  question: Question
  onAnswer: (answer: string, timeTaken: number) => void
  timeRemaining: number
  questionNumber: number
  totalQuestions: number
  showHint?: boolean
  className?: string
}

export function QuestionCard({
  question,
  onAnswer,
  timeRemaining,
  questionNumber,
  totalQuestions,
  showHint = false,
  className
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [codeAnswer, setCodeAnswer] = useState<string>('')
  const [textAnswer, setTextAnswer] = useState<string>('')
  const [startTime] = useState(Date.now())
  const [isSubmitted, setIsSubmitted] = useState(false)

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'mcq':
        return <CheckCircle className="w-5 h-5" />
      case 'code':
        return <Code className="w-5 h-5" />
      case 'scenario':
        return <MessageSquare className="w-5 h-5" />
      case 'short':
        return <Edit3 className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'bg-green-100 text-green-800'
    if (difficulty <= 6) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 3) return 'Easy'
    if (difficulty <= 6) return 'Medium'
    return 'Hard'
  }

  const handleSubmit = () => {
    if (isSubmitted) return

    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
    let answer = ''

    switch (question.type) {
      case 'mcq':
        answer = selectedAnswer
        break
      case 'code':
        answer = codeAnswer
        break
      case 'short':
      case 'scenario':
        answer = textAnswer
        break
    }

    setIsSubmitted(true)
    onAnswer(answer, timeTaken)
  }

  const renderMCQ = () => {
    const options = question.metadata?.options || ['A', 'B', 'C', 'D']
    
    return (
      <div className="space-y-3">
        {options.map((option: string, index: number) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedAnswer(option)}
            className={cn(
              'w-full p-4 text-left rounded-xl border-2 transition-all duration-200',
              selectedAnswer === option
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                selectedAnswer === option
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              )}>
                {selectedAnswer === option && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium text-gray-800">{option}</span>
            </div>
          </motion.button>
        ))}
      </div>
    )
  }

  const renderCode = () => {
    return (
      <div className="space-y-4">
        <div className="bg-gray-900 rounded-xl p-4">
          <textarea
            value={codeAnswer}
            onChange={(e) => setCodeAnswer(e.target.value)}
            placeholder="Write your code here..."
            className="w-full h-40 bg-transparent text-green-400 font-mono text-sm resize-none focus:outline-none"
            disabled={isSubmitted}
          />
        </div>
        
        {question.metadata?.hint && showHint && (
          <div className="glass-card p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Hint:</strong> {question.metadata.hint}
            </p>
          </div>
        )}
      </div>
    )
  }

  const renderShortAnswer = () => {
    return (
      <div className="space-y-4">
        <textarea
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isSubmitted}
        />
        
        {question.metadata?.hint && showHint && (
          <div className="glass-card p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Hint:</strong> {question.metadata.hint}
            </p>
          </div>
        )}
      </div>
    )
  }

  const renderScenario = () => {
    return (
      <div className="space-y-4">
        <div className="glass-card p-4 rounded-xl">
          <p className="text-gray-700 leading-relaxed">
            {question.metadata?.scenario || question.text}
          </p>
        </div>
        
        <textarea
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          placeholder="How would you approach this scenario?"
          className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isSubmitted}
        />
      </div>
    )
  }

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'mcq':
        return renderMCQ()
      case 'code':
        return renderCode()
      case 'short':
        return renderShortAnswer()
      case 'scenario':
        return renderScenario()
      default:
        return <p className="text-gray-600">Unsupported question type</p>
    }
  }

  const canSubmit = () => {
    switch (question.type) {
      case 'mcq':
        return selectedAnswer !== ''
      case 'code':
        return codeAnswer.trim() !== ''
      case 'short':
      case 'scenario':
        return textAnswer.trim() !== ''
      default:
        return false
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('glass-card p-6 rounded-2xl', className)}
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            {getQuestionIcon(question.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Question {questionNumber} of {totalQuestions}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                getDifficultyColor(question.difficulty)
              )}>
                {getDifficultyText(question.difficulty)}
              </span>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {question.text}
        </h2>
      </div>

      {/* Question Content */}
      <div className="mb-6">
        {renderQuestionContent()}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!canSubmit() || isSubmitted}
          className={cn(
            'px-6 py-3 rounded-xl font-medium transition-all duration-200',
            canSubmit() && !isSubmitted
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          )}
        >
          {isSubmitted ? 'Submitted' : 'Submit Answer'}
        </motion.button>
      </div>

      {/* Skills being tested */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Skills being tested:</p>
        <div className="flex flex-wrap gap-2">
          {question.skills.map((skill) => (
            <span
              key={skill.skillId}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {skill.skillId} (impact: {skill.impact})
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
