@echo off
echo 🚀 Setting up FutureFit - AI Resume Analyzer
echo ==============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    (
        echo # Google Gemini API Key ^(Required^)
        echo GEMINI_API_KEY=your_gemini_api_key_here
        echo.
        echo # NextAuth Configuration ^(Optional^)
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=your_nextauth_secret_here
        echo.
        echo # Google OAuth ^(Optional^)
        echo GOOGLE_CLIENT_ID=your_google_client_id_here
        echo GOOGLE_CLIENT_SECRET=your_google_client_secret_here
        echo.
        echo # MongoDB ^(Optional^)
        echo MONGODB_URI=your_mongodb_connection_string_here
    ) > .env.local
    echo ✅ Created .env.local file
    echo ⚠️  Please update .env.local with your actual API keys
) else (
    echo ✅ .env.local already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Get your Google Gemini API key from: https://makersuite.google.com/app/apikey
echo 2. Update .env.local with your API key
echo 3. Run 'npm run dev' to start the development server
echo 4. Open http://localhost:3000 in your browser
echo.
echo 🔗 Useful links:
echo    - Resume Analyzer: http://localhost:3000/resume-analyzer
echo    - Career Discovery: http://localhost:3000/career
echo    - Documentation: README.md
echo.
echo Happy coding! 🚀
pause

