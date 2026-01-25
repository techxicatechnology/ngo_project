# Deployment Guide

This guide will help you deploy the frontend on Vercel and backend on Render.

## Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Navigate to client directory
cd client

# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure the project:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-render-app.onrender.com/api`
   (Replace with your actual Render backend URL)
5. Click "Deploy"

### Step 2: Set Environment Variables in Vercel

After deployment, go to your Vercel project settings → Environment Variables and add:

- `VITE_API_URL` = `https://your-render-app.onrender.com/api`

## Backend Deployment (Render)

### Step 1: Deploy to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure the service:
   - **Name**: `ngo-server` (or any name you prefer)
   - **Environment**: `Node`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose a paid plan)

### Step 2: Set Environment Variables in Render

In your Render service dashboard, go to "Environment" and add:

- `MONGO_URI` = Your MongoDB connection string
- `JWT_SECRET` = Your JWT secret key
- `FRONTEND_URL` = `https://your-vercel-app.vercel.app`
  (Replace with your actual Vercel frontend URL)
- `CLOUDINARY_CLOUD_NAME` = (if using Cloudinary)
- `CLOUDINARY_API_KEY` = (if using Cloudinary)
- `CLOUDINARY_API_SECRET` = (if using Cloudinary)
- `NODE_ENV` = `production`

### Step 3: Deploy

Click "Create Web Service" and Render will start building and deploying your backend.

## Important Notes

1. **CORS Configuration**: The backend is configured to accept requests from:
   - Your Vercel frontend URL (set via `FRONTEND_URL`)
   - `http://localhost:5173` (for local development)

2. **API URL**: After deploying both:
   - Update `VITE_API_URL` in Vercel to point to your Render backend URL
   - Update `FRONTEND_URL` in Render to point to your Vercel frontend URL

3. **Render Free Tier**: 
   - Services on the free tier spin down after 15 minutes of inactivity
   - First request after spin-down may take longer (cold start)
   - Consider upgrading to a paid plan for production use

4. **MongoDB**: Make sure your MongoDB connection string allows connections from Render's IP addresses (MongoDB Atlas allows all IPs by default with `0.0.0.0/0`)

## Testing After Deployment

1. Visit your Vercel frontend URL
2. Check browser console for any CORS errors
3. Test API endpoints to ensure they're working
4. Check Render logs if there are any issues

## Local Development

For local development, keep using:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

The axios configuration will use `http://localhost:3000/api` when `VITE_API_URL` is not set.

