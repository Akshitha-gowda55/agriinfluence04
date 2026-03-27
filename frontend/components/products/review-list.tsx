// components/products/review-list.tsx

import { Star } from 'lucide-react'
import { Review } from '@/types'
import { formatReviewDate } from '@/lib/reviews'

type ReviewListProps = {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
        <p className="mt-2 text-sm text-gray-600">No reviews yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>

      <div className="mt-6 space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">
                  {review.userName ?? review.author ?? 'Anonymous'}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {formatReviewDate(review.createdAt ?? '')}
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{review.rating}</span>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}