'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { fetchFromBackend, BACKEND_URL } from '@/lib/api'
import { useCartStore } from '@/lib/cart-store'
import { Button } from '@/components/ui/button'

type Product = {
  id: number
  name: string
  price: number
  imageUrl: string
  category: string
  description: string
  stock: number
}

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const addToCart = useCartStore((state) => state.addToCart)

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const products: Product[] = await fetchFromBackend('/api/products')
        const found = products.find((p) => p.id === Number(params.id))
        setProduct(found || null)
      } catch (error) {
        console.error(error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  function getImageUrl(imageUrl?: string) {
    if (!imageUrl || imageUrl.trim() === '') {
      return '/placeholder.png'
    }

    if (
      imageUrl.startsWith('http://') ||
      imageUrl.startsWith('https://')
    ) {
      return imageUrl
    }

    if (imageUrl.startsWith('/')) {
      return `${BACKEND_URL}${imageUrl}`
    }

    return `${BACKEND_URL}/uploads/${imageUrl}`
  }

  function mapToCartProduct(product: Product) {
    return {
      ...product,
      image: getImageUrl(product.imageUrl),
    } as any
  }

  function handleAddToCart() {
    if (!product) return
    addToCart(mapToCartProduct(product))
  }

  function handleBuyNow() {
    if (!product) return

    const buyNowItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: getImageUrl(product.imageUrl),
      quantity: 1,
    }

    localStorage.setItem('buy-now-item', JSON.stringify(buyNowItem))
    router.push('/checkout?mode=buy-now')
  }

  if (loading) {
    return <div className="mx-auto max-w-6xl px-4 py-10">Loading...</div>
  }

  if (!product) {
    return <div className="mx-auto max-w-6xl px-4 py-10">Product not found</div>
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={getImageUrl(product.imageUrl)}
          alt={product.name}
          className="h-96 w-full rounded-2xl object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.png'
          }}
        />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <p className="mt-6 text-2xl font-semibold text-green-700">
            ₹{product.price}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {product.category} · Stock: {product.stock}
          </p>

          <div className="mt-6 flex gap-3">
            <Button onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            <Button onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}