type EmptyStateProps = {
  title: string
  description?: string
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
    </div>
  )
}