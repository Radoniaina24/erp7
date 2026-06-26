import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/features/auth/hooks'
import { useAuthStore } from '@/stores/auth-store'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  const handleLogout = async () => {
    await logout.mutateAsync()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-medium text-primary">ERP</p>
            <h1 className="text-xl font-semibold text-foreground">
              Tableau de bord
            </h1>
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            {logout.isPending ? 'Déconnexion...' : 'Déconnexion'}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm text-muted-foreground">Connecté en tant que</p>
          <h2 className="mt-1 text-2xl font-semibold text-foreground">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="mt-2 text-muted-foreground">{user?.email}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {user?.role}
            </span>
            {user?.isActive && (
              <span className="inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                Actif
              </span>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
