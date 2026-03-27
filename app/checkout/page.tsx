'use client'

<<<<<<< HEAD
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
=======
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { fetchFromBackend } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd

declare global {
  interface Window {
    Razorpay: any
  }
}

<<<<<<< HEAD
export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = getTotalPrice()
=======
type CheckoutItem = {
  id: string | number
  name: string
  price: number
  quantity: number
}

type Product = {
  id: number
  name: string
  slug: string
  category: string
  price: number
  description: string
  imageUrl?: string
  stock: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, clearCart } = useCartStore()
const user = useAuthStore((state) => state.user)
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [pincode, setPincode] = useState('')
  const [deliveryMessage, setDeliveryMessage] = useState('')
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false)

  const [suggestedProduct, setSuggestedProduct] = useState<CheckoutItem | null>(null)
  const [isSuggestedProductLoading, setIsSuggestedProductLoading] = useState(false)

  const productSlug = searchParams.get('product')
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''

  const handleAddressChange = (field: string, value: string) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

 useEffect(() => {
  const savedAddress = localStorage.getItem('userAddress')
  const localUser = localStorage.getItem('user')

  if (savedAddress) {
    const parsedAddress = JSON.parse(savedAddress)
    setAddress(parsedAddress)

    if (parsedAddress.pincode) {
      setPincode(parsedAddress.pincode)
    }
  } else if (user) {
    setAddress((prev) => ({
      ...prev,
      fullName: user.name || '',
    }))
  } else if (localUser) {
    const parsedUser = JSON.parse(localUser)
    setAddress((prev) => ({
      ...prev,
      fullName: parsedUser.name || '',
    }))
  }
}, [user])
  useEffect(() => {
    const loadSuggestedProduct = async () => {
      if (!productSlug) {
        setSuggestedProduct(null)
        return
      }

      try {
        setIsSuggestedProductLoading(true)

        const data: Product[] = await fetchFromBackend('/api/products')

        const matchedProduct = data.find(
          (product) => product.slug === productSlug
        )

        if (!matchedProduct) {
          setSuggestedProduct(null)
          return
        }

        setSuggestedProduct({
          id: matchedProduct.id,
          name: matchedProduct.name,
          price: matchedProduct.price,
          quantity: 1,
        })
      } catch (error) {
        console.error(error)
        setSuggestedProduct(null)
      } finally {
        setIsSuggestedProductLoading(false)
      }
    }

    loadSuggestedProduct()
  }, [productSlug])

  const checkoutItems = useMemo(() => {
    if (suggestedProduct) {
      return [suggestedProduct]
    }

    return items
  }, [items, suggestedProduct])

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd
  const shipping = subtotal > 99 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  useEffect(() => {
<<<<<<< HEAD
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  if (items.length === 0) return null

  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''
=======
    if (!productSlug && checkoutItems.length === 0) {
      router.push('/cart')
    }
  }, [checkoutItems, productSlug, router])

  useEffect(() => {
    const savedPincode = localStorage.getItem('deliveryPincode')
    const savedAvailability = localStorage.getItem('deliveryAvailable')

    if (savedPincode) {
      setPincode(savedPincode)
    }

    if (savedPincode && savedAvailability === 'true') {
      setIsDeliveryAvailable(true)
      setDeliveryMessage('✅ Delivery is available for this pincode')
    } else if (savedPincode && savedAvailability === 'false') {
      setIsDeliveryAvailable(false)
      setDeliveryMessage('❌ Delivery is not available for this pincode')
    }
  }, [])
>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd

  const loadRazorpayScript = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById('razorpay-script')
      if (existingScript) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.id = 'razorpay-script'
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)

      document.body.appendChild(script)
    })
  }

