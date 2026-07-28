
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Topbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <p className="text-sm text-muted-foreground">
            Welcome to Cosmohome Admin
          </p>
        </div>
      </div>

      <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
        A
      </div>
    </header>
  );
}
