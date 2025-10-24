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

// Writer API Types

export interface WriterStartRequest {
  base_cv: string;
  base_motivation_letter: string;
  job_description: string;
  company_name: string;
  position_title: string;
}

export interface WriterSessionResponse {
  session_id: string;
  status: string;
  message?: string;
  timestamp: string;
}

export interface WriterRefineRequest {
  refinement_request: string;
}

export interface ApplicationMaterials {
  company: string;
  position: string;
  customized_cv: string;
  motivation_letter: string;
  match_summary: string;
}

export interface WriterStatusResponse {
  session_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  materials?: ApplicationMaterials;
  error?: string;
  started_at?: string;
  completed_at?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface WriterSaveResponse {
  success: boolean;
  message: string;
  file_paths: {
    cv_path: string;
    letter_path: string;
    summary_path: string;
    output_directory: string;
  };
  timestamp: string;
}
