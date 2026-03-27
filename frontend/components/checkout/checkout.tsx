'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useAuthStore } from '@/store/auth-store'
import { Address, PaymentMethod } from '@/types'
import { useCartStore } from '@/lib/cart-store'

import AddressForm from '@/components/checkout/address-form'
import PaymentMethodSelector from '@/components/checkout/payment-method'
import OrderSummary from '@/components/checkout/order-summary'

import { Button } from '@/components/ui/button'
import { validateAddress } from '@/lib/validation'

const initialAddress: Address = {
  fullName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
}

export default function Checkout() {

  const router = useRouter()

  const user = useAuthStore((state) => state.user)

  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const [address, setAddress] = useState<Address>(initialAddress)

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('razorpay')

  const [errors, setErrors] =
    useState<Partial<Record<keyof Address, string>>>({})

  const [isSubmitting, setIsSubmitting] = useState(false)

  const isCartEmpty =
    useMemo(() => items.length === 0, [items.length])

  /* ---------------- LOGIN PROTECTION ---------------- */

  if (!user) {
    return (
      <div className="rounded-lg border bg-white p-6 text-center">

        <h2 className="text-lg font-semibold mb-3">
          Login Required
        </h2>

        <p className="text-sm text-muted-foreground mb-5">
          You must login or create an account to place an order.
        </p>

        <div className="flex justify-center gap-3">

          <Link href="/login">
            <Button>Login</Button>
          </Link>

          <Link href="/signup">
            <Button variant="outline">
              Sign Up
            </Button>
          </Link>

        </div>

      </div>
    )
  }

  /* -------------------------------------------------- */

  const handleAddressChange = (
    field: keyof Address,
    value: string
  ) => {

    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  const handlePlaceOrder = async () => {

    const validation = validateAddress(address)

    if (!validation.isValid) {
      setErrors(
        validation.errors as Partial<Record<keyof Address, string>>
      )
      return
    }

    if (isCartEmpty) return

    try {

      setIsSubmitting(true)

      const orderPayload = {
        items,
        shippingAddress: address,
        paymentMethod,
      }

      console.log('Order payload:', orderPayload)

      router.push('/success')

      clearCart()

    } catch (error) {

      console.error(error)
      router.push('/failure')

    } finally {

      setIsSubmitting(false)

    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

      <div className="space-y-6">

        <AddressForm
          value={address}
          errors={errors}
          onChange={handleAddressChange}
        />

        <PaymentMethodSelector
          value={paymentMethod}
          onChange={setPaymentMethod}
        />

      </div>

      <div>

        <OrderSummary
          items={items}
          buttonText="Place Order"
          onSubmit={handlePlaceOrder}
          isSubmitting={isSubmitting}
        />

      </div>

    </div>
  )
}