import axios from 'axios';
import type {
  SearchJobsResponse,
  JobPostingsResponse,
  GenerateApplicationsRequest,
  GenerateApplicationsResponse,
  StatusResponse,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7860';
const HF_TOKEN = process.env.NEXT_PUBLIC_HF_TOKEN;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add HuggingFace token if available (for private Spaces)
    ...(HF_TOKEN && { 'Authorization': `Bearer ${HF_TOKEN}` }),
  },
});

export const jobApi = {
  // Trigger job search
  searchJobs: async (): Promise<SearchJobsResponse> => {
    const response = await api.post<SearchJobsResponse>('/api/search-jobs');
    return response.data;
  },

  // Get job postings from a search
  getJobPostings: async (searchId: string): Promise<JobPostingsResponse> => {
    const response = await api.get<JobPostingsResponse>(`/api/search-jobs/${searchId}`);
    return response.data;
  },

  // Generate applications for selected jobs
  generateApplications: async (
    jobIds: string[],
    searchId?: string
  ): Promise<GenerateApplicationsResponse> => {
    const response = await api.post<GenerateApplicationsResponse>(
      '/api/generate-applications',
      { job_ids: jobIds },
      { params: { search_id: searchId } }
    );
    return response.data;
  },

  // Get status of application generation
  getGenerationStatus: async (generationId: string): Promise<StatusResponse> => {
    const response = await api.get<StatusResponse>(`/api/status/${generationId}`);
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<{ status: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};
