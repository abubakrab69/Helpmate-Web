import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'
import { Input } from '../components/ui'
import { ROUTES } from '../constants'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { addToast } = useToast()

  const [form, setForm] = useState({ name: '', email: '', phone_number: '', password: '', password_confirmation: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.phone_number.trim()) errs.phone_number = 'Phone number is required'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (form.password !== form.password_confirmation) errs.password_confirmation = 'Passwords do not match'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone_number: form.phone_number.trim(),
        password: form.password,
        password_confirmation: form.password_confirmation,
      })
      navigate(ROUTES.OTP_VERIFY, {
        state: { identifier: { email: form.email.trim() }, mode: 'register' },
      })
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
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
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
          />

          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <Input
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            type="tel"
            placeholder="+1234567890"
            value={form.phone_number}
            onChange={handleChange}
            error={errors.phone_number}
            autoComplete="tel"
          />

          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
          />

          <Input
            id="password_confirmation"
            name="password_confirmation"
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            value={form.password_confirmation}
            onChange={handleChange}
            error={errors.password_confirmation}
            autoComplete="new-password"
          />

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
