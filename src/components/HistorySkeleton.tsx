// History skeleton component for loading state with shimmer effect
export function HistorySkeleton() {
  const shimmerClass = "bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 animate-shimmer bg-[length:200%_100%] rounded";

  return (
    <div className="space-y-4">
      <div className={`h-8 w-32 ${shimmerClass} mb-4`} />

      {/* Skeleton rows - 4 items with staggered animation delays */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Theme tag */}
          <div className="flex justify-between items-start">
            <div className={`h-4 w-16 ${shimmerClass}`} />
            <div className={`h-3 w-12 ${shimmerClass}`} />
          </div>

          {/* Image placeholder */}
          <div className={`aspect-square rounded-xl ${shimmerClass}`} />

          {/* Text lines */}
          <div className="space-y-2">
            <div className={`h-4 w-full ${shimmerClass}`} />
            <div className={`h-4 w-3/4 ${shimmerClass}`} />
            <div className={`h-3 w-20 ${shimmerClass}`} />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2">
            <div className={`h-10 rounded-xl ${shimmerClass}`} />
            <div className={`h-10 rounded-xl ${shimmerClass}`} />
            <div className={`h-10 rounded-xl ${shimmerClass}`} />
          </div>
        </div>
      ))}
    </div>
  );
}