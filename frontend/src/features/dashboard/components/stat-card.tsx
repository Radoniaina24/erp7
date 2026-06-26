import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { KpiMetric } from '../data'

const accentStyles = {
  primary: {
    icon: 'bg-primary/10 text-primary ring-primary/20',
    bar: 'bg-primary',
    glow: 'from-primary/8 to-transparent',
  },
  success: {
    icon: 'bg-success/10 text-success ring-success/20',
    bar: 'bg-success',
    glow: 'from-success/8 to-transparent',
  },
  destructive: {
    icon: 'bg-destructive/10 text-destructive ring-destructive/20',
    bar: 'bg-destructive',
    glow: 'from-destructive/8 to-transparent',
  },
  muted: {
    icon: 'bg-muted text-muted-foreground ring-border',
    bar: 'bg-muted-foreground',
    glow: 'from-muted/50 to-transparent',
  },
} as const

type StatCardProps = {
  metric: KpiMetric
  featured?: boolean
}

function getTrendColor(metric: KpiMetric) {
  const isNegativeMetric =
    metric.id === 'expenses' || metric.id === 'invoices' || metric.id === 'stock'

  if (metric.trend === 'neutral') return 'text-muted-foreground bg-muted'
  if (metric.trend === 'up') {
    return isNegativeMetric
      ? 'text-destructive bg-destructive/10'
      : 'text-success bg-success/10'
  }
  return isNegativeMetric
    ? 'text-success bg-success/10'
    : 'text-destructive bg-destructive/10'
}

export function StatCard({ metric, featured = false }: StatCardProps) {
  const styles = accentStyles[metric.accent]
  const Icon = metric.icon
  const TrendIcon =
    metric.trend === 'up'
      ? ArrowUpRight
      : metric.trend === 'down'
        ? ArrowDownRight
        : Minus

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-border hover:shadow-md',
        featured ? 'p-5' : 'p-4',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          styles.glow,
        )}
      />
      <div className={cn('absolute left-0 top-0 h-full w-1', styles.bar)} />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {metric.label}
          </p>
          <p
            className={cn(
              'font-bold tabular-nums tracking-tight text-foreground',
              featured ? 'text-3xl' : 'text-2xl',
            )}
          >
            {metric.value}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                getTrendColor(metric),
              )}
            >
              <TrendIcon className="size-3" />
              {metric.change}
            </span>
            <span className="text-xs text-muted-foreground">{metric.description}</span>
          </div>
        </div>

        <div
          className={cn(
            'flex shrink-0 items-center justify-center rounded-xl ring-1 ring-inset',
            featured ? 'size-12' : 'size-10',
            styles.icon,
          )}
        >
          <Icon className={featured ? 'size-6' : 'size-5'} />
        </div>
      </div>
    </article>
  )
}
