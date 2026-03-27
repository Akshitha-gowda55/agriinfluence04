'use client'

import { useState } from 'react'
import { addReview } from '@/lib/reviews'

export default function ReviewForm({ productId }: any) {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)

  const handleSubmit = () => {
    addReview({
      id: Date.now().toString(),
      productId,
      name,
      comment,
      rating,
    })

    location.reload()
  }

  return (
    <div className="mt-6 space-y-3">

      <input
        placeholder="Your name"
        className="w-full border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Write review"
        className="w-full border p-2 rounded"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Review
      </button>

    </div>
  )
}