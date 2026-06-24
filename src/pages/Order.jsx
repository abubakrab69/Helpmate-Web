import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderService } from '../services/orderService'
import { extractImageUrl, safeString } from '../utils/images'

const statusStyles = {
  pending: { label: 'Pending', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  processing: { label: 'Processing', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  completed: { label: 'Completed', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  cancelled: { label: 'Cancelled', class: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
}

function OrderStatus({ status }) {
  const s = statusStyles[status?.toLowerCase()] || { label: status || 'Unknown', class: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' }
  return (
    <span className={`text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${s.class}`}>
      {s.label}
    </span>
  )
}

function OrderHistoryEmpty() {
  return (
    <div className="text-center py-20">
      <span className="text-[72px] block mb-6">📋</span>
      <h2 className="text-[var(--color-text-h)] text-3xl font-bold mb-3">No orders yet</h2>
      <p className="text-[var(--color-text)] text-base mb-8 max-w-[400px] mx-auto">You haven't placed any orders yet. Browse our services and book what you need.</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white text-base font-semibold px-9 py-4 rounded-full shadow-[0_4px_16px_var(--color-accent-border,transparent)] transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] hover:-translate-y-0.5 active:scale-96 no-underline">
        Browse Services →
      </Link>
    </div>
  )
}

function OrderCard({ order }) {
  const items = order?.items || order?.products || []
  const total = order?.total || order?.amount || 0
  const date = order?.created_at || order?.date || order?.createdAt

  const formattedDate = date
    ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))
    : '—'

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 transition-all duration-300 hover:shadow-[var(--shadow-hover,0_8px_24px_rgba(0,0,0,0.08))]">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <p className="text-[12px] text-[var(--color-text)] font-medium mb-1">Order #{order?.id || order?._id || order?.order_id || '—'}</p>
          <p className="text-[13px] text-[var(--color-text)]">{formattedDate}</p>
        </div>
        <OrderStatus status={order?.status} />
      </div>

      {items.length > 0 && (
        <div className="border-t border-[var(--color-border)] pt-4 space-y-3 mb-4">
          {items.map((item, i) => {
            const name = safeString(item?.name || item?.product_name || item?.title || item?.product?.name || 'Item')
            const price = item?.price || item?.amount || 0
            const qty = item?.quantity || item?.qty || 1
            const img = extractImageUrl(item) || extractImageUrl(item?.product)
            return (
              <div key={i} className="flex items-center gap-3">
                {img ? (
                  <img src={img} alt={name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                ) : (
                  <span className="w-10 h-10 flex items-center justify-center bg-[var(--color-accent)]/5 rounded-lg shrink-0 text-lg">📦</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[var(--color-text-h)] m-0 truncate">{name}</p>
                  <p className="text-[12px] text-[var(--color-text)] m-0">Qty: {qty}</p>
                </div>
                <span className="text-[14px] font-semibold text-[var(--color-text-h)] shrink-0">Rs. {price}</span>
              </div>
            )
          })}
        </div>
      )}

      <div className="border-t border-[var(--color-border)] pt-4 flex items-center justify-between">
        <span className="text-[13px] text-[var(--color-text)]">Total</span>
        <span className="text-lg font-bold text-[var(--color-text-h)]">Rs. {total}</span>
      </div>
    </div>
  )
}

function Order() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await orderService.getAll()
        if (cancelled) return
        const list = res?.data?.data || res?.data?.orders || res?.data || res?.orders || []
        setOrders(Array.isArray(list) ? list : [])
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <section className="animate-fade-up">
      <div className="px-6 md:px-12 py-10 md:py-10">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[13px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-3">Your Orders</span>
            <h1 className="text-[var(--color-text-h)] text-4xl md:text-5xl font-bold mb-3">Order History</h1>
            <p className="text-[var(--color-text)] max-w-[540px] mx-auto">View all your past orders and their status.</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 animate-pulse">
                  <div className="flex justify-between mb-4">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-[var(--color-border)] rounded" />
                      <div className="h-3 w-24 bg-[var(--color-border)] rounded" />
                    </div>
                    <div className="h-6 w-20 bg-[var(--color-border)] rounded-full" />
                  </div>
                  <div className="border-t border-[var(--color-border)] pt-4 space-y-3 mb-4">
                    {[1, 2].map(j => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-border)]" />
                        <div className="flex-1 space-y-1">
                          <div className="h-3 w-28 bg-[var(--color-border)] rounded" />
                          <div className="h-2 w-16 bg-[var(--color-border)] rounded" />
                        </div>
                        <div className="h-3 w-16 bg-[var(--color-border)] rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[var(--color-border)] pt-4 flex justify-between">
                    <div className="h-3 w-12 bg-[var(--color-border)] rounded" />
                    <div className="h-5 w-20 bg-[var(--color-border)] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <span className="text-[48px] block mb-4">⚠️</span>
              <p className="text-[var(--color-text)] text-lg mb-4">Failed to load order history.</p>
              <button onClick={() => window.location.reload()} className="bg-[var(--color-accent)] text-white text-[14px] font-semibold px-7 py-3 rounded-xl border-none cursor-pointer">Try Again</button>
            </div>
          ) : orders.length === 0 ? (
            <OrderHistoryEmpty />
          ) : (
            <div className="space-y-4 pb-10">
              {orders.map((order, i) => (
                <div key={order.id || order._id || i} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <OrderCard order={order} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Order
