import { cn } from "@/lib/utils";

/** Standart bölüm sarmalayıcı: konteyner + dikey ritim */
export function Section({
  className,
  containerClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { containerClassName?: string }) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props}>
      <div className={cn("mx-auto max-w-6xl px-4 sm:px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
}: {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl sm:mb-14",
        align === "center" && "mx-auto text-center",
      )}
    >
      {kicker && (
        <p className="numeric mb-3 text-xs font-medium tracking-[0.2em] text-signal uppercase">
          {kicker}
        </p>
      )}
      <h2 className="display text-3xl text-fg sm:text-4xl">{title}</h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-fg-soft sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
