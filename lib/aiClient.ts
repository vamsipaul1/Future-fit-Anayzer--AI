import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'

export type AIProvider = 'openai' | 'gemini'

export interface AIRequest {
  prompt: string
  context?: string
  maxTokens?: number
  temperature?: number
}

export interface AIResponse {
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

class AIClient {
  private openai: OpenAI | null = null
  private genAI: GoogleGenerativeAI | null = null

  constructor() {
    // Initialize OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    }

    // Initialize Gemini
    if (process.env.GOOGLE_GEMINI_KEY) {
      this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY)
    }
  }

  async callAI(provider: AIProvider, request: AIRequest): Promise<AIResponse> {
    try {
      switch (provider) {
        case 'openai':
          return await this.callOpenAI(request)
        case 'gemini':
          return await this.callGemini(request)
        default:
          throw new Error(`Unsupported AI provider: ${provider}`)
      }
    } catch (error) {
      console.error(`AI call failed for provider ${provider}:`, error)
      // Return mock response for development
      return this.getMockResponse(request)
    }
  }

  private async callOpenAI(request: AIRequest): Promise<AIResponse> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured')
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: request.context || 'You are a helpful assistant for skill analysis and career guidance.',
        },
        {
          role: 'user',
          content: request.prompt,
        },
      ],
      max_tokens: request.maxTokens || 1000,
      temperature: request.temperature || 0.7,
    })

    const choice = response.choices[0]
    if (!choice?.message?.content) {
      throw new Error('No response from OpenAI')
    }

    return {
      content: choice.message.content,
      usage: response.usage ? {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens,
      } : undefined,
    }
  }

  private async callGemini(request: AIRequest): Promise<AIResponse> {
    if (!this.genAI) {
      throw new Error('Google Gemini API key not configured')
    }

    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const fullPrompt = request.context 
      ? `${request.context}\n\n${request.prompt}`
      : request.prompt

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: {
        maxOutputTokens: request.maxTokens || 1000,
        temperature: request.temperature || 0.7,
      },
    })

    const response = await result.response
    const text = response.text()

    return {
      content: text,
      usage: {
        promptTokens: 0, // Gemini doesn't provide detailed usage in this version
        completionTokens: 0,
        totalTokens: 0,
      },
    }
  }

  private getMockResponse(request: AIRequest): AIResponse {
    // Mock responses for development
    if (request.prompt.includes('roadmap')) {
      return {
        content: JSON.stringify({
          milestones: [
            {
              title: 'Learn React Fundamentals',
              durationWeeks: 4,
              resources: ['React Official Docs', 'FreeCodeCamp React Course']
            },
            {
              title: 'Build Portfolio Projects',
              durationWeeks: 6,
              resources: ['GitHub', 'Vercel Deployment Guide']
            }
          ],
          projects: [
            {
              title: 'E-commerce MERN Stack App',
              difficulty: 'Medium',
              description: 'Build a full-stack e-commerce application'
            }
          ]
        }),
      }
    }

    if (request.prompt.includes('skill')) {
      return {
        content: 'Based on your current skills, I recommend focusing on React and Node.js to become a full-stack developer. Consider taking advanced courses in state management and API design.',
      }
    }

    return {
      content: 'This is a mock AI response. Configure your API keys to get real responses.',
    }
  }
}

export const aiClient = new AIClient()

// Helper functions for common AI tasks
export async function generateRoadmap(
  skills: Array<{ skillId: string; level: number }>,
  goal: string,
  provider: AIProvider = 'gemini'
): Promise<any> {
  const prompt = `Generate a personalized learning roadmap for someone with these skills: ${JSON.stringify(skills)}. Their goal is: ${goal}. Return a JSON object with milestones and projects.`
  
  const response = await aiClient.callAI(provider, {
    prompt,
    context: 'You are a career guidance expert. Generate structured learning roadmaps.',
  })

  try {
    return JSON.parse(response.content)
  } catch {
    return {
      milestones: [
        {
          title: 'Continue Learning',
          durationWeeks: 8,
          resources: ['Online Courses', 'Practice Projects']
        }
      ],
      projects: [
        {
          title: 'Portfolio Project',
          difficulty: 'Medium',
          description: 'Build a project showcasing your skills'
        }
      ]
    }
  }
}

export async function generateSkillSuggestions(
  domain: string,
  provider: AIProvider = 'gemini'
): Promise<string[]> {
  const prompt = `Suggest 5 trending skills for the ${domain} domain in 2024. Return as a JSON array of strings.`
  
  const response = await aiClient.callAI(provider, {
    prompt,
    context: 'You are a tech industry expert. Provide current, relevant skill suggestions.',
  })

  try {
    return JSON.parse(response.content)
  } catch {
    return ['React', 'TypeScript', 'Node.js', 'Docker', 'AWS']
  }
}
