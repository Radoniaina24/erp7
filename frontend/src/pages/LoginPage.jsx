import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin } from '@/features/auth/hooks'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await login.mutateAsync({ email, password })
      navigate('/', { replace: true })
    } catch {
      // L'erreur est affichée via login.error
    }
  }

  return (
    <div className="dark flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            ERP
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">
            Connexion
          </h1>
          <p className="mt-2 text-muted-foreground">
            Accédez à votre espace de gestion
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Identifiants</CardTitle>
            <CardDescription>
              Entrez votre email et mot de passe pour continuer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@erp.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
              </div>

              {login.error && (
                <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {login.error.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={login.isPending}
              >
                {login.isPending ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
