export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const response = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: 'Failed to connect to AI service',
      },
      { status: 500 }
    )
  }
}