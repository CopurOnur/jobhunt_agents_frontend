import axios from 'axios';
import type {
  SearchJobsResponse,
  JobPostingsResponse,
  GenerateApplicationsRequest,
  GenerateApplicationsResponse,
  StatusResponse,
  WriterStartRequest,
  WriterSessionResponse,
  WriterStatusResponse,
  WriterRefineRequest,
  WriterSaveResponse,
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

export const writerApi = {
  // Start a new writer session
  startSession: async (request: WriterStartRequest): Promise<WriterSessionResponse> => {
    const response = await api.post<WriterSessionResponse>('/api/writer/start', request);
    return response.data;
  },

  // Get writer session status and materials
  getSession: async (sessionId: string): Promise<WriterStatusResponse> => {
    const response = await api.get<WriterStatusResponse>(`/api/writer/session/${sessionId}`);
    return response.data;
  },

  // Refine materials with a new request
  refineSession: async (
    sessionId: string,
    request: WriterRefineRequest
  ): Promise<WriterSessionResponse> => {
    const response = await api.post<WriterSessionResponse>(
      `/api/writer/refine/${sessionId}`,
      request
    );
    return response.data;
  },

  // Save current materials to files
  saveSession: async (sessionId: string): Promise<WriterSaveResponse> => {
    const response = await api.post<WriterSaveResponse>(`/api/writer/save/${sessionId}`);
    return response.data;
  },
};
