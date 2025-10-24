# Job Application Flow - Frontend

Next.js frontend for the Job Application Flow system. Search for jobs and generate customized application materials using AI agents.

## Features

- 🔍 **Job Search** - AI-powered job search with WebSearchTool
- 📊 **Match Scoring** - See how well each job matches your profile (0-100 score)
- ✅ **Job Selection** - Select specific jobs to apply for
- 📝 **Auto-Generated Applications** - Customized CVs and motivation letters
- 🎨 **Modern UI** - Built with Next.js 14, Tailwind CSS, and shadcn/ui

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API running (locally or on HuggingFace Spaces)

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local and set your API URL
# NEXT_PUBLIC_API_URL=http://localhost:7860  # For local backend
# OR
# NEXT_PUBLIC_API_URL=https://your-username-job-app.hf.space  # For HF Spaces
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Configuration

### Environment Variables

Create a `.env.local` file (see `.env.example`):

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:7860

# Optional: HuggingFace Token (for private Spaces)
NEXT_PUBLIC_HF_TOKEN=
```

**For Private Spaces:**
1. Get token from https://huggingface.co/settings/tokens
2. Add to `NEXT_PUBLIC_HF_TOKEN` in `.env.local`
3. See [SETUP_WITH_TOKEN.md](SETUP_WITH_TOKEN.md) for details

## Usage

### 1. Search Jobs

Click **"Search Jobs"** to start an AI-powered job search:
- Searches for jobs in Netherlands
- Filters by: English language, 0-5 years experience, recent postings
- Returns 8-12 matched jobs with scores

### 2. Review Results

Jobs appear with:
- **Match Score** (0-100) - How well the job matches your profile
- Job title, company, location
- Key requirements and skills
- Direct link to job posting

### 3. Select Jobs

- Click job cards to select
- Use "Select All" / "Deselect All" buttons
- Selection count shown in Generate button

### 4. Generate Applications

Click **"Generate Applications"** to create:
- Customized CV for each job
- Tailored motivation letter (250-400 words)
- Match summary with strengths and gaps

Applications saved to backend `storage/applications/` folder.

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # Main page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── JobCard.tsx
│   │   ├── JobList.tsx
│   │   ├── MatchScore.tsx
│   │   ├── SearchButton.tsx
│   │   └── LoadingState.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useJobSearch.ts
│   │   └── useApplications.ts
│   └── lib/             # Utilities
│       ├── api.ts       # API client (with HF token support)
│       ├── types.ts     # TypeScript types
│       └── utils.ts     # Helper functions
├── .env.local           # Environment variables (gitignored)
├── .env.example         # Template
└── package.json         # Dependencies
```

## API Integration

The frontend connects to the backend API (FastAPI):

**Endpoints used:**
- `POST /api/search-jobs` - Trigger job search
- `GET /api/search-jobs/{id}` - Get search results
- `POST /api/generate-applications` - Generate materials
- `GET /api/status/{id}` - Check generation status

**Authentication:**
- Public Spaces: No token needed
- Private Spaces: Add `NEXT_PUBLIC_HF_TOKEN` to `.env.local`

See [SETUP_WITH_TOKEN.md](SETUP_WITH_TOKEN.md) for details.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL = https://your-backend-url
# NEXT_PUBLIC_HF_TOKEN = hf_your_token (if private Space)
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next

# Add environment variables in Netlify dashboard
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Technologies

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **HTTP Client:** Axios
- **State Management:** React Hooks

## Documentation

- [SETUP_WITH_TOKEN.md](SETUP_WITH_TOKEN.md) - Private Space access guide
- [SETUP.md](SETUP.md) - Detailed setup instructions
- Backend: See `../HUGGINGFACE_DEPLOYMENT.md`

## Troubleshooting

### CORS Errors

**Issue:** `CORS policy blocked`

**Solution:** Backend CORS must allow your frontend domain:
- Localhost: Already allowed by default
- Production: Add domain to backend CORS config

### 401 Unauthorized

**Issue:** Token authentication failed

**Solution:** 
1. Generate new token from https://huggingface.co/settings/tokens
2. Use **Read** access token
3. Update `NEXT_PUBLIC_HF_TOKEN` in `.env.local`
4. Restart dev server

### Jobs Not Loading

**Issue:** "Search Jobs" doesn't return results

**Solution:**
1. Check backend is running
2. Verify `NEXT_PUBLIC_API_URL` is correct
3. Check browser console for errors
4. Test backend directly: `curl $API_URL/health`

## Contributing

This is a personal project, but feel free to fork and customize!

## License

MIT

## Support

- Backend API: See `../QUICK_START.md`
- OpenAI Agents SDK: https://openai.github.io/openai-agents-python/
- Next.js: https://nextjs.org/docs

---

**Built with OpenAI Agents SDK and Next.js 14** 🚀
