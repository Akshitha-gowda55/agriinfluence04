'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import { getReviews } from '@/lib/reviews'
import ReviewForm from '@/components/reviews/review-form'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/types'

interface ProductDetailsProps {
  product: Product
}

const BACKEND_URL = 'http://localhost:8080'

function getValidImageUrl(imageUrl?: string) {
  const rawImage = (imageUrl || '').trim()

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

export function ProductDetails({ product }: ProductDetailsProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  const [quantity, setQuantity] = useState(1)
  const [pincode, setPincode] = useState('')
  const [deliveryMessage, setDeliveryMessage] = useState('')
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false)

  const reviews = getReviews(product.id)

  const serviceablePincodes = [
    '560001',
    '560002',
    '560003',
    '560004',
    '560005',
    '560010',
    '560016',
    '560037',
    '560068',
    '560078',
  ]

  useEffect(() => {
    const savedPincode = localStorage.getItem('deliveryPincode')
    const savedAvailability = localStorage.getItem('deliveryAvailable')

    if (savedPincode) {
      setPincode(savedPincode)
    }

    if (savedPincode && savedAvailability === 'true') {
      setIsDeliveryAvailable(true)
      setDeliveryMessage('✅ Delivery available to this pincode')
    }
  }, [])

  const checkDeliveryAvailability = () => {
    const trimmedPincode = pincode.trim()

    if (!trimmedPincode) {
      setDeliveryMessage('Please enter a pincode')
      setIsDeliveryAvailable(false)
      localStorage.removeItem('deliveryPincode')
      localStorage.removeItem('deliveryAvailable')
      return
    }

    if (!/^\d{6}$/.test(trimmedPincode)) {
      setDeliveryMessage('Please enter a valid 6-digit pincode')
      setIsDeliveryAvailable(false)
      localStorage.removeItem('deliveryPincode')
      localStorage.removeItem('deliveryAvailable')
      return
    }

    if (serviceablePincodes.includes(trimmedPincode)) {
      setDeliveryMessage('✅ Delivery available to this pincode')
      setIsDeliveryAvailable(true)
      localStorage.setItem('deliveryPincode', trimmedPincode)
      localStorage.setItem('deliveryAvailable', 'true')
    } else {
      setDeliveryMessage('❌ Delivery not available for this pincode')
      setIsDeliveryAvailable(false)
      localStorage.setItem('deliveryPincode', trimmedPincode)
      localStorage.setItem('deliveryAvailable', 'false')
    }
  }

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      image: getValidImageUrl(product.imageUrl),
      inStock: (product.stock ?? 0) > 0,
      rating: product.rating ?? 4.5,
      reviews: product.reviews ?? reviews.length,
      usage: product.usage ?? 'Use as directed on the product label.',
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct)
    }

    setDeliveryMessage((prev) =>
      prev ? `${prev} | ✅ Product added to cart` : '✅ Product added to cart'
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-xl border bg-white">
        <Image
          src={getValidImageUrl(product.imageUrl)}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />

        {product.badge && (
          <Badge className="absolute left-4 top-4">
            {product.badge}
          </Badge>
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
            <span className="font-medium">{product.rating ?? 4.5}</span>
          </div>

          <span className="text-sm text-gray-500">
            ({product.reviews ?? reviews.length} reviews)
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

        <p className="mt-6 leading-7 text-gray-600">
          {product.description}
        </p>

        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Usage Instructions
          </h2>

          <p className="leading-7 text-gray-600">
            {product.usage ?? 'Use as directed on the product label.'}
          </p>
        </div>

        <div className="mt-8 rounded-xl border bg-white p-4">
          <h3 className="mb-3 text-base font-semibold text-gray-900">
            Check Delivery Availability
          </h3>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value)
                setDeliveryMessage('')
                setIsDeliveryAvailable(false)
              }}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-600"
            />

            <Button
              type="button"
              onClick={checkDeliveryAvailability}
              className="sm:min-w-[140px]"
            >
              Check
            </Button>
          </div>

          {deliveryMessage && (
            <p className="mt-3 text-sm text-gray-700">
              {deliveryMessage}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex w-fit items-center rounded-lg border">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="p-3"
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
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={(product.stock ?? 0) <= 0}
            className="sm:min-w-[220px]"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
          {(product.stock ?? 0) > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>

        <div className="mt-6">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
             (product.stock ?? 0) > 0
  ? 'bg-green-100 text-green-700'
  : 'bg-red-100 text-red-700'
            }`}
          >
            {(product.stock ?? 0) > 0
  ? `In Stock (${product.stock ?? 0})`
  : 'Out of Stock'}
          </span>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">Reviews</h2>

          {reviews.length > 0 ? (
            reviews.map((r: any) => (
              <div key={r.id} className="mb-3 rounded border p-3">
                <p className="font-medium">{r.name}</p>
                <p className="text-sm text-gray-600">{r.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}

          <div className="mt-6">
            <ReviewForm productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}