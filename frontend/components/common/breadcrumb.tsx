import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-green-700">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-gray-900' : ''}>
                {item.label}
              </span>
            )}

            {!isLast && <ChevronRight className="h-4 w-4" />}
          </div>
        )
      })}
    </nav>
  )
}