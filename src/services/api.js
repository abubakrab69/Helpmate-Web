import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('helpmate-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      if (status === 401) {
        localStorage.removeItem('helpmate-token')
        localStorage.removeItem('helpmate-user')
        window.location.href = '/auth/login'
      }
    } else if (error.request) {
      error.message = 'Network error. Please check your connection.'
    }
    return Promise.reject(error)
  }
)

export default api
