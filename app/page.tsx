import HeroSection from '@/components/home/hero-section'
import CategoriesSection from '@/components/home/categories-section'
import TrustBadges from '@/components/home/trust-badges'
import TestimonialsSection from '@/components/home/testimonials-section'
import ProductsPage from './products/page'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <TrustBadges />
      <TestimonialsSection />
      <ProductsPage />
    </>
  )
}