import { fetchFromBackend } from '@/lib/api'

export async function GET() {
  try {
    const response = await fetchFromBackend('/api/orders')
    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    return Response.json(
      { message: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetchFromBackend('/api/orders', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return Response.json(data, { status: 201 })
  } catch (error) {
    return Response.json(
      { message: 'Failed to create order' },
      { status: 500 }
    )
  }
}