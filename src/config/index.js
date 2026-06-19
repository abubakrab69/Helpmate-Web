export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'Helpmate',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  environment: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
}
