import { fetchFromBackend } from '@/lib/api'

type Context = {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, context: Context) {
  try {
    const { id } = await context.params
    const body = await request.json()

    const response = await fetchFromBackend(`/api/orders/${id}`, {
      method: 'PUT',
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
        message: 'Failed to update order status',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}