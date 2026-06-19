import { createBrowserRouter } from 'react-router-dom'
import { Home, Order, Cart } from '../pages'
import { MainLayout } from '../layouts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'order', element: <Order /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
])

export default router
