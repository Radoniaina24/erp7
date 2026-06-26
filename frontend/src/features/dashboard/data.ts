import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  Briefcase,
  ClipboardList,
  FileWarning,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

export type KpiMetric = {
  id: string
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  description: string
  category: 'financial' | 'operational'
  icon: LucideIcon
  accent: 'primary' | 'success' | 'destructive' | 'muted'
}

export type MonthlyFinance = {
  month: string
  revenue: number
  expenses: number
  profit: number
}

export type WeeklyOrders = {
  week: string
  orders: number
}

export type ExpenseCategory = {
  name: string
  value: number
  fill: string
}

export type RecentActivity = {
  id: string
  title: string
  description: string
  time: string
  type: 'order' | 'invoice' | 'stock' | 'user' | 'payment'
}

export const kpiMetrics: KpiMetric[] = [
  {
    id: 'revenue',
    label: "Chiffre d'affaires",
    value: '128 450 €',
    change: '+12,4 %',
    trend: 'up',
    description: 'vs mois dernier',
    category: 'financial',
    icon: TrendingUp,
    accent: 'primary',
  },
  {
    id: 'expenses',
    label: 'Dépenses',
    value: '76 320 €',
    change: '+4,2 %',
    trend: 'up',
    description: 'vs mois dernier',
    category: 'financial',
    icon: Wallet,
    accent: 'destructive',
  },
  {
    id: 'profit',
    label: 'Bénéfice',
    value: '52 130 €',
    change: '+18,7 %',
    trend: 'up',
    description: 'vs mois dernier',
    category: 'financial',
    icon: Briefcase,
    accent: 'success',
  },
  {
    id: 'orders',
    label: 'Commandes en cours',
    value: '34',
    change: '-3',
    trend: 'down',
    description: 'depuis hier',
    category: 'operational',
    icon: ClipboardList,
    accent: 'primary',
  },
  {
    id: 'invoices',
    label: 'Factures impayées',
    value: '12',
    change: '+2',
    trend: 'up',
    description: 'à relancer',
    category: 'operational',
    icon: FileWarning,
    accent: 'destructive',
  },
  {
    id: 'stock',
    label: 'Produits en rupture',
    value: '7',
    change: '-1',
    trend: 'down',
    description: 'articles critiques',
    category: 'operational',
    icon: AlertTriangle,
    accent: 'destructive',
  },
  {
    id: 'employees',
    label: 'Employés présents',
    value: '18 / 24',
    change: '75 %',
    trend: 'neutral',
    description: "aujourd'hui",
    category: 'operational',
    icon: Users,
    accent: 'success',
  },
]

export const financialMetrics = kpiMetrics.filter((m) => m.category === 'financial')
export const operationalMetrics = kpiMetrics.filter((m) => m.category === 'operational')

export const monthlyFinance: MonthlyFinance[] = [
  { month: 'Jan', revenue: 82000, expenses: 54000, profit: 28000 },
  { month: 'Fév', revenue: 91000, expenses: 58000, profit: 33000 },
  { month: 'Mar', revenue: 88000, expenses: 61000, profit: 27000 },
  { month: 'Avr', revenue: 102000, expenses: 65000, profit: 37000 },
  { month: 'Mai', revenue: 115000, expenses: 70000, profit: 45000 },
  { month: 'Juin', revenue: 128450, expenses: 76320, profit: 52130 },
]

export const weeklyOrders: WeeklyOrders[] = [
  { week: 'S1', orders: 42 },
  { week: 'S2', orders: 38 },
  { week: 'S3', orders: 55 },
  { week: 'S4', orders: 48 },
  { week: 'S5', orders: 61 },
  { week: 'S6', orders: 34 },
]

export const expenseCategories: ExpenseCategory[] = [
  { name: 'Salaires', value: 32000, fill: 'var(--chart-1)' },
  { name: 'Achats', value: 18500, fill: 'var(--chart-2)' },
  { name: 'Logistique', value: 9800, fill: 'var(--chart-4)' },
  { name: 'Marketing', value: 7200, fill: 'var(--chart-5)' },
  { name: 'Autres', value: 8820, fill: 'var(--chart-3)' },
]

export const recentActivities: RecentActivity[] = [
  {
    id: '1',
    title: 'Commande #CMD-2847 validée',
    description: 'Client Acme Corp — 4 280 €',
    time: 'Il y a 12 min',
    type: 'order',
  },
  {
    id: '2',
    title: 'Facture #FAC-1092 en retard',
    description: 'Relance automatique envoyée à Dupont SARL',
    time: 'Il y a 35 min',
    type: 'invoice',
  },
  {
    id: '3',
    title: 'Stock critique — Réf. PRD-088',
    description: 'Seuil minimum atteint (3 unités restantes)',
    time: 'Il y a 1 h',
    type: 'stock',
  },
  {
    id: '4',
    title: 'Paiement reçu',
    description: '2 150 € — Facture #FAC-1085 soldée',
    time: 'Il y a 2 h',
    type: 'payment',
  },
  {
    id: '5',
    title: 'Nouvel employé enregistré',
    description: 'Marie Lambert — Service commercial',
    time: 'Il y a 3 h',
    type: 'user',
  },
  {
    id: '6',
    title: 'Commande #CMD-2843 expédiée',
    description: 'Transporteur : Chronopost — suivi disponible',
    time: 'Il y a 4 h',
    type: 'order',
  },
]

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export const totalExpenses = expenseCategories.reduce((sum, c) => sum + c.value, 0)
