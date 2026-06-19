import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import { extractImageUrl, extractPrice, emojis } from '../utils/images'

function NicheProducts() {
  const { nicheId } = useParams()
  const navigate = useNavigate()

  const [niches, setNiches] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [nichesRes, productsRes] = await Promise.all([
          productService.getNiches(),
          productService.getAll(),
        ])
        if (cancelled) return

        const nicheList = nichesRes?.data?.data || nichesRes?.data || nichesRes?.niches || nichesRes?.nieches || nichesRes?.products_nieches || []
        setNiches(Array.isArray(nicheList) ? nicheList : [])

        const prodList = productsRes?.data?.data || productsRes?.data || productsRes?.products || []
        setAllProducts(Array.isArray(prodList) ? prodList : [])
      } catch {
        // silent
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const niche = useMemo(() => {
    return niches.find(n => {
      const id = n.id || n.niche_id || n._id
      return String(id) === String(nicheId)
    })
  }, [niches, nicheId])

  const nicheName = (n) => n?.name || n?.title || n?.niche_name || 'Category'

  const products = useMemo(() => {
    return allProducts.filter(p => {
      const pid = p.nieche_id || p.niche_id || p.nieche?.id
      return String(pid) === String(nicheId)
    })
  }, [allProducts, nicheId])

  return (
    <div className="px-6 md:px-12 py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 bg-transparent border border-[var(--color-border)] text-[var(--color-text)] text-[14px] font-medium px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            ← Back
          </button>
          <span className="text-[var(--color-border)]">/</span>
          <h1 className="text-[var(--color-text-h)] text-2xl font-bold m-0">
            {loading ? 'Loading...' : niche ? nicheName(niche) : 'Category'}
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-[var(--color-border)]" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-3/4 bg-[var(--color-border)] rounded" />
                  <div className="h-4 w-full bg-[var(--color-border)] rounded" />
                  <div className="h-4 w-1/2 bg-[var(--color-border)] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-[48px] block mb-4">📭</span>
            <p className="text-[var(--color-text)] text-lg mb-6">No services available in this category yet.</p>
            <button
              onClick={() => navigate('/order')}
              className="bg-[var(--color-accent)] text-white text-[14px] font-semibold px-7 py-3 rounded-xl border-none cursor-pointer transition-all duration-300 hover:bg-[var(--color-accent-light)]"
            >
              Browse All Categories
            </button>
          </div>
        ) : (
          <>
            <p className="text-[var(--color-text)] text-[15px] mb-6">
              {products.length} service{products.length > 1 ? 's' : ''} available
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
              {products.map((p, i) => {
                const img = extractImageUrl(p)
                const price = extractPrice(p)
                return (
                  <div
                    key={p.id || i}
                    className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden text-left flex flex-col transition-all duration-300 relative animate-fade-up hover:shadow-[var(--shadow-hover,0_16px_48px_rgba(0,0,0,0.1))] hover:-translate-y-1 hover:border-transparent"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    {img ? (
                      <div className="h-48 overflow-hidden bg-[var(--color-bg-alt)]">
                        <img
                          src={img}
                          alt={p.name || p.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-accent)]/10 flex items-center justify-center">
                        <span className="text-5xl">{emojis[i % emojis.length]}</span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-1.5 flex-1">
                      <h3 className="text-[var(--color-text-h)] text-lg font-semibold m-0">{p.name || p.title}</h3>
                      {(p.description || p.desc || p.short_description) && (
                        <p className="text-[14px] leading-relaxed text-[var(--color-text)] m-0 line-clamp-2">
                          {p.description || p.desc || p.short_description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)] gap-3">
                        <span className="text-2xl font-bold text-[var(--color-accent)]">
                          {price ? `$${price}` : 'Contact'}
                        </span>
                        <button className="bg-[var(--color-accent)] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl border-none cursor-pointer transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:-translate-y-0.5 active:scale-96">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NicheProducts
