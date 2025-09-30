# Skills-Based Assessment System

A comprehensive, privacy-focused skills assessment platform built with Next.js, Prisma, and TypeScript. This system provides robust quiz generation, scoring, analysis, and personalized recommendations while maintaining strict privacy protection.

## 🚀 Features

### Core Functionality
- **Domain Selection**: Choose from 13+ career domains
- **Skill Assessment**: Interactive quizzes with multiple question types
- **Real-time Scoring**: Advanced scoring algorithms with confidence metrics
- **Detailed Analysis**: Per-skill, per-domain, and overall performance analysis
- **Personalized Recommendations**: AI-driven learning paths and resources
- **Privacy Protection**: Anonymized user labels, no PII leakage

### Question Types
- **MCQ**: Multiple choice questions with 4 options
- **Ability**: Interactive 1-10 rating scale questions
- **Practical**: Short answer and scenario-based questions
- **Adaptive**: Questions adjust based on performance

### Analysis Features
- **Performance Metrics**: Correct/attempted/total counts
- **Confidence Scoring**: Multi-factor confidence calculation
- **Time Analysis**: Response time tracking and optimization
- **Visual Charts**: Progress bars, donut charts, performance heatmaps
- **Actionable Recommendations**: Courses, videos, articles, practice questions

## 🏗️ Architecture

### Backend Stack
- **Next.js 15**: App Router with API routes
- **Prisma**: Type-safe database ORM
- **SQLite**: Development database (PostgreSQL for production)
- **TypeScript**: Full type safety
- **Framer Motion**: Smooth animations

### Database Schema
```prisma
model User {
  id          String      @id @default(cuid())
  email       String?     @unique
  displayName String?     // Not shown in analysis
  assessments Assessment[]
}

model Assessment {
  id             String        @id @default(cuid())
  userId         String?
  domainId       String
  skillIds       String        // JSON array
  startedAt      DateTime      @default(now())
  submittedAt    DateTime?
  overallScore   Float?
  items          AssessmentItem[]
}

model Question {
  id             String   @id @default(cuid())
  text           String
  choices        String?  // JSON array
  correctChoice  String?  // Server-side only
  skillId        String
  difficulty     Int      @default(1)
  timeEstimateSec Int?    @default(45)
  isActive       Boolean  @default(true)
}
```

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── assessments/
│   │   │   ├── start/route.ts          # Start assessment
│   │   │   ├── [id]/submit/route.ts   # Submit answers
│   │   │   └── [id]/analysis/route.ts  # Get analysis
│   │   └── skill-analysis/             # Legacy APIs
│   ├── analysis/page.tsx               # New analysis page
│   ├── skill-analysis/page.tsx         # Main assessment flow
│   └── dashboard/page.tsx              # Dashboard
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── seed.ts                        # Database seeding
├── scripts/
│   ├── seed-interactive-rating-questions.ts
│   ├── seed-recommendations.ts
│   └── seed-enhanced-questions.ts
├── __tests__/
│   └── analysis.spec.ts               # Unit tests
├── samples/
│   └── analysis.json                  # Sample analysis output
├── connections.server.json           # Server configuration
├── connections.frontend.json         # Frontend configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
   git clone <repository-url>
   cd skills-assessment-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local`:
```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:4000"
   PORT=4000
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database**
```bash
   npx tsx scripts/seed-interactive-rating-questions.ts
   npx tsx scripts/seed-recommendations.ts
```

6. **Start the development server**
```bash
npm run dev
```

7. **Open your browser**
   Navigate to `http://localhost:4000`

## 🔧 Configuration

### Server Configuration (`connections.server.json`)
```json
{
  "prisma": {
    "DATABASE_URL": "file:./dev.db"
  },
  "redis": {
    "URL": "redis://localhost:6379"
  },
  "cache": {
    "analysisTtl": 86400,
    "questionTtl": 3600
  },
  "performance": {
    "maxConcurrentAssessments": 100,
    "analysisTimeoutMs": 800
  }
}
```

### Frontend Configuration (`connections.frontend.json`)
```json
{
  "apiBaseUrl": "http://localhost:4000",
  "featureFlags": {
    "showAnonymizedUser": true,
    "enableDetailedReview": false
  },
  "assessment": {
    "defaultTimeLimit": 1800,
    "maxQuestionsPerSkill": 5
  }
}
```

## 📊 API Documentation

### 1. Start Assessment
```http
POST /api/assessments/start
Content-Type: application/json

{
  "userId": "optional-user-id",
  "domainId": "domain-id",
  "skillIds": ["skill1", "skill2"],
  "timeLimitSec": 1800,
  "seed": "optional-seed"
}
```

