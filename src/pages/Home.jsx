import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '../services/productService'
import { extractImageUrl, extractPrice, safeString, emojis } from '../utils/images'
import { ROUTES } from '../constants'

function Home() {
  const [niches, setNiches] = useState([])
  const [products, setProducts] = useState([])
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
        const nicheBody = nichesRes?.data
        const nicheList =
          nicheBody?.data ||
          nicheBody?.products_nieches ||
          nicheBody?.nieches ||
          nicheBody?.niches ||
          nicheBody?.categories ||
          (Array.isArray(nicheBody) ? nicheBody : null)
        setNiches(Array.isArray(nicheList) ? nicheList : [])
        const prodBody = productsRes?.data
        const prodList = prodBody?.data || prodBody?.products || (Array.isArray(prodBody) ? prodBody : [])
        setProducts(Array.isArray(prodList) ? prodList : [])
      } catch {
        // silent
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const featuredNiches = niches.slice(0, 3)
  const featuredProducts = products.slice(0, 3)

  const nicheName = (n) => safeString(n?.name || n?.title || n?.niche_name || 'Category')
  const nicheImage = (n) => {
    const iconPath = n?.iconPath || n?.icon_path || n?.image || n?.image_icon
    if (iconPath && !iconPath.startsWith('http')) {
      return `https://helpmate.apexvim.com/storage/${iconPath.replace(/^\//, '')}`
    }
    return extractImageUrl(n) || iconPath || null
  }
  const nicheId = (n) => n?.id || n?.niche_id || n?._id

  return (
    <>
      {/* Hero */}
      <div className="hero-wrap bg-[var(--color-accent)] px-6 md:px-12 py-14 md:py-20 mt-10">
        <div className="flex items-center gap-12 md:gap-20 text-left max-w-[1200px] mx-auto max-md:flex-col max-md:text-center">
          <div className="flex-1 animate-fade-up">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[13px] font-semibold px-4 py-1.5 rounded-full mb-6">
              <span>⚡</span> Trusted by 10,000+ customers
            </div>
            <h1 className="text-white text-4xl md:text-5xl leading-[1.1] mb-5 font-bold tracking-tight">
              Find trusted help
              <span className="block font-light opacity-85">for everything around your home</span>
            </h1>
            <p className="text-[17px] leading-relaxed text-white/85 mb-9 max-w-[480px] max-md:mx-auto">
              Connect with verified professionals for cleaning, repairs, plumbing, electrical work, and more. Book in seconds.
            </p>
            <div className="flex gap-4 flex-wrap max-md:justify-center">
              <Link to="/" className="inline-flex items-center gap-2.5 bg-white text-[var(--color-accent)] text-[16px] font-semibold px-9 py-3.5 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.25)] hover:-translate-y-1 active:scale-96">
                Browse Services
                <span className="inline-block transition-transform duration-300 hover:translate-x-1">→</span>
              </Link>
              <Link to="#" className="inline-flex items-center text-white text-[16px] font-semibold px-9 py-3.5 rounded-xl border-2 border-white/40 transition-all duration-300 hover:border-white hover:bg-white/10 active:scale-96">
                How It Works
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 flex-wrap max-md:justify-center">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base shrink-0">⭐</span>
                <span className="text-[14px] text-white/80"><strong className="text-white font-bold">4.9</strong> average rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base shrink-0">✓</span>
                <span className="text-[14px] text-white/80"><strong className="text-white font-bold">500+</strong> expert pros</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base shrink-0">🏆</span>
                <span className="text-[14px] text-white/80"><strong className="text-white font-bold">50K+</strong> jobs completed</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex-col gap-4 animate-fade-up max-md:w-full hidden md:flex" style={{ animationDelay: '0.2s' }}>
            {!loading && featuredNiches.length > 0 ? featuredNiches.map((n, i) => {
              const img = nicheImage(n)
              const nId = nicheId(n)
              return (
                <Link
                  key={nId || i}
                  to={nId ? ROUTES.NICHE_PRODUCTS(nId) : '#'}
                  className="flex items-center gap-4 bg-white/12 backdrop-blur-md border border-white/18 rounded-xl px-5 py-4 w-full max-w-[340px] ml-auto text-left cursor-pointer transition-all duration-300 hover:bg-white/20 hover:-translate-x-2 animate-fade-up"
                  style={{ animationDelay: `${0.3 + i * 0.2}s` }}
                >
                  {img ? (
                    <img src={img} alt={nicheName(n)} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  ) : (
                    <span className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl shrink-0">
                      {emojis[i % emojis.length]}
                    </span>
                  )}
                  <div>
                    <strong className="block text-[15px] text-white mb-0.5">{nicheName(n)}</strong>
                    <span className="text-[13px] text-white/70">Browse services →</span>
                  </div>
                </Link>
              )
            }) : loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 bg-white/12 backdrop-blur-md border border-white/18 rounded-xl px-5 py-4 w-full max-w-[340px] ml-auto animate-pulse">
                  <div className="w-12 h-12 rounded-xl bg-white/15" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 bg-white/15 rounded" />
                    <div className="h-2.5 w-16 bg-white/10 rounded" />
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>

      {/* Featured Niches - 3 in a row */}
      <div className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[13px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-3">Categories</span>
            <h2 className="text-[var(--color-text-h)] text-3xl md:text-4xl font-bold mb-4">What do you need help with?</h2>
            <p className="text-[var(--color-text)] max-w-[540px] mx-auto">Choose a category to explore services.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 max-[424px]:grid-cols-1 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-[var(--color-border)]" />
                  <div className="p-4 text-center">
                    <div className="h-4 w-20 bg-[var(--color-border)] rounded mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredNiches.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-[var(--color-text)]">No categories available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 max-[424px]:grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredNiches.map((n, i) => {
                const img = nicheImage(n)
                const nId = nicheId(n)
                return (
                  <Link
                    key={nId || i}
                    to={nId ? ROUTES.NICHE_PRODUCTS(nId) : '#'}
                    className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden cursor-pointer text-left transition-all duration-300 animate-fade-up hover:shadow-[var(--shadow-hover,0_16px_48px_rgba(0,0,0,0.1))] hover:-translate-y-1.5 hover:border-[var(--color-accent)]/30"
                    style={{ animationDelay: `${i * 0.1}s` }}
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
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Featured Products - 3 in a row */}
      <div className="bg-[var(--color-bg-alt)] px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[13px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-3">Services</span>
            <h2 className="text-[var(--color-text-h)] text-3xl md:text-4xl font-bold mb-4">Popular Services</h2>
            <p className="text-[var(--color-text)] max-w-[540px] mx-auto">Top-rated services our customers love.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 max-[424px]:grid-cols-1 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden animate-pulse">
                  <div className="h-40 sm:h-48 bg-[var(--color-border)]" />
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div className="h-4 w-3/4 bg-[var(--color-border)] rounded" />
                    <div className="h-3.5 w-full bg-[var(--color-border)] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-[var(--color-text)]">No services available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 max-[424px]:grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p, i) => {
                const img = extractImageUrl(p)
                const price = extractPrice(p)
                const pId = p.id || p._id
                return (
                  <Link
                    key={pId || i}
                    to={pId ? ROUTES.PRODUCT_DETAIL(pId) : '#'}
                    className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden text-left transition-all duration-300 animate-fade-up hover:shadow-[var(--shadow-hover,0_16px_48px_rgba(0,0,0,0.1))] hover:-translate-y-1.5 hover:border-[var(--color-accent)]/30"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {img ? (
                      <div className="h-40 sm:h-48 overflow-hidden bg-[var(--color-bg-alt)]">
                        <img
                          src={img}
                          alt={safeString(p.name || p.title)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </div>
                    ) : (
                      <div className="h-40 sm:h-48 bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-accent)]/10 flex items-center justify-center">
                        <span className="text-4xl sm:text-5xl">{emojis[i % emojis.length]}</span>
                      </div>
                    )}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-[var(--color-text-h)] text-[15px] sm:text-lg font-semibold mb-0.5 group-hover:text-[var(--color-accent)] transition-colors">
                        {safeString(p.name || p.title)}
                      </h3>
                      {(p.description || p.desc || p.short_description) && (
                        <p className="text-[13px] sm:text-[14px] leading-relaxed text-[var(--color-text)] m-0 line-clamp-2">
                          {safeString(p.description || p.desc || p.short_description)}
                        </p>
                      )}
                      <div className="mt-2.5 sm:mt-3">
                        <span className="text-[15px] sm:text-lg font-bold text-[var(--color-accent)]">
                          {price ? `Rs. ${price}` : 'Contact for price'}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[var(--color-text-h)] text-3xl md:text-4xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-[var(--color-text)] text-lg mb-8">Join thousands of satisfied customers. Book your first service today.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white text-base font-semibold px-9 py-4 rounded-full shadow-[0_4px_16px_var(--color-accent-border,transparent)] transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] hover:-translate-y-0.5 active:scale-96">
            Get Started Now →
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
