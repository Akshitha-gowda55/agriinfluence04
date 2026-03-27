'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type SignupResponse = {
  success: boolean
  message?: string
  token?: string
}

export function SignupForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  })

  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    let valid = true

    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      valid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      valid = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      valid = false
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      valid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'signup',
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data: SignupResponse = await res.json()

      if (!data.success) {
        setErrors((prev) => ({
          ...prev,
          general: data.message || 'Signup failed',
        }))
        return
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      router.push('/login')
      router.refresh()
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: 'Something went wrong',
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {errors.general && (
        <div className="text-red-500 text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <p className="text-red-500 text-sm">{errors.name}</p>
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <p className="text-red-500 text-sm">{errors.email}</p>
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <p className="text-red-500 text-sm">{errors.password}</p>
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white p-3 rounded"
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>

    </form>
  )
}