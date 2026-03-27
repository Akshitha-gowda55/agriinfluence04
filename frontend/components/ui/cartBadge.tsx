// components/ui/CartBadge.tsx
'use client'

import { useCartStore } from '@/lib/cart-store'

export default function CartBadge() {
  const { items } = useCartStore()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  if (totalItems === 0) return null

  return (
    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
      {totalItems}
    </span>
  )
}