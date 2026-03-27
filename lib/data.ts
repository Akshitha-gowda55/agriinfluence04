import type {
  Product,
  Testimonial,
  Influencer,
  Review,
  Order,
} from '@/types'

export const products: Product[] = [
  {
    id: '1',
    name: 'OrganicGrow Pro NPK',
    category: 'fertilizer',
    price: 45.99,
    originalPrice: 59.99,
    description:
      'Premium organic NPK fertilizer with balanced nutrients for all crops. Slow-release formula ensures steady nutrient supply throughout the growing season.',
    usage:
      'Apply 2-3 kg per 100 sq meters. Mix with topsoil before planting or as side dressing during growth. Water thoroughly after application.',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    badge: 'Best Seller',
    featured: true,
  },
  {
    id: '2',
    name: 'BioShield Pesticide',
    category: 'pesticide',
    price: 32.5,
    description:
      'Eco-friendly broad-spectrum pesticide that protects crops from common pests while being safe for beneficial insects.',
    usage:
      'Dilute 10ml per liter of water. Spray evenly on plant surfaces in early morning or late evening. Repeat every 7-10 days.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Heritage Wheat Seeds',
    category: 'seeds',
    price: 28.99,
    description:
      'High-yield heritage wheat seeds with excellent disease resistance. Perfect for both small farms and large agricultural operations.',
    usage:
      'Sow at 120-150 kg per hectare. Plant in rows 20-25cm apart at 3-5cm depth. Ideal sowing temperature: 12-20°C.',
    image:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 312,
    inStock: true,
    badge: 'Top Rated',
    featured: true,
  },
  {
    id: '4',
    name: 'NitroBoost Plus',
    category: 'fertilizer',
    price: 52.0,
    description:
      'High-nitrogen fertilizer perfect for leafy vegetables and lawns. Fast-acting formula shows results within days.',
    usage:
      'Apply 1.5 kg per 100 sq meters for vegetables, 1 kg for lawns. Apply every 4-6 weeks during growing season.',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 156,
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'FungoClear Solution',
    category: 'pesticide',
    price: 38.75,
    originalPrice: 45.0,
    description:
      'Systemic fungicide that provides protection against powdery mildew, rust, and leaf spot diseases.',
    usage:
      'Mix 5ml per liter of water. Apply as foliar spray covering both leaf surfaces. Best applied preventatively.',
    image:
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 98,
    inStock: true,
    badge: 'Sale',
  },
  {
    id: '6',
    name: 'Golden Corn Seeds',
    category: 'seeds',
    price: 35.5,
    description:
      'Premium sweet corn seeds producing large, golden ears with exceptional sweetness and crunch.',
    usage:
      'Plant 1 seed every 25-30cm in rows 75cm apart. Sow 2-5cm deep. Requires full sun and consistent moisture.',
    image:
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 267,
    inStock: true,
  },
  
    {
  id: '7',
  name: 'PhosphoRoot Enhancer',
  category: 'fertilizer',
  price: 42.0,
  description:
    'Phosphorus-rich fertilizer that promotes strong root development and flowering in all plant types.',
  usage:
    'Apply 2 kg per 100 sq meters at planting time. Mix into root zone. Ideal for transplants and new plantings.',
  image:
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop',
  rating: 4.4,
  reviews: 87,
  inStock: false,
},
  {
    id: '8',
    name: 'InsectGuard Organic',
    category: 'pesticide',
    price: 29.99,
    description:
      'OMRI-certified organic insecticide made from natural neem oil. Safe for organic farming operations.',
    usage:
      'Dilute 15ml per liter. Spray on affected areas, ensuring coverage of leaf undersides. Apply weekly.',
    image:
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 203,
    inStock: true,
    badge: 'Organic',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Robert Chen',
    location: 'Iowa, USA',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    quote:
      'Since switching to OrganicGrow Pro, my corn yields have increased by 25%. The quality improvement is remarkable.',
    crop: 'Corn & Soybeans',
  },
  {
    id: '2',
    name: 'Maria Santos',
    location: 'California, USA',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    quote:
      'AgriInfluence has become my trusted partner. Fast shipping and excellent customer support make all the difference.',
    crop: 'Vegetables & Fruits',
  },
  {
    id: '3',
    name: 'James Walker',
    location: 'Texas, USA',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    quote:
      'The BioShield Pesticide saved my wheat crop from aphids without harming the beneficial insects. Truly impressed.',
    crop: 'Wheat & Cotton',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    location: 'Nebraska, USA',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    quote:
      "As a third-generation farmer, I've tried many products. AgriInfluence offers the best quality-to-price ratio I've ever seen.",
    crop: 'Corn & Wheat',
  },
]

