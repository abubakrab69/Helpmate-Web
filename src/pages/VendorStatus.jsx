import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { ROUTES } from '../constants'


function VendorStatus() {
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    setLoading(true)
    try {
      const data = await authService.vendorStatus()
      setStatus(data.data || data)
      if (data.data?.profile_completed || data.profile_completed) {
        navigate(ROUTES.DASHBOARD, { replace: true })
      }
    } catch {
      setStatus({ profile_completed: false })
    } finally {
      setLoading(false)
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
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-text-h)] mb-3">Application Submitted</h1>
        <p className="text-[var(--color-text)] mb-6">
          Your vendor application has been received and is currently under review. We will notify you once it has been approved.
        </p>

        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6 text-left space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text)]">Status</span>
            <span className="font-semibold text-yellow-500">Pending Review</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text)]">Profile Completed</span>
            <span className="font-semibold text-[var(--color-text-h)]">
              {status?.profile_completed ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="w-full bg-[var(--color-accent)] text-white text-base font-semibold py-3.5 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[var(--color-accent-light)]"
        >
          Go Home
        </button>

        <button
          onClick={checkStatus}
          className="w-full mt-3 py-3.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-h)] text-sm font-medium bg-transparent cursor-pointer transition-all duration-200 hover:border-[var(--color-accent)]"
        >
          Check Status Again
        </button>
      </div>
    </div>
  )
}

export default VendorStatus
