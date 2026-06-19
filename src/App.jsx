import { RouterProvider } from 'react-router-dom'
import { AuthProvider, CartProvider } from './contexts'
import router from './routes'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
