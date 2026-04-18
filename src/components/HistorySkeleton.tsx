// History skeleton component for loading state
export function HistorySkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-4" />

      {/* Skeleton rows - 3 to 5 items */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4"
        >
          {/* Theme tag */}
          <div className="flex justify-between items-start">
            <div className="h-4 w-16 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="h-3 w-12 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
          </div>

          {/* Image placeholder */}
          <div className="aspect-square rounded-xl bg-neutral-100 dark:bg-neutral-800 animate-pulse" />

          {/* Text lines */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="h-3 w-20 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
            <div className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
            <div className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}