import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Smart Agriculture Shopping for Modern Farmers
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Buy fertilizers, pesticides, seeds, and organic products with a smooth
          ecommerce experience.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/products">
            <Button size="lg">Buy Now</Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}