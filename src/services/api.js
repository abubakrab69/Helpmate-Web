const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = localStorage.getItem('helpmate-token')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  }

  try {
    const res = await fetch(url, config)
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      const message = data?.message || data?.error || `Request failed: ${res.status}`
      throw new Error(message)
    }

    return data
  } catch (err) {
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.')
    }
    throw err
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options) =>
    request(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data, options) =>
    request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
}

export default api
