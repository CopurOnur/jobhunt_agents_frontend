# Frontend Setup - Complete Guide

## ✅ All Files Created!

All necessary files have been created. Here's how to run the frontend:

## Quick Start

### 1. Install Dependencies (First Time Only)

```bash
cd /Users/onurcopur/Desktop/code/openai_agents/frontend
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- React Query
- Axios
- Lucide Icons

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open Browser

Go to: **http://localhost:3000**

You should see the Job Application Flow dashboard!

## ✅ Files Created

### App Files (src/app/)
- ✅ `globals.css` - Global styles with Tailwind
- ✅ `layout.tsx` - Root layout component
- ✅ `page.tsx` - Main dashboard page
- ✅ `providers.tsx` - React Query provider

### Components (src/components/)
- ✅ `JobCard.tsx` - Individual job card with selection
- ✅ `JobList.tsx` - List of jobs with bulk actions
- ✅ `MatchScore.tsx` - Match score badge
- ✅ `SearchButton.tsx` - Search trigger button
- ✅ `LoadingState.tsx` - Loading spinner

### Hooks (src/hooks/)
- ✅ `useJobSearch.ts` - Job search state management
- ✅ `useApplications.ts` - Application generation state

### Library (src/lib/)
- ✅ `api.ts` - API client with axios
- ✅ `types.ts` - TypeScript interfaces
- ✅ `utils.ts` - Utility functions

### Configuration
- ✅ `package.json` - Dependencies
- ✅ `tsconfig.json` - TypeScript config
- ✅ `tailwind.config.ts` - Tailwind config
- ✅ `next.config.js` - Next.js config
- ✅ `.env.local` - Environment variables

## Common Issues

### Issue 1: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules if exists
rm -rf node_modules

# Reinstall
npm install
```

### Issue 2: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or run on different port
npm run dev -- -p 3001
```

### Issue 3: Module not found errors

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

### Issue 4: TypeScript errors

**Solution:**
These are warnings and won't prevent the app from running. The app will still work!

## Verify Everything Works

### 1. Check Frontend Loads
- Open http://localhost:3000
- Should see "Job Application Flow" title
- Should see "Search Jobs" button

### 2. Check Backend Connection
- Click "Search Jobs"
- Should see "Searching for jobs..." message
- Should NOT see 404 error
- Should NOT see CORS error in browser console

### 3. Full Flow Test
1. Click "Search Jobs"
2. Wait 30-60 seconds
3. Jobs should appear with match scores (green/yellow/red badges)
4. Click on jobs to select them
5. Click "Generate Applications"
6. Wait 1-2 minutes
7. Success message should appear

## Troubleshooting

### Backend Not Running?

```bash
# In separate terminal
cd /Users/onurcopur/Desktop/code/openai_agents/job_application_flow
python app.py
```

### Check Browser Console

1. Open DevTools (F12 or Cmd+Option+I)
2. Go to Console tab
3. Look for errors (should be none!)
4. Check Network tab for API calls

### Enable Verbose Logging

All API calls are automatically logged to the browser console.

## Environment Variables

The `.env.local` file should contain:

```env
NEXT_PUBLIC_API_URL=http://localhost:7860
```

For production (Vercel), change to your HuggingFace Space URL:
```env
NEXT_PUBLIC_API_URL=https://your-space.hf.space
```

## Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# NEXT_PUBLIC_API_URL = your backend URL
```

---

## 🎉 You're All Set!

The frontend is now complete and ready to use. Just run `npm run dev` and open http://localhost:3000!
