// components/products/product-info.tsx

'use client'

import { Star, ShoppingCart, Heart } from 'lucide-react'

import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { useWishlistStore } from '@/store/wishlist-store'

type ProductInfoProps = {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const wishlistItems = useWishlistStore((state) => state.items)
  const addToWishlist = useWishlistStore((state) => state.addToWishlist)
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist)

  const isWishlisted = wishlistItems.some((item) => item.id === product.id)

  const crops = product.crops ?? []
  const benefits = product.benefits ?? []
  const usageInstructions = product.usageInstructions ?? []
  const safetyInfo = product.safetyInfo ?? []

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-green-700">
          {product.brand ?? 'Agri Product'}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-3 text-gray-600">
          {product.shortDescription ?? product.description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{product.rating}</span>
        </div>
        <span className="text-sm text-gray-500">
          {product.reviewCount ?? 0} reviews
        </span>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <p
          className={`mt-2 text-sm font-medium ${
            product.stockStatus === 'out_of_stock'
              ? 'text-red-600'
              : product.stockStatus === 'low_stock'
              ? 'text-orange-600'
              : 'text-green-600'
          }`}
        >
          {product.stockStatus === 'out_of_stock'
            ? 'Out of stock'
            : product.stockStatus === 'low_stock'
            ? `Only ${product.stock ?? 0} left`
            : 'In stock'}
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Suitable crops</h3>
        <div className="flex flex-wrap gap-2">
          {crops.length > 0 ? (
            crops.map((crop) => (
              <span
                key={crop}
                className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
              >
                {crop}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">No crop information available.</span>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => addToCart(product)}
          disabled={product.stockStatus === 'out_of_stock'}
          className="bg-green-600 hover:bg-green-700"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)
          }
        >
          <Heart className="mr-2 h-4 w-4" />
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </Button>
      </div>

      <div className="space-y-4 rounded-2xl border bg-white p-5">
        <div>
          <h3 className="font-semibold text-gray-900">Description</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {product.description}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Benefits</h3>
          {benefits.length > 0 ? (
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              {benefits.map((benefit) => (
                <li key={benefit}>• {benefit}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-600">No benefits listed.</p>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Usage Instructions</h3>
          {usageInstructions.length > 0 ? (
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              {usageInstructions.map((instruction) => (
                <li key={instruction}>• {instruction}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-600">No usage instructions available.</p>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Safety Information</h3>
          {safetyInfo.length > 0 ? (
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              {safetyInfo.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-600">No safety information available.</p>
          )}
        </div>
      </div>
    </div>
  )
}