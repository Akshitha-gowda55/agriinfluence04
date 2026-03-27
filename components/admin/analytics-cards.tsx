'use client'

import { products, orders } from '@/lib/data'
import { Boxes, Package, DollarSign, Clock } from 'lucide-react'

export function AnalyticsCards() {
  const totalProducts = products.length
  const totalOrders = orders.length

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.pricing.total,
    0
  )

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === 'pending'
  ).length

  const cards = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Boxes,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: Package,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      title: 'Revenue',
      value: `₹${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-100 text-green-700',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-700',
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div
            key={card.title}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}