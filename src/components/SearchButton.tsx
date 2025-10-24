import { Search, Loader2 } from 'lucide-react';

interface SearchButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function SearchButton({ onClick, isLoading, disabled }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Searching for Jobs...
        </>
      ) : (
        <>
          <Search className="h-5 w-5" />
          Search Jobs
        </>
      )}
    </button>
  );
}
