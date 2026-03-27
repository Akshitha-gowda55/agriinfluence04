// components/products/product-sort.tsx

'use client'

import { SortOption } from '@/lib/filters'

type ProductSortProps = {
  value: SortOption
  onChange: (value: SortOption) => void
}

export default function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">Sort by</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
      >
        <option value="featured">Featured</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="rating-high-low">Rating</option>
        <option value="name-a-z">Name: A to Z</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  )
}