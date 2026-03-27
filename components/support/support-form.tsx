'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'

interface ReviewFormProps {
  onSubmit?: (review: {
    author: string
    rating: number
    comment: string
  }) => void
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!author.trim() || !comment.trim()) return

    const review = {
      author,
      rating,
      comment,
    }

    if (onSubmit) {
      onSubmit(review)
    }

    setSubmitted(true)
    setAuthor('')
    setRating(5)
    setComment('')
  }

  if (submitted) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-green-700">
          Review submitted
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for sharing your feedback.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-xl font-semibold">Write a Review</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="author">Your Name</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <Label className="mb-2 block">Rating</Label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="transition"
                aria-label={`Rate ${value} star`}
              >
                <Star
                  className={`h-6 w-6 ${
                    value <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="comment">Review</Label>
          <Textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Review
        </Button>
      </div>
    </form>
  )
}