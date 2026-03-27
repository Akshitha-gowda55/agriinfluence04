'use client'

import Image from 'next/image'
import Link from 'next/link'

import { CartItem } from '@/types'
import {
  calculateShipping,
  calculateSubtotal,
  calculateTax,
  formatPrice,
  getSavingsMessage,
  FREE_SHIPPING_THRESHOLD,
} from '@/lib/pricing'

type OrderSummaryProps = {
  items: CartItem[]
  buttonText?: string
  onSubmit?: () => void
  isSubmitting?: boolean
}

export default function OrderSummary({
  items,
  buttonText = 'Place Order',
  onSubmit,
  isSubmitting = false,
}: OrderSummaryProps) {
  const subtotal = calculateSubtotal(items)
  const shipping = calculateShipping(subtotal)
  const tax = calculateTax(subtotal)
  const total = subtotal + shipping + tax

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

      <div className="mt-5 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-600">Your cart is empty.</p>
        ) : (
          items.map((item) => {
            const imageSrc = item.images?.[0] || item.image || '/placeholder.png'

            return (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={imageSrc}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.slug ?? item.id}`}
                    className="line-clamp-2 text-sm font-medium text-gray-900 hover:text-green-700"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-xs text-gray-500">
                    Qty: {item.quantity}
                    {item.selectedSize ? ` • ${item.selectedSize}` : ''}
                  </p>
                </div>

                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            )
          })
        )}
      </div>

      <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
        {getSavingsMessage(subtotal)}
        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <span className="block text-xs text-green-600">
            Free shipping above {formatPrice(FREE_SHIPPING_THRESHOLD)}
          </span>
        )}
      </div>

      <div className="mt-6 space-y-3 border-t pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">
            {formatPrice(tax)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {onSubmit && (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || items.length === 0}
          className="mt-6 w-full rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isSubmitting ? 'Processing...' : buttonText}
        </button>
      )}
    </div>
  )
}