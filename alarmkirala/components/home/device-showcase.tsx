import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { buttonClasses } from "@/components/ui/button";
import { TECH_PROOFS } from "@/lib/data/site";

/** Cihaz vitrini: Ajax teknoloji kanıtları — brief §9/8 */
export function DeviceShowcase() {
  return (
    <div className="cut-t bg-paper text-ink">
      <Section>
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="numeric mb-3 text-xs font-medium tracking-[0.2em] text-signal-dim uppercase">
            Ajax teknolojisi
          </p>
          <h2 className="display text-3xl text-ink sm:text-4xl">
            Profesyonel donanım, tüketici kolaylığı
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            Jeweller radyo protokolü, fotoğraf doğrulama ve yıllarca süren pil
            ömrü. Avrupa'nın alarm standardı, senin evinde kirada.
          </p>
        </div>
        <dl className="grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_PROOFS.map((proof) => (
            <div key={proof.deger} className="bg-paper p-6">
              <dt className="sr-only">{proof.aciklama}</dt>
              <dd>
                <span className="numeric block text-4xl font-semibold text-ink">
                  {proof.deger}
                </span>
                <span className="mt-2 block text-sm text-ink/60">
                  {proof.aciklama}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <Link
            href="/cihazlar"
            className={buttonClasses({ variant: "primary" })}
          >
            Cihaz kataloğunu incele
          </Link>
        </div>
      </Section>
    </div>
  );
}
