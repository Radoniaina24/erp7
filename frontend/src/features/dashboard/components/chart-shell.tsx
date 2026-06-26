import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionTitleProps = {
  title: string
  description?: string
  action?: ReactNode
}

export function SectionTitle({ title, description, action }: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  )
}

type ChartCardProps = {
  title: string
  description?: string
  children: ReactNode
  className?: string
  action?: ReactNode
}

export function ChartCard({
  title,
  description,
  children,
  className,
  action,
}: ChartCardProps) {
  return (
    <article
      className={cn(
        'overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border/50 px-5 py-4">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className="p-5 pt-4">{children}</div>
    </article>
  )
}
