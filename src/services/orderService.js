import api from './api'
import { API_ENDPOINTS } from '../constants'

export const orderService = {
  create: (data) => api.post(API_ENDPOINTS.CREATE_ORDER, data),
  getAll: () => api.get(API_ENDPOINTS.GET_ORDERS),
  getById: (id) => api.get(API_ENDPOINTS.ORDER_DETAIL(id)),
  getPayments: () => api.get(API_ENDPOINTS.GET_PAYMENTS),
}
