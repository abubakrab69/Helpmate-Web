import api from './api'
import { API_ENDPOINTS } from '../constants'

export const authService = {
  login: (credentials) => api.post(API_ENDPOINTS.LOGIN, credentials),
  register: (data) => api.post(API_ENDPOINTS.REGISTER, data),
  sendOtp: (data) => api.post(API_ENDPOINTS.SEND_OTP, data),
  verifyOtp: (data) => api.post(API_ENDPOINTS.VERIFY_OTP, data),
  pinLoginVerify: (data) => api.post(API_ENDPOINTS.PIN_LOGIN_VERIFY, data),
  logout: () => api.post(API_ENDPOINTS.LOGOUT),
  sendEmailVerification: () =>
    api.post(API_ENDPOINTS.EMAIL_VERIFICATION_NOTIFICATION),

  vendor: {
    sendPin: (data) => api.post(API_ENDPOINTS.PIN_VENDOR_SIGNUP_SEND, data),
    verifyPin: (data) => api.post(API_ENDPOINTS.PIN_VENDOR_SIGNUP_VERIFY, data),
    status: () => api.get(API_ENDPOINTS.VENDOR_STATUS),
    signup: (data) => api.post(API_ENDPOINTS.VENDOR_SIGNUP, data),
  },

  getNiches: () => api.get(API_ENDPOINTS.NICHES),
  getNicheDetail: (id) => api.get(API_ENDPOINTS.NICHE_DETAIL(id)),
  submitSignupForm: (data) => api.post(API_ENDPOINTS.SUBMIT_SIGNUP_FORM, data),
}
