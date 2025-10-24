import { MapPin, Building, Calendar, ExternalLink } from 'lucide-react';
import type { JobPosting } from '@/lib/types';
import { MatchScore } from './MatchScore';

interface JobCardProps {
  job: JobPosting;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}

export function JobCard({ job, isSelected, onToggle, index }: JobCardProps) {
  return (
    <div
      className={`border rounded-lg p-4 transition-all cursor-pointer ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(job.posting_date).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Match Score */}
            <MatchScore score={job.match_score} size="md" />
          </div>

          {/* Description */}
          <p className="mt-3 text-sm text-gray-700 line-clamp-2">{job.description}</p>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>

          {/* Requirements Preview */}
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-700">Key Requirements:</p>
            <ul className="mt-1 space-y-1 text-xs text-gray-600">
              {job.requirements.slice(0, 2).map((req, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-blue-600">•</span>
                  <span className="line-clamp-1">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Link */}
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
            onClick={(e) => e.stopPropagation()}
          >
            View Job Posting
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
