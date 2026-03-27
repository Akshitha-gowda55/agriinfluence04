'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type LoginResponse = {
  success: boolean
  message?: string
  token?: string
  user?: {
    id: string
    name: string
    email: string
    role?: string
  }
}

export function LoginForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  })

  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      general: '',
    }

    let isValid = true

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
      isValid = false
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
      general: '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      setErrors((prev) => ({
        ...prev,
        general: '',
      }))

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email: formData.email,
          password: formData.password,
        }),
      })

      const data: LoginResponse = await response.json()

      if (!response.ok || !data.success) {
        setErrors((prev) => ({
          ...prev,
          general: data.message || 'Login failed. Please try again.',
        }))
        return
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      if (data.user?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }

      router.refresh()
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: 'Something went wrong. Please try again later.',
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.general}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <Link
            href="/support"
            className="text-sm text-green-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}