import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.HOME, { replace: true })
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text-h)]">Dashboard</h1>
            <p className="text-[var(--color-text)] mt-1">Welcome back{user?.name ? `, ${user.name}` : ''}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-h)] text-sm font-medium bg-transparent cursor-pointer transition-all duration-200 hover:border-red-400 hover:text-red-500"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[var(--color-text-h)] mb-4">Account Information</h2>
          <div className="space-y-3">
            {user?.name && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-[var(--color-text)] w-24 shrink-0">Name</span>
                <span className="font-medium text-[var(--color-text-h)]">{user.name}</span>
              </div>
            )}
            {user?.email && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-[var(--color-text)] w-24 shrink-0">Email</span>
                <span className="font-medium text-[var(--color-text-h)]">{user.email}</span>
              </div>
            )}
            {user?.phone_number && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-[var(--color-text)] w-24 shrink-0">Phone</span>
                <span className="font-medium text-[var(--color-text-h)]">{user.phone_number}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
