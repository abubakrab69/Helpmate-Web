import { createBrowserRouter } from 'react-router-dom'
import {
  Home, About, Contact, Order, Cart, NicheProducts, ProductDetail,
  Login, Register, OtpVerify,
  VendorSelectNiche, VendorForm, VendorStatus,
  Dashboard,
} from '../pages'
import { MainLayout } from '../layouts'
import { ProtectedRoute } from '../components/auth'
import { ROUTES } from '../constants'

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
      { path: 'auth/login', element: <Login /> },
      { path: 'auth/register', element: <Register /> },
      { path: 'auth/otp-verify', element: <OtpVerify /> },
      { path: 'auth/vendor/select-niche', element: <VendorSelectNiche /> },
      { path: 'auth/vendor/form', element: <VendorForm /> },
      { path: 'auth/vendor/status', element: <VendorStatus /> },
      {
        path: 'dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
    ],
  },
])

export default router
