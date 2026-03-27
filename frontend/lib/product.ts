// lib/products.ts

import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Premium NPK Fertilizer',
    slug: 'premium-npk-fertilizer',
    brand: 'AgriGrow',
    category: 'Fertilizers',
    subcategory: 'NPK',
    price: 799,
    originalPrice: 999,
    discountPercent: 20,
    rating: 4.5,
    reviewCount: 124,
    stock: 32,
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Balanced NPK fertilizer for stronger roots and higher yield.',
    description:
      'Premium NPK Fertilizer is designed to support balanced plant growth by improving root development, leaf health, and fruit formation. Suitable for a wide range of crops.',
    benefits: [
      'Improves root strength',
      'Boosts overall crop yield',
      'Supports balanced plant growth',
    ],
    usageInstructions: [
      'Mix with soil before irrigation',
      'Apply near root zone',
      'Use twice a month for best results',
    ],
    safetyInfo: [
      'Keep away from children',
      'Store in a cool and dry place',
      'Do not exceed recommended dosage',
    ],
    crops: ['Rice', 'Wheat', 'Tomato'],
    sizeOptions: ['1kg', '5kg', '10kg'],
    tags: ['featured', 'bestseller'],
    featured: true,
    bestSeller: true,
    trending: true,
  },
  {
    id: 'prod_2',
    name: 'Organic Vermicompost',
    slug: 'organic-vermicompost',
    brand: 'GreenHarvest',
    category: 'Organic Products',
    subcategory: 'Compost',
    price: 499,
    originalPrice: 620,
    discountPercent: 20,
    rating: 4.4,
    reviewCount: 86,
    stock: 45,
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Natural organic compost to enrich soil fertility.',
    description:
      'Organic Vermicompost improves soil texture, microbial activity, and nutrient retention. Ideal for farmers looking for eco-friendly crop nutrition.',
    benefits: [
      'Improves soil fertility',
      'Enhances microbial activity',
      'Eco-friendly and chemical-free',
    ],
    usageInstructions: [
      'Apply around the root area',
      'Mix with topsoil before planting',
      'Water after application',
    ],
    safetyInfo: [
      'Store in dry place',
      'Keep sealed after use',
      'Use gloves if needed',
    ],
    crops: ['Vegetables', 'Fruits', 'Flowers'],
    sizeOptions: ['2kg', '5kg', '20kg'],
    tags: ['organic'],
    featured: true,
  },
  {
    id: 'prod_3',
    name: 'Bio Pesticide Spray',
    slug: 'bio-pesticide-spray',
    brand: 'CropSafe',
    category: 'Pesticides',
    subcategory: 'Bio Pesticide',
    price: 349,
    originalPrice: 449,
    discountPercent: 22,
    rating: 4.3,
    reviewCount: 59,
    stock: 20,
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Protect crops from insects using a safer bio-based formula.',
    description:
      'Bio Pesticide Spray helps control common crop pests while being less harmful to beneficial soil systems when used properly.',
    benefits: [
      'Controls common crop pests',
      'Safer bio-based formula',
      'Easy foliar application',
    ],
    usageInstructions: [
      'Dilute as per label instructions',
      'Spray evenly on affected leaves',
      'Apply during early morning or evening',
    ],
    safetyInfo: [
      'Avoid contact with eyes',
      'Wear gloves while spraying',
      'Keep away from food items',
    ],
    crops: ['Chilli', 'Cotton', 'Brinjal'],
    sizeOptions: ['250ml', '500ml', '1L'],
    tags: ['trending'],
    trending: true,
  },
  {
    id: 'prod_4',
    name: 'Hybrid Tomato Seeds',
    slug: 'hybrid-tomato-seeds',
    brand: 'SeedNova',
    category: 'Seeds',
    subcategory: 'Vegetable Seeds',
    price: 199,
    originalPrice: 249,
    discountPercent: 20,
    rating: 4.6,
    reviewCount: 143,
    stock: 70,
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'High germination tomato seeds for uniform crop growth.',
    description:
      'Hybrid Tomato Seeds offer strong germination, consistent fruit quality, and improved resistance in suitable growing conditions.',
    benefits: [
      'High germination rate',
      'Uniform fruit size',
      'Suitable for commercial cultivation',
    ],
    usageInstructions: [
      'Sow in seed trays or nursery beds',
      'Transplant after healthy seedling growth',
      'Maintain regular watering',
    ],
    safetyInfo: [
      'Store in airtight container',
      'Keep away from moisture',
      'Use before expiry date',
    ],
    crops: ['Tomato'],
    sizeOptions: ['50g', '100g', '250g'],
    tags: ['featured', 'bestseller'],
    bestSeller: true,
  },
  {
    id: 'prod_5',
    name: 'Micronutrient Plant Booster',
    slug: 'micronutrient-plant-booster',
    brand: 'NutriFarm',
    category: 'Crop Nutrients',
    subcategory: 'Micronutrients',
    price: 599,
    originalPrice: 699,
    discountPercent: 14,
    rating: 4.2,
    reviewCount: 67,
    stock: 16,
    stockStatus: 'low_stock',
    images: [
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Essential micronutrients for greener leaves and healthier growth.',
    description:
      'Micronutrient Plant Booster supplies zinc, boron, and other trace elements required for healthy plant metabolism and improved productivity.',
    benefits: [
      'Corrects nutrient deficiencies',
      'Improves leaf color and vigor',
      'Supports better flowering and fruiting',
    ],
    usageInstructions: [
      'Mix recommended quantity in water',
      'Spray evenly on leaves',
      'Repeat every 15 to 20 days if necessary',
    ],
    safetyInfo: [
      'Do not overdose',
      'Keep away from direct sunlight',
      'Read instructions before use',
    ],
    crops: ['Maize', 'Sugarcane', 'Tomato'],
    sizeOptions: ['500g', '1kg'],
    tags: ['low-stock'],
    trending: true,
  },
  {
    id: 'prod_6',
    name: 'Selective Weed Killer',
    slug: 'selective-weed-killer',
    brand: 'WeedOut',
    category: 'Herbicides',
    subcategory: 'Post-Emergent',
    price: 899,
    originalPrice: 1099,
    discountPercent: 18,
    rating: 4.1,
    reviewCount: 48,
    stock: 12,
    stockStatus: 'low_stock',
    images: [
      'https://images.unsplash.com/photo-1625246333842-f8b2490ff4d4?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Effective herbicide for targeted weed control in field crops.',
    description:
      'Selective Weed Killer is formulated to control unwanted weeds while supporting healthier crop establishment when applied correctly.',
    benefits: [
      'Targets common field weeds',
      'Reduces crop competition',
      'Improves nutrient availability for crops',
    ],
    usageInstructions: [
      'Dilute before spraying',
      'Apply on actively growing weeds',
      'Use protective equipment during application',
    ],
    safetyInfo: [
      'Do not inhale spray mist',
      'Keep away from children and animals',
      'Store locked and sealed',
    ],
    crops: ['Paddy', 'Wheat', 'Maize'],
    sizeOptions: ['500ml', '1L'],
    tags: ['low-stock'],
  },
  {
    id: 'prod_7',
    name: 'Urea Granules',
    slug: 'urea-granules',
    brand: 'FarmPlus',
    category: 'Fertilizers',
    subcategory: 'Nitrogen Fertilizer',
    price: 650,
    originalPrice: 720,
    discountPercent: 10,
    rating: 4.4,
    reviewCount: 95,
    stock: 50,
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'High nitrogen fertilizer for vigorous vegetative growth.',
    description:
      'Urea Granules provide an efficient nitrogen source to improve leafy growth and support crop development in nitrogen-deficient soils.',
    benefits: [
      'Promotes vegetative growth',
      'Improves leaf development',
      'Fast acting nitrogen source',
    ],
    usageInstructions: [
      'Broadcast evenly across field',
      'Apply before irrigation',
      'Split doses for better efficiency',
    ],
    safetyInfo: [
      'Store away from moisture',
      'Keep bag tightly closed',
      'Do not mix without guidance',
    ],
    crops: ['Rice', 'Wheat', 'Maize'],
    sizeOptions: ['5kg', '25kg', '50kg'],
    bestSeller: true,
  },
  {
    id: 'prod_8',
    name: 'Neem Cake Powder',
    slug: 'neem-cake-powder',
    brand: 'EcoAgri',
    category: 'Organic Products',
    subcategory: 'Soil Conditioner',
    price: 420,
    originalPrice: 500,
    discountPercent: 16,
    rating: 4.3,
    reviewCount: 53,
    stock: 28,
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Organic soil amendment that supports root health.',
    description:
      'Neem Cake Powder improves soil quality and supports plant health while fitting well into organic farming practices.',
    benefits: [
      'Improves soil condition',
      'Supports root zone health',
      'Suitable for organic farming',
    ],
    usageInstructions: [
      'Mix with soil before sowing',
      'Apply around root zone',
      'Water after use',
    ],
    safetyInfo: [
      'Store in dry area',
      'Avoid excess application',
      'Seal properly after opening',
    ],
    crops: ['Vegetables', 'Fruit Crops', 'Flowers'],
    sizeOptions: ['1kg', '5kg'],
  },
  {
    id: 'prod_9',
    name: 'Fungicide Guard',
    slug: 'fungicide-guard',
    brand: 'ShieldCrop',
    category: 'Pesticides',
    subcategory: 'Fungicide',
    price: 560,
    originalPrice: 650,
    discountPercent: 14,
    rating: 4.2,
    reviewCount: 61,
    stock: 24,
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Helps prevent fungal disease spread in crops.',
    description:
      'Fungicide Guard is suitable for preventive and early-stage management of common fungal infections in agricultural crops.',
    benefits: [
      'Helps control fungal spread',
      'Supports healthier leaves',
      'Easy spray application',
    ],
    usageInstructions: [
      'Dilute according to instructions',
      'Spray uniformly on crop canopy',
      'Repeat based on infection pressure',
    ],
    safetyInfo: [
      'Use mask and gloves',
      'Do not store near food',
      'Wash hands after use',
    ],
    crops: ['Grapes', 'Tomato', 'Chilli'],
    sizeOptions: ['250g', '500g', '1kg'],
    featured: true,
  },
  {
    id: 'prod_10',
    name: 'Premium Paddy Seeds',
    slug: 'premium-paddy-seeds',
    brand: 'AgriSeed',
    category: 'Seeds',
    subcategory: 'Field Crop Seeds',
    price: 899,
    originalPrice: 1049,
    discountPercent: 14,
    rating: 4.5,
    reviewCount: 132,
    stock: 40,
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'High-quality paddy seeds for strong germination and yield.',
    description:
      'Premium Paddy Seeds are selected for good germination and crop stand establishment, making them suitable for productive cultivation.',
    benefits: [
      'Reliable germination',
      'Strong crop stand',
      'Suitable for wide cultivation',
    ],
    usageInstructions: [
      'Soak as recommended before sowing',
      'Prepare field properly',
      'Use clean water source',
    ],
    safetyInfo: [
      'Store in dry conditions',
      'Keep away from pests',
      'Use within recommended season',
    ],
    crops: ['Paddy'],
    sizeOptions: ['1kg', '5kg', '10kg'],
    bestSeller: true,
    trending: true,
  },
  {
    id: 'prod_11',
    name: 'Potash Boost',
    slug: 'potash-boost',
    brand: 'YieldMax',
    category: 'Crop Nutrients',
    subcategory: 'Potassium Supplement',
    price: 540,
    originalPrice: 630,
    discountPercent: 14,
    rating: 4.0,
    reviewCount: 39,
    stock: 18,
    stockStatus: 'low_stock',
    images: [
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Potassium-rich supplement for better fruit quality and strength.',
    description:
      'Potash Boost supports stronger stems, improved fruit quality, and better crop resilience under demanding growth stages.',
    benefits: [
      'Improves fruit quality',
      'Supports stronger stems',
      'Enhances crop resilience',
    ],
    usageInstructions: [
      'Apply as basal or top dressing',
      'Follow crop-specific dosage',
      'Irrigate after field application',
    ],
    safetyInfo: [
      'Avoid overapplication',
      'Store in sealed pack',
      'Keep away from moisture',
    ],
    crops: ['Banana', 'Tomato', 'Potato'],
    sizeOptions: ['1kg', '5kg'],
  },
  {
    id: 'prod_12',
    name: 'Insect Control Plus',
    slug: 'insect-control-plus',
    brand: 'PestBlock',
    category: 'Pesticides',
    subcategory: 'Insecticide',
    price: 475,
    originalPrice: 550,
    discountPercent: 14,
    rating: 4.3,
    reviewCount: 74,
    stock: 0,
    stockStatus: 'out_of_stock',
    images: [
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Broad-spectrum insecticide for common sucking and chewing pests.',
    description:
      'Insect Control Plus is suitable for managing common insect pressure across selected crops when used according to label instructions.',
    benefits: [
      'Controls major insect pests',
      'Broad-spectrum performance',
      'Suitable for foliar spray',
    ],
    usageInstructions: [
      'Dilute as instructed',
      'Spray during low-wind hours',
      'Repeat only if needed',
    ],
    safetyInfo: [
      'Wear full protective gear',
      'Do not contaminate water sources',
      'Keep out of reach of children',
    ],
    crops: ['Cotton', 'Chilli', 'Brinjal'],
    sizeOptions: ['250ml', '500ml'],
    tags: ['out-of-stock'],
  },
]

export const featuredProducts: Product[] = products.filter(
  (product) => product.featured === true
)

export const bestSellerProducts: Product[] = products.filter(
  (product) => product.bestSeller === true
)

export const trendingProducts: Product[] = products.filter(
  (product) => product.trending === true
)

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(
  category: string,
  currentProductId: string
): Product[] {
  return products
    .filter(
      (product) =>
        product.category === category && product.id !== currentProductId
    )
    .slice(0, 4)
}