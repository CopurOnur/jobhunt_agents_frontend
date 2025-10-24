import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jobApi } from '@/lib/api';
import type { JobPosting } from '@/lib/types';

export function useJobSearch() {
  const [searchId, setSearchId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Trigger job search
  const triggerSearch = useCallback(async () => {
    setIsSearching(true);
    try {
      const response = await jobApi.searchJobs();
      setSearchId(response.search_id);
      return response.search_id;
    } catch (error) {
      console.error('Error triggering job search:', error);
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Poll for job postings
  const {
    data: jobPostings,
    isLoading: isLoadingJobs,
    error: jobsError,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ['jobPostings', searchId],
    queryFn: () => jobApi.getJobPostings(searchId!),
    enabled: !!searchId,
    refetchInterval: (data) => {
      // Stop polling when status is completed or failed
      if (data?.status === 'completed' || data?.status === 'failed') {
        return false;
      }
      return 2000; // Poll every 2 seconds
    },
  });

  const jobs: JobPosting[] = jobPostings?.job_postings || [];
  const status = jobPostings?.status;
  const isCompleted = status === 'completed';
  const isFailed = status === 'failed';

  return {
    triggerSearch,
    isSearching,
    jobs,
    searchId,
    status,
    isLoadingJobs,
    isCompleted,
    isFailed,
    jobsError,
    refetchJobs,
  };
}
