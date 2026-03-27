'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { useAuthStore } from "@/store/auth-store"
export function CartSummary() {
  const { items, getTotalPrice } = useCartStore()
const user = useAuthStore((state) => state.user)
  const subtotal = getTotalPrice()
  const shipping = subtotal > 99 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between pt-3 text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

        <Button asChild className="mt-6 w-full">
  <Link href={user ? "/checkout" : "/login"}>
    Proceed to Checkout
  </Link>
</Button>
        </>
      )}
    </div>
  )
}