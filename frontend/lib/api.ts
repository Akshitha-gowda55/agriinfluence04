const BACKEND_URL = 'http://localhost:8080'

export async function fetchFromBackend(
  endpoint: string,
  options?: RequestInit
) {
  const isFormData = options?.body instanceof FormData

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options?.headers || {}),
    },
    cache: 'no-store',
  })

  let data: any = null
  const contentType = response.headers.get('content-type') || ''

  try {
    if (contentType.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()
      data = text ? text : null
    }
  } catch {
    data = null
  }

  if (!response.ok) {
    console.error('Backend error:', {
      url: `${BACKEND_URL}${endpoint}`,
      status: response.status,
      data,
    })

    throw new Error(
      typeof data === 'string'
        ? data
        : data?.message || `Backend request failed (${response.status})`
    )
  }

  return data
}

export { BACKEND_URL }