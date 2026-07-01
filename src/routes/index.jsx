import { createBrowserRouter } from 'react-router-dom'
import { Home, About, Contact, Order, Cart, NicheProducts, ProductDetail } from '../pages'
import { MainLayout } from '../layouts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'order', element: <Order /> },
      { path: 'cart', element: <Cart /> },
      { path: 'niche/:nicheId', element: <NicheProducts /> },
      { path: 'product/:productId', element: <ProductDetail /> },
    ],
  },
])

export default router
