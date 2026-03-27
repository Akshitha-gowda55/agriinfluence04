import { CartSummary } from "@/components/cart/cart-summary"

export default function CartPage() {
  return (
    <div className="px-4 py-8">

      <h1 className="mb-6 text-3xl font-bold">
        Shopping Cart
      </h1>

      <CartSummary />

    </div>
  )
}