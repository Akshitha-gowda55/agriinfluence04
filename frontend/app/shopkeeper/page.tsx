'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { fetchFromBackend } from '@/lib/api'

type Product = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
  shopkeeperId: number
}

type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'SHIPPED'
  | 'DELIVERED'

type Order = {
  id: number
  customerName: string
  phone: string
  address: string
  totalAmount: number
  paymentId: string
  status: OrderStatus
  shopkeeperId: number
}

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  category: '',
  stock: '',
}

const ORDER_STATUSES: OrderStatus[] = [
  'PENDING',
  'CONFIRMED',
  'SHIPPED',
  'DELIVERED',
]

export default function ShopkeeperPage() {
  const user = useAuthStore((state) => state.user)

  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: '',
  })

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
  }, [orders])

  async function loadData() {
    if (!user?.id) return

    try {
      setLoading(true)
      setError('')

      const [productsData, ordersData] = await Promise.all([
        fetchFromBackend(`/api/shopkeeper/${user.id}/products`),
        fetchFromBackend(`/api/shopkeeper/${user.id}/orders`),
      ])

      setProducts(Array.isArray(productsData) ? productsData : [])
      setOrders(Array.isArray(ordersData) ? ordersData : [])
    } catch (err: any) {
      setError(err.message || 'Failed to load shopkeeper data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [user?.id])

  function resetForm() {
    setProductForm(emptyProduct)
    setEditingProductId(null)
  }

  function startEdit(product: Product) {
    setEditingProductId(product.id)
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: String(product.price ?? ''),
      imageUrl: product.imageUrl || '',
      category: product.category || '',
      stock: String(product.stock ?? ''),
    })
  }

  async function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault()

    if (!user?.id) return

    try {
      setSaving(true)

      const payload = {
        name: productForm.name,
        description: productForm.description,
        price: Number(productForm.price),
        imageUrl: productForm.imageUrl,
        category: productForm.category,
        stock: Number(productForm.stock),
      }

      if (editingProductId) {
        await fetchFromBackend(
          `/api/shopkeeper/${user.id}/products/${editingProductId}`,
          {
            method: 'PUT',
            body: JSON.stringify(payload),
          }
        )
      } else {
        await fetchFromBackend(`/api/shopkeeper/${user.id}/products`, {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }

      resetForm()
      await loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteProduct(productId: number) {
    if (!user?.id) return

    const confirmed = window.confirm('Delete this product?')
    if (!confirmed) return

    try {
      await fetchFromBackend(`/api/shopkeeper/${user.id}/products/${productId}`, {
        method: 'DELETE',
      })
      await loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to delete product')
    }
  }

  async function updateOrderStatus(orderId: number, status: OrderStatus) {
    if (!user?.id) return

    try {
      await fetchFromBackend(
        `/api/shopkeeper/${user.id}/orders/${orderId}/status?status=${encodeURIComponent(status)}`,
        {
          method: 'PUT',
        }
      )
      await loadData()
    } catch (err: any) {
      alert(err.message || 'Failed to update order status')
    }
  }

  function getStatusBadgeClass(status: OrderStatus) {
    switch (status?.toUpperCase()) {
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

  function formatStatus(status: OrderStatus) {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'Pending'
      case 'CONFIRMED':
        return 'Confirmed'
      case 'SHIPPED':
        return 'Shipped'
      case 'DELIVERED':
        return 'Delivered'
      default:
        return status
    }
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold">Shopkeeper Dashboard</h1>
        <p className="mt-4 text-red-600">Please login first.</p>
      </div>
    )
  }

  if (user.role !== 'SHOPKEEPER') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold">Shopkeeper Dashboard</h1>
        <p className="mt-4 text-red-600">
          Access denied. Only shopkeepers can view this page.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Shopkeeper Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Manage your products and orders from one place.
      </p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="mt-2 text-3xl font-bold">{products.length}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold">{orders.length}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="mt-2 text-3xl font-bold">₹{totalRevenue}</h2>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {editingProductId ? 'Edit Product' : 'Add Product'}
            </h2>
            {editingProductId && (
              <button
                onClick={resetForm}
                className="rounded-lg border px-4 py-2 text-sm font-medium"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSaveProduct} className="space-y-4">
            <input
              type="text"
              placeholder="Product name"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
              required
            />

            <textarea
              placeholder="Description"
              value={productForm.description}
              onChange={(e) =>
                setProductForm({ ...productForm, description: e.target.value })
              }
              className="min-h-[110px] w-full rounded-xl border px-4 py-3 outline-none"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
              required
            />

            <input
              type="text"
              placeholder="Image URL"
              value={productForm.imageUrl}
              onChange={(e) =>
                setProductForm({ ...productForm, imageUrl: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={productForm.category}
              onChange={(e) =>
                setProductForm({ ...productForm, category: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={productForm.stock}
              onChange={(e) =>
                setProductForm({ ...productForm, stock: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
              required
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {saving
                ? 'Saving...'
                : editingProductId
                  ? 'Update Product'
                  : 'Add Product'}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">My Products</h2>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products added yet.</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-2xl border p-4"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="mt-2 font-medium">₹{product.price}</p>
                    <p className="text-sm text-gray-500">
                      {product.category} · Stock: {product.stock}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">My Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse overflow-hidden rounded-xl">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-3">#{order.id}</td>
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3">{order.phone}</td>
                    <td className="px-4 py-3">{order.address}</td>
                    <td className="px-4 py-3">₹{Number(order.totalAmount ?? 0).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="rounded-lg border px-3 py-2"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {formatStatus(status)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}