<<<<<<< HEAD
  const handleRazorpayPayment = async () => {
    try {
=======
  const handleCheckPincode = () => {
    if (!pincode.trim()) {
      setDeliveryMessage('Please enter a pincode')
      setIsDeliveryAvailable(false)
      return
    }

    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setDeliveryMessage('Please enter a valid 6-digit pincode')
      setIsDeliveryAvailable(false)
      return
    }

    const availablePincodes = ['560001', '560002', '560003', '560004', '560005']
    const isAvailable = availablePincodes.includes(pincode)

    localStorage.setItem('deliveryPincode', pincode)
    localStorage.setItem('deliveryAvailable', String(isAvailable))

    if (isAvailable) {
      setIsDeliveryAvailable(true)
      setDeliveryMessage('✅ Delivery is available for this pincode')
    } else {
      setIsDeliveryAvailable(false)
      setDeliveryMessage('❌ Delivery is not available for this pincode')
    }
  }

  const createOrderInBackend = async (paymentId: string) => {
  return fetchFromBackend('/api/orders', {
    method: 'POST',
    body: JSON.stringify({
      userId: user?.id || null,
      customerName: address.fullName,
      phone: address.phone,
      address: `${address.addressLine1}, ${address.city}, ${address.state} - ${address.pincode}`,
      totalAmount: total,
      paymentId,
      status: 'CONFIRMED',
    }),
  })
}

  const handleRazorpayPayment = async () => {
    try {
      if (
        !address.fullName ||
        !address.phone ||
        !address.addressLine1 ||
        !address.city ||
        !address.state ||
        !address.pincode
      ) {
        alert('Please fill all address fields')
        return
      }

      if (!pincode.trim()) {
        alert('Please check delivery pincode before payment')
        return
      }

      if (!isDeliveryAvailable) {
        alert('Delivery is not available for this pincode')
        return
      }

>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd
      if (!razorpayKey) {
        alert('Add NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local')
        return
      }

<<<<<<< HEAD
=======
      if (checkoutItems.length === 0) {
        alert('No product selected')
        return
      }

      localStorage.setItem('userAddress', JSON.stringify(address))

>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd
      setIsLoading(true)

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load.')
        return
      }

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
<<<<<<< HEAD
        body: JSON.stringify({ items, total }),
=======
        body: JSON.stringify({ items: checkoutItems, total }),
>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd
      })

      const data = await res.json()

      if (!res.ok || !data.success || !data.order) {
        alert(data.message || 'Failed to create Razorpay order')
        return
      }

      const options = {
        key: razorpayKey,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'AgriInfluence',
        description: 'Order Payment',
        order_id: data.order.id,
<<<<<<< HEAD
        handler: async (response: any) => {
          const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')

          const newOrder = {
            id: response.razorpay_payment_id,
            items,
            total,
            date: new Date().toISOString(),
            status: 'Paid',
          }

          localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]))
          clearCart()
          router.push(`/success?orderId=${response.razorpay_payment_id}`)
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999',
=======
     handler: async (response: any) => {
  const savedOrder = await createOrderInBackend(
    response.razorpay_payment_id
  )

  localStorage.setItem('orderPhone', address.phone)
  localStorage.setItem('userAddress', JSON.stringify(address))

  if (!suggestedProduct) {
    clearCart()
  }

  router.push(`/success?orderId=${savedOrder.id}`)
},
        prefill: {
          name: address.fullName,
          email: 'customer@example.com',
          contact: address.phone,
>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd
        },
        theme: {
          color: '#16a34a',
        },
        modal: {
          ondismiss: () => router.push('/failure'),
        },
      }

      const paymentObject = new window.Razorpay(options)

      paymentObject.on('payment.failed', () => {
        router.push('/failure')
      })

      paymentObject.open()
    } catch (error) {
      console.error(error)
      alert('Something went wrong while starting payment.')
    } finally {
      setIsLoading(false)
    }
  }

<<<<<<< HEAD
=======
  if (productSlug && isSuggestedProductLoading) {
    return (
      <main className="min-h-screen bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p>Loading checkout...</p>
        </div>
      </main>
    )
  }

  if (productSlug && !suggestedProduct && !isSuggestedProductLoading) {
    return (
      <main className="min-h-screen bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-red-600">Suggested product not found.</p>
        </div>
      </main>
    )
  }

  if (checkoutItems.length === 0) return null

>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link href="/cart" className="mb-6 flex items-center text-sm">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Cart
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-semibold">Payment</h2>

<<<<<<< HEAD
=======
            {suggestedProduct && (
              <div className="mb-6 rounded-lg border bg-green-50 p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  AI Recommended Product
                </h3>
                <p className="mt-2 text-gray-700">{suggestedProduct.name}</p>
                <p className="mt-1 font-semibold text-gray-900">
                  ₹{suggestedProduct.price.toFixed(2)}
                </p>
              </div>
            )}

            <div className="mb-6 rounded-lg border bg-white p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delivery Address
              </h3>

              <div className="mt-4 grid gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={address.fullName}
                  onChange={(e) => handleAddressChange('fullName', e.target.value)}
                  className="rounded-md border px-4 py-2"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={(e) => handleAddressChange('phone', e.target.value)}
                  className="rounded-md border px-4 py-2"
                />

                <input
                  type="text"
                  placeholder="Address"
                  value={address.addressLine1}
                  onChange={(e) => handleAddressChange('addressLine1', e.target.value)}
                  className="rounded-md border px-4 py-2"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className="rounded-md border px-4 py-2"
                  />

                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className="rounded-md border px-4 py-2"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) => {
                    handleAddressChange('pincode', e.target.value)
                    setPincode(e.target.value)
                  }}
                  className="rounded-md border px-4 py-2"
                />
              </div>
            </div>

            <div className="mb-6 rounded-lg border bg-white p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Check Delivery Availability
              </h3>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value)
                    handleAddressChange('pincode', e.target.value)
                  }}
                  placeholder="Enter pincode"
                  className="w-full rounded-md border px-4 py-2"
                />

                <button
                  type="button"
                  onClick={handleCheckPincode}
                  className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Check
                </button>
              </div>

              {deliveryMessage && (
                <p className="mt-3 text-sm text-gray-700">{deliveryMessage}</p>
              )}
            </div>

>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd
            {razorpayKey ? (
              <button
                onClick={handleRazorpayPayment}
                disabled={isLoading}
                className="w-full rounded-md bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Processing...' : `Pay Now ₹${total.toFixed(2)}`}
              </button>
            ) : (
              <p className="text-sm text-red-500">
                Razorpay Key ID is missing.
              </p>
            )}
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            <div className="space-y-3">
<<<<<<< HEAD
              {items.map((item) => (
=======
              {checkoutItems.map((item) => (
>>>>>>> 3b760770f1ca574c6f28b104cd319afef8eea9cd
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-3 text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}