import { cn } from "@/lib/utils";

/** Nabız atan "SİSTEM AKTİF" göstergesi — hero ve panel dilinin imzası */
export function SystemActive({
  label = "Sistem Aktif",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-safe/30 bg-safe/10 px-4 py-1.5",
        className,
      )}
    >
      <span
        aria-hidden
        className="size-2.5 rounded-full bg-safe motion-safe:animate-pulse-dot"
      />
      <span className="numeric text-xs font-semibold tracking-[0.18em] text-safe uppercase">
        {label}
      </span>
    </span>
  );
}
