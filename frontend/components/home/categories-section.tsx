import Link from 'next/link'

const categories = [
  {
    name: 'Fertilizers',
    description: 'Boost crop growth with high-quality fertilizers.',
    href: '/products?category=Fertilizers',
  },
  {
    name: 'Pesticides',
    description: 'Protect crops from pests and diseases.',
    href: '/products?category=Pesticides',
  },
  {
    name: 'Seeds',
    description: 'High-yield seeds for different farming needs.',
    href: '/products?category=Seeds',
  },
  {
    name: 'Organic Products',
    description: 'Eco-friendly solutions for sustainable farming.',
    href: '/products?category=Organic%20Products',
  },
]

export default function CategoriesSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">
            Explore products by agricultural category.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="rounded-xl border bg-background p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}