export const influencers: Influencer[] = [
  {
    id: '1',
    name: 'Emma Green',
    handle: '@farmlife_emma',
    followers: '125K',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    category: 'Sustainable Farming',
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    handle: '@modernfarmer',
    followers: '89K',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    category: 'Agricultural Tech',
  },
  {
    id: '3',
    name: 'Lisa Chang',
    handle: '@organic_harvest',
    followers: '210K',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    category: 'Organic Produce',
  },
]

export const productReviews: Review[] = [
  {
    id: '1',
    author: 'David Miller',
    rating: 5,
    comment:
      'Excellent product! My tomato plants have never looked healthier. Will definitely purchase again.',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    author: 'Jennifer Lee',
    rating: 4,
    comment:
      'Good results overall. Shipping was fast and the packaging was secure. Would recommend.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: '3',
    author: 'Carlos Mendez',
    rating: 5,
    comment:
      'This fertilizer transformed my garden. Easy to apply and the instructions are clear.',
    date: '2024-01-05',
    verified: true,
  },
  {
    id: '4',
    author: 'Amanda White',
    rating: 4,
    comment:
      'Great quality for the price. Noticed improvement in plant growth within two weeks.',
    date: '2023-12-28',
    verified: false,
  },
]

export const orders: Order[] = [
  {
    id: 'ORD-1001',
    userId: 'USR-001',
    items: [
      {
        productId: '1',
        name: 'OrganicGrow Pro NPK',
        image:
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
        price: 45.99,
        quantity: 2,
      },
      {
        productId: '3',
        name: 'Heritage Wheat Seeds',
        image:
          'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop',
        price: 28.99,
        quantity: 1,
      },
    ],
    shippingAddress: {
      fullName: 'Ravi Kumar',
      phone: '9876543210',
      addressLine1: '12 Green Farm Road',
      city: 'Mysore',
      state: 'Karnataka',
      pincode: '570001',
      country: 'India',
    },
    pricing: {
      subtotal: 120.97,
      shipping: 10,
      tax: 5,
      discount: 0,
      total: 135.97,
    },
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    razorpayOrderId: 'order_001',
    razorpayPaymentId: 'pay_001',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22',
  },
  {
    id: 'ORD-1002',
    userId: 'USR-002',
    items: [
      {
        productId: '2',
        name: 'BioShield Pesticide',
        image:
          'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop',
        price: 32.5,
        quantity: 3,
      },
    ],
    shippingAddress: {
      fullName: 'Anita Sharma',
      phone: '9988776655',
      addressLine1: '45 Lake View',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
    },
    pricing: {
      subtotal: 97.5,
      shipping: 8,
      tax: 4.5,
      discount: 5,
      total: 105,
    },
    orderStatus: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'cod',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25',
  },
  {
    id: 'ORD-1003',
    userId: 'USR-003',
    items: [
      {
        productId: '8',
        name: 'InsectGuard Organic',
        image:
          'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&h=400&fit=crop',
        price: 29.99,
        quantity: 2,
      },
      {
        productId: '4',
        name: 'NitroBoost Plus',
        image:
          'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop',
        price: 52.0,
        quantity: 1,
      },
    ],
    shippingAddress: {
      fullName: 'Kiran Patel',
      phone: '9123456780',
      addressLine1: '78 Market Street',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      country: 'India',
    },
    pricing: {
      subtotal: 111.98,
      shipping: 10,
      tax: 5,
      discount: 0,
      total: 126.98,
    },
    orderStatus: 'cancelled',
    paymentStatus: 'failed',
    paymentMethod: 'upi',
    createdAt: '2024-02-02',
    updatedAt: '2024-02-03',
  },
]