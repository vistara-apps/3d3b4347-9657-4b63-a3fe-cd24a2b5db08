'use client';

interface TrustScoreBadgeProps {
  score: number;
  category: 'high' | 'medium' | 'low';
}

export function TrustScoreBadge({ score, category }: TrustScoreBadgeProps) {
  const getColorClass = () => {
    switch (category) {
      case 'high':
        return 'bg-success/10 text-success border-success/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-danger/10 text-danger border-danger/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getColorClass()}`}>
      <span className="font-semibold">$.{score.toFixed(score < 1 ? 2 : 1)}</span>
    </div>
  );
}
