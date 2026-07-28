import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuickActions() {
  const actions = [
    { title: "Add Service", href: "/services/new" },
    { title: "Add Product", href: "/products/new" },
    { title: "Upload Gallery", href: "/gallery/new" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button key={action.href} asChild className="w-full">
            <Link href={action.href}>{action.title}</Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
