const BACKEND_URL = "http://localhost:8080"

export async function getProducts() {
  const res = await fetch(`${BACKEND_URL}/api/products`, {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export async function getProduct(id: string) {
  const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed to fetch product")
  }

  return res.json()
}