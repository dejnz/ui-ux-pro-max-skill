"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExamplePriceBadge, Badge } from "@/components/ui/badge";
import { DeviceGlyph } from "@/components/ui/device-glyph";
import {
  CATEGORY_LABELS,
  DEVICES,
  type DeviceCategory,
} from "@/lib/data/devices";
import { cn, formatTL } from "@/lib/utils";

/** Filtreli cihaz kataloğu — kategori sekmeleri client-side */
export function DeviceCatalog() {
  const [filter, setFilter] = useState<DeviceCategory | "hepsi">("hepsi");
  const visible =
    filter === "hepsi" ? DEVICES : DEVICES.filter((d) => d.kategori === filter);

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Kategori filtresi"
      >
        {(["hepsi", ...Object.keys(CATEGORY_LABELS)] as const).map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c as DeviceCategory | "hepsi")}
            className={cn(
              "h-10 cursor-pointer rounded-full border px-4 text-sm font-medium transition-colors",
              filter === c
                ? "border-signal bg-signal/10 text-fg"
                : "border-line text-fg-soft hover:border-fg-mute",
            )}
          >
            {c === "hepsi" ? "Hepsi" : CATEGORY_LABELS[c as DeviceCategory]}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/cihazlar/${d.slug}`}
              className="group flex h-full flex-col rounded-lg border border-line bg-ink-soft p-5 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-fg-mute"
            >
              <div className="flex items-start justify-between gap-3">
                <DeviceGlyph kategori={d.kategori} />
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant="mono">{CATEGORY_LABELS[d.kategori]}</Badge>
                  {d.disMekan && <Badge>Dış mekân</Badge>}
                </div>
              </div>
              <h2 className="mt-4 font-semibold text-fg">{d.ad}</h2>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-fg-soft">
                {d.kisaAciklama}
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-line pt-3">
                <div>
                  <ExamplePriceBadge />
                  <p className="numeric mt-1 text-xl font-semibold text-fg">
                    ₺{formatTL(d.aylikKiraTL)}
                    <span className="text-xs font-normal text-fg-mute">/ay</span>
                  </p>
                </div>
                <ArrowRight
                  className="size-4 text-signal transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
