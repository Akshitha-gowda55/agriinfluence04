'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

import { CartItem as CartItemType } from '@/types'
import QuantitySelector from '@/components/cart/quantity-selector'
import { useCartStore } from '@/lib/cart-store'

type CartItemProps = {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  const totalPrice = item.price * item.quantity
  const imageSrc = item.images?.[0] || item.image || '/placeholder.png'
  const productHref = `/products/${item.slug ?? item.id}`

  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <Link
        href={productHref}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100"
      >
        <Image
          src={imageSrc}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link href={productHref}>
            <h3 className="text-sm font-semibold text-gray-900 hover:text-green-700">
              {item.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500">{item.brand ?? 'Agri Product'}</p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{item.price}
            </span>

            {item.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{item.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
          />

          <div className="flex items-center gap-4">
            <span className="text-base font-semibold text-gray-900">
              ₹{totalPrice}
            </span>

            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="rounded-lg p-2 text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}