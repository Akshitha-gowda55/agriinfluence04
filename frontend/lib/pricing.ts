// lib/pricing.ts

import { CartItem, OrderPricing, Product } from '@/types'

export const SHIPPING_CHARGE = 60
export const FREE_SHIPPING_THRESHOLD = 999
export const TAX_RATE = 0.18

export function calculateDiscountPercent(
  price: number,
  originalPrice?: number
): number {
  if (!originalPrice || originalPrice <= price) return 0

  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export function calculateProductSavings(product: Product): number {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0

  return product.originalPrice - product.price
}

export function calculateItemTotal(item: CartItem): number {
  return item.price * item.quantity
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + calculateItemTotal(item), 0)
}

export function calculateTotalDiscount(items: CartItem[]): number {
  return items.reduce((total, item) => {
    if (!item.originalPrice || item.originalPrice <= item.price) return total

    const perItemDiscount = item.originalPrice - item.price
    return total + perItemDiscount * item.quantity
  }, 0)
}

export function calculateShipping(subtotal: number): number {
  if (subtotal === 0) return 0
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0

  return SHIPPING_CHARGE
}

export function calculateTax(subtotal: number): number {
  if (subtotal === 0) return 0

  return Number((subtotal * TAX_RATE).toFixed(2))
}

export function calculateFinalTotal(items: CartItem[]): number {
  const subtotal = calculateSubtotal(items)
  const shipping = calculateShipping(subtotal)
  const tax = calculateTax(subtotal)

  return Number((subtotal + shipping + tax).toFixed(2))
}

export function getOrderPricing(items: CartItem[]): OrderPricing {
  const subtotal = calculateSubtotal(items)
  const shipping = calculateShipping(subtotal)
  const tax = calculateTax(subtotal)
  const discount = calculateTotalDiscount(items)
  const total = Number((subtotal + shipping + tax).toFixed(2))

  return {
    subtotal,
    shipping,
    tax,
    discount,
    total,
  }
}

export function formatPrice(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getSavingsMessage(subtotal: number): string {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 'You qualify for free shipping'
  }

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  return `Add ₹${remaining} more to get free shipping`
}