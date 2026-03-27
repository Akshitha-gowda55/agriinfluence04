// components/products/product-filters.tsx

'use client'

import { categories } from '@/lib/categories'

type ProductFiltersProps = {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  inStockOnly: boolean
  onInStockChange: (value: boolean) => void
}

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
  inStockOnly,
  onInStockChange,
}: ProductFiltersProps) {
  return (
    <aside className="space-y-6 rounded-2xl border bg-white p-5">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Filters</h3>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        In stock only
      </label>
    </aside>
  )
}