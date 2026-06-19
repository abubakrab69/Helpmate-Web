import { createContext, useContext, useReducer, useEffect } from 'react'
import { safeString } from '../utils/images'

const CartContext = createContext(null)

const STORAGE_KEY = 'helpmate-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(item => String(item.id) === String(action.product.id))
      if (existing) {
        return state.map(item =>
          String(item.id) === String(action.product.id)
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...state, {
        id: action.product.id,
        name: safeString(action.product.name || action.product.title || 'Product'),
        price: safeString(action.product.price || action.product.starting_price || 0),
        image: action.product._img || null,
        qty: 1,
      }]
    }
    case 'REMOVE_ITEM':
      return state.filter(item => String(item.id) !== String(action.id))
    case 'UPDATE_QTY':
      return state.map(item =>
        String(item.id) === String(action.id)
          ? { ...item, qty: Math.max(1, item.qty + action.delta) }
          : item
      )
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, null, loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', product })
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id })
  }

  const updateQty = (id, delta) => {
    dispatch({ type: 'UPDATE_QTY', id, delta })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR' })
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.qty, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, subtotal, tax, total, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
