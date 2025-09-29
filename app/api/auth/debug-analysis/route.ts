import { NextRequest, NextResponse } from 'next/server'

// Debug analysis API for development and testing
interface DebugInfo {
  requestId: string;
  timestamp: string;
  userAgent: string;
  ip: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: any;
  processingTime: number;
  memoryUsage: NodeJS.MemoryUsage;
  environment: {
    nodeVersion: string;
    platform: string;
    arch: string;
  };
}

function getDebugInfo(request: NextRequest, startTime: number, body: any): DebugInfo {
  const endTime = Date.now()
  
  return {
    requestId: `debug_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    userAgent: request.headers.get('user-agent') || 'Unknown',
    ip: request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || 
        'Unknown',
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    body: body,
    processingTime: endTime - startTime,
    memoryUsage: process.memoryUsage(),
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    }
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await request.json()
    
    // Simulate some processing
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000))
    
    const debugInfo = getDebugInfo(request, startTime, body)
    
    return NextResponse.json({
      success: true,
      message: 'Debug analysis completed',
      debug: debugInfo,
      analysis: {
        skills: body.skills || [],
        experience: body.experience || 'Not provided',
        processingTime: debugInfo.processingTime,
        memoryUsed: `${Math.round(debugInfo.memoryUsage.heapUsed / 1024 / 1024)} MB`,
        recommendations: [
          'This is a debug analysis - not for production use',
          'Check console logs for detailed information',
          'Verify API endpoints are working correctly'
        ]
      }
    })

  } catch (error) {
    const debugInfo = getDebugInfo(request, startTime, { error: error.message })
    
    return NextResponse.json({
      success: false,
      error: 'Debug analysis failed',
      debug: debugInfo,
      errorDetails: {
        message: error.message,
        stack: error.stack,
        processingTime: debugInfo.processingTime
      }
    }, { status: 500 })
  }
}

export async function GET() {
  const startTime = Date.now()
  
  try {
    const debugInfo = getDebugInfo(
      new Request('http://localhost:3000/api/auth/debug-analysis'),
      startTime,
      { method: 'GET' }
    )
    
    return NextResponse.json({
      success: true,
      message: 'Debug analysis API is working',
      debug: debugInfo,
      endpoints: {
        'POST /api/auth/debug-analysis': 'Run debug analysis with request data',
        'GET /api/auth/debug-analysis': 'Get API status and debug information'
      },
      features: [
        'Request/response debugging',
        'Performance monitoring',
        'Memory usage tracking',
        'Environment information',
        'Error logging and analysis'
      ],
      usage: {
        description: 'Use this endpoint to debug API calls and analyze performance',
        example: {
          method: 'POST',
          url: '/api/auth/debug-analysis',
          body: {
            skills: ['JavaScript', 'React'],
            experience: '2-3 years'
          }
        }
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Debug API failed',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
