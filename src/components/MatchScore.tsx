import { cn, getMatchScoreColor, getMatchScoreBgColor, getMatchScoreLabel } from '@/lib/utils';

interface MatchScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export function MatchScore({ score, size = 'md' }: MatchScoreProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-lg',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          'rounded-full border-2 flex items-center justify-center font-bold',
          getMatchScoreBgColor(score),
          sizeClasses[size]
        )}
      >
        <span className={getMatchScoreColor(score)}>{score}%</span>
      </div>
      <span className="text-xs text-gray-600">{getMatchScoreLabel(score)}</span>
    </div>
  );
}
