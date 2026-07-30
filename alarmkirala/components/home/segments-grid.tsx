import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { SEGMENTS } from "@/lib/data/segments";

export function SegmentsGrid() {
  return (
    <Section id="cozumler">
      <SectionHeading
        kicker="Çözümler"
        title="Kiracıdan kurumsala, herkese kendi sistemi"
        lead="Her segmentin riski farklı — kiti de, sözleşmesi de ona göre."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SEGMENTS.slice(0, 6).map((seg) => (
          <Link
            key={seg.slug}
            href={`/cozumler/${seg.slug}`}
            className="group rounded-lg border border-line bg-ink-soft p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-fg-mute"
          >
            <h3 className="font-semibold text-fg">{seg.ad}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-soft">
              {seg.heroAlt}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
              Çözümü gör
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
