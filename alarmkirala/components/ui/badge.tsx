import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        line: "border border-line text-fg-soft",
        signal: "bg-signal/15 text-[#ff6f57]",
        safe: "bg-safe/15 text-safe",
        amber: "bg-amber/15 text-amber",
        mono: "border border-line font-mono text-fg-mute normal-case",
      },
    },
    defaultVariants: { variant: "line" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

/** Placeholder fiyatlar için zorunlu "örnek" işareti — brief: UYDURMA */
export function ExamplePriceBadge() {
  return (
    <Badge variant="amber" title="Gerçek fiyatlar distribütör anlaşmasıyla netleşecek">
      örnek fiyat
    </Badge>
  );
}
