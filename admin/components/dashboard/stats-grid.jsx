"use client";

import { Briefcase, Image, Calendar, Star } from "lucide-react";

import StatsCard from "./stats-card";
import { useDashboard } from "@/hooks/useDashboard";

export default function StatsGrid() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border bg-muted"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600">
        Failed to load dashboard statistics.
      </div>
    );
  }

  const dashboard = data?.data;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Services"
        value={dashboard?.services ?? 0}
        icon={Briefcase}
        description="Active services"
      />

      <StatsCard
        title="Categories"
        value={dashboard?.categories ?? 0}
        icon={Image}
        description="Service categories"
      />

      <StatsCard
        title="Appointments"
        value={dashboard?.appointments?.total ?? 0}
        icon={Calendar}
        description={`${dashboard?.appointments?.pending ?? 0} pending`}
      />

      <StatsCard
        title="Reviews"
        value={dashboard?.reviews ?? 0}
        icon={Star}
        description="Customer reviews"
      />
    </div>
  );
}
