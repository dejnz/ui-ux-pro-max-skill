import { cn } from "@/lib/utils";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-sm font-medium text-fg-soft", className)}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-ink px-3.5 text-[15px] text-fg placeholder:text-fg-mute focus-visible:border-signal focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}

/** Sayı alanı: −/+ adımlayıcı, dokunma hedefi ≥44px */
export function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 20,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-line bg-ink px-4 py-3">
      <span className="text-sm font-medium text-fg-soft">{label}</span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`${label} azalt`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid size-11 cursor-pointer place-items-center rounded-md border border-line text-lg text-fg transition-colors hover:border-fg-mute disabled:pointer-events-none disabled:opacity-40"
        >
          −
        </button>
        <span className="numeric w-10 text-center text-lg font-semibold text-fg">
          {value}
        </span>
        <button
          type="button"
          aria-label={`${label} artır`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid size-11 cursor-pointer place-items-center rounded-md border border-line text-lg text-fg transition-colors hover:border-fg-mute disabled:pointer-events-none disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}
