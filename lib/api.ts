const BACKEND_URL = 'http://localhost:8080'

export async function fetchFromBackend(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    cache: 'no-store',
  })

  let data

  try {
    data = await response.json()
  } catch {
    data = await response.text()
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