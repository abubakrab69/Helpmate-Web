import { useState, useEffect, useMemo } from 'react'
import { productService } from '../services/productService'
import { extractImageUrl, extractPrice, safeString, emojis } from '../utils/images'

function Order() {
  const [niches, setNiches] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [selectedNiche, setSelectedNiche] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const nicheProducts = useMemo(() => {
    if (!selectedNiche) return []
    const nicheId = selectedNiche.id || selectedNiche.niche_id || selectedNiche._id
    return allProducts.filter(p => (p.nieche_id || p.niche_id || p.nieche?.id) === nicheId)
  }, [selectedNiche, allProducts])

  const nicheName = (n) => safeString(n?.name || n?.title || n?.niche_name || 'Service')
  const nicheImage = (n) => extractImageUrl(n) || n?.icon || n?.image_icon || null

  if (!selectedNiche) {
    return (
      <section className="animate-fade-up">
        <div className="px-6 md:px-12 py-10 md:py-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-[13px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-3">Browse Services</span>
              <h1 className="text-[var(--color-text-h)] text-4xl md:text-5xl font-bold max-w-[600px] mx-auto mb-4">What do you need help with?</h1>
              <p className="text-[var(--color-text)] max-w-[540px] mx-auto text-lg">Choose a category to explore available services.</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 animate-pulse">
                    <div className="w-full aspect-square rounded-xl bg-[var(--color-border)] mb-4" />
                    <div className="h-4 w-24 bg-[var(--color-border)] rounded mx-auto" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-[var(--color-text)] text-lg mb-4">Failed to load categories.</p>
                <button onClick={() => window.location.reload()} className="bg-[var(--color-accent)] text-white text-[14px] font-semibold px-7 py-3 rounded-xl border-none cursor-pointer">Try Again</button>
              </div>
            ) : niches.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-[48px] block mb-4">📭</span>
                <p className="text-[var(--color-text)] text-lg">No categories available yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
                {niches.map((n, i) => {
                  const img = nicheImage(n)
                  return (
                    <button
                      key={n.id || n.niche_id || i}
                      onClick={() => setSelectedNiche(n)}
                      className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden cursor-pointer text-left transition-all duration-300 hover:shadow-[var(--shadow-hover,0_16px_48px_rgba(0,0,0,0.1))] hover:-translate-y-1.5 hover:border-[var(--color-accent)]/30 animate-fade-up p-0"
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      <div className="aspect-square bg-[var(--color-bg-alt)] flex items-center justify-center overflow-hidden">
                        {img ? (
                          <img
                            src={img}
                            alt={nicheName(n)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.parentElement.innerHTML = `<span class="text-5xl">${emojis[i % emojis.length]}</span>`
                            }}
                          />
                        ) : (
                          <span className="text-5xl transition-transform duration-500 group-hover:scale-110">
                            {emojis[i % emojis.length]}
                          </span>
                        )}
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-[var(--color-text-h)] text-sm font-semibold m-0 group-hover:text-[var(--color-accent)] transition-colors">
                          {nicheName(n)}
                        </h3>
                        {n.description && (
                          <p className="text-[12px] text-[var(--color-text)] mt-1 m-0 line-clamp-1">{n.description}</p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="animate-fade-up">
      <div className="px-6 md:px-12 py-10 md:py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <button
              onClick={() => { setSelectedNiche(null); setError(null) }}
              className="flex items-center gap-1.5 bg-transparent border border-[var(--color-border)] text-[var(--color-text)] text-[14px] font-medium px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              ← All Categories
            </button>
            <span className="text-[var(--color-border)]">/</span>
            <h2 className="text-[var(--color-text-h)] text-xl font-bold m-0">{nicheName(selectedNiche)}</h2>
          </div>

          {nicheProducts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-[48px] block mb-4">📭</span>
              <p className="text-[var(--color-text)] text-lg">No services in this category yet.</p>
              <button onClick={() => setSelectedNiche(null)} className="mt-4 bg-[var(--color-accent)] text-white text-[14px] font-semibold px-7 py-3 rounded-xl border-none cursor-pointer">Browse Other Categories</button>
            </div>
          ) : (
            <>
              <p className="text-[var(--color-text)] text-[15px] mb-6">{nicheProducts.length} service{nicheProducts.length > 1 ? 's' : ''} available</p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 pb-10">
                {nicheProducts.map((p, i) => {
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
                            alt={safeString(p.name || p.title)}
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
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-[var(--color-text-h)] text-lg font-semibold m-0">{safeString(p.name || p.title)}</h3>
                          {p.popular !== false && !img && (
                            <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2.5 py-0.5 rounded-full shrink-0">Popular</span>
                          )}
                        </div>
                        {(p.description || p.desc || p.short_description) && (
                          <p className="text-[14px] leading-relaxed text-[var(--color-text)] m-0 line-clamp-2">
                            {safeString(p.description || p.desc || p.short_description)}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)] gap-3">
                          <span className="text-2xl font-bold text-[var(--color-accent)]">
                            {price ? `Rs. ${price}` : 'Contact'}
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
    </section>
  )
}

export default Order
