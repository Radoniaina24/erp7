import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ChartCard } from './chart-shell'
import { expenseCategories, formatCurrency, totalExpenses } from '../data'

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number }>
}) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  const percent = ((item.value / totalExpenses) * 100).toFixed(1)

  return (
    <div className="rounded-xl border border-border/60 bg-card/95 px-4 py-3 text-sm shadow-lg backdrop-blur-sm">
      <p className="font-semibold text-foreground">{item.name}</p>
      <p className="mt-1 text-muted-foreground">
        {formatCurrency(item.value)} · {percent} %
      </p>
    </div>
  )
}

export function ExpensesPieChart() {
  return (
    <ChartCard
      title="Répartition des dépenses"
      description="Par catégorie ce mois-ci"
    >
      <div className="relative h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseCategories}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={4}
              strokeWidth={2}
              stroke="var(--card)"
            >
              {expenseCategories.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Total
          </p>
          <p className="text-lg font-bold tabular-nums text-foreground">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2.5">
        {expenseCategories.map((cat) => {
          const percent = ((cat.value / totalExpenses) * 100).toFixed(0)

          return (
            <li key={cat.name} className="flex items-center gap-3">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: cat.fill }}
              />
              <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                {cat.name}
              </span>
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {percent} %
              </span>
              <span className="w-20 text-right text-sm font-semibold tabular-nums text-foreground">
                {formatCurrency(cat.value)}
              </span>
            </li>
          )
        })}
      </ul>
    </ChartCard>
  )
}
