'use client'

import { PaymentMethod } from '@/types'

type PaymentMethodProps = {
  value: PaymentMethod
  onChange: (value: PaymentMethod) => void
}

export default function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodProps) {
  const methods: {
    id: PaymentMethod
    title: string
    description: string
  }[] = [
    {
      id: 'razorpay',
      title: 'Razorpay',
      description: 'Pay securely using card, UPI, net banking, or wallet.',
    },
    {
      id: 'upi',
      title: 'UPI',
      description: 'Pay directly using your UPI app.',
    },
    {
      id: 'cod',
      title: 'Cash on Delivery',
      description: 'Pay when your order is delivered.',
    },
  ]

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>

      <div className="mt-5 space-y-3">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
              value === method.id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={value === method.id}
              onChange={() => onChange(method.id)}
              className="mt-1 h-4 w-4"
            />

            <div>
              <p className="font-medium text-gray-900">{method.title}</p>
              <p className="mt-1 text-sm text-gray-600">{method.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}