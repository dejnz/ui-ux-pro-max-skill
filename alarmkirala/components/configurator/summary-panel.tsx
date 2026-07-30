"use client";

import { ExamplePriceBadge } from "@/components/ui/badge";
import { deviceBySlug } from "@/lib/data/devices";
import type { KitItem } from "@/lib/data/kits";
import {
  ADDON_SERVICES,
  computeQuote,
  TERM_DISCOUNTS,
  type AddonId,
  type TermMonths,
} from "@/lib/pricing";
import { formatTL } from "@/lib/utils";

/** Sağ tarafta canlı özet + canlı aylık fiyat — her adımda görünür */
export function SummaryPanel({
  items,
  term,
  addons,
}: {
  items: KitItem[];
  term: TermMonths;
  addons: AddonId[];
}) {
  const quote = computeQuote({ items, term, addons });

  return (
    <aside
      aria-label="Canlı özet ve aylık fiyat"
      aria-live="polite"
      className="rounded-lg border border-line bg-ink-soft p-6 lg:sticky lg:top-24"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-fg-mute uppercase">
          Sistemin
        </h2>
        <ExamplePriceBadge />
      </div>

      {items.length === 0 ? (
        <p className="text-sm leading-relaxed text-fg-mute">
          Adımları tamamladıkça sistemin ve aylık fiyatın burada canlı olarak
          oluşacak.
        </p>
      ) : (
        <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {items.map((item) => {
            const d = deviceBySlug(item.deviceSlug);
            if (!d) return null;
            return (
              <li
                key={item.deviceSlug}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="text-fg-soft">
                  {item.adet}× {d.ad}
                </span>
                <span className="numeric shrink-0 text-fg-mute">
                  ₺{formatTL(d.aylikKiraTL * item.adet)}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-fg-mute">Cihaz kirası</dt>
          <dd className="numeric text-fg-soft">₺{formatTL(quote.cihazToplam)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-fg-mute">
            Süre indirimi ({term} ay · %{Math.round(TERM_DISCOUNTS[term] * 100)})
          </dt>
          <dd className="numeric text-safe">−₺{formatTL(quote.sureIndirimi)}</dd>
        </div>
        {addons.length > 0 && (
          <div className="flex justify-between">
            <dt className="text-fg-mute">
              Ek hizmetler ({addons.length})
            </dt>
            <dd className="numeric text-fg-soft">
              ₺{formatTL(quote.ekHizmetToplam)}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
        <span className="text-sm font-medium text-fg-soft">Aylık toplam</span>
        <span className="numeric text-3xl font-semibold text-fg">
          ₺{formatTL(quote.aylikToplam)}
          <span className="text-sm font-normal text-fg-mute">/ay</span>
        </span>
      </div>

      {addons.length > 0 && (
        <ul className="mt-3 space-y-1">
          {ADDON_SERVICES.filter((a) => addons.includes(a.id)).map((a) => (
            <li key={a.id} className="text-xs text-fg-mute">
              + {a.ad}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs leading-relaxed text-fg-mute">
        Kurulum, bakım, pil ve arıza değişimi dahil. Sözleşme sonunda sürpriz
        yok.
      </p>
    </aside>
  );
}
