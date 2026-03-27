import { fetchFromBackend } from '@/lib/api'

export async function GET() {
  try {
    const response = await fetchFromBackend('/api/orders')
    const text = await response.text()

    try {
      const data = JSON.parse(text)
      return Response.json(data, { status: response.status })
    } catch {
      return Response.json(
        { message: 'Backend did not return valid JSON', raw: text },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return Response.json(
      {
        message: 'Failed to fetch orders',
        details: error?.message || 'Unknown error',
      },
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

    const text = await response.text()

    try {
      const data = JSON.parse(text)
      return Response.json(data, { status: response.status })
    } catch {
      return Response.json(
        { message: 'Backend did not return valid JSON', raw: text },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return Response.json(
      {
        message: 'Failed to create order',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}