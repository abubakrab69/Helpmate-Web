import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'
import { OtpInput } from '../components/auth'
import { ROUTES } from '../constants'

function OtpVerify() {
  const navigate = useNavigate()
  const location = useLocation()
  const { sendOtp, verifyOtp, pinLoginVerify } = useAuth()
  const { addToast } = useToast()

  const { identifier, mode, from, vendorData, name } = location.state || {}
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (!identifier) {
      navigate(ROUTES.LOGIN, { replace: true })
      return
    }
    handleSendOtp()
  }, [])

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const handleSendOtp = useCallback(async () => {
    setLoading(true)
    try {
      await sendOtp(identifier)
      addToast('OTP sent to your email/phone', 'success')
      setCountdown(30)
    } catch (err) {
      addToast(err.message || 'Failed to send OTP', 'error')
    } finally {
      setLoading(false)
    }
  }, [identifier, sendOtp, addToast])

  const handleComplete = useCallback(async (pin) => {
    setLoading(true)
    try {
      const payload = { ...identifier, pin }
      if (mode === 'login') {
        const data = await pinLoginVerify(payload)
        addToast('Verification successful!', 'success')
        navigate(from || ROUTES.DASHBOARD, { replace: true })
      } else if (mode === 'vendor') {
        const data = await verifyOtp(payload)
        addToast('Verification successful!', 'success')
        navigate(ROUTES.VENDOR_FORM, {
          state: { vendorData: { ...vendorData, email: identifier.email } },
          replace: true,
        })
      } else {
        const data = await verifyOtp(name ? { ...payload, name } : payload)
        addToast('Account verified! Welcome!', 'success')
        navigate(ROUTES.DASHBOARD, { replace: true })
      }
    } catch (err) {
      addToast(err.message || 'Invalid OTP. Try again.', 'error')
    } finally {
      setLoading(false)
    }
  }, [identifier, mode, from, vendorData, name, pinLoginVerify, verifyOtp, addToast, navigate])

  return (
    <div className="flex items-center justify-center px-4 pt-24 pb-12 mt-12 mb-7">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-h)]">Verify Your Identity</h1>
          <p className="text-[var(--color-text)] mt-2 text-sm">
            Enter the 6-digit code sent to your {identifier?.email ? 'email' : 'phone'}
          </p>
        </div>

        <OtpInput length={6} onComplete={handleComplete} disabled={loading} />

        <div className="mt-6">
          {countdown > 0 ? (
            <p className="text-sm text-[var(--color-text)]">
              Resend code in <span className="font-semibold text-[var(--color-text-h)]">{countdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="text-sm text-[var(--color-accent)] font-medium bg-transparent border-none cursor-pointer hover:underline disabled:opacity-50"
            >
              Resend Code
            </button>
          )}
        </div>

        {loading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--color-text)]">
            <div className="animate-spin w-4 h-4 border-2 border-[var(--color-accent)] border-t-transparent rounded-full" />
            Verifying...
          </div>
        )}
      </div>
    </div>
  )
}

export default OtpVerify
