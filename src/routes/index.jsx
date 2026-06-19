import { createBrowserRouter } from 'react-router-dom'
import { Home, Order, Cart, NicheProducts, ProductDetail } from '../pages'
import { MainLayout } from '../layouts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'order', element: <Order /> },
      { path: 'cart', element: <Cart /> },
      { path: 'niche/:nicheId', element: <NicheProducts /> },
      { path: 'product/:productId', element: <ProductDetail /> },
    ],
  },
])

export default router
