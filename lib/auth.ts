export function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function getUser() {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}