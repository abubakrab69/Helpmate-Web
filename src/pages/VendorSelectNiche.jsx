import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useToast } from '../components/ui/Toast'
import { Input, Select } from '../components/ui'
import { ROUTES } from '../constants'

const FALLBACK_NICHES = [
  { id: 'plumber', name: 'Plumber', icon: '🔧', description: 'Pipe repairs and installation' },
  { id: 'electrician', name: 'Electrician', icon: '⚡', description: 'Electrical wiring and repairs' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚', description: 'Woodwork and furniture' },
  { id: 'painter', name: 'Painter', icon: '🎨', description: 'Interior and exterior painting' },
  { id: 'cleaner', name: 'Cleaner', icon: '🧹', description: 'Home and office cleaning' },
  { id: 'gardener', name: 'Gardener', icon: '🌿', description: 'Lawn and garden maintenance' },
  { id: 'hvac', name: 'HVAC Technician', icon: '❄️', description: 'Heating and cooling systems' },
  { id: 'mover', name: 'Mover', icon: '📦', description: 'Packing and moving services' },
  { id: 'mechanic', name: 'Mechanic', icon: '🔧', description: 'Vehicle repair and maintenance' },
]

function VendorSelectNiche() {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const [niches, setNiches] = useState(FALLBACK_NICHES)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', nieche_id: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadNiches()
  }, [])

  const loadNiches = async () => {
    setLoading(true)
    try {
      const res = await authService.getNiches()
      const list = Array.isArray(res)
        ? res
        : res?.data
        ? (Array.isArray(res.data) ? res.data : res.data?.nieches || res.data?.niches || res.data?.data || [])
        : res?.nieches || res?.niches || res?.niachas || []
      if (list.length > 0) setNiches(list)
    } catch (err) {
      addToast('Using default professions list', 'warning')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.nieche_id) errs.nieche_id = 'Please select a profession'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      await authService.sendVendorPin({
        name: form.name.trim(),
        email: form.email.trim(),
        nieche_id: form.nieche_id,
      })
      navigate(ROUTES.OTP_VERIFY, {
        state: {
          identifier: { email: form.email.trim() },
          mode: 'vendor',
          vendorData: form,
        },
      })
    } catch (err) {
      addToast(err.message || 'Failed to send verification', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-28 pb-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text-h)]">Become a Vendor</h1>
          <p className="text-[var(--color-text)] mt-2">Select your profession and get started</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            id="name"
            name="name"
            label="Full Name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <Input
            id="email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text-h)]">
              Select Profession
            </label>

            <Select
              id="nieche_id"
              name="nieche_id"
              placeholder="-- Choose a profession --"
              options={niches}
              value={form.nieche_id}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, nieche_id: e.target.value }))
                setErrors((prev) => ({ ...prev, nieche_id: '' }))
              }}
              error={errors.nieche_id}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              {niches.map((niche) => (
                <button
                  key={niche.id || niche._id}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, nieche_id: niche.id || niche._id }))}
                  className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all duration-200 ${
                    form.nieche_id === (niche.id || niche._id)
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-[0_0_0_3px_var(--color-accent-border,transparent)]'
                      : 'border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-accent)]/50'
                  }`}
                >
                  <span className="text-2xl block mb-1">{niche.icon || '🔧'}</span>
                  <span className="font-medium text-sm text-[var(--color-text-h)]">{niche.name}</span>
                  {niche.description && (
                    <span className="text-xs text-[var(--color-text)] block mt-0.5">{niche.description}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[var(--color-accent)] text-white text-base font-semibold py-3.5 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[0_4px_16px_var(--color-accent-border,transparent)] hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {submitting && <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />}
            {submitting ? 'Sending verification...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VendorSelectNiche
