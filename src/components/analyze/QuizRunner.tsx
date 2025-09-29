'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { QuestionCard } from './QuestionCard'
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

export interface QuizAnswer {
  questionId: string
  answer: string
  timeTaken: number
}

interface QuizRunnerProps {
  userId: string
  onComplete: (result: any) => void
  onQuestionChange?: (questionIndex: number, total: number) => void
  className?: string
}

export function QuizRunner({
  userId,
  onComplete,
  onQuestionChange,
  className
}: QuizRunnerProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(10)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes per question
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [attemptId, setAttemptId] = useState<string | null>(null)

  // Start quiz
  const startQuiz = useCallback(async () => {
    setIsLoading(true)
    try {
      // Simulate API call with faster response
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock questions for demo
      const mockQuestions: Question[] = [
        {
          id: '1',
          text: 'What is the primary purpose of React hooks?',
          type: 'mcq',
          difficulty: 3,
          skills: [{ skillId: 'react', impact: 5 }],
          metadata: {
            options: [
              'To manage component state',
              'To perform side effects',
              'To optimize performance',
              'All of the above'
            ],
            correctAnswer: 3
          }
        },
        {
          id: '2',
          text: 'Explain the concept of closures in JavaScript.',
          type: 'short',
          difficulty: 4,
          skills: [{ skillId: 'javascript', impact: 5 }]
        },
        {
          id: '3',
          text: 'What is the difference between let and var in JavaScript?',
          type: 'mcq',
          difficulty: 2,
          skills: [{ skillId: 'javascript', impact: 4 }],
          metadata: {
            options: [
              'let is block-scoped, var is function-scoped',
              'var is block-scoped, let is function-scoped',
              'They are identical',
              'let is global, var is local'
            ],
            correctAnswer: 0
          }
        }
      ]
      
      setCurrentQuestion(mockQuestions[0])
      setTotalQuestions(mockQuestions.length)
      setAttemptId('demo-attempt-' + Date.now())
      setCurrentQuestionIndex(1)
      onQuestionChange?.(1, mockQuestions.length)
    } catch (error) {
      console.error('Error starting quiz:', error)
    } finally {
      setIsLoading(false)
    }
  }, [onQuestionChange])

  // Get next question
  const getNextQuestion = useCallback(async () => {
    if (!attemptId) return

    setIsLoading(true)
    try {
      // Simulate API call with faster response
      await new Promise(resolve => setTimeout(resolve, 200))
      
      // Mock questions for demo
      const mockQuestions: Question[] = [
        {
          id: '1',
          text: 'What is the primary purpose of React hooks?',
          type: 'mcq',
          difficulty: 3,
          skills: [{ skillId: 'react', impact: 5 }],
          metadata: {
            options: [
              'To manage component state',
              'To perform side effects',
              'To optimize performance',
              'All of the above'
            ],
            correctAnswer: 3
          }
        },
        {
          id: '2',
          text: 'Explain the concept of closures in JavaScript.',
          type: 'short',
          difficulty: 4,
          skills: [{ skillId: 'javascript', impact: 5 }]
        },
        {
          id: '3',
          text: 'What is the difference between let and var in JavaScript?',
          type: 'mcq',
          difficulty: 2,
          skills: [{ skillId: 'javascript', impact: 4 }],
          metadata: {
            options: [
              'let is block-scoped, var is function-scoped',
              'var is block-scoped, let is function-scoped',
              'They are identical',
              'let is global, var is local'
            ],
            correctAnswer: 0
          }
        }
      ]
      
      const nextIndex = currentQuestionIndex
      if (nextIndex < mockQuestions.length) {
        setCurrentQuestion(mockQuestions[nextIndex])
        setCurrentQuestionIndex(prev => prev + 1)
        onQuestionChange?.(nextIndex + 1, mockQuestions.length)
        setTimeRemaining(300) // Reset timer
      } else {
        // Quiz completed
        setIsCompleted(true)
        onComplete({
          attemptId,
          answers,
          totalQuestions: mockQuestions.length,
          completedAt: new Date().toISOString()
        })
      }
    } catch (error) {
      console.error('Error getting next question:', error)
    } finally {
      setIsLoading(false)
    }
  }, [attemptId, currentQuestionIndex, onQuestionChange, onComplete, answers])

  // Submit quiz
  const submitQuiz = useCallback(async () => {
    if (!attemptId) return

    setIsLoading(true)
    try {
      // Simulate API call with faster response
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock results for demo
      const mockResults = {
        attemptId,
        answers,
        totalQuestions: 3,
        completedAt: new Date().toISOString(),
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        analysis: {
          strengths: ['JavaScript', 'React'],
          weaknesses: ['Advanced Concepts'],
          recommendations: ['Practice more advanced JavaScript patterns']
        }
      }
      
      setIsCompleted(true)
      onComplete(mockResults)
    } catch (error) {
      console.error('Error submitting quiz:', error)
    } finally {
      setIsLoading(false)
    }
  }, [attemptId, answers, onComplete])

  // Handle answer submission
  const handleAnswer = useCallback((answer: string, timeTaken: number) => {
    if (!currentQuestion) return

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeTaken
    }

    setAnswers(prev => [...prev, newAnswer])
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      getNextQuestion()
    }, 500)
  }, [currentQuestion, getNextQuestion])

  // Timer effect
  useEffect(() => {
    if (!currentQuestion || isCompleted) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up - submit current answer and move to next
          handleAnswer('', 300)
          return 300
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion, isCompleted, handleAnswer])

  // Start quiz on mount
  useEffect(() => {
    startQuiz()
  }, [startQuiz])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (currentQuestionIndex / totalQuestions) * 100

  if (isLoading && !currentQuestion) {
    return (
      <div className={cn('glass-card p-8 rounded-2xl text-center', className)}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Preparing your quiz...</h3>
        <p className="text-gray-600">We're selecting the best questions for your skill level</p>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 text-center', className)}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h3>
        <p className="text-gray-600">Your results are being processed...</p>
      </motion.div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className={cn('bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 text-center', className)}>
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Quiz Error</h3>
        <p className="text-gray-600">Unable to load questions. Please try again.</p>
      </div>
    )
  }

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Quiz Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-500" />
              <span className="font-mono text-lg font-semibold text-gray-800">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex} of {totalQuestions}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Progress</span>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            timeRemaining={timeRemaining}
            questionNumber={currentQuestionIndex}
            totalQuestions={totalQuestions}
          />
        </motion.div>
      </AnimatePresence>

      {/* Quiz Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {answers.length} questions answered
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => getNextQuestion()}
            disabled={isLoading}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <span>Skip Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
