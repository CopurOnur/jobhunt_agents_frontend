# Frontend Implementation Guide

## ✅ Completed Files

The following files have been created in `/Users/onurcopur/Desktop/code/openai_agents/frontend/`:

### Configuration Files
- ✅ `package.json` - Dependencies and scripts
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tailwind.config.ts` - Tailwind CSS configuration
- ✅ `next.config.js` - Next.js configuration
- ✅ `postcss.config.js` - PostCSS configuration
- ✅ `.env.local.example` - Environment variables template

### Library Files (src/lib/)
- ✅ `types.ts` - TypeScript interfaces for API responses
- ✅ `api.ts` - API client with axios
- ✅ `utils.ts` - Utility functions for styling

### Hooks (src/hooks/)
- ✅ `useJobSearch.ts` - Hook for job search functionality
- ✅ `useApplications.ts` - Hook for application generation

### Components (src/components/)
- ✅ `MatchScore.tsx` - Match score badge component
- ✅ `JobCard.tsx` - Individual job posting card

## 📝 Remaining Files to Create

### Components

#### src/components/JobList.tsx
```typescript
import { useState } from 'react';
import { JobCard } from './JobCard';
import type { JobPosting } from '@/lib/types';

interface JobListProps {
  jobs: JobPosting[];
  selectedJobIds: Set<string>;
  onToggleJob: (index: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function JobList({ jobs, selectedJobIds, onToggleJob, onSelectAll, onDeselectAll }: JobListProps) {
  const allSelected = selectedJobIds.size === jobs.length && jobs.length > 0;
  const someSelected = selectedJobIds.size > 0 && selectedJobIds.size < jobs.length;

  return (
    <div>
      {/* Header with bulk actions */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            Found {jobs.length} Jobs
          </h2>
          {selectedJobIds.size > 0 && (
            <span className="text-sm text-gray-600">
              ({selectedJobIds.size} selected)
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={allSelected ? onDeselectAll : onSelectAll}
            className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            job={job}
            index={index}
            isSelected={selectedJobIds.has(String(index))}
            onToggle={() => onToggleJob(index)}
          />
        ))}
      </div>
    </div>
  );
}
```

#### src/components/LoadingState.tsx
```typescript
export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
}
```

#### src/components/SearchButton.tsx
```typescript
import { Search, Loader2 } from 'lucide-react';

interface SearchButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function SearchButton({ onClick, isLoading, disabled }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Searching for Jobs...
        </>
      ) : (
        <>
          <Search className="h-5 w-5" />
          Search Jobs
        </>
      )}
    </button>
  );
}
```

### App Files

#### src/app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

#### src/app/layout.tsx
```typescript
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Application Flow',
  description: 'AI-powered job search and application generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

#### src/app/providers.tsx
```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

#### src/app/page.tsx
```typescript
'use client';

import { useState } from 'react';
import { useJobSearch } from '@/hooks/useJobSearch';
import { useApplications } from '@/hooks/useApplications';
import { SearchButton } from '@/components/SearchButton';
import { JobList } from '@/components/JobList';
import { LoadingState } from '@/components/LoadingState';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function Home() {
  const [selectedJobIds, setSelectedJobIds] = useState<Set<string>>(new Set());

  const {
    triggerSearch,
    isSearching,
    jobs,
    searchId,
    status: searchStatus,
    isLoadingJobs,
    isCompleted: searchCompleted,
  } = useJobSearch();

  const {
    generateApplications,
    isGenerating,
    status: genStatus,
    isCompleted: genCompleted,
    applicationsGenerated,
  } = useApplications();

  const handleToggleJob = (index: number) => {
    const newSet = new Set(selectedJobIds);
    const id = String(index);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedJobIds(newSet);
  };

  const handleSelectAll = () => {
    setSelectedJobIds(new Set(jobs.map((_, i) => String(i))));
  };

  const handleDeselectAll = () => {
    setSelectedJobIds(new Set());
  };

  const handleGenerateApplications = async () => {
    await generateApplications(Array.from(selectedJobIds), searchId || undefined);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Job Application Flow
          </h1>
          <p className="text-gray-600">
            AI-powered job search and personalized application generator
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Step 1: Search for Jobs</h2>
              <p className="text-sm text-gray-600">
                Find relevant positions and see how well they match your profile
              </p>
            </div>
            <SearchButton
              onClick={triggerSearch}
              isLoading={isSearching || searchStatus === 'running'}
              disabled={searchStatus === 'running'}
            />
          </div>

          {/* Search Status */}
          {searchStatus && searchStatus !== 'completed' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm text-blue-900">
                Searching for jobs... This may take a minute.
              </span>
            </div>
          )}
        </div>

        {/* Jobs List */}
        {searchCompleted && jobs.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <JobList
              jobs={jobs}
              selectedJobIds={selectedJobIds}
              onToggleJob={handleToggleJob}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
            />
          </div>
        )}

        {/* Generate Applications Section */}
        {searchCompleted && selectedJobIds.size > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Step 2: Generate Applications
                </h2>
                <p className="text-sm text-gray-600">
                  Create customized CVs and motivation letters for {selectedJobIds.size} selected{' '}
                  {selectedJobIds.size === 1 ? 'job' : 'jobs'}
                </p>
              </div>
              <button
                onClick={handleGenerateApplications}
                disabled={isGenerating || genStatus === 'running'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating || genStatus === 'running' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Applications</>
                )}
              </button>
            </div>

            {/* Generation Status */}
            {genStatus && (
              <div className="mt-4">
                {genStatus === 'running' && (
                  <div className="p-4 bg-green-50 rounded-md flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-green-600" />
                    <span className="text-sm text-green-900">
                      Generating applications... This may take a few minutes.
                    </span>
                  </div>
                )}
                {genCompleted && (
                  <div className="p-4 bg-green-100 rounded-md flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-900">
                      Successfully generated {applicationsGenerated} applications!
                      Check the storage/applications folder for your customized materials.
                    </span>
                  </div>
                )}
                {genStatus === 'failed' && (
                  <div className="p-4 bg-red-100 rounded-md flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="text-sm text-red-900">
                      Failed to generate applications. Please try again.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd /Users/onurcopur/Desktop/code/openai_agents/frontend
npm install
```

### 2. Configure Environment
```bash
cp .env.local.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL
```

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

### 4. Build for Production
```bash
npm run build
npm start
```

### 5. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/onurcopur/Desktop/code/openai_agents/frontend
vercel

# Set environment variable in Vercel dashboard:
# NEXT_PUBLIC_API_URL = https://your-hf-space.hf.space
```

## ✅ Backend is Ready

The backend already has all necessary endpoints:
- ✅ POST `/api/search-jobs` - Search for jobs
- ✅ GET `/api/search-jobs/{search_id}` - Get job postings with match scores
- ✅ POST `/api/generate-applications` - Generate apps for selected jobs
- ✅ GET `/api/status/{generation_id}` - Check generation status
- ✅ CORS enabled for frontend access

## 🧪 Testing

1. Start backend: `cd job_application_flow && python app.py`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:3000
4. Click "Search Jobs" and wait for results
5. Select jobs and click "Generate Applications"

## 📋 Features

✅ Job search with AI-powered match scoring (0-100%)
✅ Jobs sorted by relevance (highest match first)
✅ Select individual jobs or bulk select/deselect
✅ Visual match score badges (green/yellow/red)
✅ Real-time status updates via polling
✅ Responsive design
✅ Loading states and error handling
✅ Direct links to original job postings

