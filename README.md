# FutureFit Resume Analyzer

Advanced AI-powered resume analysis application with Google Gemini AI integration.

## 🚀 Features

- **Real-time Resume Analysis** using Google Gemini AI
- **Multiple Analysis Types**: Comprehensive, Skills Focus, Career Path
- **File Upload Support**: PDF, DOC, DOCX, TXT
- **Interactive Dashboard** with smooth animations
- **AI Chatbot Integration** for personalized assistance
- **Modern UI/UX** with Framer Motion animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini AI
- **Authentication**: NextAuth.js
- **Database**: MongoDB Atlas
- **Deployment**: Vercel Ready

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Google Cloud Console account
- Google Gemini AI API key

## 🔧 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/vamsipaul1/Future-fit-Anayzer--AI.git
cd Future-fit-Anayzer--AI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:4000
NEXTAUTH_SECRET=your-super-secret-key

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futurefit?retryWrites=true&w=majority

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Database Setup
```bash
npm run db:generate
npm run db:push
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:4000` to see the application.

## 🎯 Usage

1. **Sign Up/Login** using Google OAuth
2. **Upload Resume** in PDF, DOC, DOCX, or TXT format
3. **Choose Analysis Type**: Comprehensive, Skills, or Career-focused
4. **Get AI Insights** with real-time analysis
5. **View Results** with scores, recommendations, and missing skills

## 🔐 Security

- Environment variables are properly secured
- Sensitive files are excluded via `.gitignore`
- API keys are not exposed in the repository

## 📱 Pages

- `/dashboard` - Main dashboard with onboarding
- `/resume-analyzer` - Advanced resume analysis
- `/career-decision` - Career path analysis
- `/skill-analysis` - Skills assessment
- `/analyze` - General analysis tools

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel** (Recommended)
- **Netlify**
- **Railway**
- **Heroku**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email vamsipaul1@gmail.com or create an issue on GitHub.