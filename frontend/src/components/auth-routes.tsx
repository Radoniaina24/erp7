import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../stores/auth-store'
import { useMe } from '../features/auth/hooks'

export function ProtectedRoute() {
  const user = useAuthStore((state) => state.user)
  const { isLoading, isFetching } = useMe()

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export function PublicRoute() {
  const user = useAuthStore((state) => state.user)
  const { isLoading, isFetching } = useMe()

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-400" />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
