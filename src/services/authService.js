import api from './api'
import { API_ENDPOINTS } from '../constants'

function buildFormData(data, namespace = '') {
  const formData = new FormData()
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key]
      const formKey = namespace ? `${namespace}[${key}]` : key
      if (value !== null && value !== undefined) {
        if (value instanceof File || value instanceof Blob) {
          formData.append(formKey, value)
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          const nested = buildFormData(value, formKey)
          for (const [nk, nv] of nested.entries()) {
            formData.append(nk, nv)
          }
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            const itemKey = `${formKey}[${index}]`
            if (item instanceof File || item instanceof Blob) {
              formData.append(itemKey, item)
            } else if (typeof item === 'object') {
              const nested = buildFormData(item, itemKey)
              for (const [nk, nv] of nested.entries()) {
                formData.append(nk, nv)
              }
            } else {
              formData.append(itemKey, item)
            }
          })
        } else {
          formData.append(formKey, value)
        }
      }
    }
  }
  return formData
}

function extractError(error) {
  if (error.response?.data) {
    const data = error.response.data
    if (data.errors && typeof data.errors === 'object') {
      const messages = Object.values(data.errors).flat()
      return messages.join(', ') || data.message || 'Validation failed'
    }
    return data.message || data.error || 'An error occurred'
  }
  return error.message || 'An error occurred'
}

export const authService = {
  login: async (credentials) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.LOGIN, credentials)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  register: async (userData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.REGISTER, userData)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  sendOtp: async (payload) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.SEND_OTP, payload)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  verifyOtp: async (payload) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.VERIFY_OTP, payload)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  pinLoginVerify: async (payload) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.PIN_LOGIN_VERIFY, payload)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  logout: async () => {
    try {
      const { data } = await api.post(API_ENDPOINTS.LOGOUT)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  getNiches: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.NICHES)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  getNicheDetail: async (nicheId) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.NICHE_DETAIL(nicheId))
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  vendorStatus: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.VENDOR_STATUS)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  submitVendorForm: async (formData) => {
    try {
      const payload = buildFormData(formData)
      const { data } = await api.post(API_ENDPOINTS.VENDOR_SIGNUP, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  sendVendorPin: async (payload) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.SEND_OTP, payload)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  verifyVendorPin: async (payload) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.VERIFY_OTP, payload)
      return data
    } catch (error) {
      throw new Error(extractError(error))
    }
  },

  isForbiddenVerification: (error) => {
    return error.response?.status === 403 && error.response?.data?.action === 'verification'
  },
}

export { buildFormData, extractError }
