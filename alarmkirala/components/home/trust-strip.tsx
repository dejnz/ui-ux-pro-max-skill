import { BadgeCheck } from "lucide-react";
import { TRUST_ITEMS } from "@/lib/data/site";

/** Güven şeridi — brief §3.5. [[DOLDUR]] gerçek sertifika/sayaç verisi. */
export function TrustStrip() {
  return (
    <section
      aria-label="Güven unsurları"
      className="border-b border-line bg-ink py-6"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 sm:px-6">
        {TRUST_ITEMS.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 text-sm text-fg-mute"
            title={item.doldur ? "Yayın öncesi doğrulanacak" : undefined}
          >
            <BadgeCheck className="size-4 text-safe" aria-hidden />
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
