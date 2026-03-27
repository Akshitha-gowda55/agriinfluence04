'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ShoppingBag, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-2xl border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-700" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Order Placed Successfully
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            Your payment was successful and your order has been saved.
          </p>

          {orderId && (
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {orderId}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/products">
              <Button className="w-full sm:w-auto">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>

            {orderId && (
              <Link href={`/track-order?id=${orderId}`}>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Package className="mr-2 h-4 w-4" />
                  Track Order
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}