import api from './api'
import { API_ENDPOINTS } from '../constants'

export const productService = {
  getAll: (params) => api.get(API_ENDPOINTS.PRODUCTS, { ...params }),
  getNiches: () => api.get(API_ENDPOINTS.PRODUCT_NICHES),
  getByNiches: (nicheId) =>
    api.get(`${API_ENDPOINTS.PRODUCTS_BY_NICHES}?niche_id=${nicheId}`),
  getByCategories: (categoryId) =>
    api.get(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORIES}?category_id=${categoryId}`),
}
