// lib/categories.ts

import { ProductCategory } from '@/types'

export interface Category {
  id: string
  name: ProductCategory
  slug: string
  description: string
  image: string
}

export const categories: Category[] = [
  {
    id: 'fertilizers',
    name: 'Fertilizers',
    slug: 'fertilizers',
    description: 'Boost crop growth with essential nutrients.',
    image: '/categories/fertilizers.jpg',
  },
  {
    id: 'pesticides',
    name: 'Pesticides',
    slug: 'pesticides',
    description: 'Protect crops from pests and insects.',
    image: '/categories/pesticides.jpg',
  },
  {
    id: 'seeds',
    name: 'Seeds',
    slug: 'seeds',
    description: 'High-quality seeds for better yield.',
    image: '/categories/seeds.jpg',
  },
  {
    id: 'organic-products',
    name: 'Organic Products',
    slug: 'organic-products',
    description: 'Natural and eco-friendly farming solutions.',
    image: '/categories/organic.jpg',
  },
  {
    id: 'crop-nutrients',
    name: 'Crop Nutrients',
    slug: 'crop-nutrients',
    description: 'Improve plant health and soil fertility.',
    image: '/categories/nutrients.jpg',
  },
  {
    id: 'herbicides',
    name: 'Herbicides',
    slug: 'herbicides',
    description: 'Control unwanted weeds effectively.',
    image: '/categories/herbicides.jpg',
  },
]