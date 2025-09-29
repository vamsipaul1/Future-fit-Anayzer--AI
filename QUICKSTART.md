# 🚀 Quick Start Guide

Get FutureFit AI Resume Analyzer running in 5 minutes!

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### 3. Configure Environment
Create `.env.local` file:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in Browser
- Main App: http://localhost:3000
- Resume Analyzer: http://localhost:3000/resume-analyzer
- Career Discovery: http://localhost:3000/career

## 🎯 Test the Resume Analyzer

1. **Upload a Resume**: Drag & drop a PDF/DOCX file
2. **Enter Job Details**: 
   - Job Title: "Software Engineer"
   - Domain: "Technology"
   - Job Description: Paste any job posting
3. **Click Analyze**: Watch AI analyze your skills
4. **View Results**: See matched/missing skills and recommendations

## 🔧 Troubleshooting

### API Key Issues
- ✅ Make sure your Gemini API key is correct
- ✅ Check if the key has proper permissions
- ✅ Ensure no extra spaces in `.env.local`

### File Upload Issues
- ✅ Supported formats: PDF, DOCX, DOC, TXT
- ✅ Max file size: 10MB
- ✅ Try different browsers if upload fails

### Build Errors
- ✅ Run `npm install` to ensure all dependencies are installed
- ✅ Check Node.js version (18+ required)
- ✅ Clear `.next` folder and rebuild

## 📱 Features Overview

### Resume Analyzer
- ✅ **File Upload**: Drag & drop interface
- ✅ **AI Analysis**: Google Gemini-powered skill extraction
- ✅ **Visual Charts**: Interactive skill analysis
- ✅ **Recommendations**: Learning paths for missing skills
- ✅ **Career Insights**: AI-generated advice

### Career Discovery
- ✅ **Interactive Quiz**: 5-question assessment
- ✅ **AI Analysis**: Real-time career matching
- ✅ **Beautiful UI**: Glassmorphism design
- ✅ **Smooth Animations**: Framer Motion effects

## 🎨 UI Features

- **Glassmorphism Design**: Semi-transparent cards with glowing edges
- **Responsive Layout**: Works on desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Interactive Charts**: Recharts data visualization
- **Dark Theme**: Futuristic blue/purple color scheme

## 📊 Example Analysis

**Input:**
- Resume: "Python, SQL, Data Analysis"
- Job: "Machine Learning Engineer - Python, TensorFlow, AWS"

**Output:**
- ✅ **Matched**: Python, SQL
- ❌ **Missing**: TensorFlow, AWS
- 💡 **Recommendations**: 
  - TensorFlow: "Required for deep learning" → Learning path
  - AWS: "Cloud deployment skills" → Learning path

## 🚀 Production Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production
```env
GEMINI_API_KEY=your_production_api_key
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_secret_key
```

## 📞 Need Help?

- 📖 **Full Documentation**: README.md
- 🐛 **Report Issues**: GitHub Issues
- 💬 **Support**: Create an issue in the repository

---

**Ready to analyze resumes with AI? Let's go! 🚀**

