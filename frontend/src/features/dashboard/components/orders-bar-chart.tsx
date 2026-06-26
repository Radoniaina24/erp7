import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from './chart-shell'
import { weeklyOrders } from '../data'

const maxOrders = Math.max(...weeklyOrders.map((w) => w.orders))

function BarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-xl border border-border/60 bg-card/95 px-4 py-3 text-sm shadow-lg backdrop-blur-sm">
      <p className="font-semibold text-foreground">Semaine {label}</p>
      <p className="mt-1 text-muted-foreground">{payload[0].value} commandes</p>
    </div>
  )
}

export function OrdersBarChart() {
  return (
    <ChartCard
      title="Commandes par semaine"
      description="Volume des 6 dernières semaines"
    >
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyOrders}
            margin={{ top: 12, right: 12, left: -8, bottom: 0 }}
          >
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              width={32}
            />
            <Tooltip
              content={<BarTooltip />}
              cursor={{ fill: 'var(--muted)', opacity: 0.35, radius: 8 }}
            />
            <Bar dataKey="orders" name="Commandes" radius={[8, 8, 0, 0]} maxBarSize={52}>
              {weeklyOrders.map((entry) => (
                <Cell
                  key={entry.week}
                  fill="var(--chart-1)"
                  fillOpacity={entry.orders === maxOrders ? 1 : 0.55}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
