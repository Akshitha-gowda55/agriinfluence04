import { AnalyticsCards } from '@/components/admin/analytics-cards'
import { StatsChart } from '@/components/admin/stats-chart'

export default function AdminAnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-sm text-gray-600">
          View platform performance, revenue, and order trends.
        </p>
      </div>

      <AnalyticsCards />

      <div className="mt-8">
        <StatsChart />
      </div>
    </div>
  )
}