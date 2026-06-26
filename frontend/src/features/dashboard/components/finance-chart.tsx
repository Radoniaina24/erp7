import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from './chart-shell'
import { formatCurrency, monthlyFinance } from '../data'

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-xl border border-border/60 bg-card/95 px-4 py-3 text-sm shadow-lg backdrop-blur-sm">
      <p className="mb-2 font-semibold text-foreground">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-medium tabular-nums text-foreground">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FinanceChart() {
  return (
    <ChartCard
      className="lg:col-span-2"
      title="Évolution financière"
      description="Chiffre d'affaires, dépenses et bénéfice sur 6 mois"
    >
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyFinance}
            margin={{ top: 12, right: 12, left: -8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v / 1000}k`}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              width={44}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
            />
            <Legend
              verticalAlign="top"
              height={40}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Chiffre d'affaires"
              stroke="var(--chart-1)"
              fill="url(#revenueGradient)"
              strokeWidth={2.5}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Dépenses"
              stroke="var(--chart-3)"
              fill="url(#expensesGradient)"
              strokeWidth={2.5}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="profit"
              name="Bénéfice"
              stroke="var(--chart-2)"
              fill="transparent"
              strokeWidth={2}
              strokeDasharray="6 4"
              activeDot={{ r: 5, strokeWidth: 0, fill: 'var(--chart-2)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
