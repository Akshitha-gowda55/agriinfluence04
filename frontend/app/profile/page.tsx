'use client'

import Link from 'next/link'

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-3 text-sm text-gray-600">
          Please log in or create an account to continue.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg border border-green-600 px-6 py-3 font-medium text-green-700 hover:bg-green-50"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  )
}