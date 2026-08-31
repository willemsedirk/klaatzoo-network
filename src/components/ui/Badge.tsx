import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "pending" | "review" | "accepted" | "rejected" | "special" | "default";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  pending:
    "bg-[var(--color-warning-light)] text-[#8b6914] border-[var(--color-mc-yellow)]",
  review:
    "bg-[var(--color-info-light)] text-[#1565c0] border-[var(--color-mc-blue)]",
  accepted:
    "bg-[var(--color-accent-light)] text-[#2e7d32] border-[var(--color-mc-green)]",
  rejected:
    "bg-[var(--color-danger-light)] text-[#c62828] border-[var(--color-mc-red)]",
  special:
    "bg-[var(--color-special-light)] text-[#6a1b9a] border-[var(--color-mc-purple)]",
  default:
    "bg-gray-100 text-gray-700 border-gray-300",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({ variant = "default", size = "sm", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-[var(--radius-full)] border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Map application status to badge variant.
 */
export function StatusBadge({ status }: { status: string }) {
  const variantMap: Record<string, BadgeProps["variant"]> = {
    PENDING: "pending",
    UNDER_REVIEW: "review",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
  };

  const labelMap: Record<string, string> = {
    PENDING: "⏳ Pending",
    UNDER_REVIEW: "🔍 Under Review",
    ACCEPTED: "✅ Accepted",
    REJECTED: "❌ Rejected",
  };

  return (
    <Badge variant={variantMap[status] || "default"} size="md">
      {labelMap[status] || status}
    </Badge>
  );
}
