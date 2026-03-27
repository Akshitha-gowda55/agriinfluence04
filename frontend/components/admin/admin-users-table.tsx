import { Order } from '@/types'

export const orders: Order[] = [
  {
    id: 'ORD-1001',
    userId: 'user_1',
    items: [
      {
        productId: 'prod_1',
        name: 'Premium NPK Fertilizer',
        image:
          'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
        price: 799,
        quantity: 1,
        selectedSize: '5kg',
      },
      {
        productId: 'prod_4',
        name: 'Hybrid Tomato Seeds',
        image:
          'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80',
        price: 199,
        quantity: 2,
        selectedSize: '100g',
      },
    ],
    shippingAddress: {
      fullName: 'Akshitha Gowda',
      phone: '9876543210',
      addressLine1: '12 MG Road',
      addressLine2: 'Near Market Circle',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
    },
    pricing: {
      subtotal: 1197,
      shipping: 0,
      tax: 215.46,
      discount: 0,
      total: 1412.46,
    },
    orderStatus: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    createdAt: '2026-03-06T10:30:00.000Z',
    updatedAt: '2026-03-08T12:00:00.000Z',
  },
  {
    id: 'ORD-1002',
    userId: 'user_1',
    items: [
      {
        productId: 'prod_2',
        name: 'Organic Vermicompost',
        image:
          'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
        price: 499,
        quantity: 1,
        selectedSize: '5kg',
      },
    ],
    shippingAddress: {
      fullName: 'Akshitha Gowda',
      phone: '9876543210',
      addressLine1: '12 MG Road',
      addressLine2: 'Near Market Circle',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
    },
    pricing: {
      subtotal: 499,
      shipping: 60,
      tax: 89.82,
      discount: 0,
      total: 648.82,
    },
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'upi',
    createdAt: '2026-02-22T09:00:00.000Z',
    updatedAt: '2026-02-26T16:00:00.000Z',
  },
]

export function getOrderById(id: string) {
  return orders.find((order) => order.id === id)
}