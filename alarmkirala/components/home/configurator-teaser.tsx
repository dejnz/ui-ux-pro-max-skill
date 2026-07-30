"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ExamplePriceBadge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import {
  MEKAN_LABELS,
  recommend,
  type MekanTipi,
} from "@/lib/recommendation";
import { itemsMonthlyTotal } from "@/lib/pricing";
import { deviceBySlug } from "@/lib/data/devices";
import { formatTL, cn } from "@/lib/utils";

/** Konfigüratör teaser'ı: mini interaktif önizleme, tam sihirbaza yönlendirir */
export function ConfiguratorTeaser() {
  const [mekan, setMekan] = useState<MekanTipi>("daire");
  const [oda, setOda] = useState(3);

  const rec = useMemo(
    () =>
      recommend({
        mekanTipi: mekan,
        odaSayisi: oda,
        katSayisi: mekan === "mustakil" ? 2 : 1,
        m2: oda * 30,
        disKapiSayisi: 1,
        zeminPencereSayisi: mekan === "daire" ? 0 : 4,
        bahce: mekan === "mustakil",
        riskler: ["hirsizlik"],
      }),
    [mekan, oda],
  );

  const total = itemsMonthlyTotal(rec.items);

  return (
    <div className="cut-tb bg-ink-soft">
      <Section id="konfigurator">
        <SectionHeading
          kicker="Kit oluşturucu"
          title="Evini tarif et, sistemini kuralım."
          lead="İki soruya cevap ver, örnek sistemini ve canlı fiyatını gör. Tam sihirbazda cihazları tek tek özelleştirirsin."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-2.5 text-sm font-medium text-fg-soft">
                Mekân tipi
              </legend>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(MEKAN_LABELS) as MekanTipi[])
                  .slice(0, 4)
                  .map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={mekan === m}
                      onClick={() => setMekan(m)}
                      className={cn(
                        "h-11 cursor-pointer rounded-md border px-4 text-sm font-medium transition-colors",
                        mekan === m
                          ? "border-signal bg-signal/10 text-fg"
                          : "border-line text-fg-soft hover:border-fg-mute",
                      )}
                    >
                      {MEKAN_LABELS[m]}
                    </button>
                  ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2.5 text-sm font-medium text-fg-soft">
                Oda sayısı
              </legend>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={oda === n}
                    onClick={() => setOda(n)}
                    className={cn(
                      "numeric size-11 cursor-pointer rounded-md border text-sm font-semibold transition-colors",
                      oda === n
                        ? "border-signal bg-signal/10 text-fg"
                        : "border-line text-fg-soft hover:border-fg-mute",
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </fieldset>
            <Link href="/kit-olustur" className={buttonClasses({ size: "lg" })}>
              Tam sihirbazı aç
              <ArrowRight aria-hidden />
            </Link>
          </div>

          <div
            className="rounded-lg border border-line bg-ink p-6"
            aria-live="polite"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-fg-mute uppercase">
                Önerilen sistem
              </h3>
              <ExamplePriceBadge />
            </div>
            <ul className="space-y-2">
              {rec.items.map((item) => (
                <li
                  key={item.deviceSlug}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-fg-soft">
                    {item.adet}× {deviceBySlug(item.deviceSlug)?.ad}
                  </span>
                  <span className="numeric text-fg-mute">
                    ₺
                    {formatTL(
                      (deviceBySlug(item.deviceSlug)?.aylikKiraTL ?? 0) *
                        item.adet,
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-sm text-fg-soft">Aylık toplam</span>
              <span className="numeric text-3xl font-semibold text-fg">
                ₺{formatTL(total)}
                <span className="text-sm font-normal text-fg-mute">/ay</span>
              </span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
