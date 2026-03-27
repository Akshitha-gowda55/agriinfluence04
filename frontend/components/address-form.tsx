'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Address {
  name: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

interface AddressFormProps {
  onChange?: (address: Address) => void
}

export function AddressForm({ onChange }: AddressFormProps) {
  const [address, setAddress] = useState<Address>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const updateField = (field: keyof Address, value: string) => {
    const updated = { ...address, [field]: value }
    setAddress(updated)

    if (onChange) {
      onChange(updated)
    }
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Shipping Address</h2>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={address.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={address.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="9876543210"
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Street, House number"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={address.city}
              onChange={(e) => updateField('city', e.target.value)}
              placeholder="City"
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={address.state}
              onChange={(e) => updateField('state', e.target.value)}
              placeholder="State"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            value={address.pincode}
            onChange={(e) => updateField('pincode', e.target.value)}
            placeholder="560001"
          />
        </div>
      </div>
    </div>
  )
}