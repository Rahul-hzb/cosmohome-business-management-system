"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavItem({ title, href, icon: Icon }) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        active ? "bg-black text-white" : "hover:bg-muted",
      )}
    >
      <Icon size={18} />
      {title}
    </Link>
  );
}