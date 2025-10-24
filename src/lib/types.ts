// API Response Types

export interface JobPosting {
  title: string;
  company: string;
  location: string;
  posting_date: string;
  url: string;
  description: string;
  requirements: string[];
  skills: string[];
  match_score: number;
}

export interface SearchJobsResponse {
  search_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
  timestamp: string;
}

export interface JobPostingsResponse {
  search_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  job_postings: JobPosting[];
}

export interface GenerateApplicationsRequest {
  job_ids: string[];
}

export interface GenerateApplicationsResponse {
  generation_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
  selected_jobs_count: number;
  timestamp: string;
}

export interface ApplicationResult {
  success: boolean;
  company: string;
  position: string;
  cv_path: string;
  letter_path: string;
  summary_path: string;
  output_directory: string;
  timestamp: string;
}

export interface StatusResponse {
  job_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  jobs_found?: number;
  applications_generated?: number;
  error?: string;
  started_at?: string;
  completed_at?: string;
}

export interface ApplicationGenerationStatus {
  generation_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  applications_generated?: number;
  error?: string;
  results?: {
    success: boolean;
    applications: ApplicationResult[];
    summary: string;
    timestamp: string;
  };
}
