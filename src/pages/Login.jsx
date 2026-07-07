import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Input } from '../components/ui'
import { ROUTES } from '../constants'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD

  const handleSubmit = async (e) => {
    e.preventDefault()
    const val = identifier.trim()
    if (!val) { setError('Email or phone is required'); return }
    setError('')
    setLoading(true)

    const payload = val.includes('@')
      ? { email: val }
      : { phone_number: val }

    navigate(ROUTES.OTP_VERIFY, {
      state: { identifier: payload, mode: 'login', from },
    })
  }

  return (
    <div className="flex items-center justify-center px-4 pt-12 pb-12 mt-10 mb-7">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text-h)]">Welcome Back</h1>
          <p className="text-[var(--color-text)] mt-2">Sign in to your Helpmate account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            id="login"
            name="login"
            label="Email or Phone Number"
            placeholder="Enter your email or phone"
            value={identifier}
            onChange={(e) => { setIdentifier(e.target.value); setError('') }}
            error={error}
            autoComplete="username"
          />
          <p className="text-sm text-[var(--color-text)]">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.REGISTER} className="text-[var(--color-accent)] font-medium hover:underline">
              Create one
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-accent)] text-white text-base font-semibold py-3.5 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[0_4px_16px_var(--color-accent-border,transparent)] hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />}
            {loading ? 'Sending code...' : 'Send OTP'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">

          <p className="text-sm text-[var(--color-text)]">
            Want to offer services?{' '}
            <Link to={ROUTES.VENDOR_SELECT_NICHE} className="text-[var(--color-accent)] font-medium hover:underline">
              Register as a Vendor
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
