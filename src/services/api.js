const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  }

  const res = await fetch(url, config)
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || `Request failed: ${res.status}`)
  }

  return res.json()
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data, options) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
}
