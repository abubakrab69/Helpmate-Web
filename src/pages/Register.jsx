import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'
import { Input } from '../components/ui'
import { ROUTES } from '../constants'

function Register() {
  const navigate = useNavigate()
  const { sendOtp } = useAuth()
  const { addToast } = useToast()

  const [form, setForm] = useState({ name: '', identifier: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [inputType, setInputType] = useState('')

  const detectType = (val) => {
    if (!val.trim()) return ''
    if (val.includes('@')) return 'email'
    const digits = val.replace(/\D/g, '')
    if (digits.length >= 4) return 'phone'
    return ''
  }

  const handleNameChange = (e) => {
    setForm((prev) => ({ ...prev, name: e.target.value }))
    setErrors((prev) => ({ ...prev, name: '' }))
  }

  const handleIdentifierChange = (e) => {
    const val = e.target.value
    setForm((prev) => ({ ...prev, identifier: val }))
    setInputType(detectType(val))
    setErrors((prev) => ({ ...prev, identifier: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    const id = form.identifier.trim()
    if (!id) {
      errs.identifier = 'Email or phone number is required'
    } else if (inputType === 'email' && !/\S+@\S+\.\S+/.test(id)) {
      errs.identifier = 'Please enter a valid email'
    } else if (inputType === 'phone' && id.replace(/\D/g, '').length < 10) {
      errs.identifier = 'Please enter a valid phone number'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const identifier = inputType === 'email'
        ? { email: form.identifier.trim() }
        : { phone_number: form.identifier.trim() }

      await sendOtp({ ...identifier, name: form.name.trim() })

      navigate(ROUTES.OTP_VERIFY, {
        state: { identifier, mode: 'register', name: form.name.trim() },
      })
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const showFlag = inputType === 'phone'
  const showEmailIcon = inputType === 'email'

  return (
    <div className="flex items-center justify-center px-4 pt-24 pb-12 mb-7">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text-h)]">Create Account</h1>
          <p className="text-[var(--color-text)] mt-2">Join Helpmate today</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            id="name"
            name="name"
            label="Full Name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleNameChange}
            error={errors.name}
            autoComplete="name"
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="identifier" className="text-sm font-medium text-[var(--color-text-h)]">
              Email or Phone Number
            </label>
            <div className="relative">
              <input
                id="identifier"
                name="identifier"
                type={showEmailIcon ? 'email' : 'text'}
                inputMode={showFlag ? 'tel' : showEmailIcon ? 'email' : 'text'}
                placeholder="Enter your email or phone number"
                value={form.identifier}
                onChange={handleIdentifierChange}
                autoComplete="username"
                className={`w-full px-4 py-3 rounded-xl border bg-[var(--color-bg)] text-[var(--color-text-h)] text-sm outline-none transition-all duration-200 placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 pr-12 ${errors.identifier ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[var(--color-border)]'
                  }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none text-sm">
                {showFlag && (
                  <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-text)] select-none">
                    <span className="text-base leading-none">🇵🇰</span>
                    <span className="hidden sm:inline text-[13px]">+92</span>
                  </span>
                )}
                {showEmailIcon && (
                  <span className="text-base leading-none opacity-50 select-none">📧</span>
                )}
              </div>
            </div>
            {errors.identifier && <p className="text-red-500 text-xs mt-0.5">{errors.identifier}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-accent)] text-white text-base font-semibold py-3.5 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[0_4px_16px_var(--color-accent-border,transparent)] hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text)]">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-[var(--color-accent)] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
