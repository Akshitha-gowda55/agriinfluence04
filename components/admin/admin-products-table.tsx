'use client'

import { useEffect, useState } from 'react'
import { fetchFromBackend } from '@/lib/api'

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  imageUrl?: string
  description?: string
}

type NewProductForm = {
  name: string
  category: string
  price: string
  stock: string
  description: string
  imageUrl: string
}

export function AdminProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await fetchFromBackend('/api/products')
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async () => {
    if (
      !newProduct.name.trim() ||
      !newProduct.category.trim() ||
      !newProduct.price.trim() ||
      !newProduct.stock.trim()
    ) {
      alert('Please fill all required fields')
      return
    }

    try {
      const createdProduct = await fetchFromBackend('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
          description: newProduct.description,
          imageUrl: newProduct.imageUrl,
        }),
      })

      setProducts((prev) => [...prev, createdProduct])

      setNewProduct({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        imageUrl: '',
      })
    } catch (error) {
      console.error(error)
      alert('Failed to add product')
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      await fetchFromBackend(`/api/products/${id}`, {
        method: 'DELETE',
      })

      setProducts((prev) => prev.filter((product) => product.id !== id))
    } catch (error) {
      console.error(error)
      alert('Failed to delete product')
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        Loading products...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Add New Product
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, name: e.target.value }))
            }
            className="rounded-md border px-4 py-2"
          />

          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, category: e.target.value }))
            }
            className="rounded-md border px-4 py-2"
          />

          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, price: e.target.value }))
            }
            className="rounded-md border px-4 py-2"
          />

          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, stock: e.target.value }))
            }
            className="rounded-md border px-4 py-2"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, imageUrl: e.target.value }))
            }
            className="rounded-md border px-4 py-2 md:col-span-2"
          />

          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="rounded-md border px-4 py-2 md:col-span-2"
            rows={4}
          />
        </div>

        <button
          onClick={handleAddProduct}
          className="mt-4 rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          Add Product
        </button>
      </div>

      {error && (
        <div className="rounded-xl border bg-white p-6 shadow-sm text-red-600">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          No products found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Stock
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {product.id}
                  </td>

                  <td className="px-4 py-3">{product.name}</td>

                  <td className="px-4 py-3">{product.category}</td>

                  <td className="px-4 py-3">₹{Number(product.price).toFixed(2)}</td>

                  <td className="px-4 py-3">{product.stock}</td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}