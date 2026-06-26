import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth-store'

const stats = [
  {
    title: 'Utilisateurs',
    value: '—',
    description: 'Comptes actifs',
    icon: Users,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    title: 'Produits',
    value: '—',
    description: 'Articles en catalogue',
    icon: Package,
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    title: 'Commandes',
    value: '—',
    description: 'Ce mois-ci',
    icon: ShoppingCart,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    title: 'Revenus',
    value: '—',
    description: 'Chiffre du mois',
    icon: BarChart3,
    color: 'text-success',
    bg: 'bg-success/10',
  },
]

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Bonjour, {user?.firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Voici un aperçu de votre activité ERP.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className={`flex size-9 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon className={`size-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <CardDescription className="mt-1">{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil connecté</CardTitle>
          <CardDescription>
            Informations de votre session actuelle
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Nom complet</p>
              <p className="font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rôle</p>
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {user?.role}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Statut</p>
              {user?.isActive ? (
                <span className="inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                  Actif
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                  Inactif
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
