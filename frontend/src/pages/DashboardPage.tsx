import { ExpensesPieChart } from '@/features/dashboard/components/expenses-pie-chart'
import { FinanceChart } from '@/features/dashboard/components/finance-chart'
import { OrdersBarChart } from '@/features/dashboard/components/orders-bar-chart'
import { RecentActivities } from '@/features/dashboard/components/recent-activities'
import { SectionTitle } from '@/features/dashboard/components/chart-shell'
import { StatCard } from '@/features/dashboard/components/stat-card'
import {
  financialMetrics,
  operationalMetrics,
} from '@/features/dashboard/data'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section aria-label="Indicateurs financiers">
        <div className="grid gap-4 md:grid-cols-3">
          {financialMetrics.map((metric) => (
            <StatCard key={metric.id} metric={metric} featured />
          ))}
        </div>
      </section>

      <section aria-label="Indicateurs opérationnels">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {operationalMetrics.map((metric) => (
            <StatCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>

      <section aria-label="Graphiques et statistiques" className="space-y-4">
        <SectionTitle
          title="Graphiques et statistiques"
          description="Analyse visuelle de votre activité"
        />
        <div className="grid gap-4 xl:grid-cols-3">
          <FinanceChart />
          <ExpensesPieChart />
        </div>
        <OrdersBarChart />
      </section>

      <section aria-label="Activités récentes">
        <RecentActivities />
      </section>
    </div>
  )
}
