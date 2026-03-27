// types/index.ts

export type ProductCategory =
  | 'Fertilizers'
  | 'Pesticides'
  | 'Seeds'
  | 'Organic Products'
  | 'Crop Nutrients'
  | 'Herbicides'
  | 'fertilizer'
  | 'pesticide'
  | 'seeds'

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'failed'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'razorpay' | 'cod' | 'upi'

export interface Review {
  id: string | number
  author?: string
  userId?: string
  userName?: string
  rating?: number
  comment: string
  date?: string
  createdAt?: string
  verified?: boolean
}

export interface Product {
  id: string | number
  name: string

  slug?: string
  brand?: string
  category: ProductCategory
  subcategory?: string

  price: number
  originalPrice?: number
  discountPercent?: number

  rating: number

  reviewCount?: number
  reviews?: number

  stock?: number
  stockStatus?: StockStatus
  inStock?: boolean

  image?: string
imageUrl?: string
images?: string[]

  shortDescription?: string
  description: string
  usage?: string
  usageInstructions?: string[]

  safetyInfo?: string[]
  benefits?: string[]
  crops?: string[]
  sizeOptions?: string[]
  tags?: string[]

  featured?: boolean
  bestSeller?: boolean
  trending?: boolean
  badge?: 'Best Seller' | 'Top Rated' | 'Sale' | 'Organic'

  createdAt?: string
  updatedAt?: string
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
}

export interface Address {
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  country?: string
}

export interface User {
  id: string | number
  name: string
  email: string
  phone?: string
  avatar?: string
  role: 'user' | 'admin'
  addresses?: Address[]
  createdAt?: string
  updatedAt?: string
}

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  selectedSize?: string
}

export interface OrderPricing {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
}

export interface Order {
  id: string | number
  userId: string
  items: OrderItem[]
  shippingAddress: Address
  pricing: OrderPricing
  orderStatus: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  razorpayOrderId?: string
  razorpayPaymentId?: string
  createdAt: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}

export interface Testimonial {
  id: string | number
  name: string
  location: string
  image: string
  quote: string
  crop: string
}

export interface Influencer {
  id: string | number
  name: string
  handle: string
  followers: string
  image: string
  category: string
}
export interface WishlistItem {
  id: string | number
  productId: string
  name: string
  price: number
  image?: string
  category?: ProductCategory
  addedAt?: string
}