// components/products/product-gallery.tsx

'use client'

import { useState } from 'react'
import Image from 'next/image'

type ProductGalleryProps = {
  images: string[]
  name: string
}

export default function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '')

  return (
    <div className="space-y-4">
      <div className="relative h-[420px] overflow-hidden rounded-2xl border bg-white">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`relative h-24 overflow-hidden rounded-xl border ${
              selectedImage === image
                ? 'border-green-600 ring-2 ring-green-200'
                : 'border-gray-200'
            }`}
          >
            <Image
              src={image}
              alt={`${name} ${index + 1}`}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </button>
        ))}
      </div>
    </div>
  )
}