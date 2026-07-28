
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./app-sidebar";
import Topbar from "./topbar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Topbar />

        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
