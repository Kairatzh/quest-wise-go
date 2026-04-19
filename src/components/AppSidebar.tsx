import { Sparkles, Plus, BookOpen, User, Languages, ChevronsLeft } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const { t, lang, setLang } = useI18n();
  const location = useLocation();

  const items = [
    { title: t("nav.new"), url: "/", icon: Plus },
    { title: t("nav.my"), url: "/courses", icon: BookOpen },
    { title: t("nav.profile"), url: "/profile", icon: User },
  ];

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-[0_0_20px_hsl(258_90%_66%/0.5)]">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-foreground">Fill AI</span>
              <span className="text-[11px] text-muted-foreground">Interactive courses</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild className="h-11 rounded-xl">
                      <NavLink
                        to={item.url}
                        className={cn(
                          "relative flex items-center gap-3 px-3 transition-smooth",
                          active
                            ? "bg-gradient-primary-soft text-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
                        )}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-primary" />
                        )}
                        <item.icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-primary")} />
                        {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="mb-3 flex items-center justify-between rounded-xl bg-sidebar-accent/60 p-1">
            <button
              onClick={() => setLang("ru")}
              className={cn(
                "flex-1 rounded-lg px-2 py-1 text-xs font-medium transition-smooth",
                lang === "ru" ? "bg-gradient-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              RU
            </button>
            <button
              onClick={() => setLang("en")}
              className={cn(
                "flex-1 rounded-lg px-2 py-1 text-xs font-medium transition-smooth",
                lang === "en" ? "bg-gradient-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              EN
            </button>
          </div>
        )}

        <div className={cn("flex items-center gap-3 rounded-xl p-2", !collapsed && "bg-sidebar-accent/40")}>
          <div className="relative h-9 w-9 shrink-0 rounded-full bg-gradient-primary p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-sidebar text-sm font-semibold text-foreground">
              А
            </div>
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-foreground">Алекс</div>
              <div className="truncate text-[11px] text-muted-foreground">alex@fillai.app</div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-1.5 text-muted-foreground transition-smooth hover:bg-sidebar-accent hover:text-foreground"
              aria-label={t("nav.collapse")}
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
