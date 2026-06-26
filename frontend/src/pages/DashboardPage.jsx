import { useNavigate } from 'react-router-dom'
import { useLogout } from '../features/auth/hooks'
import { useAuthStore } from '../stores/auth-store'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  const handleLogout = async () => {
    await logout.mutateAsync()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-medium text-indigo-600">ERP</p>
            <h1 className="text-xl font-semibold text-slate-900">Tableau de bord</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={logout.isPending}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
          >
            {logout.isPending ? 'Déconnexion...' : 'Déconnexion'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm text-slate-500">Connecté en tant que</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="mt-2 text-slate-600">{user?.email}</p>

          <div className="mt-6 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            {user?.role}
          </div>
        </div>
      </main>
    </div>
  )
}
