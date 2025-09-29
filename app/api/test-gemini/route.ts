import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'GEMINI_API_KEY not configured',
        status: 'error'
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Gemini API key is configured',
      status: 'success',
      hasApiKey: true
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to test Gemini API',
      status: 'error'
    }, { status: 500 });
  }
}
