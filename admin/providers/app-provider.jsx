"use client";
import { AuthProvider } from "./auth-provider";
import QueryProvider from "./query-provider";
import ThemeProvider from "./theme-provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
    <ThemeProvider>
      <QueryProvider>
        <TooltipProvider>
          {children}
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
    </AuthProvider>
  );
}
