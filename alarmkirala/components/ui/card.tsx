import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-ink-soft p-6 transition-[transform,border-color] duration-200",
        className,
      )}
      {...props}
    />
  );
}

export function HoverCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={cn("hover:-translate-y-1 hover:border-fg-mute", className)}
      {...props}
    />
  );
}
