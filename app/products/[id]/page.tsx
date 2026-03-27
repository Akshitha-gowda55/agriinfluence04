import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Heart, ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  rating: number
  reviews: number
  benefits: string[]
  stock: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Rose Growth Booster',
    price: 499,
    image: '/products/rose-growth-booster.jpg',
    category: 'Fertilizer',
    description:
      'A nutrient-rich fertilizer specially made for roses to improve flowering, stronger roots, greener leaves, and overall healthy growth.',
    rating: 4.7,
    reviews: 128,
    benefits: [
      'Boosts rose flowering',
      'Improves root strength',
      'Enhances leaf color and plant health',
      'Suitable for home gardens',
    ],
    stock: 'In Stock',
  },
  {
    id: 2,
    name: 'Rose Pest Guard Spray',
    price: 1,
    image: '/products/rose-pest-guard.jpg',
    category: 'Pesticide',
    description:
      'A rose-safe pest control spray that helps protect plants from common pests and keeps leaves fresh and damage-free.',
    rating: 4.5,
    reviews: 92,
    benefits: [
      'Protects from pests',
      'Gentle on rose plants',
      'Easy spray application',
      'Ideal for regular maintenance',
    ],
    stock: 'In Stock',
  },
  {
    id: 3,
    name: 'Organic Rose Care Mix',
    price: 399,
    image: '/products/organic-rose-care-mix.jpg',
    category: 'Organic Care',
    description:
      'An organic rose care mix designed to nourish the soil, support healthy blooming, and promote eco-friendly gardening.',
    rating: 4.6,
    reviews: 74,
    benefits: [
      'Organic and eco-friendly',
      'Improves soil health',
      'Supports blooming season',
      'Safe for regular use',
    ],
    stock: 'Limited Stock',
  },
]

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="relative h-[350px] w-full overflow-hidden rounded-2xl bg-muted sm:h-[450px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-semibold text-foreground">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="mt-6 text-3xl font-bold text-primary">
              ₹{product.price}
            </div>

            <p className="mt-6 text-base leading-7 text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-foreground">
                Key Benefits
              </p>
              <ul className="space-y-2">
                {product.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {product.stock}
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-11 px-6">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>

              <Button variant="outline" className="h-11 px-6">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Fast Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Delivered within 3-5 business days
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Quality Assured</p>
                    <p className="text-xs text-muted-foreground">
                      Trusted agricultural product quality
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold">Related Products</h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((item) => item.id !== product.id)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group rounded-2xl border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-52 w-full overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{item.name}</h3>
                    <p className="mt-2 font-bold text-primary">₹{item.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  )
}