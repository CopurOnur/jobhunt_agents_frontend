'use client';

import { useState } from 'react';
import { useJobSearch } from '@/hooks/useJobSearch';
import { useApplications } from '@/hooks/useApplications';
import { SearchButton } from '@/components/SearchButton';
import { JobList } from '@/components/JobList';
import { LoadingState } from '@/components/LoadingState';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LogoutButton } from '@/components/LogoutButton';
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
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Job Application Flow
              </h1>
              <p className="text-gray-600">
                AI-powered job search and personalized application generator
              </p>
            </div>
            <LogoutButton />
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
    </ProtectedRoute>
  );
}
