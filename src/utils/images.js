const STORAGE_URL = 'https://helpmate.apexvim.com/storage'

export function extractImageUrl(product) {
  if (!product) return null

  const raw =
    product?.primary_image?.image_path ||
    product?.images?.[0]?.image_path ||
    product?.images?.[0]?.url ||
    product?.images?.[0]?.path ||
    product?.images?.[0] ||
    product?.featured_image ||
    product?.image ||
    product?.photo ||
    product?.thumbnail ||
    product?.iconPath ||
    null

  if (!raw) return null

  const img = typeof raw === 'string' ? raw : raw?.url || raw?.path || raw?.image_path || null
  if (!img) return null

  if (img.startsWith('http')) return img
  if (img.startsWith('/storage/')) return `${STORAGE_URL}${img.replace('/storage', '')}`
  return `${STORAGE_URL}/${img.replace(/^\//, '')}`
}

export function extractPrice(product) {
  const raw = product?.price || product?.starting_price || product?.amount || null
  if (raw === null) return null
  if (typeof raw === 'object') return null
  return raw
}

export const emojis = ['🧹', '🔧', '⚡', '🎨', '🔨', '🚗', '📦', '🌿', '💻', '🔒', '❄️', '🪟', '🍳', '📚', '🎵', '🏋️']

export function safeString(value, fallback = '') {
  if (!value) return fallback
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value?.name) return value.name
  return String(value)
}
