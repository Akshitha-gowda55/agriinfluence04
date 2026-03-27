'use client'

import { useEffect, useState } from 'react'
import {
  Search,
  PackageCheck,
  Truck,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchFromBackend } from '@/lib/api'
import { useSearchParams } from 'next/navigation'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED'

type Order = {
  id: number
  customerName: string
  email: string
  status: string
  totalAmount: number
}

const orderSteps: OrderStatus[] = [
  'PENDING',
  'CONFIRMED',
  'SHIPPED',
  'DELIVERED',
]

function normalizeStatus(status: string): OrderStatus {
  const upper = status?.toUpperCase()

  if (upper === 'CONFIRMED') return 'CONFIRMED'
  if (upper === 'SHIPPED') return 'SHIPPED'
  if (upper === 'DELIVERED') return 'DELIVERED'
  return 'PENDING'
}

function StatusIcon({ status }: { status: OrderStatus }) {
  if (status === 'PENDING') return <Clock className="h-5 w-5" />
  if (status === 'CONFIRMED') return <PackageCheck className="h-5 w-5" />
  if (status === 'SHIPPED') return <Truck className="h-5 w-5" />
  return <CheckCircle2 className="h-5 w-5" />
}

function statusColor(status: OrderStatus) {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700'
    case 'CONFIRMED':
      return 'bg-blue-100 text-blue-700'
    case 'SHIPPED':
      return 'bg-purple-100 text-purple-700'
    case 'DELIVERED':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function prettyStatus(status: OrderStatus) {
  if (status === 'PENDING') return 'Pending'
  if (status === 'CONFIRMED') return 'Confirmed'
  if (status === 'SHIPPED') return 'Shipped'
  return 'Delivered'
}

export default function TrackOrderPage() {
  const searchParams = useSearchParams()

  const [orderId, setOrderId] = useState('')
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const idFromUrl = searchParams.get('id')
    if (idFromUrl) {
      setOrderId(idFromUrl)
    }
  }, [searchParams])

  const handleTrackOrder = async () => {
    const trimmed = orderId.trim()

    if (!trimmed) {
      setSearchedOrder(null)
      setNotFound(false)
      return
    }

    try {
      setLoading(true)
      setNotFound(false)

      const data = await fetchFromBackend(`/api/orders/${trimmed}`)

      if (!data || !data.id) {
        setSearchedOrder(null)
        setNotFound(true)
        return
      }

      setSearchedOrder(data)
      setNotFound(false)
    } catch (error) {
      console.error(error)
      setSearchedOrder(null)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const currentStatus = searchedOrder
    ? normalizeStatus(searchedOrder.status)
    : 'PENDING'

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Track Order</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your order ID to check the latest delivery status.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTrackOrder()
            }}
            placeholder="Enter order ID, for example 1"
          />

          <Button onClick={handleTrackOrder} className="sm:min-w-[140px]">
            <Search className="mr-2 h-4 w-4" />
            {loading ? 'Tracking...' : 'Track'}
          </Button>
        </div>

        {notFound && (
          <p className="mt-4 text-sm text-red-600">
            Order not found. Please check the order ID and try again.
          </p>
        )}

        {searchedOrder && (
          <div className="mt-6 rounded-xl border p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <h2 className="text-xl font-semibold text-gray-900">
                  {searchedOrder.id}
                </h2>
              </div>

              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${statusColor(
                  currentStatus
                )}`}
              >
                <StatusIcon status={currentStatus} />
                {prettyStatus(currentStatus)}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Customer</p>
                <p className="mt-1 font-medium text-gray-900">
                  {searchedOrder.customerName}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Email</p>
                <p className="mt-1 font-medium text-gray-900">
                  {searchedOrder.email}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="mt-1 font-medium text-gray-900">
                  ₹{searchedOrder.totalAmount}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Delivery Progress
              </h3>

              <div className="grid gap-3 sm:grid-cols-4">
                {orderSteps.map((step, index) => {
                  const currentIndex = orderSteps.indexOf(currentStatus)
                  const active = index <= currentIndex

                  return (
                    <div
                      key={step}
                      className={`rounded-xl border p-4 text-center ${
                        active
                          ? 'border-green-200 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-gray-50 text-gray-400'
                      }`}
                    >
                      <p className="text-sm font-medium">
                        {prettyStatus(step)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}