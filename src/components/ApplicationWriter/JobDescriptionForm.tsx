'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface JobDescriptionFormProps {
  onSubmit: (jobDescription: string, companyName: string, positionTitle: string) => void;
  isLoading?: boolean;
}

export function JobDescriptionForm({ onSubmit, isLoading }: JobDescriptionFormProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim() && companyName.trim() && positionTitle.trim()) {
      onSubmit(jobDescription, companyName, positionTitle);
    }
  };

  const isValid = jobDescription.trim().length > 50 && companyName.trim() && positionTitle.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Job Details</h2>
        <p className="text-sm text-gray-600 mb-6">
          Provide the job posting details to customize your materials
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Name
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g., TechCorp Inc."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Position Title
        </label>
        <input
          type="text"
          value={positionTitle}
          onChange={(e) => setPositionTitle(e.target.value)}
          placeholder="e.g., Senior Learning Designer"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {jobDescription.length} characters
        </p>
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Sparkles className="h-5 w-5" />
        {isLoading ? 'Generating...' : 'Generate Customized Materials'}
      </button>
    </form>
  );
}
