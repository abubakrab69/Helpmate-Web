export const APP_NAME = 'Helpmate'
export const APP_VERSION = '1.0.0'

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  ORDER: '/order',
  CART: '/cart',
  NICHE_PRODUCTS: (id) => `/niche/${id}`,
  PRODUCT_DETAIL: (id) => `/product/${id}`,
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  OTP_VERIFY: '/auth/otp-verify',
  VENDOR_SELECT_NICHE: '/auth/vendor/select-niche',
  VENDOR_FORM: '/auth/vendor/form',
  VENDOR_STATUS: '/auth/vendor/status',
  DASHBOARD: '/dashboard',
}

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  EMAIL_VERIFICATION_NOTIFICATION: '/auth/email/verification-notification',
  SEND_OTP: '/auth/pin-signup/send-pin',
  VERIFY_OTP: '/auth/pin-signup/verify-pin',
  PIN_LOGIN_VERIFY: '/auth/pin-login/verify-pin',
  VENDOR_STATUS: '/auth/vendor/status',
  LOGOUT: '/auth/logout',
  VENDOR_SIGNUP: '/auth/signup-flow/vendors',

  NICHES: '/signup-flow/nieches',
  NICHE_DETAIL: (id) => `/signup-flow/nieches/${id}`,
  SUBMIT_SIGNUP_FORM: '/signup-flow/submit',

  PRODUCTS: '/products',
  PRODUCT_NICHES: '/products-nieches',
  PRODUCTS_BY_NICHES: '/products/by-niches',
  PRODUCTS_BY_CATEGORIES: '/products/by-categories',

  CREATE_ORDER: '/orders',
  GET_ORDERS: '/orders',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  GET_PAYMENTS: '/payments',

  SUPPORT: '/support',
}
