'use client'

import { useEffect, useState } from 'react'
import { fetchFromBackend } from '@/lib/api'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED'

type Order = {
  id: number
  customerName: string
  email: string
  totalAmount: number | null
  status: string
}

export function AdminOrdersTable() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await fetchFromBackend('/api/orders')
        setOrders(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      const updatedOrder = await fetchFromBackend(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: updatedOrder.status,
              }
            : order
        )
      )
    } catch (error) {
      console.error(error)
      alert('Failed to update order status')
    }
  }

  const getStatusClasses = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-700'
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-700'
      case 'CONFIRMED':
        return 'bg-purple-100 text-purple-700'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatStatus = (status: string) => {
    const upper = status?.toUpperCase()

    if (upper === 'PENDING') return 'Pending'
    if (upper === 'CONFIRMED') return 'Confirmed'
    if (upper === 'SHIPPED') return 'Shipped'
    if (upper === 'DELIVERED') return 'Delivered'
    return status
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-600">Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-600">No orders found.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Order ID</th>
            <th className="px-4 py-3 font-semibold">Customer</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Total</th>
            <th className="px-4 py-3 font-semibold">Order Status</th>
            <th className="px-4 py-3 font-semibold">Update Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t align-top">
              <td className="px-4 py-4 font-medium text-gray-900">
                {order.id}
              </td>

              <td className="px-4 py-4 text-gray-900">
                {order.customerName}
              </td>

              <td className="px-4 py-4 text-gray-700">
                {order.email}
              </td>

              <td className="px-4 py-4 font-medium text-gray-900">
                ₹{Number(order.totalAmount ?? 0).toFixed(2)}
              </td>

              <td className="px-4 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                    order.status
                  )}`}
                >
                  {formatStatus(order.status)}
                </span>
              </td>

              <td className="px-4 py-4">
                <select
                  value={order.status?.toUpperCase()}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as OrderStatus)
                  }
                  className="rounded-md border px-3 py-2 text-sm outline-none focus:border-green-600"
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}