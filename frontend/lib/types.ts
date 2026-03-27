export interface Product {
  id: string;
  name: string;
  category: 'fertilizer' | 'pesticide' | 'seeds';
  price: number;
  originalPrice?: number;
  description: string;
  usage: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  quote: string;
  crop: string;
}

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  followers: string;
  image: string;
  category: string;
}
