"use client";

import { useMemo, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ExamplePriceBadge } from "@/components/ui/badge";
import { KITS } from "@/lib/data/kits";
import { buyVsRent, kitMonthlyPrice } from "@/lib/pricing";
import { formatTL, cn } from "@/lib/utils";

/** Kirala vs satın al — 5 yıllık toplam maliyet karşılaştırması (brief §5) */
export function RentVsBuy() {
  const kits = KITS.filter((k) => !k.teklifBazli);
  const [kitSlug, setKitSlug] = useState("aile");

  const { comparison, monthly } = useMemo(() => {
    const kit = kits.find((k) => k.slug === kitSlug) ?? kits[0];
    const m = kitMonthlyPrice(kit);
    return { comparison: buyVsRent(m), monthly: m };
  }, [kitSlug, kits]);

  const maxValue = Math.max(
    ...comparison.years.flatMap((y) => [y.kiralama, y.satinAlma]),
  );

  return (
    <Section id="kirala-vs-satin-al">
      <SectionHeading
        kicker="Hesap ortada"
        title="Satın alsaydım vs kiralasam"
        lead="Satın almada donanım + bakım + 5. yılda yenileme cebinden çıkar. Kiralamada tek kalem var. Kit seç, 5 yıllık tabloyu gör."
      />
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {kits.map((kit) => (
          <button
            key={kit.slug}
            type="button"
            aria-pressed={kitSlug === kit.slug}
            onClick={() => setKitSlug(kit.slug)}
            className={cn(
              "h-11 cursor-pointer rounded-md border px-4 text-sm font-medium transition-colors",
              kitSlug === kit.slug
                ? "border-signal bg-signal/10 text-fg"
                : "border-line text-fg-soft hover:border-fg-mute",
            )}
          >
            {kit.ad}
          </button>
        ))}
        <ExamplePriceBadge />
      </div>

      <div className="rounded-lg border border-line bg-ink-soft p-6" aria-live="polite">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm text-fg-soft">
            Aylık kira:{" "}
            <span className="numeric text-lg font-semibold text-fg">
              ₺{formatTL(monthly)}
            </span>
            <span className="text-fg-mute"> · Peşin satın alma (örnek): </span>
            <span className="numeric font-semibold text-fg">
              ₺{formatTL(comparison.donanimBedeli)}
            </span>
          </p>
          <div className="flex items-center gap-4 text-xs text-fg-mute">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-safe" aria-hidden />
              Kiralama
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-fg-mute" aria-hidden />
              Satın alma
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {comparison.years.map((y) => (
            <div key={y.yil} className="grid grid-cols-[3rem_1fr] items-center gap-3">
              <span className="numeric text-sm text-fg-mute">{y.yil}. yıl</span>
              <div className="space-y-1.5">
                <Bar
                  value={y.kiralama}
                  max={maxValue}
                  className="bg-safe"
                  label={`Kiralama toplamı ₺${formatTL(y.kiralama)}`}
                />
                <Bar
                  value={y.satinAlma}
                  max={maxValue}
                  className="bg-fg-mute"
                  label={`Satın alma toplamı ₺${formatTL(y.satinAlma)}`}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-fg-mute">
          Satın alma senaryosu örnek varsayımlar içerir (donanım bedeli, %8
          yıllık bakım, 5. yılda kısmi donanım yenileme). Gerçek fiyatlarla
          güncellenecektir.
        </p>
      </div>
    </Section>
  );
}

function Bar({
  value,
  max,
  className,
  label,
}: {
  value: number;
  max: number;
  className: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-5 flex-1 overflow-hidden rounded-sm bg-ink">
        <div
          role="img"
          aria-label={label}
          className={cn("h-full rounded-sm transition-[width] duration-500", className)}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className="numeric w-24 shrink-0 text-right text-xs text-fg-soft">
        ₺{formatTL(value)}
      </span>
    </div>
  );
}
