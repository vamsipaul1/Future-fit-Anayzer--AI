# Skill Analysis Platform

A comprehensive Next.js application for skill assessment, adaptive quizzing, and personalized learning roadmaps powered by AI.

## 🚀 Features

- **Domain Selection**: Choose from 8+ career domains (Web Dev, Data Science, Mobile, DevOps, etc.)
- **Skill Assessment**: Multi-select skills with proficiency levels (0-100%)
- **Adaptive Quiz Engine**: Intelligent question selection based on skill gaps
- **Role Fit Analysis**: Calculate compatibility with 12+ career roles
- **AI-Powered Roadmaps**: Personalized learning paths with milestones and projects
- **Interactive Dashboard**: Track progress, XP, badges, and learning streaks
- **AI Mentor Chat**: Get career advice and learning tips
- **Glassmorphism UI**: Modern, accessible design with smooth animations

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: OpenAI GPT-3.5/4, Google Gemini (pluggable abstraction)
- **Charts**: Recharts for radar charts and data visualization
- **Testing**: Jest, React Testing Library, Playwright
- **Auth**: NextAuth.js with email + OAuth providers

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd skill-analysis
npm install
```

### 2. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Create database
createdb skill_analysis_db

# Or using psql
psql -U postgres
CREATE DATABASE skill_analysis_db;
```

#### Option B: Cloud Database (Recommended)
- **Neon**: [neon.tech](https://neon.tech) (Free tier available)
- **Supabase**: [supabase.com](https://supabase.com) (Free tier available)
- **PlanetScale**: [planetscale.com](https://planetscale.com) (Free tier available)

### 3. Environment Configuration

```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your values
DATABASE_URL="postgresql://username:password@localhost:5432/skill_analysis_db"
OPENAI_API_KEY="sk-your-openai-api-key-here"
GOOGLE_GEMINI_KEY="your-gemini-api-key-here"
NEXTAUTH_SECRET="your-nextauth-secret-here"
```

### 4. Database Migration and Seeding

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
project/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── skill-map/     # Role fit analysis
│   │   ├── quiz/          # Quiz management
│   │   └── ai/            # AI suggestions
│   ├── skill-analysis/    # Main analysis page
│   └── dashboard/         # User dashboard
├── src/components/        # React components
│   └── analyze/          # Skill analysis components
├── lib/                   # Utility libraries
│   ├── db.ts             # Prisma client
│   ├── aiClient.ts       # AI provider abstraction
│   ├── scoring.ts        # Role fit algorithms
│   └── adaptiveQuiz.ts   # Quiz engine
├── prisma/               # Database schema
├── scripts/              # Database seeding
├── tests/                # Test files
└── public/               # Static assets
```

## 🎯 API Endpoints

### Skill Analysis
- `POST /api/skill-map` - Calculate role fit and missing skills
- `POST /api/quiz/start` - Initialize adaptive quiz
- `POST /api/quiz/next` - Get next question
- `POST /api/quiz/submit` - Submit quiz answers and get results

### AI Services
- `POST /api/ai/suggest` - Generate roadmaps, explanations, and mentor chat

### Development
- `POST /api/seed` - Seed database (dev only)

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### E2E Tests
```bash
# Run Playwright tests
npm run test:e2e

# Run tests in headed mode
npx playwright test --headed
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### AI Providers
The app supports multiple AI providers through a pluggable abstraction:

```typescript
// lib/aiClient.ts
import { aiClient } from '@/lib/aiClient'

// Use OpenAI
const response = await aiClient.callAI('openai', {
  prompt: 'Generate a learning roadmap',
  context: 'You are a career mentor'
})

// Use Gemini
const response = await aiClient.callAI('gemini', {
  prompt: 'Explain React hooks',
  context: 'You are a coding instructor'
})
```

### Customizing Domains and Skills
Edit `scripts/seed.ts` to add new domains, skills, or roles:

```typescript
// Add new domain
const newDomain = await prisma.domain.create({
  data: {
    name: 'Blockchain Development',
    description: 'Build decentralized applications'
  }
})

// Add new skills
const newSkill = await prisma.skill.create({
  data: {
    name: 'Solidity',
    domainId: newDomain.id
  }
})
```

## 📊 Database Schema

Key models:
- **User**: User accounts and progress tracking
- **Domain**: Career domains (Web Dev, Data Science, etc.)
- **Skill**: Individual skills within domains
- **Role**: Career roles with skill requirements
- **Question**: Quiz questions with difficulty and skill mapping
- **Attempt**: Quiz attempts and results
- **Badge**: Achievement system

## 🎨 UI Components

### Glassmorphism Design
All components use a consistent glassmorphism design:
- Semi-transparent backgrounds with backdrop blur
- Subtle borders and shadows
- Smooth animations with Framer Motion
- Accessible color contrast and keyboard navigation

### Key Components
- `SkillSelector`: Multi-select skills with level sliders
- `DomainExplorer`: Visual domain selection with icons
- `QuizRunner`: Adaptive quiz interface with timer
- `RadarChart`: Skill visualization with Recharts
- `RoadmapTimeline`: Learning milestones and projects
- `MentorChat`: AI-powered career guidance

## 🔒 Security

- Environment variables for sensitive data
- Rate limiting on AI endpoints
- Input validation and sanitization
- SQL injection prevention with Prisma
- XSS protection with React

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check PostgreSQL is running
brew services list | grep postgresql

# Verify connection string
psql "postgresql://username:password@localhost:5432/skill_analysis_db"
```

**Prisma Client Error**
```bash
# Regenerate Prisma client
npm run db:generate

# Reset database
npm run db:push --force-reset
```

**AI API Errors**
- Verify API keys in `.env.local`
- Check API quotas and billing
- Test with mock responses (fallback included)

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

- Create an issue on GitHub
- Check existing issues and discussions
- Review the troubleshooting section above

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Tailwind CSS for the utility-first styling
- Framer Motion for smooth animations
- Recharts for beautiful data visualization
- OpenAI and Google for AI capabilities

---

**Happy Learning! 🚀**