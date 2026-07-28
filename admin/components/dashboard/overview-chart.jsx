import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Appointments</CardTitle>
      </CardHeader>

      <CardContent className="flex h-80 items-center justify-center text-muted-foreground">
        Chart will be connected with backend data.
      </CardContent>
    </Card>
  );
}
