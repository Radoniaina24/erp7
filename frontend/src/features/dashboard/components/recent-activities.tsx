import {
  ArrowRight,
  FileText,
  Package,
  ShoppingCart,
  UserPlus,
  Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChartCard } from './chart-shell'
import { cn } from '@/lib/utils'
import { recentActivities, type RecentActivity } from '../data'

const activityConfig: Record<
  RecentActivity['type'],
  { icon: typeof ShoppingCart; className: string; label: string }
> = {
  order: {
    icon: ShoppingCart,
    className: 'bg-primary/10 text-primary ring-primary/20',
    label: 'Commande',
  },
  invoice: {
    icon: FileText,
    className: 'bg-destructive/10 text-destructive ring-destructive/20',
    label: 'Facture',
  },
  stock: {
    icon: Package,
    className: 'bg-destructive/10 text-destructive ring-destructive/20',
    label: 'Stock',
  },
  payment: {
    icon: Wallet,
    className: 'bg-success/10 text-success ring-success/20',
    label: 'Paiement',
  },
  user: {
    icon: UserPlus,
    className: 'bg-primary/10 text-primary ring-primary/20',
    label: 'Équipe',
  },
}

export function RecentActivities() {
  return (
    <ChartCard
      title="Activités récentes"
      description="Dernières actions sur la plateforme"
      action={
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Tout voir
          <ArrowRight className="size-4" />
        </Button>
      }
    >
      <ul className="relative space-y-1">
        <div
          aria-hidden
          className="absolute left-[19px] top-3 bottom-3 w-px bg-border/80"
        />
        {recentActivities.map((activity, index) => {
          const config = activityConfig[activity.type]
          const Icon = config.icon

          return (
            <li key={activity.id}>
              <div
                className={cn(
                  'group flex gap-4 rounded-xl p-3 transition-colors',
                  'hover:bg-muted/40',
                  index === 0 && 'bg-muted/20',
                )}
              >
                <div
                  className={cn(
                    'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset',
                    config.className,
                  )}
                >
                  <Icon className="size-4" />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {config.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                </div>

                <time className="shrink-0 pt-1 text-xs font-medium text-muted-foreground">
                  {activity.time}
                </time>
              </div>
            </li>
          )
        })}
      </ul>
    </ChartCard>
  )
}
