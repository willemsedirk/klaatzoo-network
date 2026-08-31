import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: "green" | "red" | "blue" | "yellow" | "purple" | "none";
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, accent = "none", hover = false, padding = "md", children, ...props }, ref) => {
    const accentClasses = {
      green: "card-accent-green",
      red: "card-accent-red",
      blue: "card-accent-blue",
      yellow: "card-accent-yellow",
      purple: "card-accent-purple",
      none: "",
    };

    const paddingClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--color-bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] border border-[var(--color-border-light)]",
          accentClasses[accent],
          paddingClasses[padding],
          hover && "transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
export type { CardProps };
