export const APP_NAME = 'Helpmate'
export const APP_VERSION = '1.0.0'

export const ROUTES = {
  HOME: '/',
  ORDER: '/order',
  CART: '/cart',
  NICHE_PRODUCTS: (id) => `/niche/${id}`,
}

// Auth
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  EMAIL_VERIFICATION_NOTIFICATION: '/auth/email/verification-notification',
  SEND_OTP: '/auth/pin-signup/send-pin',
  VERIFY_OTP: '/auth/pin-signup/verify-pin',
  PIN_LOGIN_VERIFY: '/auth/pin-login/verify-pin',
  PIN_VENDOR_SIGNUP_SEND: '/auth/pin-signup/vendor/send-pin',
  PIN_VENDOR_SIGNUP_VERIFY: '/auth/pin-signup/verify-pin',
  VENDOR_STATUS: '/auth/vendor/status',
  LOGOUT: '/auth/logout',
  VENDOR_SIGNUP: '/auth/signup-flow/vendors',

  // Signup Flow
  NICHES: '/signup-flow/nieches',
  NICHE_DETAIL: (id) => `/signup-flow/nieches/${id}`,
  SUBMIT_SIGNUP_FORM: '/signup-flow/submit',

  // Products
  PRODUCTS: '/products',
  PRODUCT_NICHES: '/products-nieches',
  PRODUCTS_BY_NICHES: '/products/by-niches',
  PRODUCTS_BY_CATEGORIES: '/products/by-categories',

  // Orders
  CREATE_ORDER: '/orders',
  GET_ORDERS: '/orders',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  GET_PAYMENTS: '/payments',

  // Support
  SUPPORT: '/support',
}
