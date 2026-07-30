import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Wrench } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge, ExamplePriceBadge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { DeviceGlyph } from "@/components/ui/device-glyph";
import { KITS, kitBySlug } from "@/lib/data/kits";
import { deviceBySlug } from "@/lib/data/devices";
import { kitMonthlyPrice, TERM_DISCOUNTS } from "@/lib/pricing";
import { formatTL } from "@/lib/utils";

export function generateStaticParams() {
  return KITS.filter((k) => !k.teklifBazli).map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const kit = kitBySlug((await params).slug);
  if (!kit) return {};
  return {
    title: `${kit.ad} Kiti — ${kit.hedef}`,
    description: kit.aciklama,
  };
}

export default async function KitDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const kit = kitBySlug((await params).slug);
  if (!kit || kit.teklifBazli) notFound();

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
            Hazır kit
          </p>
          <h1 className="display text-4xl text-fg sm:text-5xl">{kit.ad}</h1>
          <p className="numeric mt-2 text-sm text-fg-mute">
            {kit.hedef} · {kit.kapsam}
          </p>
          <p className="mt-5 max-w-xl leading-relaxed text-fg-soft">
            {kit.aciklama}
          </p>

          <h2 className="mt-10 mb-4 text-sm font-semibold tracking-wide text-fg-mute uppercase">
            Kit içeriği
          </h2>
          <ul className="space-y-3">
            {kit.cihazlar.map((item) => {
              const d = deviceBySlug(item.deviceSlug);
              if (!d) return null;
              return (
                <li
                  key={item.deviceSlug}
                  className="flex items-center gap-4 rounded-lg border border-line bg-ink-soft p-4"
                >
                  <DeviceGlyph kategori={d.kategori} size="sm" />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/cihazlar/${d.slug}`}
                      className="font-semibold text-fg hover:underline"
                    >
                      {item.adet}× {d.ad}
                    </Link>
                    <p className="mt-0.5 text-sm text-fg-soft">{d.kisaAciklama}</p>
                  </div>
                  <span className="numeric shrink-0 text-sm text-fg-mute">
                    ₺{formatTL(d.aylikKiraTL * item.adet)}/ay
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="h-fit rounded-lg border border-line bg-ink-soft p-6 lg:sticky lg:top-24">
          <ExamplePriceBadge />
          <div className="mt-3 space-y-2">
            {([12, 24, 36] as const).map((term) => (
              <div
                key={term}
                className="flex items-baseline justify-between rounded-md border border-line bg-ink px-4 py-3"
              >
                <span className="text-sm text-fg-soft">
                  {term} ay
                  {TERM_DISCOUNTS[term] > 0 && (
                    <span className="ml-2 text-xs text-safe">
                      %{Math.round(TERM_DISCOUNTS[term] * 100)} indirim
                    </span>
                  )}
                </span>
                <span className="numeric text-xl font-semibold text-fg">
                  ₺{formatTL(kitMonthlyPrice(kit, term))}
                  <span className="text-xs font-normal text-fg-mute">/ay</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-fg-soft">
            <Clock className="size-4 text-safe" aria-hidden />
            Kurulum süresi ~{kit.kurulumDakika} dakika
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <Link href="/kit-olustur" className={buttonClasses({ size: "lg" })}>
              Bu kitle devam et
            </Link>
            <Link
              href="/kit-olustur"
              className={buttonClasses({ variant: "outline" })}
            >
              <Wrench aria-hidden />
              Özelleştir
            </Link>
          </div>
          <ul className="mt-5 space-y-1.5 border-t border-line pt-4 text-xs text-fg-mute">
            <li>✓ Bakım, pil ve arıza değişimi dahil</li>
            <li>✓ Yılda 1 taşınma hakkı</li>
            <li>✓ Sözleşme sonu: yenile / iade / satın al</li>
          </ul>
        </aside>
      </div>
      <div className="mt-10">
        <Badge variant="amber">
          [[DOLDUR]] Kit içerikleri ve fiyatlar distribütör anlaşmasıyla kesinleşecek
        </Badge>
      </div>
    </Section>
  );
}
