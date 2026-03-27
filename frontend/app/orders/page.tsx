'use client'

import { useEffect, useState } from 'react'
import { fetchFromBackend } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
type Order = {
  id: string | number
  customerName: string
  phone: string
  address: string
  totalAmount: number
  paymentId: string
  status: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
const user = useAuthStore((state) => state.user)
  useEffect(() => {
  const savedPhone = localStorage.getItem('orderPhone') || ''
  setPhone(savedPhone)

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError('')

      if (user?.id) {
        const data = await fetchFromBackend(`/api/orders/user/${user.id}`)
        setOrders(data)
        return
      }

      if (!savedPhone) {
        setOrders([])
        return
      }

      const data = await fetchFromBackend(`/api/orders/track/${savedPhone}`)
      setOrders(data)
    } catch (error) {
      console.error(error)
      setError('Failed to load your orders')
    } finally {
      setLoading(false)
    }
  }

  loadOrders()
}, [user])
  if (loading) {
    return <div className="px-4 py-8">Loading your orders...</div>
  }

  if (error) {
    return <div className="px-4 py-8 text-red-600">{error}</div>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

      {!phone ? (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-600">
           Place an order first to view your orders.
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-600">
          No orders found for phone number {phone}.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border bg-white p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p><strong>Name:</strong> {order.customerName}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Payment ID:</strong> {order.paymentId}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}