'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Loader2, MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isLoading?: boolean
}

interface MentorChatProps {
  className?: string
  placeholder?: string
  maxMessages?: number
  onMessage?: (message: string) => void
}

export function MentorChat({
  className,
  placeholder = "Ask me anything about your career, skills, or learning path...",
  maxMessages = 50,
  onMessage
}: MentorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI mentor. I can help you with:\n\n🎯 Career path guidance\n📊 Skill analysis insights\n🚀 Learning recommendations\n💼 Industry trends\n📈 Progress tracking\n\nWhat would you like to explore today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true
    }

    setMessages(prev => [...prev, userMessage, loadingMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'mentor-chat',
          prompt: content,
          context: 'You are an expert career mentor and skill development advisor. You can help with:\n- Career path guidance and planning\n- Skill analysis and assessment insights\n- Learning recommendations and roadmaps\n- Industry trends and market analysis\n- Progress tracking and goal setting\n- Interview preparation and resume optimization\n- Networking strategies and professional development\n\nProvide detailed, actionable advice with specific examples and next steps.'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? {
                ...msg,
                content: data.content,
                isLoading: false
              }
            : msg
        )
      )

      onMessage?.(content)
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? {
                ...msg,
                content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
                isLoading: false
              }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors z-50',
          className
        )}
      >
        <MessageCircle className="w-6 h-6 mx-auto" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={cn(
        'fixed bottom-6 right-6 w-96 h-[500px] glass-card rounded-2xl shadow-2xl z-50 flex flex-col',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-black">AI Mentor</h3>
            <p className="text-xs text-black">Online</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          title="Close chat"
          aria-label="Close AI mentor chat"
        >
          <X className="w-4 h-4 text-black" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                'flex',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] p-3 rounded-2xl',
                  message.type === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-black'
                )}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'assistant' && (
                    <Bot className="w-4 h-4 mt-1 text-black" />
                  )}
                  <div className="flex-1">
                    {message.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-black">Thinking...</span>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed text-black whitespace-pre-line">{message.content}</p>
                    )}
                    <p className="text-xs opacity-70 mt-1 text-black">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <User className="w-4 h-4 mt-1 text-white" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 text-sm"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-3 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Send message"
            aria-label="Send message to AI mentor"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

// Inline Chat Component for embedding in pages
interface InlineChatProps {
  className?: string
  placeholder?: string
  maxMessages?: number
  onMessage?: (message: string) => void
}

export function InlineChat({
  className,
  placeholder = "Ask me anything about your career, skills, or learning path...",
  maxMessages = 50,
  onMessage
}: InlineChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI mentor. I can help you with career advice, skill development, and learning strategies. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true
    }

    setMessages(prev => [...prev, userMessage, loadingMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'mentor-chat',
          prompt: content,
          context: 'You are an expert career mentor and skill development advisor. You can help with:\n- Career path guidance and planning\n- Skill analysis and assessment insights\n- Learning recommendations and roadmaps\n- Industry trends and market analysis\n- Progress tracking and goal setting\n- Interview preparation and resume optimization\n- Networking strategies and professional development\n\nProvide detailed, actionable advice with specific examples and next steps.'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? {
                ...msg,
                content: data.content,
                isLoading: false
              }
            : msg
        )
      )

      onMessage?.(content)
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? {
                ...msg,
                content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
                isLoading: false
              }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={cn('glass-card p-6 rounded-2xl', className)}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">AI Mentor</h3>
          <p className="text-xs text-gray-600">Ask me anything about your career</p>
        </div>
      </div>

      <div className="h-64 overflow-y-auto space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                'flex',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] p-3 rounded-2xl',
                  message.type === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-black'
                )}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'assistant' && (
                    <Bot className="w-4 h-4 mt-1 text-black" />
                  )}
                  <div className="flex-1">
                    {message.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-black">Thinking...</span>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed text-black whitespace-pre-line">{message.content}</p>
                    )}
                    <p className="text-xs opacity-70 mt-1 text-black">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <User className="w-4 h-4 mt-1 text-white" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 text-sm"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="px-3 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Send message"
          aria-label="Send message to AI mentor"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
