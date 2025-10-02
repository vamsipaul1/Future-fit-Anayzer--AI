# MongoDB Setup Instructions

## Option 1: Local MongoDB Installation

1. **Download MongoDB Community Server:**
   - Go to https://www.mongodb.com/try/download/community
   - Download and install MongoDB Community Server

2. **Start MongoDB Service:**
   ```bash
   # Windows (if installed as service)
   net start MongoDB
   
   # Or start manually
   mongod --dbpath C:\data\db
   ```

3. **Verify MongoDB is running:**
   ```bash
   mongo
   ```

## Option 2: MongoDB Atlas (Cloud)

1. **Create free account at:** https://www.mongodb.com/atlas
2. **Create a cluster**
3. **Get connection string**
4. **Update .env.local:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futurefit
   ```

## Option 3: Docker (if you have Docker installed)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Testing the Connection

Once MongoDB is running, your Next.js app will automatically connect when you:
1. Visit the homepage
2. Click "Sign in with Google"
3. Complete Google OAuth
4. Get redirected to dashboard

The app will create the `UserLogin` collection automatically on first user signup.
