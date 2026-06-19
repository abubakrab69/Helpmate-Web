import api from './api'
import { API_ENDPOINTS } from '../constants'

export const supportService = {
  submit: (data) => api.post(API_ENDPOINTS.SUPPORT, data),
}
