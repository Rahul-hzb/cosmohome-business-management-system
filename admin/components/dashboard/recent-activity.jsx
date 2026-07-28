"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/hooks/useDashboard";

export default function RecentActivity() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-12 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-red-500">
            Failed to load recent activity.
          </p>
        </CardContent>
      </Card>
    );
  }

  const dashboard = data?.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Recent Appointments */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
            Recent Appointments
          </h3>

          <div className="space-y-3">
            {dashboard?.recentAppointments?.length ? (
              dashboard.recentAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">
                      {appointment.service?.name || "Service"}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {appointment.name}
                    </p>
                  </div>

                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {appointment.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No appointments found.
              </p>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
            Recent Beautician Applications
          </h3>

          <div className="space-y-3">
            {dashboard?.recentApplications?.length ? (
              dashboard.recentApplications.map((application) => (
                <div
                  key={application._id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{application.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {application.phone}
                    </p>
                  </div>

                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {application.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No applications found.
              </p>
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
            Recent Contact Messages
          </h3>

          <div className="space-y-3">
            {dashboard?.recentContacts?.length ? (
              dashboard.recentContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{contact.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {contact.subject}
                    </p>
                  </div>

                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {contact.isRead ? "Read" : "Unread"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No contact messages found.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
