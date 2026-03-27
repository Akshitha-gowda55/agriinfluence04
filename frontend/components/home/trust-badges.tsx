'use client'

import { ShieldCheck, Truck, BadgeCheck, Headset } from 'lucide-react'

export default function TrustBadges() {
  const items = [
    {
      title: 'Quality Assured',
      description: 'All agricultural products are verified and sourced from trusted suppliers.',
      icon: BadgeCheck,
    },
    {
      title: 'Secure Payments',
      description: 'Your transactions are protected with secure payment processing.',
      icon: ShieldCheck,
    },
    {
      title: 'Fast Delivery',
      description: 'Reliable shipping to ensure farmers receive products on time.',
      icon: Truck,
    },
    {
      title: 'Expert Support',
      description: 'Get assistance from our support team whenever you need help.',
      icon: Headset,
    },
  ]

  return (
    <section className="bg-green-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Farmers Trust Us
          </h2>
          <p className="mt-2 text-gray-600">
            We ensure quality products, safe payments, and reliable delivery for every order.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="rounded-xl bg-white p-6 shadow-sm border border-green-100"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}