// components/layout/mobile-menu.tsx

'use client'

import Link from 'next/link'
import { X, ShoppingCart, Heart, User, Package, Headset } from 'lucide-react'

type NavItem = {
  name: string
  href: string
}

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  navigation: NavItem[]
}

export default function MobileMenu({
  open,
  onClose,
  navigation,
}: MobileMenuProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <p className="text-sm text-gray-500">Explore AgriInfluence</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="my-6 border-t" />

          <div className="space-y-2">
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              <Heart className="h-4 w-4" />
              Wishlist
            </Link>

            <Link
              href="/orders"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              <Package className="h-4 w-4" />
              Orders
            </Link>

            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>

            <Link
              href="/support"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              <Headset className="h-4 w-4" />
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}