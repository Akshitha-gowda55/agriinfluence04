import { fetchFromBackend } from '@/lib/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.action === 'signup') {
      const response = await fetchFromBackend('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          password: body.password,
        }),
      })

      const data = await response.json()

      return Response.json({
        success: true,
        message: 'Signup successful',
        ...data,
      })
    }

    if (body.action === 'login') {
      const response = await fetchFromBackend('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        }),
      })

      const data = await response.json()

      return Response.json({
        success: true,
        message: 'Login successful',
        ...data,
      })
    }

    return Response.json(
      {
        success: false,
        message: 'Invalid action',
      },
      { status: 400 }
    )
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: 'Authentication request failed',
      },
      { status: 500 }
    )
  }
}