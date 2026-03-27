type PageBannerProps = {
  label?: string
  title: string
  description?: string
}

export default function PageBanner({
  label,
  title,
  description,
}: PageBannerProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-10 text-white shadow-sm">
      {label && (
        <p className="text-sm font-semibold uppercase tracking-wide text-green-100">
          {label}
        </p>
      )}
      <h1 className="mt-2 text-3xl font-bold">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-sm text-green-50">{description}</p>
      )}
    </div>
  )
}