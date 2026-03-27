'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, ShoppingCart, Star } from 'lucide-react'

type Product = {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  description: string
  usage?: string
  image?: string
  rating: number
  reviews?: number
  inStock?: boolean
  badge?: string
}

interface ProductDetailsProps {
  product: Product
  onAddToCart?: (product: Product, quantity: number) => void
}

export default function ProductDetails({
  product,
  onAddToCart,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity)
    } else {
      console.log('Add to cart:', product, 'Quantity:', quantity)
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-xl border bg-white">
        <Image
          src={product.image || '/placeholder.jpg'}
          alt={product.name}
          fill
          priority
          className="object-cover"
        />

        {product.badge && (
          <span className="absolute left-4 top-4 inline-flex rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-green-700">
          {product.category}
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
          </div>

          <span className="text-sm text-gray-500">
            ({product.reviews ?? 0} reviews)
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </span>

          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <p className="mt-6 leading-7 text-gray-600">{product.description}</p>

        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Usage Instructions
          </h2>
          <p className="leading-7 text-gray-600">
            {product.usage ?? 'Use as directed.'}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex w-fit items-center rounded-lg border">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="p-3"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="min-w-[48px] text-center font-medium">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-3"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="inline-flex min-w-[220px] items-center justify-center rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        <div className="mt-6">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              product.inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  )
}