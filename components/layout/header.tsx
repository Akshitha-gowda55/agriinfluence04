'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ShoppingCart,
  Menu,
  X,
  Leaf,
  Heart,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'

const navigation = [
  { name: 'Home', href: '/app' },
  { name: 'Products', href: '/products' },
  { name: 'AI Advisor', href: '/ai-chat' },
  { name: 'Wishlist', href: '/wishlist' },
  { name: 'Orders', href: '/orders' },
  { name: 'Track Order', href: '/track-order' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const items = useCartStore((state) => state.items)

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Top"
      >
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Agri<span className="text-primary">Influence</span>
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            <Button
  variant="ghost"
  size="icon"
  asChild
  className="hidden sm:inline-flex"
>
  <Link href="/" aria-label="Home">
    <Home className="h-5 w-5" />
  </Link>
</Button>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-md px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Signup
              </Link>
            </div>

            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Signup
              </Link>

              <Link
                href="/cart"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}