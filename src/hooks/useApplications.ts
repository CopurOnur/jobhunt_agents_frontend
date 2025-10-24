import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jobApi } from '@/lib/api';

export function useApplications() {
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Trigger application generation
  const generateApplications = useCallback(
    async (jobIds: string[], searchId?: string) => {
      setIsGenerating(true);
      try {
        const response = await jobApi.generateApplications(jobIds, searchId);
        setGenerationId(response.generation_id);
        return response.generation_id;
      } catch (error) {
        console.error('Error generating applications:', error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  // Poll for generation status
  const {
    data: generationStatus,
    isLoading: isLoadingStatus,
    error: statusError,
    refetch: refetchStatus,
  } = useQuery({
    queryKey: ['generationStatus', generationId],
    queryFn: () => jobApi.getGenerationStatus(generationId!),
    enabled: !!generationId,
    refetchInterval: (query) => {
      // Stop polling when status is completed or failed
      const data = query.state.data;
      if (data?.status === 'completed' || data?.status === 'failed') {
        return false;
      }
      return 2000; // Poll every 2 seconds
    },
  });

  const status = generationStatus?.status;
  const isCompleted = status === 'completed';
  const isFailed = status === 'failed';
  const applicationsGenerated = generationStatus?.applications_generated || 0;

  return {
    generateApplications,
    isGenerating,
    generationId,
    status,
    isCompleted,
    isFailed,
    applicationsGenerated,
    generationStatus,
    isLoadingStatus,
    statusError,
    refetchStatus,
  };
}
