type LoadingSkeletonProps = {
  rows?: number
}

export default function LoadingSkeleton({
  rows = 3,
}: LoadingSkeletonProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/3 rounded bg-gray-200" />
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}