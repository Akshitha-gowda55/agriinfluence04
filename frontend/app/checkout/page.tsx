'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'
import { fetchFromBackend, BACKEND_URL } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type CheckoutItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

type Product = {
  id: number
  name: string
  price: number
  imageUrl?: string
  image?: string
  category?: string
  description?: string
  stock?: number
}

declare global {
  interface Window {
    Razorpay: any
  }
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, '-')
}

function getImageUrl(product: Product) {
  const raw = product.imageUrl || product.image || ''

  if (!raw) return '/placeholder.png'

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw
  }

  if (raw.startsWith('/')) {
    if (raw.startsWith('/uploads/')) {
      return `${BACKEND_URL}${raw}`
    }
    return raw
  }

  return `${BACKEND_URL}/uploads/${raw}`
}

// map URL slug -> possible backend product names
const PRODUCT_ALIAS_MAP: Record<string, string[]> = {
  'mildew-control-spray': [
    'mildew control spray',
    'sulfur spray',
    'sulphur spray',
    'powdery mildew spray',
    'powdery mildew control',
    'rose mildew spray',
  ],
  'rose-fungicide-spray': [
    'rose fungicide spray',
    'fungicide spray',
    'black spot spray',
    'rose disease spray',
  ],
  'rose-growth-booster': [
    'rose growth booster',
    'growth booster',
    'plant growth booster',
    'rose tonic',
  ],
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const mode = searchParams.get('mode')
  const suggestedProductSlug = searchParams.get('product')

  const user = useAuthStore((state) => state.user)
  const cartItems = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const [buyNowItem, setBuyNowItem] = useState<CheckoutItem | null>(null)
  const [suggestedItem, setSuggestedItem] = useState<CheckoutItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingSuggestedProduct, setLoadingSuggestedProduct] = useState(false)

  const [customerName, setCustomerName] = useState(user?.name || '')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (mode === 'buy-now') {
      const raw = localStorage.getItem('buy-now-item')
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          setBuyNowItem({
            id: Number(parsed.id),
            name: parsed.name,
            price: Number(parsed.price),
            image: parsed.image || '/placeholder.png',
            quantity: Number(parsed.quantity || 1),
          })
        } catch (error) {
          console.error(error)
          setBuyNowItem(null)
        }
      }
    } else {
      setBuyNowItem(null)
    }
  }, [mode])

  useEffect(() => {
    async function loadSuggestedProduct() {
      if (!suggestedProductSlug) {
        setSuggestedItem(null)
        return
      }

      try {
        setLoadingSuggestedProduct(true)

        const products: Product[] = await fetchFromBackend('/api/products')
        const aliases = PRODUCT_ALIAS_MAP[suggestedProductSlug] || []

        let matchedProduct =
          products.find((product) => slugify(product.name) === suggestedProductSlug) ||
          products.find((product) =>
            aliases.includes(product.name.toLowerCase().trim())
          ) ||
          products.find((product) =>
            aliases.some((alias) =>
              product.name.toLowerCase().includes(alias)
            )
          ) ||
          products.find((product) =>
            suggestedProductSlug.includes(slugify(product.name))
          ) ||
          products[0]

        if (!matchedProduct) {
          setSuggestedItem(null)
          return
        }

        setSuggestedItem({
          id: matchedProduct.id,
          name: matchedProduct.name,
          price: matchedProduct.price,
          image: getImageUrl(matchedProduct),
          quantity: 1,
        })
      } catch (error) {
        console.error(error)
        setSuggestedItem(null)
      } finally {
        setLoadingSuggestedProduct(false)
      }
    }

    loadSuggestedProduct()
  }, [suggestedProductSlug])

  const checkoutItems = useMemo(() => {
    if (suggestedProductSlug) {
      return suggestedItem ? [suggestedItem] : []
    }

    if (mode === 'buy-now') {
      return buyNowItem ? [buyNowItem] : []
    }

    return cartItems.map((item: any) => ({
      id: Number(item.id),
      name: item.name,
      price: Number(item.price),
      image: item.image || item.imageUrl || '/placeholder.png',
      quantity: Number(item.quantity || 1),
    }))
  }, [suggestedProductSlug, suggestedItem, mode, buyNowItem, cartItems])

  const totalAmount = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [checkoutItems])

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      const existing = document.getElementById('razorpay-script')
      if (existing) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.id = 'razorpay-script'
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  async function handlePayment() {
    if (!user) {
      alert('Please login first')
      router.push('/login')
      return
    }

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill all shipping details')
      return
    }

    if (checkoutItems.length === 0) {
      alert('No items found for checkout')
      return
    }

    try {
      setLoading(true)

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert('Failed to load Razorpay')
        return
      }

      const amountInPaise = Math.round(totalAmount * 100)

      const razorpayOrder = await fetchFromBackend('/api/payment/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: amountInPaise,
        }),
      })

      const firstProductId = checkoutItems[0].id

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'AgriInfluence',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        handler: async function (response: any) {
          try {
            const savedOrder = await fetchFromBackend(
              `/api/orders?productId=${firstProductId}`,
              {
                method: 'POST',
                body: JSON.stringify({
                  userId: Number(user.id),
                  customerName: customerName.trim(),
                  phone: phone.trim(),
                  address: address.trim(),
                  totalAmount,
                  paymentId: response.razorpay_payment_id,
                  status: 'PENDING',
                }),
              }
            )

            if (suggestedProductSlug) {
            } else if (mode === 'buy-now') {
              localStorage.removeItem('buy-now-item')
            } else {
              clearCart()
            }

            localStorage.setItem('orderPhone', phone.trim())
            router.push(`/success?orderId=${savedOrder.id}`)
          } catch (error) {
            console.error(error)
            alert('Payment succeeded but order saving failed')
          }
        },
        prefill: {
          name: customerName.trim(),
          email: user.email || 'customer@example.com',
          contact: phone.trim(),
        },
        theme: {
          color: '#16a34a',
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error: any) {
      console.error(error)
      alert(error?.message || 'Failed to start payment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      {suggestedProductSlug && loadingSuggestedProduct && (
        <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
          Loading suggested product...
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Shipping Details</h2>

          <div className="space-y-4">
            <Input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

          <div className="space-y-4">
            {checkoutItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.png'
                  }}
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <Button
              onClick={handlePayment}
              disabled={loading || loadingSuggestedProduct || checkoutItems.length === 0}
              className="mt-6 w-full"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}