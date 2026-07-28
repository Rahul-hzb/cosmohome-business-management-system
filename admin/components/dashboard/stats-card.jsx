import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({ title, value, icon: Icon, description }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <h2 className="mt-2 text-3xl font-bold">{value}</h2>

            <p className="mt-2 text-xs text-muted-foreground">{description}</p>
          </div>

          <div className="rounded-xl bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
