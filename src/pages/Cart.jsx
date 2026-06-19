import { useState } from 'react'
import { Link } from 'react-router-dom'
import { orderService } from '../services/orderService'

const emojis = ['🧹', '🔧', '⚡', '🎨', '🔨', '🚗', '📦', '🌿', '💻', '🔒', '❄️', '🪟']

const initialItems = [
  { id: 1, title: 'Home Cleaning', price: 49, qty: 1, icon: '🧹' },
  { id: 2, title: 'Plumbing', price: 79, qty: 2, icon: '🔧' },
]

function Cart() {
  const [items, setItems] = useState(initialItems)
  const [checkingOut, setCheckingOut] = useState(false)
  const [checkoutMsg, setCheckoutMsg] = useState(null)

  const updateQty = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    )
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleCheckout = async () => {
    setCheckingOut(true)
    setCheckoutMsg(null)
    try {
      const payload = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.qty,
          price: item.price,
        })),
        subtotal,
        tax,
        total,
      }
      const res = await orderService.create(payload)
      setCheckoutMsg('success')
      setItems([])
    } catch (err) {
      setCheckoutMsg('error')
    } finally {
      setCheckingOut(false)
    }
  }

  if (items.length === 0) {
    return (
      <section className="animate-fade-up">
        <div className="px-6 md:px-12 py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto text-center py-20">
            {checkoutMsg === 'success' ? (
              <>
                <span className="text-[72px] block mb-6">🎉</span>
                <h2 className="text-[var(--color-text-h)] text-3xl font-bold mb-3">Order placed successfully!</h2>
                <p className="text-[var(--color-text)] text-base mb-8">Thank you for your booking. You'll receive a confirmation shortly.</p>
              </>
            ) : (
              <>
                <span className="text-[72px] block mb-6">🛒</span>
                <h2 className="text-[var(--color-text-h)] text-3xl font-bold mb-3">Your cart is empty</h2>
                <p className="text-[var(--color-text)] text-base mb-8">Looks like you haven't added any services yet.</p>
              </>
            )}
            <Link to="/order" className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white text-base font-semibold px-9 py-4 rounded-xl shadow-[0_4px_16px_var(--color-accent-border,transparent)] transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] hover:-translate-y-0.5 active:scale-96">
              {checkoutMsg === 'success' ? 'Book More Services →' : 'Browse Services →'}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="animate-fade-up">
      <div className="px-6 md:px-12 py-10 md:py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[13px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-3">Your Order</span>
            <h1 className="text-[var(--color-text-h)] text-4xl md:text-5xl font-bold mb-3">Shopping Cart</h1>
            <p className="text-[var(--color-text)] max-w-[540px] mx-auto">{items.length} service{items.length > 1 ? 's' : ''} selected for booking</p>
          </div>

          {checkoutMsg === 'error' && (
            <div className="max-w-[1200px] mx-auto mb-6 px-6 py-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-[var(--color-text)] text-[15px] text-center">
              Something went wrong. Please try again.
            </div>
          )}

          <div className="grid grid-cols-[1fr_360px] gap-10 items-start text-left max-lg:grid-cols-1">
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-5 p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl transition-all duration-300 animate-fade-up hover:shadow-[var(--shadow-sm,0_2px_8px_rgba(0,0,0,0.06))]">
                  {item.icon && (
                    <span className="w-13 h-13 flex items-center justify-center bg-[var(--color-accent)]/5 rounded-xl shrink-0 text-2xl">
                      {item.icon}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[var(--color-text-h)] text-base m-0 mb-1">{item.title}</h3>
                    <span className="text-[14px] text-[var(--color-text)]">${item.price} / session</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => updateQty(item.id, -1)} className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-lg cursor-pointer flex items-center justify-center text-[var(--color-text-h)] transition-all duration-300 hover:bg-[var(--color-accent)]/5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]" aria-label="Decrease quantity">−</button>
                    <span className="font-semibold text-base min-w-5 text-center text-[var(--color-text-h)]">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-lg cursor-pointer flex items-center justify-center text-[var(--color-text-h)] transition-all duration-300 hover:bg-[var(--color-accent)]/5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]" aria-label="Increase quantity">+</button>
                  </div>
                  <div className="font-bold text-[17px] text-[var(--color-text-h)] min-w-70px text-right shrink-0">${(item.price * item.qty).toFixed(2)}</div>
                  <button onClick={() => removeItem(item.id)} className="bg-none border-none text-[14px] text-[var(--color-text)] cursor-pointer p-2 rounded-lg transition-all duration-300 shrink-0 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500" aria-label="Remove item">✕</button>
                </div>
              ))}
            </div>

            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-8 sticky top-100 animate-scale-in">
              <h3 className="text-[var(--color-text-h)] text-xl m-0 mb-6">Order Summary</h3>
              <div className="flex justify-between text-[15px] py-2.5 text-[var(--color-text)]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[15px] py-2.5 text-[var(--color-text)]">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[15px] py-2.5 text-[var(--color-text)]">
                <span>Service Fee</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              <div className="flex justify-between border-t border-[var(--color-border)] mt-2 pt-5 text-xl font-bold text-[var(--color-text-h)]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full bg-[var(--color-accent)] text-white text-base font-semibold px-7 py-4 rounded-xl border-none cursor-pointer transition-all duration-300 mt-6 shadow-[0_4px_16px_var(--color-accent-border,transparent)] hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] hover:-translate-y-0.5 active:scale-96 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {checkingOut ? 'Processing...' : 'Proceed to Checkout →'}
              </button>
              <Link to="/order" className="block text-center text-[var(--color-text)] text-[15px] no-underline mt-3 py-2.5 rounded-xl transition-colors duration-300 hover:text-[var(--color-accent)]">
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
