import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { cn } from '@/lib/utils'
import { useLogin } from '@/features/auth/hooks'
import { loginSchema } from '@/features/auth/schemas/login-schema'

const LOGIN_BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80'

function FieldError({ message }) {
  if (!message) return null

  return <p className="text-sm text-destructive">{message}</p>
}

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values) => {
    try {
      await login.mutateAsync(values)
      navigate('/', { replace: true })
    } catch {
      // L'erreur API est affichée via login.error
    }
  }

  return (
    <div className="relative flex min-h-screen">
      <div
        className="pointer-events-none absolute inset-0 lg:hidden"
        aria-hidden="true"
      >
        <img
          src={LOGIN_BACKGROUND_IMAGE}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/50" />
      </div>

      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <img
          src={LOGIN_BACKGROUND_IMAGE}
          alt="Tableau de bord analytique ERP"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-black/50 to-success/30" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-white/70">
              ERP
            </p>
            <h2 className="mt-3 max-w-md text-4xl font-semibold leading-tight text-white">
              Pilotez votre entreprise en temps réel
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/70">
            Stocks, ventes, achats et finances centralisés dans une seule
            plateforme de gestion.
          </p>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center bg-background px-4 py-12 max-lg:bg-background/95 max-lg:backdrop-blur-md">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              ERP
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              Connexion
            </h1>
            <p className="mt-2 text-muted-foreground">
              Accédez à votre espace de gestion
            </p>
          </div>

          <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Identifiants</CardTitle>
            <CardDescription>
              Entrez votre email et mot de passe pour continuer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@erp.com"
                  aria-invalid={!!errors.email}
                  className={cn(errors.email && 'border-destructive')}
                  {...register('email')}
                />
                <FieldError message={errors.email?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    className={cn('pr-10', errors.password && 'border-destructive')}
                    {...register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full px-3 text-muted-foreground hover:text-primary"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword
                        ? 'Masquer le mot de passe'
                        : 'Afficher le mot de passe'
                    }
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                <FieldError message={errors.password?.message} />
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
                disabled={isSubmitting || login.isPending}
              >
                {isSubmitting || login.isPending
                  ? 'Connexion...'
                  : 'Se connecter'}
              </Button>
            </form>
          </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
