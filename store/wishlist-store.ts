import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { fetchFromBackend } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'

type WishlistItem = {
  id: string | number
  name: string
  price: number
  image?: string
}

type BackendWishListItem = {
  id?: number
  userId: number
  productId: number
  name: string
  price: number
  image?: string
}

type WishlistState = {
  items: WishlistItem[]
  loading: boolean

  loadWishlist: () => Promise<void>
  addToWishlist: (item: WishlistItem) => Promise<void>
  removeFromWishlist: (id: string | number) => Promise<void>
  toggleWishlist: (item: WishlistItem) => Promise<void>
  clearWishlist: () => void
  isInWishlist: (id: string | number) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,

      loadWishlist: async () => {
        const user = useAuthStore.getState().user

        if (!user?.id) {
          return
        }

        try {
          set({ loading: true })

          const data: BackendWishListItem[] = await fetchFromBackend(
            `/api/wishlist/user/${user.id}`
          )

          const mappedItems: WishlistItem[] = data.map((item) => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
          }))

          set({ items: mappedItems })
        } catch (error) {
          console.error('Failed to load wishlist:', error)
        } finally {
          set({ loading: false })
        }
      },

      addToWishlist: async (item) => {
        const user = useAuthStore.getState().user
        const exists = get().items.some((i) => i.id === item.id)

        if (exists) {
          return
        }

        if (!user?.id) {
          set((state) => ({
            items: [...state.items, item],
          }))
          return
        }

        try {
          await fetchFromBackend('/api/wishlist', {
            method: 'POST',
            body: JSON.stringify({
              userId: Number(user.id),
              productId: Number(item.id),
              name: item.name,
              price: item.price,
              image: item.image || '',
            }),
          })

          set((state) => ({
            items: [...state.items, item],
          }))
        } catch (error) {
          console.error('Failed to add to wishlist:', error)
        }
      },

      removeFromWishlist: async (id) => {
        const user = useAuthStore.getState().user

        if (!user?.id) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          }))
          return
        }

        try {
          await fetchFromBackend(
            `/api/wishlist/user/${user.id}/product/${id}`,
            {
              method: 'DELETE',
            }
          )

          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          }))
        } catch (error) {
          console.error('Failed to remove from wishlist:', error)
        }
      },

      toggleWishlist: async (item) => {
        const exists = get().items.some((i) => i.id === item.id)

        if (exists) {
          await get().removeFromWishlist(item.id)
        } else {
          await get().addToWishlist(item)
        }
      },

      clearWishlist: () => {
        set({ items: [] })
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },
    }),
    {
      name: 'agri-wishlist',
    }
  )
)