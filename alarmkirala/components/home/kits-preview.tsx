import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ExamplePriceBadge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { KITS } from "@/lib/data/kits";
import { kitMonthlyPrice } from "@/lib/pricing";
import { deviceBySlug } from "@/lib/data/devices";
import { formatTL } from "@/lib/utils";

export function KitsPreview() {
  const featured = KITS.filter((k) => k.oneCikan).slice(0, 4);

  return (
    <Section id="hazir-kitler">
      <SectionHeading
        kicker="Hazır kitler"
        title="Mekânına göre hazırlanmış sistemler"
        lead="Her kit kurulum, bakım ve taşınma hakkı dahil tek aylık fiyatla gelir."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((kit) => (
          <Link
            key={kit.slug}
            href={`/kitler/${kit.slug}`}
            className="group flex flex-col rounded-lg border border-line bg-ink-soft p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-fg-mute"
          >
            <h3 className="display-soft text-xl text-fg">{kit.ad}</h3>
            <p className="numeric mt-1 text-xs text-fg-mute">
              {kit.hedef} · {kit.kapsam}
            </p>
            <ul className="mt-4 flex-1 space-y-1.5">
              {kit.cihazlar.slice(0, 4).map((c) => (
                <li key={c.deviceSlug} className="text-sm text-fg-soft">
                  {c.adet}× {deviceBySlug(c.deviceSlug)?.ad}
                </li>
              ))}
              {kit.cihazlar.length > 4 && (
                <li className="text-sm text-fg-mute">
                  +{kit.cihazlar.length - 4} cihaz daha
                </li>
              )}
            </ul>
            <div className="mt-5 border-t border-line pt-4">
              <ExamplePriceBadge />
              <p className="numeric mt-2 text-2xl font-semibold text-fg">
                ₺{formatTL(kitMonthlyPrice(kit))}
                <span className="text-sm font-normal text-fg-mute">/ay</span>
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
                Kiti incele
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link href="/kit-olustur" className={buttonClasses({ variant: "outline" })}>
          <Wrench aria-hidden />
          Hiçbiri uymadı mı? Kendin oluştur
        </Link>
        <Link
          href="/kitler"
          className="text-sm font-medium text-fg-soft underline underline-offset-4 hover:text-fg"
        >
          Tüm kitleri gör
        </Link>
      </div>
    </Section>
  );
}
