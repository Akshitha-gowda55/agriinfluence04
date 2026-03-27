// lib/filters.ts

import type { Product, ProductCategory } from '@/types'

export type SortOption =
  | 'featured'
  | 'price-low-high'
  | 'price-high-low'
  | 'rating-high-low'
  | 'newest'
  | 'name-a-z'

export interface ProductFilterOptions {
  category?: ProductCategory | 'All'
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStockOnly?: boolean
  crop?: string
  search?: string
  sortBy?: SortOption
}

export function filterProducts(
  products: Product[],
  options: ProductFilterOptions
): Product[] {
  let filtered = [...products]

  if (options.category && options.category !== 'All') {
    filtered = filtered.filter(
      (product) => product.category === options.category
    )
  }

  if (typeof options.minPrice === 'number') {
    filtered = filtered.filter(
      (product) => product.price >= options.minPrice!
    )
  }

  if (typeof options.maxPrice === 'number') {
    filtered = filtered.filter(
      (product) => product.price <= options.maxPrice!
    )
  }

  if (typeof options.minRating === 'number') {
    filtered = filtered.filter(
      (product) => product.rating >= options.minRating!
    )
  }

  if (options.inStockOnly) {
    filtered = filtered.filter(
      (product) => product.stockStatus !== 'out_of_stock'
    )
  }

  if (options.crop) {
    const crop = options.crop.toLowerCase()

    filtered = filtered.filter((product) =>
      (product.crops ?? []).some((item) =>
        item.toLowerCase().includes(crop)
      )
    )
  }

  if (options.search) {
    const query = options.search.toLowerCase().trim()

    filtered = filtered.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        (product.brand ?? '').toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.shortDescription ?? '').toLowerCase().includes(query) ||
        (product.crops ?? []).some((crop) =>
          crop.toLowerCase().includes(query)
        )
      )
    })
  }

  return sortProducts(filtered, options.sortBy || 'featured')
}

export function sortProducts(
  products: Product[],
  sortBy: SortOption = 'featured'
): Product[] {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-low-high':
      return sorted.sort((a, b) => a.price - b.price)

    case 'price-high-low':
      return sorted.sort((a, b) => b.price - a.price)

    case 'rating-high-low':
      return sorted.sort((a, b) => b.rating - a.rating)

    case 'name-a-z':
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name)
      )

    case 'newest':
      return sorted.sort((a, b) => {
        const aDate = a.createdAt
          ? new Date(a.createdAt).getTime()
          : 0

        const bDate = b.createdAt
          ? new Date(b.createdAt).getTime()
          : 0

        return bDate - aDate
      })

    case 'featured':
    default:
      return sorted.sort((a, b) => {
        const scoreA =
          (a.featured ? 3 : 0) +
          (a.bestSeller ? 2 : 0) +
          (a.trending ? 1 : 0)

        const scoreB =
          (b.featured ? 3 : 0) +
          (b.bestSeller ? 2 : 0) +
          (b.trending ? 1 : 0)

        return scoreB - scoreA
      })
  }
}

export function getUniqueCrops(products: Product[]): string[] {
  const crops = new Set<string>()

  products.forEach((product) => {
    ;(product.crops ?? []).forEach((crop) =>
      crops.add(crop)
    )
  })

  return Array.from(crops).sort((a, b) =>
    a.localeCompare(b)
  )
}

export function getPriceRange(products: Product[]) {
  if (products.length === 0) {
    return { min: 0, max: 0 }
  }

  const prices = products.map((product) => product.price)

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}