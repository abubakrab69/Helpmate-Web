import { RouterProvider } from 'react-router-dom'
import { AuthProvider, CartProvider } from './contexts'
import { ToastProvider } from './components/ui/Toast'
import router from './routes'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
