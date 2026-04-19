import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export const GradientButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, size = "md", glow = true, children, ...props }, ref) => {
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-white",
          "bg-gradient-primary transition-smooth",
          "hover:scale-[1.02] active:scale-[0.98]",
          "disabled:opacity-50 disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          glow && "shadow-[0_0_30px_hsl(258_90%_66%/0.4)] hover:shadow-[0_0_45px_hsl(258_90%_66%/0.6)]",
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
GradientButton.displayName = "GradientButton";
