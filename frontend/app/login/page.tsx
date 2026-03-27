'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchFromBackend } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth-store'

type LoginResponse = {
  token?: string
  user?: {
    id: number
    name: string
    email: string
    role?: string
  }
  id?: number
  name?: string
  email?: string
  role?: string
  message?: string
}

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      const data: LoginResponse = await fetchFromBackend('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (data.message && !data.user && !data.id) {
        setError(data.message)
        return
      }

      const user = data.user
        ? {
            id: Number(data.user.id),
            name: data.user.name,
            email: data.user.email,
            role: data.user.role || 'USER',
          }
        : {
            id: Number(data.id),
            name: data.name || '',
            email: data.email || '',
            role: data.role || 'USER',
          }

      const token = data.token || 'dummy-token'

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      login(user, token)

      if (user.role === 'SHOPKEEPER') {
        router.push('/shopkeeper')
      } else if (user.role === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } catch (err) {
      console.error(err)
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>

      <form
        onSubmit={handleLogin}
        className="space-y-4 rounded-xl border p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  )
}