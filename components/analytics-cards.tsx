'use client'

import { ShoppingBag, IndianRupee, PackageCheck, Clock3 } from 'lucide-react'

interface AnalyticsCardsProps {
  totalOrders: number
  totalRevenue: number
  deliveredOrders: number
  activeOrders: number
}

export function AnalyticsCards({
  totalOrders,
  totalRevenue,
  deliveredOrders,
  activeOrders,
}: AnalyticsCardsProps) {
  const cards = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBag,
    },
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toFixed(2)}`,
      icon: IndianRupee,
    },
    {
      title: 'Delivered Orders',
      value: deliveredOrders,
      icon: PackageCheck,
    },
    {
      title: 'Active Orders',
      value: activeOrders,
      icon: Clock3,
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <card.icon className="h-6 w-6 text-green-600" />
            <h3 className="text-sm font-medium text-muted-foreground">
              {card.title}
            </h3>
          </div>

          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  )
}