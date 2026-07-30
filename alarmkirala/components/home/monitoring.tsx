import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { buttonClasses } from "@/components/ui/button";

/** 7/24 izleme merkezi — alarm sonrası dakika dakika (brief §9) */
const TIMELINE = [
  {
    t: "0:00",
    olay: "Dedektör tetiklenir",
    detay: "Sinyal 0,15 saniyede hub'a, oradan izleme merkezine ulaşır.",
  },
  {
    t: "0:05",
    olay: "Telefonuna bildirim düşer",
    detay: "Fotoğraf doğrulamalı cihaz varsa olay karelerini görürsün.",
  },
  {
    t: "0:30",
    olay: "Operatör doğrular",
    detay:
      "İzleme merkezi görüntüyü inceler, gerekirse seni arar. Yanlış alarm burada elenir.",
  },
  {
    t: "1:00",
    olay: "Müdahale başlar",
    detay:
      "Doğrulanan alarmda kolluk kuvvetine bildirim yapılır; mobil müdahale aboneliğinde en yakın devriye yönlendirilir.",
  },
] as const;

export function Monitoring() {
  return (
    <div className="cut-tb bg-ink-soft">
      <Section id="izleme-merkezi">
        <SectionHeading
          kicker="7/24 izleme merkezi"
          title="Alarm çalarsa yalnız değilsin."
          lead="Alarm anından müdahaleye kadar ne olur, dakika dakika."
        />
        <ol className="relative space-y-8 border-l border-line pl-8">
          {TIMELINE.map((item) => (
            <li key={item.t} className="relative">
              <span
                aria-hidden
                className="absolute top-1 -left-[2.35rem] size-3 rounded-full border-2 border-signal bg-ink"
              />
              <span className="numeric text-xs font-semibold tracking-wider text-signal">
                {item.t}
              </span>
              <h3 className="mt-1 font-semibold text-fg">{item.olay}</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-fg-soft">
                {item.detay}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Link href="/izleme-merkezi" className={buttonClasses({ variant: "outline" })}>
            İzleme hizmetini incele
          </Link>
        </div>
      </Section>
    </div>
  );
}
