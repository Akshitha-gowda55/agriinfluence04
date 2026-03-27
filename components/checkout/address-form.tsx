'use client'

import { Address } from '@/types'

type AddressFormProps = {
  value: Address
  errors?: Partial<Record<keyof Address, string>>
  onChange: (field: keyof Address, value: string) => void
}

export default function AddressForm({
  value,
  errors = {},
  onChange,
}: AddressFormProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={value.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
            placeholder="Enter full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={value.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Address Line 1
          </label>
          <input
            type="text"
            value={value.addressLine1}
            onChange={(e) => onChange('addressLine1', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
            placeholder="House no, street, area"
          />
          {errors.addressLine1 && (
            <p className="mt-1 text-xs text-red-600">{errors.addressLine1}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Address Line 2
          </label>
          <input
            type="text"
            value={value.addressLine2 || ''}
            onChange={(e) => onChange('addressLine2', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
            placeholder="Landmark, apartment, optional"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            value={value.city}
            onChange={(e) => onChange('city', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
            placeholder="Enter city"
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            value={value.state}
            onChange={(e) => onChange('state', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
            placeholder="Enter state"
          />
          {errors.state && (
            <p className="mt-1 text-xs text-red-600">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            type="text"
            value={value.pincode}
            onChange={(e) => onChange('pincode', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
            placeholder="Enter pincode"
          />
          {errors.pincode && (
            <p className="mt-1 text-xs text-red-600">{errors.pincode}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            value={value.country || 'India'}
            onChange={(e) => onChange('country', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
            placeholder="Country"
          />
        </div>
      </div>
    </div>
  )
}