import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { HoverCard } from "@/components/ui/card";
import { WHY_RENT } from "@/lib/data/site";

/** Brief §1 — 4 engel / 4 cevap; sitenin ana argümanı */
export function WhyRent() {
  return (
    <Section id="neden-kiralamak">
      <SectionHeading
        kicker="Neden kiralamak?"
        title="Alarm sahibi olmak zorunda değilsin. Korunmak zorundasın."
        lead="Satın almanın önündeki 4 engel — ve kiralamanın her birine cevabı."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {WHY_RENT.map((item) => (
          <HoverCard key={item.engel}>
            <p className="text-sm font-medium text-fg-mute line-through decoration-signal/60">
              {item.engel}
            </p>
            <p className="mt-0.5 text-xs text-fg-mute">{item.detay}</p>
            <p className="mt-4 flex items-center gap-2 font-semibold text-fg">
              <ArrowRight className="size-4 text-signal" aria-hidden />
              {item.cevap}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-soft">
              {item.cevapDetay}
            </p>
          </HoverCard>
        ))}
      </div>
    </Section>
  );
}
