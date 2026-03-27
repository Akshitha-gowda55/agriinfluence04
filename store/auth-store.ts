import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: string
  name: string
  email: string
  role?: string
}

type AuthState = {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  login: (user: User, token?: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user, token = 'dummy-token') =>
        set({
          user,
          token,
          isLoggedIn: true,
        }),

      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('orderPhone')
        set({
          user: null,
          token: null,
          isLoggedIn: false,
        })
      },
    }),
    {
      name: 'agri-auth',
    }
  )
)