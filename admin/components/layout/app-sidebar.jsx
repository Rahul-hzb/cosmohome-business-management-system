"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderTree,
  Briefcase,
  Package,
  Image,
  Users,
  Star,
  Calendar,
  Phone,
  UserPlus,
  GraduationCap,
  Bell,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Categories", url: "/categories", icon: FolderTree },
  { title: "Services", url: "/services", icon: Briefcase },
  { title: "Products", url: "/products", icon: Package },
  { title: "Gallery", url: "/gallery", icon: Image },
  { title: "Team", url: "/team", icon: Users },
  { title: "Reviews", url: "/reviews", icon: Star },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Contact", url: "/contact", icon: Phone },
  { title: "Join Us", url: "/join-us", icon: UserPlus },
  { title: "Training", url: "/training", icon: GraduationCap },
  { title: "Announcements", url: "/announcements", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold">Cosmohome</h2>
        <p className="text-xs text-muted-foreground">Business Management</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton render={<Link href={item.url} />}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-sm font-medium">Administrator</p>
      </SidebarFooter>
    </Sidebar>
  );
}
