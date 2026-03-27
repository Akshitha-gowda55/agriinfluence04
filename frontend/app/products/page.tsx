'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { fetchFromBackend } from '@/lib/api'
import ProductFilters from '@/components/products/product-filters'
import ProductSort from '@/components/products/product-sort'
import ProductGrid from '@/components/products/product-grid'
import { Input } from '@/components/ui/input'
import type { SortOption } from '@/lib/filters'

export type Product = {
  id: number
  name: string
  slug: string
  category: string
  price: number
  description: string
  imageUrl?: string
  stock: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortOption, setSortOption] = useState<SortOption>('featured')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await fetchFromBackend('/api/products')
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    const filtered = products.filter((product) => {
      const productCategory = (product.category || '').trim().toLowerCase()

      const categoryMatch =
        selectedCategory === 'All' ||
        (selectedCategory === 'Fertilizer' &&
          productCategory.includes('fertilizer')) ||
        (selectedCategory === 'Fungicide' &&
          productCategory.includes('fungicide')) ||
        (selectedCategory === 'Pesticide' &&
          productCategory.includes('pesticide'))

      const stockMatch = !inStockOnly || product.stock > 0

      const searchMatch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        productCategory.includes(query) ||
        (product.description || '').toLowerCase().includes(query)

      return categoryMatch && stockMatch && searchMatch
    })

    const sorted = [...filtered]

    if (sortOption === 'price-low-high') {
      sorted.sort((a, b) => a.price - b.price)
    }

    if (sortOption === 'price-high-low') {
      sorted.sort((a, b) => b.price - a.price)
    }

    if (sortOption === 'newest') {
      sorted.sort((a, b) => b.id - a.id)
    }

    if (sortOption === 'name-a-z') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    }

    return sorted
  }, [products, searchTerm, selectedCategory, inStockOnly, sortOption])

  if (loading) {
    return (
      <div className="px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">All Products</h1>
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">All Products</h1>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">All Products</h1>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div>
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-6">
            <ProductSort value={sortOption} onChange={setSortOption} />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border bg-gray-50 p-8 text-center text-sm text-gray-500">
              No products found.
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  )
}