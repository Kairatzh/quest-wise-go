import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
  hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, Props>(
  ({ className, strong, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl shadow-card",
        strong ? "glass-strong" : "glass",
        hover && "transition-smooth hover:border-primary/40 hover:-translate-y-1 hover:shadow-elegant",
        className,
      )}
      {...props}
    />
  ),
);
GlassCard.displayName = "GlassCard";
