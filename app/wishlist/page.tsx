'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist-store'

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items)

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">

      <h1 className="mb-6 text-3xl font-bold">
        Wishlist
      </h1>

      {items.length === 0 ? (

        <p className="text-muted-foreground">
          No products saved in wishlist.
        </p>

      ) : (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {items.map((item) => (

            <div
              key={item.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >

              <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">

                <Image
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />

              </div>

              <h2 className="mt-4 text-lg font-semibold">
                {item.name}
              </h2>

              <p className="mt-2 font-bold">
                ₹{item.price}
              </p>

              <div className="mt-4 flex items-center gap-3">

                <Link
                  href={`/products/${item.id}`}
                  className="rounded-md border px-4 py-2 text-sm"
                >
                  View Product
                </Link>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center rounded-md border px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >

                  <Trash2 className="mr-1 h-4 w-4" />
                  Remove

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  )
}