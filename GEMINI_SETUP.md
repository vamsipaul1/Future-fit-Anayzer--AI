# FutureFit - Gemini API Setup Guide

## Step 1: Get Your Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key (starts with "AIzaSy...")

## Step 2: Configure Environment Variables

Create a file named `.env.local` in the project root directory with:

```
GEMINI_API_KEY=your_actual_api_key_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## Step 3: Test the Setup

1. Start the development server: `npm run dev`
2. Visit: http://localhost:3000/api/test-gemini
3. You should see: `{"success":true,"message":"Gemini API is working!"}`

## Step 4: Test Resume Analysis

1. Go to: http://localhost:3000/resume-analyzer
2. Upload your resume (PDF, DOCX, DOC, TXT)
3. Fill in job details
4. Click "Start AI Analysis"
5. Watch the real-time analysis with your actual resume content

## Troubleshooting

- If you see "GEMINI_API_KEY not configured", check your `.env.local` file
- If analysis shows generic results, verify the API key is correct
- Check browser console for detailed logging of the analysis process

## Important Notes

- The API key should start with "AIzaSy"
- Make sure `.env.local` is in the project root (same level as package.json)
- Restart the server after adding the API key
- The system will now provide 100% real AI analysis based on your actual resume content
