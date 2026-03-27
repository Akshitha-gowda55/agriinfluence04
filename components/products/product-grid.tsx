import { ProductCard } from '@/components/products/product-card'

type Product = {
  id: number
  name: string
  category: string
  price: number
  description: string
  imageUrl?: string
  stock: number
}

type ProductGridProps = {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          No products found
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Try adjusting your filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}