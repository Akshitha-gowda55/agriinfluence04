'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/types'

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: String(product.id),
    })
  }

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-green-600 hover:bg-green-700"
    >
      Add to Cart
    </Button>
  )
}