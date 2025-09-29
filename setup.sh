#!/bin/bash

echo "🚀 Setting up FutureFit - AI Resume Analyzer"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Google Gemini API Key (Required)
GEMINI_API_KEY=your_gemini_api_key_here

# NextAuth Configuration (Optional)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# MongoDB (Optional)
MONGODB_URI=your_mongodb_connection_string_here
EOF
    echo "✅ Created .env.local file"
    echo "⚠️  Please update .env.local with your actual API keys"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Get your Google Gemini API key from: https://makersuite.google.com/app/apikey"
echo "2. Update .env.local with your API key"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "🔗 Useful links:"
echo "   - Resume Analyzer: http://localhost:3000/resume-analyzer"
echo "   - Career Discovery: http://localhost:3000/career"
echo "   - Documentation: README.md"
echo ""
echo "Happy coding! 🚀"

