'use client'

import { useEffect, useMemo, useState } from 'react'
import { BACKEND_URL, fetchFromBackend } from '@/lib/api'

type Product = {
  id: number
  name: string
  slug?: string
  category: string
  price: number
  stock: number
  imageUrl?: string
  description?: string
}

type ProductForm = {
  name: string
  category: string
  price: string
  stock: string
  description: string
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function AdminProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [editingImage, setEditingImage] = useState<File | null>(null)

  const [newProduct, setNewProduct] = useState<ProductForm>({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  })

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editProduct, setEditProduct] = useState<ProductForm>({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  })

  const previewUrl = useMemo(() => {
    if (!selectedImage) return ''
    return URL.createObjectURL(selectedImage)
  }, [selectedImage])

  const editingPreviewUrl = useMemo(() => {
    if (!editingImage) return ''
    return URL.createObjectURL(editingImage)
  }, [editingImage])

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      if (editingPreviewUrl) URL.revokeObjectURL(editingPreviewUrl)
    }
  }, [previewUrl, editingPreviewUrl])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await fetchFromBackend('/api/products')
      setProducts(Array.isArray(data) ? data : [])
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
      const formData = new FormData()
      formData.append('name', newProduct.name)
      formData.append('slug', makeSlug(newProduct.name))
      formData.append('category', newProduct.category)
      formData.append('price', newProduct.price)
      formData.append('stock', newProduct.stock)
      formData.append('description', newProduct.description)

      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      const createdProduct = await fetchFromBackend('/api/products', {
        method: 'POST',
        body: formData,
      })

      setProducts((prev) => [...prev, createdProduct])

      setNewProduct({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
      })
      setSelectedImage(null)
    } catch (error) {
      console.error(error)
      alert('Failed to add product')
    }
  }

  const startEdit = (product: Product) => {
    setEditingId(product.id)
    setEditProduct({
      name: product.name || '',
      category: product.category || '',
      price: String(product.price ?? ''),
      stock: String(product.stock ?? ''),
      description: product.description || '',
    })
    setEditingImage(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingImage(null)
    setEditProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
    })
  }

  const handleUpdateProduct = async () => {
    if (
      editingId === null ||
      !editProduct.name.trim() ||
      !editProduct.category.trim() ||
      !editProduct.price.trim() ||
      !editProduct.stock.trim()
    ) {
      alert('Please fill all required fields')
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', editProduct.name)
      formData.append('slug', makeSlug(editProduct.name))
      formData.append('category', editProduct.category)
      formData.append('price', editProduct.price)
      formData.append('stock', editProduct.stock)
      formData.append('description', editProduct.description)

      if (editingImage) {
        formData.append('image', editingImage)
      }

      const updatedProduct = await fetchFromBackend(`/api/products/${editingId}`, {
        method: 'PUT',
        body: formData,
      })

      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId ? updatedProduct : product
        )
      )

      cancelEdit()
      alert('Product updated successfully')
    } catch (error) {
      console.error(error)
      alert('Failed to update product')
    }
  }

  const handleDeleteProduct = async (id: number) => {
    const confirmed = window.confirm('Delete this product?')
    if (!confirmed) return

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

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              className="w-full rounded-md border px-4 py-2"
            />

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-3 h-28 w-28 rounded-lg border object-cover"
              />
            )}
          </div>

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
        <div className="rounded-xl border bg-white p-6 text-red-600 shadow-sm">
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
                  Image
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

                  <td className="px-4 py-3">
                    {product.imageUrl ? (
                      <img
                        src={`${BACKEND_URL}${product.imageUrl}`}
                        alt={product.name}
                        className="h-14 w-14 rounded-md border object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-md border text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editingId === product.id ? (
                      <input
                        type="text"
                        value={editProduct.name}
                        onChange={(e) =>
                          setEditProduct((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full rounded border px-3 py-2"
                      />
                    ) : (
                      product.name
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editingId === product.id ? (
                      <input
                        type="text"
                        value={editProduct.category}
                        onChange={(e) =>
                          setEditProduct((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full rounded border px-3 py-2"
                      />
                    ) : (
                      product.category
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={editProduct.price}
                        onChange={(e) =>
                          setEditProduct((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        className="w-full rounded border px-3 py-2"
                      />
                    ) : (
                      <>₹{Number(product.price).toFixed(2)}</>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={editProduct.stock}
                        onChange={(e) =>
                          setEditProduct((prev) => ({
                            ...prev,
                            stock: e.target.value,
                          }))
                        }
                        className="w-full rounded border px-3 py-2"
                      />
                    ) : (
                      product.stock
                    )}
                  </td>

                  <td className="px-4 py-3 align-top">
                    {editingId === product.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editProduct.description}
                          onChange={(e) =>
                            setEditProduct((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Description"
                          rows={3}
                          className="w-full rounded border px-3 py-2"
                        />

                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setEditingImage(e.target.files?.[0] || null)
                          }
                          className="w-full rounded border px-3 py-2"
                        />

                        {editingPreviewUrl && (
                          <img
                            src={editingPreviewUrl}
                            alt="Edit preview"
                            className="h-16 w-16 rounded border object-cover"
                          />
                        )}

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={handleUpdateProduct}
                            className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                          >
                            Save
                          </button>

                          <button
                            onClick={cancelEdit}
                            className="rounded-md bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="rounded-md bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
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