**Response:**
```json
{
  "assessmentId": "assessment-id",
  "questions": [
    {
      "itemId": "item-id",
      "questionId": "question-id",
      "text": "Question text",
      "choices": [{"id": "c1", "text": "Option A"}],
      "skillId": "skill-id",
      "difficulty": 2,
      "timeEstimateSec": 45
    }
  ],
  "startedAt": "2025-09-30T10:00:00Z",
  "totalQuestions": 5
}
```

### 2. Submit Assessment
```http
POST /api/assessments/{assessmentId}/submit
Content-Type: application/json

{
  "userId": "optional-user-id",
  "answers": [
    {
      "itemId": "item-id",
      "selectedChoice": "c1",
      "responseTimeMs": 30000
    }
  ]
}
```

**Response:**
```json
{
  "assessmentId": "assessment-id",
  "scored": true,
  "overallPercent": 75.0,
  "submittedAt": "2025-09-30T10:30:00Z",
  "totalQuestions": 5,
  "correctAnswers": 4
}
```

### 3. Get Analysis
```http
GET /api/assessments/{assessmentId}/analysis
```

**Response:**
```json
{
  "assessmentId": "assessment-id",
  "anonymizedUserLabel": "u_12345678",
  "overall": {
    "questionsAttempted": 20,
    "correctAnswers": 15,
    "percentCorrect": 75.0,
    "timeSpentMs": 900000
  },
  "perSkill": [
    {
      "skillId": "skill-id",
      "skillName": "React.js",
      "questionsAttempted": 5,
      "correctAnswers": 4,
      "percentCorrect": 80.0,
      "avgResponseTimeMs": 45000,
      "confidenceScore": 0.72,
      "recommendations": [
        {
          "type": "course",
          "title": "Advanced React.js",
          "url": "https://example.com/courses/react-advanced",
          "priority": 1
        }
      ]
    }
  ],
  "perDomain": [
    {
      "domainId": "domain-id",
      "domainName": "Software Development",
      "percentCorrect": 75.0,
      "totalQuestions": 20,
      "correctAnswers": 15
    }
  ],
  "generatedAt": "2025-09-30T10:30:00Z"
}
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
- **Unit Tests**: Scoring algorithms, recommendation logic
- **Integration Tests**: API endpoints, database operations
- **E2E Tests**: Complete assessment flow

### Test Categories
- ✅ Scoring functions (confidence, overall, skill scores)
- ✅ Recommendation generation
- ✅ Privacy protection (anonymized labels)
- ✅ Edge cases and error handling
- ✅ Performance metrics calculation

## 🔒 Privacy & Security

### Privacy Protection
- **Anonymized Labels**: User IDs are anonymized (e.g., `u_12345678`)
- **No PII in Analysis**: Analysis responses never include email or display name
- **Server-side Scoring**: Correct answers stored server-side only
- **Opt-in Review**: Answer review requires explicit user consent

### Security Features
- **Input Validation**: All API inputs validated
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **Rate Limiting**: API endpoints rate limited
- **CORS Protection**: Proper CORS headers configured

## 📈 Performance

### Optimization Features
- **Database Indexing**: Optimized queries with proper indexes
- **Caching**: Redis caching for analysis results
- **Connection Pooling**: Efficient database connections
- **Lazy Loading**: Components loaded on demand

### Performance Targets
- **Analysis API**: < 300ms cached, < 800ms cold
- **Quiz Generation**: < 500ms
- **Question Loading**: < 200ms
- **Concurrent Users**: 100+ simultaneous assessments

## 🚀 Deployment

### Production Setup

1. **Database Migration**
   ```bash
   npx prisma migrate deploy
   ```

2. **Environment Variables**
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/db"
   NEXTAUTH_SECRET="production-secret"
   NEXTAUTH_URL="https://your-domain.com"
   REDIS_URL="redis://production-redis:6379"
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   npm start
   ```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
EXPOSE 4000
CMD ["npm", "start"]
```

## 🔧 Development

### Database Management
```bash
# Reset database
npx prisma db push --force-reset

# Generate Prisma client
npx prisma generate

# View database
npx prisma studio
```

### Adding New Questions
```bash
# Add questions for specific skills
npx tsx scripts/seed-enhanced-questions.ts

# Add recommendations
npx tsx scripts/seed-recommendations.ts
```

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Formatting
npm run format
```

## 📊 Monitoring & Analytics

### Metrics Tracked
- Assessment completion rates
- Question difficulty analysis
- User performance patterns
- Recommendation effectiveness
- API response times

### Logging
- Structured logging with context
- Error tracking with Sentry
- Performance monitoring
- User action analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Comprehensive test coverage
- Documentation for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the test cases
- Contact the development team

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Complete assessment system
- Privacy-focused analysis
- Comprehensive recommendations
- Full test coverage

---

**Built with ❤️ using Next.js, Prisma, and TypeScript**