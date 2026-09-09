# KrishiSetu - Production Deployment Guide

This guide provides exact steps to deploy the KrishiSetu SIH 2026 prototype to Vercel (Frontend), Render (Backend), and MongoDB Atlas (Database).

## Prerequisites
- A GitHub account
- A MongoDB Atlas account
- A Render account
- A Vercel account

## 1. GitHub Setup
1. Initialize git in this folder (if not already done): `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial commit for KrishiSetu production"`
4. Push to a new GitHub repository.

## 2. MongoDB Atlas (Database)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Go to **Database Access** -> Add New Database User. Choose a username and password.
3. Go to **Network Access** -> Add IP Address -> Select "Allow Access from Anywhere" (`0.0.0.0/0`).
4. Go to **Databases** -> Click **Connect** -> "Connect your application".
5. Copy your connection string. It will look like:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

## 3. Render Setup (FastAPI Backend)
1. Log into [Render](https://render.com) and click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name:** krishisetu-api
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variables (Under Advanced):
   - `MONGODB_URI` = Your MongoDB Atlas Connection String
   - `DATABASE_NAME` = `krishisetu`
   - `JWT_SECRET` = A strong random string
   - `CORS_ORIGINS` = `https://your-vercel-frontend-url.vercel.app` (You will update this after deploying frontend).
5. Click **Deploy Web Service**.
6. Once deployed, copy your backend URL (e.g., `https://krishisetu-api.onrender.com`).

## 4. Vercel Setup (React Frontend)
1. Log into [Vercel](https://vercel.com) and click **Add New** -> **Project**.
2. Import your GitHub repository.
3. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
4. Add Environment Variables:
   - `VITE_API_URL` = `https://your-render-backend-url.onrender.com/api`
5. Click **Deploy**.

## 5. Final Configuration & Seeding Data
1. Now that you have the Vercel Frontend URL, go back to Render Dashboard -> Environment. Update `CORS_ORIGINS` to include your Vercel URL and restart the Render service.
2. To seed your MongoDB Atlas database with the required SIH Demo Data:
   - Open terminal on your local machine.
   - Run: `cd backend`
   - Run: `set MONGODB_URI=your-atlas-uri` (Windows) or `export MONGODB_URI="your-atlas-uri"` (Mac/Linux).
   - Run: `python scripts/seed.py`

## 6. Testing the Deployed Application
Visit your Vercel URL.
You can login using the demo credentials:
- **Farmer:** farmer@demo.com
- **Processor:** processor@demo.com
- **Admin:** admin@demo.com
- **Password:** password
