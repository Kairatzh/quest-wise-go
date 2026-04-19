import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  accent?: "primary" | "success" | "warning" | "accent";
}

const accents = {
  primary: "from-indigo-500/20 to-violet-500/20 text-primary",
  success: "from-emerald-500/20 to-teal-500/20 text-success",
  warning: "from-amber-500/20 to-orange-500/20 text-warning",
  accent: "from-fuchsia-500/20 to-pink-500/20 text-accent",
};

export function StatCard({ icon: Icon, label, value, trend, accent = "primary" }: Props) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br", accents[accent])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && <span className="text-xs font-medium text-success">{trend}</span>}
      </div>
      <div className="mt-4 text-3xl font-bold tracking-tight text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </GlassCard>
  );
}
