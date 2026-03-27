'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist-store'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/types'

const BACKEND_URL = 'http://localhost:8080'

function getValidImageUrl(product: Product) {
  const rawImage = (product.imageUrl || product.image || '').trim()

  if (!rawImage) {
    return '/placeholder.png'
  }

  if (rawImage.startsWith('http://') || rawImage.startsWith('https://')) {
    return rawImage
  }

  if (rawImage.startsWith('/')) {
    return `${BACKEND_URL}${rawImage}`
  }

  return `${BACKEND_URL}/${rawImage}`
}

export function ProductCard({
  product,
}: {
  product: Product
}) {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(product.id)
  )

  const addToCart = useCartStore((state) => state.addToCart)

  const productImage = getValidImageUrl(product)

  const handleAddToCart = () => {
    addToCart({
      ...product,
      imageUrl: productImage,
    })

    alert('Product added to cart')
  }

  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />

        <button
          type="button"
          onClick={() =>
            toggleWishlist({
              id: product.id,
              name: product.name,
              price: product.price,
              image: productImage,
            })
          }
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow"
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'
            }`}
          />
        </button>
      </div>

      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>

      <p className="text-sm text-muted-foreground">{product.category}</p>

      <p className="mt-2 font-bold">₹{product.price}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleAddToCart}
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          Add to Cart
        </button>

        <Link
          href={`/products/${product.id}`}
          className="inline-block rounded-md border px-4 py-2 text-sm"
        >
          View Product
        </Link>
      </div>
    </div>
  )
}