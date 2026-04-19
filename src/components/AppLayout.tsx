import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { FloatingOrbs } from "./FloatingOrbs";

export function AppLayout() {
  return (
    <SidebarProvider defaultOpen>
      <FloatingOrbs />
      <div className="relative flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/50 bg-background/60 px-4 backdrop-blur-xl md:hidden">
            <SidebarTrigger />
            <span className="text-sm font-semibold">Fill AI</span>
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
