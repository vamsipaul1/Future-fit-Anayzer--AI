# Google Authentication Setup Guide for FutureFit

## 🔐 Complete Setup Instructions

### Step 1: Google Cloud Console Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click "Select a project" → "New Project"
   - Project name: `FutureFit-Auth`
   - Click "Create"

2. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click "Enable"

### Step 2: OAuth 2.0 Configuration

3. **Create OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" user type
   - Fill in:
     - App name: `FutureFit`
     - User support email: [Your email]
     - Developer contact: [Your email]
   - Add scopes: `email`, `profile`, `openid`
   - Save and continue

4. **Create OAuth 2.0 Client ID**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     ```
     http://localhost:4000/api/auth/callback/google
     http://localhost:3000/api/auth/callback/google
     ```
   - Click "Create"
   - **IMPORTANT**: Copy the Client ID and Client Secret

### Step 3: Environment Variables

5. **Update .env.local file**
   Replace the placeholder values in `.env.local`:
   ```
   NEXTAUTH_URL=http://localhost:4000
   NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
   GOOGLE_CLIENT_ID=your_actual_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
   MONGODB_URI=mongodb://localhost:27017/futurefit
   ```

### Step 4: MongoDB Setup (Optional)

6. **Install MongoDB** (if not already installed)
   - Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Install and start MongoDB service
   - Or use MongoDB Atlas (cloud version)

### Step 5: Testing

7. **Start the Development Server**
   ```bash
   npm run dev
   ```

8. **Test Authentication Flow**
   - Visit `http://localhost:4000`
   - Click any CTA button → Signup page
   - Fill form and submit → Google Auth
   - Complete Google authentication
   - Should redirect to dashboard

## 🚨 Important Notes

- **Client ID & Secret**: Keep these secure, never commit to version control
- **Redirect URIs**: Must match exactly what you configured in Google Console
- **NEXTAUTH_SECRET**: Generate a strong secret key for production
- **MongoDB**: Required for user data storage

## 🔧 Troubleshooting

### Common Issues:
1. **"Invalid redirect URI"**: Check redirect URIs in Google Console
2. **"Client ID not found"**: Verify Client ID in .env.local
3. **"MongoDB connection failed"**: Ensure MongoDB is running
4. **"NextAuth secret missing"**: Add NEXTAUTH_SECRET to .env.local

### Production Deployment:
- Update redirect URIs to your production domain
- Use environment variables in production
- Generate new NEXTAUTH_SECRET for production
- Use MongoDB Atlas or production MongoDB instance

## 📋 Checklist

- [ ] Google Cloud Project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Client ID created
- [ ] Redirect URIs added
- [ ] Client ID and Secret copied
- [ ] .env.local file updated
- [ ] MongoDB running
- [ ] Development server started
- [ ] Authentication flow tested

## 🎯 Next Steps

1. Complete Google Cloud Console setup
2. Update .env.local with real credentials
3. Test the authentication flow
4. Deploy to production with production credentials
