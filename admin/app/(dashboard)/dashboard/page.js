import StatsGrid from "@/components/dashboard/stats-grid";
import OverviewChart from "@/components/dashboard/overview-chart";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentActivity from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Administrator 👋</p>
      </div>

      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OverviewChart />
        </div>

        <QuickActions />
      </div>

      <RecentActivity />
    </div>
  );
}
