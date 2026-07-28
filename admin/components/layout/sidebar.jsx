"use client";

import Logo from "./logo";
import NavItem from "./nav-item";
import { SIDEBAR_ITEMS } from "@/constants/sidebar";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="h-16 flex items-center border-b px-4">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {SIDEBAR_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </nav>
    </aside>
  );
}
