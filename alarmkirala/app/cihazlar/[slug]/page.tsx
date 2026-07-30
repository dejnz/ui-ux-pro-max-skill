import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge, ExamplePriceBadge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { DeviceGlyph } from "@/components/ui/device-glyph";
import { CATEGORY_LABELS, DEVICES, deviceBySlug } from "@/lib/data/devices";
import { formatTL } from "@/lib/utils";

export function generateStaticParams() {
  return DEVICES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const d = deviceBySlug((await params).slug);
  if (!d) return {};
  return {
    title: `${d.ad} — Aylık kirala`,
    description: d.kisaAciklama,
  };
}

export default async function CihazDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const d = deviceBySlug((await params).slug);
  if (!d) notFound();

  const related = DEVICES.filter(
    (x) => x.kategori === d.kategori && x.slug !== d.slug,
  ).slice(0, 3);

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-5 flex items-center gap-2">
            <Badge variant="mono">{CATEGORY_LABELS[d.kategori]}</Badge>
            {d.disMekan && <Badge>Dış mekân</Badge>}
            {d.oneCikan && <Badge variant="signal">Öne çıkan</Badge>}
          </div>
          <h1 className="display text-4xl text-fg sm:text-5xl">{d.ad}</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-soft">
            {d.kisaAciklama}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-fg-soft">
            {d.uzunAciklama}
          </p>

          <h2 className="mt-10 mb-4 text-sm font-semibold tracking-wide text-fg-mute uppercase">
            Teknik özellikler
          </h2>
          <ul className="max-w-xl space-y-2.5">
            {d.teknikOzellikler.map((oz) => (
              <li key={oz} className="flex items-start gap-2.5 text-fg-soft">
                <Check className="mt-0.5 size-4.5 shrink-0 text-safe" aria-hidden />
                {oz}
              </li>
            ))}
          </ul>

          {/* [[DOLDUR]] gerçek ürün görselleri (Ajax bayi materyal kiti izniyle) */}
          <p className="mt-8 text-xs text-fg-mute">
            Ürün fotoğrafları, Ajax bayi materyal kiti kullanım izniyle
            eklenecektir.
          </p>
        </div>

        <aside className="h-fit rounded-lg border border-line bg-ink-soft p-6 lg:sticky lg:top-24">
          <div className="mb-5 flex justify-center">
            <DeviceGlyph kategori={d.kategori} size="lg" />
          </div>
          <ExamplePriceBadge />
          <p className="numeric mt-2 text-4xl font-semibold text-fg">
            ₺{formatTL(d.aylikKiraTL)}
            <span className="text-base font-normal text-fg-mute">/ay</span>
          </p>
          <p className="mt-2 text-sm text-fg-soft">
            Bakım, pil ve arıza değişimi dahil.
          </p>
          <div className="mt-5">
            <Link
              href="/kit-olustur"
              className={buttonClasses({ size: "lg", className: "w-full" })}
            >
              Kitine ekle
            </Link>
          </div>
          {d.hubUyumlulugu.length > 0 && (
            <p className="mt-4 text-xs text-fg-mute">
              Uyumlu paneller:{" "}
              {d.hubUyumlulugu
                .map((h) => deviceBySlug(h)?.ad ?? h)
                .join(", ")}
            </p>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-fg-mute uppercase">
            Aynı kategoriden
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/cihazlar/${r.slug}`}
                className="rounded-lg border border-line bg-ink-soft p-5 transition-colors hover:border-fg-mute"
              >
                <p className="font-semibold text-fg">{r.ad}</p>
                <p className="mt-1 line-clamp-2 text-sm text-fg-soft">
                  {r.kisaAciklama}
                </p>
                <p className="numeric mt-3 text-sm text-fg-mute">
                  ₺{formatTL(r.aylikKiraTL)}/ay
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
