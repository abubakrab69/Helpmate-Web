import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import { extractImageUrl, extractPrice, safeString } from '../utils/images'
import { useCart } from '../contexts/CartContext'

function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addItem, items } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await productService.getAll()
        if (cancelled) return
        const list = res?.data?.data || res?.data || res?.products || []
        const found = (Array.isArray(list) ? list : []).find(p =>
          String(p.id || p._id) === String(productId)
        )
        if (!cancelled) setProduct(found || null)
      } catch {
        // silent
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [productId])

  const inCart = items.find(item => String(item.id) === String(productId))

  if (loading) {
    return (
      <div className="px-6 md:px-12 py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto animate-pulse">
          <div className="h-6 w-24 bg-[var(--color-border)] rounded mb-8" />
          <div className="grid grid-cols-[1fr_1fr] gap-12 max-md:grid-cols-1">
            <div className="aspect-square bg-[var(--color-border)] rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-[var(--color-border)] rounded" />
              <div className="h-5 w-1/3 bg-[var(--color-border)] rounded" />
              <div className="h-4 w-full bg-[var(--color-border)] rounded" />
              <div className="h-4 w-full bg-[var(--color-border)] rounded" />
              <div className="h-4 w-2/3 bg-[var(--color-border)] rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="px-6 md:px-12 py-16 md:py-20 text-center">
        <span className="text-[48px] block mb-4">🔍</span>
        <h2 className="text-[var(--color-text-h)] text-2xl font-bold mb-3">Product not found</h2>
        <p className="text-[var(--color-text)] mb-6">This service may have been removed or is unavailable.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[var(--color-accent)] text-white text-[14px] font-semibold px-7 py-3 rounded-xl border-none cursor-pointer"
        >
          Go Back
        </button>
      </div>
    )
  }

  const img = extractImageUrl(product)
  const price = extractPrice(product)
  const description = safeString(product.description || product.desc || product.short_description || product.long_description || 'No description available.')

  return (
    <div className="px-6 md:px-12 py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 bg-transparent border border-[var(--color-border)] text-[var(--color-text)] text-[14px] font-medium px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 mb-8 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          ← Back
        </button>

        <div className="grid grid-cols-[1fr_1fr] gap-12 items-start max-md:grid-cols-1">
          {img ? (
            <div className="rounded-2xl overflow-hidden bg-[var(--color-bg-alt)]">
              <img
                src={img}
                alt={safeString(product.name || product.title)}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-accent)]/10 flex items-center justify-center">
              <span className="text-8xl">📦</span>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <h1 className="text-[var(--color-text-h)] text-3xl md:text-4xl font-bold m-0">
              {safeString(product.name || product.title)}
            </h1>

            <div className="text-3xl font-extrabold text-[var(--color-accent)]">
              {price ? `$${price}` : 'Contact for price'}
            </div>

            <p className="text-[15px] leading-relaxed text-[var(--color-text)] m-0">
              {description}
            </p>

            {product.category && (
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[var(--color-text)]">Category:</span>
                <span className="text-[13px] font-semibold text-[var(--color-text-h)]">{safeString(product.category)}</span>
              </div>
            )}

            <button
              onClick={() => {
                addItem({ ...product, _img: img })
              }}
              className={`flex items-center justify-center gap-2 text-[15px] font-semibold px-8 py-4 rounded-xl border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:scale-96 ${inCart
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)]'
              }`}
            >
              {inCart
                ? <>✓ Added to Cart ({inCart.qty})</>
                : <>🛒 Add to Cart</>
              }
            </button>

            {inCart && (
              <button
                onClick={() => navigate('/cart')}
                className="flex items-center justify-center gap-2 text-[15px] font-semibold px-8 py-4 rounded-xl border-2 border-[var(--color-accent)] text-[var(--color-accent)] bg-transparent cursor-pointer transition-all duration-300 hover:bg-[var(--color-accent)]/5"
              >
                View Cart →
              </button>
            )}

            <div className="border-t border-[var(--color-border)] pt-5 mt-3">
              <h4 className="text-[var(--color-text-h)] font-semibold mb-3 text-sm">Service Details</h4>
              <ul className="list-none m-0 p-0 space-y-2 text-[14px] text-[var(--color-text)]">
                <li className="flex items-center gap-2">✓ Professional & verified providers</li>
                <li className="flex items-center gap-2">✓ Transparent pricing — no hidden fees</li>
                <li className="flex items-center gap-2">✓ Satisfaction guaranteed</li>
                <li className="flex items-center gap-2">✓ Easy booking & secure payment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
