// components/ui/cyber-badge.tsx
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "muted";

const styles: Record<Variant, string> = {
  primary:   "border-primary/30 bg-primary/10   text-primary",
  secondary: "border-secondary/30 bg-secondary/10 text-secondary",
  accent:    "border-accent/30 bg-accent/10    text-accent",
  muted:     "border-border bg-muted/50 text-muted-foreground",
};

interface CyberBadgeProps {
  label: string;
  variant?: Variant;
  className?: string;
}

export function CyberBadge({ label, variant = "primary", className }: CyberBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-0.5 font-mono text-xs font-medium tracking-wider",
        styles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
