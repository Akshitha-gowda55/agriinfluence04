import { create } from 'zustand'
import type { CartItem, Product } from '@/types'
import { fetchFromBackend } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'

type BackendCartItem = {
  id?: number
  userId: number
  productId: number
  name: string
  price: number
  quantity: number
  image?: string
}

type CartStore = {
  items: CartItem[]
  loading: boolean

  addToCart: (product: Product) => Promise<void>
  removeFromCart: (productId: string | number) => Promise<void>
  increaseQuantity: (productId: string | number) => Promise<void>
  decreaseQuantity: (productId: string | number) => Promise<void>
  clearCart: () => Promise<void>
  fetchCart: () => Promise<void>

  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,

  addToCart: async (product) => {
    const user = useAuthStore.getState().user

    if (!user?.id) {
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id)

        let updatedItems: CartItem[]

        if (existingItem) {
          updatedItems = state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          updatedItems = [
            ...state.items,
            {
              ...product,
              quantity: 1,
            },
          ]
        }

        localStorage.setItem('cart', JSON.stringify(updatedItems))

        return {
          items: updatedItems,
        }
      })

      return
    }

    try {
      const existingItem = get().items.find((item) => item.id === product.id)

      if (existingItem) {
        await fetchFromBackend(`/api/cart/user/${user.id}/product/${product.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            quantity: existingItem.quantity + 1,
          }),
        })

        set((state) => ({
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }))
      } else {
        await fetchFromBackend('/api/cart', {
          method: 'POST',
          body: JSON.stringify({
            userId: Number(user.id),
            productId: Number(product.id),
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image || '',
          }),
        })

        set((state) => ({
          items: [
            ...state.items,
            {
              ...product,
              quantity: 1,
            },
          ],
        }))
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  },

  removeFromCart: async (productId) => {
    const user = useAuthStore.getState().user

    if (!user?.id) {
      set((state) => {
        const updatedItems = state.items.filter((item) => item.id !== productId)
        localStorage.setItem('cart', JSON.stringify(updatedItems))
        return { items: updatedItems }
      })
      return
    }

    try {
      await fetchFromBackend(`/api/cart/user/${user.id}/product/${productId}`, {
        method: 'DELETE',
      })

      set((state) => ({
        items: state.items.filter((item) => item.id !== productId),
      }))
    } catch (error) {
      console.error('Failed to remove from cart:', error)
    }
  },

  increaseQuantity: async (productId) => {
    const user = useAuthStore.getState().user

    if (!user?.id) {
      set((state) => {
        const updatedItems = state.items.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )

        localStorage.setItem('cart', JSON.stringify(updatedItems))
        return { items: updatedItems }
      })
      return
    }

    try {
      const item = get().items.find((i) => i.id === productId)
      if (!item) return

      await fetchFromBackend(`/api/cart/user/${user.id}/product/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({
          quantity: item.quantity + 1,
        }),
      })

      set((state) => ({
        items: state.items.map((cartItem) =>
          cartItem.id === productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      }))
    } catch (error) {
      console.error('Failed to increase quantity:', error)
    }
  },

  decreaseQuantity: async (productId) => {
    const user = useAuthStore.getState().user

    if (!user?.id) {
      set((state) => {
        const updatedItems = state.items
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)

        localStorage.setItem('cart', JSON.stringify(updatedItems))
        return { items: updatedItems }
      })
      return
    }

    try {
      const item = get().items.find((i) => i.id === productId)
      if (!item) return

      if (item.quantity <= 1) {
        await fetchFromBackend(`/api/cart/user/${user.id}/product/${productId}`, {
          method: 'DELETE',
        })

        set((state) => ({
          items: state.items.filter((cartItem) => cartItem.id !== productId),
        }))
      } else {
        await fetchFromBackend(`/api/cart/user/${user.id}/product/${productId}`, {
          method: 'PUT',
          body: JSON.stringify({
            quantity: item.quantity - 1,
          }),
        })

        set((state) => ({
          items: state.items.map((cartItem) =>
            cartItem.id === productId
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        }))
      }
    } catch (error) {
      console.error('Failed to decrease quantity:', error)
    }
  },

  clearCart: async () => {
    const user = useAuthStore.getState().user

    if (!user?.id) {
      localStorage.removeItem('cart')
      set({ items: [] })
      return
    }

    try {
      await fetchFromBackend(`/api/cart/user/${user.id}`, {
        method: 'DELETE',
      })

      set({ items: [] })
    } catch (error) {
      console.error('Failed to clear cart:', error)
    }
  },

  fetchCart: async () => {
    const user = useAuthStore.getState().user

    if (!user?.id) {
      const storedCart = localStorage.getItem('cart')

      if (storedCart) {
        set({
          items: JSON.parse(storedCart),
        })
      } else {
        set({
          items: [],
        })
      }
      return
    }

    try {
      set({ loading: true })

      const data: BackendCartItem[] = await fetchFromBackend(
        `/api/cart/user/${user.id}`
      )

      set({
  items: data.map((item) => ({
    id: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  })) as CartItem[],
})
    } catch (error) {
      console.error('Failed to fetch cart:', error)
      set({ items: [] })
    } finally {
      set({ loading: false })
    }
  },

  getTotalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
}))