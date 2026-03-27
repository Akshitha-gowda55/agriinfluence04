// components/cart/quantity-selector.tsx

'use client'

import { Minus, Plus } from 'lucide-react'

type QuantitySelectorProps = {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center rounded-lg border border-gray-200">
      <button
        type="button"
        onClick={onDecrease}
        className="flex h-9 w-9 items-center justify-center text-gray-600 hover:bg-gray-100"
      >
        <Minus className="h-4 w-4" />
      </button>

      <span className="flex w-10 items-center justify-center text-sm font-medium">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className="flex h-9 w-9 items-center justify-center text-gray-600 hover:bg-gray-100"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}