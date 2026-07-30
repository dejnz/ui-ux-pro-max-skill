import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ShieldAlert } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge, ExamplePriceBadge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { SystemActive } from "@/components/ui/system-active";
import { SEGMENTS, segmentBySlug } from "@/lib/data/segments";
import { kitBySlug } from "@/lib/data/kits";
import { deviceBySlug } from "@/lib/data/devices";
import { kitMonthlyPrice } from "@/lib/pricing";
import { formatTL } from "@/lib/utils";

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const seg = segmentBySlug((await params).segment);
  if (!seg) return {};
  return {
    title: `${seg.ad} için Alarm Kiralama`,
    description: seg.heroAlt,
  };
}

export default async function CozumPage({
  params,
}: {
  params: Promise<{ segment: string }>;
}) {
  const seg = segmentBySlug((await params).segment);
  if (!seg) notFound();
  const kit = kitBySlug(seg.onerilenKitSlug);

  return (
    <>
      {/* Segment hero — kendi risk senaryosu ve kendi kiti (brief §2) */}
      <section className="cut-b bg-ink-soft pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SystemActive className="mb-6" label={seg.kisaBaslik} />
          <h1 className="display max-w-3xl text-4xl text-fg sm:text-6xl">
            {seg.heroBaslik}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">
            {seg.heroAlt}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kit-olustur" className={buttonClasses({ size: "lg" })}>
              Kitimi Oluştur
            </Link>
            {kit && !kit.teklifBazli && (
              <Link
                href={`/kitler/${kit.slug}`}
                className={buttonClasses({ variant: "outline", size: "lg" })}
              >
                Önerilen kiti gör
              </Link>
            )}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading kicker="Risk senaryosu" title="Neden şimdi?" />
            <div className="flex gap-4 rounded-lg border border-line bg-ink-soft p-6">
              <ShieldAlert className="size-6 shrink-0 text-amber" aria-hidden />
              <p className="leading-relaxed text-fg-soft">{seg.riskSenaryosu}</p>
            </div>
            <ul className="mt-6 space-y-3">
              {seg.ozellikler.map((oz) => (
                <li key={oz} className="flex items-start gap-2.5 text-fg-soft">
                  <Check className="mt-0.5 size-4.5 shrink-0 text-safe" aria-hidden />
                  {oz}
                </li>
              ))}
            </ul>
            {/* [[DOLDUR]] gerçek vaka örneği */}
            <p className="mt-6 text-xs text-fg-mute">
              Bu segment için gerçek vaka örneği, ilk kurulumlarla birlikte
              eklenecek.
            </p>
          </div>

          {kit && (
            <aside className="h-fit rounded-lg border border-line bg-ink-soft p-6">
              <h2 className="text-sm font-semibold tracking-wide text-fg-mute uppercase">
                Önerilen kit
              </h2>
              <p className="display-soft mt-2 text-2xl text-fg">{kit.ad}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-soft">
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
              <div className="mt-5 border-t border-line pt-4">
                {kit.teklifBazli ? (
                  <Link href="/iletisim" className={buttonClasses()}>
                    Teklif iste
                    <ArrowRight aria-hidden />
                  </Link>
                ) : (
                  <>
                    <ExamplePriceBadge />
                    <p className="numeric mt-1.5 text-3xl font-semibold text-fg">
                      ₺{formatTL(kitMonthlyPrice(kit))}
                      <span className="text-sm font-normal text-fg-mute">/ay</span>
                    </p>
                    <Link
                      href={`/kitler/${kit.slug}`}
                      className={buttonClasses({ className: "mt-4" })}
                    >
                      Kiti incele
                      <ArrowRight aria-hidden />
                    </Link>
                  </>
                )}
              </div>
            </aside>
          )}
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading kicker="Diğer çözümler" title="Farklı bir ihtiyacın mı var?" />
        <div className="flex flex-wrap gap-2.5">
          {SEGMENTS.filter((s) => s.slug !== seg.slug).map((s) => (
            <Link
              key={s.slug}
              href={`/cozumler/${s.slug}`}
              className="rounded-md border border-line px-4 py-2.5 text-sm font-medium text-fg-soft transition-colors hover:border-fg-mute hover:text-fg"
            >
              {s.ad}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
