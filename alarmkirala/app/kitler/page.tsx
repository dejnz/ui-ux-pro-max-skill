import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ExamplePriceBadge, Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { KITS } from "@/lib/data/kits";
import { deviceBySlug } from "@/lib/data/devices";
import { kitMonthlyPrice } from "@/lib/pricing";
import { formatTL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hazır Kitler — Mekânına göre alarm sistemi",
  description:
    "Daireden villaya, dükkândan şantiyeye hazır Ajax alarm kitleri. Kurulum, bakım ve taşınma dahil tek aylık fiyat.",
};

export default function KitlerPage() {
  return (
    <Section>
      <div className="mb-10 max-w-2xl">
        <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
          Hazır kitler
        </p>
        <h1 className="display text-4xl text-fg sm:text-5xl">
          Seç, randevu al, korunmaya başla
        </h1>
        <p className="mt-4 text-fg-soft">
          Her kit gerçek mekân senaryolarından türetildi. Hiçbiri tam uymuyorsa{" "}
          <Link
            href="/kit-olustur"
            className="font-medium text-fg underline decoration-signal underline-offset-4"
          >
            kit oluşturucuyla
          </Link>{" "}
          kendi sistemini kurgula.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {KITS.map((kit) => (
          <article
            key={kit.slug}
            className="flex flex-col rounded-lg border border-line bg-ink-soft p-6 transition-colors hover:border-fg-mute"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="display-soft text-2xl text-fg">{kit.ad}</h2>
                <p className="numeric mt-1 text-xs text-fg-mute">
                  {kit.hedef} · {kit.kapsam}
                </p>
              </div>
              {kit.oneCikan && <Badge variant="signal">Popüler</Badge>}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-soft">
              {kit.aciklama}
            </p>
            {kit.cihazlar.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {kit.cihazlar.map((c) => (
                  <li key={c.deviceSlug}>
                    <Badge variant="mono">
                      {c.adet}× {deviceBySlug(c.deviceSlug)?.ad}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
              {kit.teklifBazli ? (
                <p className="text-sm text-fg-soft">
                  Teklif bazlı — satış ekibi ihtiyaç analiziyle başlar.
                </p>
              ) : (
                <div>
                  <ExamplePriceBadge />
                  <p className="numeric mt-1.5 text-3xl font-semibold text-fg">
                    ₺{formatTL(kitMonthlyPrice(kit))}
                    <span className="text-sm font-normal text-fg-mute">/ay</span>
                  </p>
                </div>
              )}
              <Link
                href={kit.teklifBazli ? "/iletisim" : `/kitler/${kit.slug}`}
                className={buttonClasses({ size: "sm" })}
              >
                {kit.teklifBazli ? "Teklif iste" : "İncele"}
                <ArrowRight aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
