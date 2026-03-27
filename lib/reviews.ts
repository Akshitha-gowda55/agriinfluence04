export type Review = {
  id: string
  productId: string | number
  name: string
  rating: number
  comment: string
}

export const getReviews = (productId: string | number) => {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
  return reviews.filter((r: Review) => r.productId === productId)
}

export const addReview = (review: Review) => {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
  localStorage.setItem(
    'reviews',
    JSON.stringify([review, ...reviews])
  )
}