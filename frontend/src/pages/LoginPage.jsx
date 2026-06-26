import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Package,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useLogin } from '@/features/auth/hooks'
import { loginSchema } from '@/features/auth/schemas/login-schema'

const LOGIN_BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80'

function FieldError({ message }) {
  if (!message) return null

  return (
    <p
      className="animate-in fade-in slide-in-from-top-1 flex items-center gap-1.5 text-sm text-destructive duration-200"
      role="alert"
    >
      <AlertCircle className="size-3.5 shrink-0" />
      {message}
    </p>
  )
}

function BrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden lg:block">
      <img
        src={LOGIN_BACKGROUND_IMAGE}
        alt="Tableau de bord ERP"
        className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[login-ken-burns_20s_ease-in-out_infinite_alternate]"
      />
      <div className="absolute inset-0 bg-black/20" />
    </aside>
  )
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

  const isLoading = isSubmitting || login.isPending

  const onSubmit = async (values) => {
    try {
      await login.mutateAsync(values)
      navigate('/', { replace: true })
    } catch {
      // L'erreur API est affichée via login.error
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <BrandPanel />

      <main className="relative flex flex-col overflow-hidden bg-background">
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          aria-hidden="true"
        >
          <img
            src={LOGIN_BACKGROUND_IMAGE}
            alt=""
            className="h-full w-full object-cover opacity-[0.07]"
          />
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-12 xl:px-20">
          <div className="mx-auto w-full max-w-[440px]">
            <div className="animate-in fade-in slide-in-from-bottom-3 mb-8 flex items-center gap-3 duration-500 lg:hidden">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-muted text-primary">
                <Package className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">ERP</p>
                <p className="text-xs text-muted-foreground">Connexion sécurisée</p>
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-3 mb-8 duration-500 delay-75 fill-mode-both">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Bon retour
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Connectez-vous pour accéder à votre espace de gestion.
              </p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-sm duration-700 delay-150 fill-mode-both sm:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Adresse email
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoFocus
                      placeholder="admin@erp.com"
                      aria-invalid={!!errors.email}
                      disabled={isLoading}
                      className={cn(
                        'h-11 bg-background pr-3 pl-10 text-base transition-colors sm:text-sm',
                        errors.email && 'border-destructive ring-destructive/20',
                      )}
                      {...register('email')}
                    />
                  </div>
                  <FieldError message={errors.email?.message} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      8 caractères min.
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Saisissez votre mot de passe"
                      aria-invalid={!!errors.password}
                      disabled={isLoading}
                      className={cn(
                        'h-11 bg-background pr-11 pl-10 text-base transition-colors sm:text-sm',
                        errors.password && 'border-destructive ring-destructive/20',
                      )}
                      {...register('password')}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={isLoading}
                      className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground hover:bg-primary/10 hover:text-primary"
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
                  <div
                    className="animate-in fade-in slide-in-from-top-1 flex items-start gap-3 rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive duration-300"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    <p>{login.error.message}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-11 w-full text-sm font-semibold shadow-sm transition-all hover:shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </form>

              <div className="mt-5 flex items-center justify-center gap-2 border-t border-border/60 pt-5 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-success" />
                <span>Connexion chiffrée et sécurisée</span>
              </div>
            </div>

            <p className="animate-in fade-in mt-6 text-center text-xs text-muted-foreground duration-700 delay-300 fill-mode-both">
              Besoin d&apos;aide ? Contactez votre administrateur système.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
