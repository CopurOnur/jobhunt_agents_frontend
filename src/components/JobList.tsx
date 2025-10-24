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
