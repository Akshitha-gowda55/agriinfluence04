import {ProductCard} from '@/components/product-card'
import { getRelatedProducts } from '@/lib/product'

type RelatedProductsProps = {
  category: string
  currentProductId: string
}

export default function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(category, currentProductId)

  if (relatedProducts.length === 0) return null

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <p className="mt-2 text-sm text-gray-600">
          You may also like these similar products.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}