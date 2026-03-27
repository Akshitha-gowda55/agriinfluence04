'use client'

import { CheckCircle2, Clock3, Truck, PackageCheck } from 'lucide-react'

interface OrderStatusProps {
  status: string
}

export function OrderStatus({ status }: OrderStatusProps) {
  const currentStatus = status.toLowerCase()

  const steps = [
    {
      key: 'paid',
      label: 'Paid',
      icon: CheckCircle2,
    },
    {
      key: 'processing',
      label: 'Processing',
      icon: Clock3,
    },
    {
      key: 'shipped',
      label: 'Shipped',
      icon: Truck,
    },
    {
      key: 'delivered',
      label: 'Delivered',
      icon: PackageCheck,
    },
  ]

  const getStepIndex = (key: string) => {
    return steps.findIndex((step) => step.key === key)
  }

  const activeIndex = getStepIndex(currentStatus)

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Order Status
      </h2>

      <div className="grid gap-4 sm:grid-cols-4">
        {steps.map((step, index) => {
          const isCompleted = activeIndex >= index
          const Icon = step.icon

          return (
            <div
              key={step.key}
              className={`flex flex-col items-center rounded-lg border p-4 text-center ${
                isCompleted
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div
                className={`mb-2 rounded-full p-3 ${
                  isCompleted ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <p
                className={`text-sm font-medium ${
                  isCompleted ? 'text-green-700' : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}