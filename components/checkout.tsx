'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cart-store'
import { Button } from '@/components/ui/button'

export default function CheckoutButton() {
  const { items } = useCartStore()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty!')
      return
    }

    try {
      setLoading(true)

      // Call backend API to create Stripe checkout session
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data = await res.json()

      if (data.url) {
        // Redirect user to Stripe checkout
        window.location.href = data.url
      } else {
        alert('Failed to create checkout session')
      }
    } catch (err) {
      console.error(err)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Redirecting...' : 'Proceed to Payment'}
    </Button>
  )
}