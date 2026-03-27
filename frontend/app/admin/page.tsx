import Link from 'next/link'
import { BarChart3, Boxes, Package, ShoppingBag } from 'lucide-react'
import { AnalyticsCards } from '@/components/admin/analytics-cards'

const quickLinks = [
  {
    title: 'Manage Products',
    href: '/admin/products',
    icon: Boxes,
    description: 'Add, edit, and remove agricultural products.',
  },
  {
    title: 'Manage Orders',
    href: '/admin/orders',
    icon: Package,
    description: 'View customer orders and update status.',
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'Track sales, revenue, and order insights.',
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage products, orders, and platform insights for AgriInfluence.
        </p>
      </div>

      <AnalyticsCards />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {quickLinks.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Icon className="h-6 w-6 text-green-700" />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {item.description}
              </p>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5 text-green-700" />
          <h2 className="text-lg font-semibold text-gray-900">
            Admin Summary
          </h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          This dashboard is the central control panel for your agricultural
          e-commerce platform. From here, admin can manage products, monitor
          customer orders, and review overall sales performance.
        </p>
      </div>
    </div>
  )
}